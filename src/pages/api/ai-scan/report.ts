/**
 * Het eindrapport van de AI-scan.
 *
 * Twee acties op één endpoint:
 *   - action "diagnosis": genereert de gratis diagnose die direct op het scherm
 *     komt. Geen e-mail nodig.
 *   - action "plan": vraagt om een e-mailadres en levert het uitgewerkte plan,
 *     op het scherm én in de mailbox. Christian krijgt een kopie met het
 *     volledige transcript.
 *
 * De knip zit in soort, niet in hoeveelheid: de diagnose bewijst dat er
 * geluisterd is (en is dus deelbaar), het plan is wat iemand nodig heeft om te
 * handelen.
 */

import type { APIRoute } from "astro";
import Anthropic from "@anthropic-ai/sdk";
import { Resend } from "resend";
import { REPORT_SYSTEM_PROMPT } from "../../../lib/ai-scan/prompt";
import type { ScanState } from "../../../lib/ai-scan/schema";
import {
  loadInterview,
  saveEmail,
  saveReport,
  type ConversationMessage,
} from "../../../lib/ai-scan/store";

export const prerender = false;

const MODEL = "claude-sonnet-5";

const TO_EMAIL = "christian@liebenberg.ai";
const FROM_EMAIL = "Liebenberg AI <contact@resend.liebenberg.ai>";

const MAX_BODY_BYTES = 20_000;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const HOUR_MS = 60 * 60 * 1000;
const HOURLY_LIMIT = 20;

const rateLimitStore = new Map<string, number[]>();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const hits = (rateLimitStore.get(ip) ?? []).filter((t) => now - t < HOUR_MS);
  if (hits.length >= HOURLY_LIMIT) {
    rateLimitStore.set(ip, hits);
    return false;
  }
  hits.push(now);
  rateLimitStore.set(ip, hits);

  if (rateLimitStore.size > 5000) {
    for (const [key, value] of rateLimitStore) {
      if (value.every((t) => now - t >= HOUR_MS)) rateLimitStore.delete(key);
    }
  }
  return true;
}

function jsonResponse(body: unknown, status: number): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/** Minimale Markdown → HTML voor de mail. Bewust klein gehouden. */
function markdownToHtml(md: string): string {
  const lines = md.split("\n");
  const out: string[] = [];
  let inList = false;

  const inline = (text: string) =>
    escapeHtml(text).replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");

  for (const line of lines) {
    const trimmed = line.trim();

    if (trimmed.startsWith("- ")) {
      if (!inList) {
        out.push('<ul style="padding-left:20px;margin:10px 0">');
        inList = true;
      }
      out.push(`<li style="margin:4px 0">${inline(trimmed.slice(2))}</li>`);
      continue;
    }

    if (inList) {
      out.push("</ul>");
      inList = false;
    }

    if (!trimmed) continue;

    if (trimmed.startsWith("### ")) {
      out.push(
        `<h3 style="font-family:'EB Garamond',Georgia,serif;font-weight:500;margin:18px 0 6px">${inline(trimmed.slice(4))}</h3>`
      );
    } else if (trimmed.startsWith("## ")) {
      out.push(
        `<h2 style="font-family:'EB Garamond',Georgia,serif;font-weight:500;margin:24px 0 8px">${inline(trimmed.slice(3))}</h2>`
      );
    } else {
      out.push(`<p style="margin:10px 0">${inline(trimmed)}</p>`);
    }
  }

  if (inList) out.push("</ul>");
  return out.join("\n");
}

function transcriptText(conversation: ConversationMessage[]): string {
  return conversation
    .map((m) => `${m.role === "assistant" ? "Interviewer" : "Klant"}: ${m.content}`)
    .join("\n\n");
}

/** Bouwt de gebruikersprompt voor het rapport: transcript + gestructureerde bevindingen. */
function buildReportInput(
  conversation: ConversationMessage[],
  state: ScanState,
  part: "diagnosis" | "plan"
): string {
  const findings = JSON.stringify(
    {
      bedrijf: state.company,
      pijnpunten: state.painPoints,
      oordeel: state.verdict ?? "onbekend",
    },
    null,
    2
  );

  const instruction =
    part === "diagnosis"
      ? "Schrijf nu ALLEEN deel 1, de diagnose. Schrijf niets over de aanpak of het plan — dat komt later. Begin direct met de inhoud, zonder kopje 'Diagnose'."
      : "Schrijf nu ALLEEN deel 2, het plan. De klant heeft de diagnose al gelezen; herhaal die niet. Begin direct met de aanpak.";

  return `## Het gesprek\n\n${transcriptText(conversation)}\n\n## Gestructureerde bevindingen\n\n${findings}\n\n## Opdracht\n\n${instruction}`;
}

async function generate(
  anthropic: Anthropic,
  conversation: ConversationMessage[],
  state: ScanState,
  part: "diagnosis" | "plan"
): Promise<string> {
  const message = await anthropic.messages.create({
    model: MODEL,
    max_tokens: 3000,
    system: REPORT_SYSTEM_PROMPT,
    messages: [{ role: "user", content: buildReportInput(conversation, state, part) }],
  });

  return message.content
    .filter((block): block is Anthropic.TextBlock => block.type === "text")
    .map((block) => block.text)
    .join("\n")
    .trim();
}

export const POST: APIRoute = async ({ request, clientAddress }) => {
  const apiKey = import.meta.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    console.error("ANTHROPIC_API_KEY ontbreekt in environment.");
    return jsonResponse({ error: "De AI-scan is niet geconfigureerd." }, 500);
  }

  const contentLength = Number(request.headers.get("content-length") ?? 0);
  if (contentLength > MAX_BODY_BYTES) {
    return jsonResponse({ error: "Verzoek is te groot." }, 413);
  }

  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0].trim() ||
    clientAddress ||
    "unknown";

  if (!checkRateLimit(ip)) {
    return jsonResponse({ error: "Even rustig — probeer het zo opnieuw." }, 429);
  }

  let body: Record<string, unknown>;
  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return jsonResponse({ error: "Ongeldige aanvraag." }, 400);
  }

  const interviewId = typeof body.interviewId === "string" ? body.interviewId : null;
  const action = body.action === "plan" ? "plan" : "diagnosis";

  if (!interviewId) {
    return jsonResponse({ error: "Interview niet gevonden." }, 400);
  }

  // Het gesprek komt uit de database, nooit uit de request body: anders kan
  // iemand een verzonnen interview posten om een gratis rapport te krijgen.
  const interview = await loadInterview(interviewId);
  if (!interview) {
    return jsonResponse(
      { error: "We konden dit interview niet terugvinden. Start de scan opnieuw." },
      404
    );
  }
  if (interview.conversation.length < 4) {
    return jsonResponse({ error: "Het interview is nog niet ver genoeg." }, 400);
  }

  const anthropic = new Anthropic({ apiKey });

  try {
    if (action === "diagnosis") {
      const diagnosis =
        interview.report_diagnosis ??
        (await generate(anthropic, interview.conversation, interview.state, "diagnosis"));

      if (!diagnosis) {
        return jsonResponse({ error: "Geen diagnose ontvangen. Probeer opnieuw." }, 502);
      }

      await saveReport(interviewId, {
        diagnosis,
        plan: interview.report_plan ?? "",
      });

      return jsonResponse({ diagnosis, verdict: interview.state.verdict ?? null }, 200);
    }

    // action === "plan": e-mailgate.
    const email = typeof body.email === "string" ? body.email.trim() : "";
    if (!EMAIL_RE.test(email) || email.length > 200) {
      return jsonResponse({ error: "Vul een geldig e-mailadres in." }, 400);
    }

    const plan =
      interview.report_plan ||
      (await generate(anthropic, interview.conversation, interview.state, "plan"));

    if (!plan) {
      return jsonResponse({ error: "Geen plan ontvangen. Probeer opnieuw." }, 502);
    }

    const diagnosis =
      interview.report_diagnosis ??
      (await generate(anthropic, interview.conversation, interview.state, "diagnosis"));

    await saveEmail(interviewId, email);
    await saveReport(interviewId, { diagnosis, plan });

    // De mails zijn een bijproduct: als Resend hapert krijgt de bezoeker zijn
    // rapport nog steeds op het scherm te zien.
    const resendKey = import.meta.env.RESEND_API_KEY;
    if (resendKey) {
      const resend = new Resend(resendKey);
      const bedrijf = interview.state.company.description || "onbekend bedrijf";

      try {
        await resend.emails.send({
          from: FROM_EMAIL,
          to: [email],
          replyTo: TO_EMAIL,
          subject: "Jouw AI-scan: waar je beste AI-kans zit",
          html: `
            <div style="font-family:Figtree,Arial,sans-serif;color:#233138;line-height:1.6;max-width:640px">
              <h1 style="font-family:'EB Garamond',Georgia,serif;font-weight:500;font-size:26px">Jouw AI-scan</h1>
              <p>Hierbij het volledige rapport van je AI-scan. Onder de diagnose staat het plan: hoe je dit zou aanpakken, wat de eerste stap is, en waar het meestal misgaat.</p>
              <hr style="border:none;border-top:1px solid #e0d9cc;margin:24px 0" />
              ${markdownToHtml(diagnosis)}
              <hr style="border:none;border-top:1px solid #e0d9cc;margin:24px 0" />
              ${markdownToHtml(plan)}
              <hr style="border:none;border-top:1px solid #e0d9cc;margin:24px 0" />
              <p style="font-size:14px;color:#5c6b73">
                Vragen of wil je dit een keer doorspreken? Antwoord gerust op deze mail —
                die komt rechtstreeks bij mij binnen.<br /><br />
                Christian Liebenberg<br />Liebenberg AI
              </p>
            </div>`,
          text: `Jouw AI-scan\n\n${diagnosis}\n\n---\n\n${plan}\n\n---\n\nVragen? Antwoord gerust op deze mail.\n\nChristian Liebenberg — Liebenberg AI`,
        });
      } catch (err) {
        console.error("Resend (klant) mislukt:", err);
      }

      try {
        await resend.emails.send({
          from: FROM_EMAIL,
          to: [TO_EMAIL],
          replyTo: email,
          subject: `AI-scan afgerond: ${bedrijf} (${interview.state.verdict ?? "geen oordeel"})`,
          html: `
            <div style="font-family:Figtree,Arial,sans-serif;color:#233138;line-height:1.6">
              <h2 style="font-family:'EB Garamond',Georgia,serif;font-weight:500">Nieuwe AI-scan afgerond</h2>
              <p><strong>E-mail:</strong> ${escapeHtml(email)}</p>
              <p><strong>Bedrijf:</strong> ${escapeHtml(bedrijf)}</p>
              <p><strong>Omvang:</strong> ${escapeHtml(interview.state.company.size || "onbekend")}</p>
              <p><strong>Oordeel:</strong> ${escapeHtml(interview.state.verdict ?? "onbekend")}</p>
              <p><strong>Vragen gesteld:</strong> ${interview.turn_count}</p>
              <h3 style="font-family:'EB Garamond',Georgia,serif;font-weight:500">Bevindingen</h3>
              <pre style="white-space:pre-wrap;background:#f4efe6;padding:14px 16px;border-radius:8px;font-size:13px">${escapeHtml(
                JSON.stringify(interview.state.painPoints, null, 2)
              )}</pre>
              <h3 style="font-family:'EB Garamond',Georgia,serif;font-weight:500">Transcript</h3>
              <pre style="white-space:pre-wrap;background:#f4efe6;padding:14px 16px;border-radius:8px;font-size:13px">${escapeHtml(
                transcriptText(interview.conversation)
              )}</pre>
            </div>`,
          text:
            `Nieuwe AI-scan afgerond\n\nE-mail: ${email}\nBedrijf: ${bedrijf}\n` +
            `Oordeel: ${interview.state.verdict ?? "onbekend"}\nVragen: ${interview.turn_count}\n\n` +
            `Transcript:\n${transcriptText(interview.conversation)}`,
        });
      } catch (err) {
        console.error("Resend (intern) mislukt:", err);
      }
    }

    return jsonResponse({ plan, diagnosis }, 200);
  } catch (err: unknown) {
    console.error("AI-scan report error:", err);
    const status =
      err && typeof err === "object" && "status" in err && typeof (err as { status: unknown }).status === "number"
        ? (err as { status: number }).status
        : 500;
    if (status === 529 || status === 503) {
      return jsonResponse(
        { error: "Even druk bij de AI. Probeer het over een minuutje opnieuw." },
        503
      );
    }
    return jsonResponse({ error: "Er ging iets mis. Probeer het opnieuw." }, 500);
  }
};

export const ALL: APIRoute = () => jsonResponse({ error: "Method not allowed." }, 405);
