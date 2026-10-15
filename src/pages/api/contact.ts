import type { APIRoute } from "astro";
import { Resend } from "resend";

export const prerender = false;

const TO_EMAIL = "christian@liebenberg.ai";
// Afzender op het geverifieerde Resend-subdomein.
const FROM_EMAIL = "Liebenberg AI website <contact@resend.liebenberg.ai>";

const MAX_BODY_BYTES = 50_000;
const MAX_NAME = 120;
const MAX_EMAIL = 200;
const MAX_SUBJECT = 200;
const MAX_MESSAGE = 5000;

const HOUR_MS = 60 * 60 * 1000;
const DAY_MS = 24 * HOUR_MS;
const HOURLY_LIMIT = 5;
const DAILY_LIMIT = 20;

type IpRecord = { hour: number[]; day: number[] };
const rateLimitStore = new Map<string, IpRecord>();

function checkRateLimit(ip: string): { ok: true } | { ok: false; window: "hour" | "day" } {
  const now = Date.now();
  const record = rateLimitStore.get(ip) ?? { hour: [], day: [] };
  record.hour = record.hour.filter((t) => now - t < HOUR_MS);
  record.day = record.day.filter((t) => now - t < DAY_MS);

  if (record.day.length >= DAILY_LIMIT) {
    rateLimitStore.set(ip, record);
    return { ok: false, window: "day" };
  }
  if (record.hour.length >= HOURLY_LIMIT) {
    rateLimitStore.set(ip, record);
    return { ok: false, window: "hour" };
  }
  record.hour.push(now);
  record.day.push(now);
  rateLimitStore.set(ip, record);

  if (rateLimitStore.size > 5000) {
    for (const [key, value] of rateLimitStore) {
      if (value.day.length === 0) rateLimitStore.delete(key);
    }
  }
  return { ok: true };
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

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const POST: APIRoute = async ({ request, clientAddress }) => {
  const apiKey = import.meta.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("RESEND_API_KEY ontbreekt in environment.");
    return jsonResponse({ error: "Contactformulier is nog niet geconfigureerd." }, 500);
  }

  const contentLength = Number(request.headers.get("content-length") ?? 0);
  if (contentLength > MAX_BODY_BYTES) {
    return jsonResponse({ error: "Verzoek is te groot." }, 413);
  }

  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0].trim() ||
    clientAddress ||
    "unknown";

  const limit = checkRateLimit(ip);
  if (!limit.ok) {
    const message =
      limit.window === "day"
        ? "Je hebt vandaag het maximum aantal berichten verstuurd. Mail me gerust direct op info@liebenberg.ai."
        : "Even rustig — probeer het over een uurtje opnieuw, of mail direct op info@liebenberg.ai.";
    return jsonResponse({ error: message }, 429);
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return jsonResponse({ error: "Ongeldige aanvraag." }, 400);
  }

  const obj = (body && typeof body === "object" ? body : {}) as Record<string, unknown>;
  const name = typeof obj.name === "string" ? obj.name.trim() : "";
  const email = typeof obj.email === "string" ? obj.email.trim() : "";
  const subject = typeof obj.subject === "string" ? obj.subject.trim() : "";
  const message = typeof obj.message === "string" ? obj.message.trim() : "";

  // Naam, e-mail en bericht zijn verplicht; onderwerp is optioneel.
  if (!name || !email || !message) {
    return jsonResponse({ error: "Vul je naam, e-mail en bericht in." }, 400);
  }
  if (
    name.length > MAX_NAME ||
    email.length > MAX_EMAIL ||
    subject.length > MAX_SUBJECT ||
    message.length > MAX_MESSAGE
  ) {
    return jsonResponse({ error: "Een van de velden is te lang." }, 400);
  }
  if (!EMAIL_RE.test(email)) {
    return jsonResponse({ error: "Vul een geldig e-mailadres in." }, 400);
  }

  const subjectLine = subject
    ? `${subject} — ${name} via liebenberg.ai`
    : `Nieuw bericht van ${name} — liebenberg.ai`;

  const resend = new Resend(apiKey);

  try {
    const { error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: [TO_EMAIL],
      replyTo: email,
      subject: subjectLine,
      html: `
        <div style="font-family:Geist,Arial,sans-serif;color:#233138;line-height:1.6">
          <h2 style="font-family:Geist,Arial,sans-serif;font-weight:500">Nieuw bericht via de website</h2>
          <p><strong>Naam:</strong> ${escapeHtml(name)}</p>
          <p><strong>E-mail:</strong> ${escapeHtml(email)}</p>
          ${subject ? `<p><strong>Onderwerp:</strong> ${escapeHtml(subject)}</p>` : ""}
          <p><strong>Bericht:</strong></p>
          <p style="white-space:pre-wrap;background:#efeee9;padding:14px 16px;border-radius:8px">${escapeHtml(message)}</p>
        </div>`,
      text:
        `Nieuw bericht via de website\n\n` +
        `Naam: ${name}\n` +
        `E-mail: ${email}\n` +
        (subject ? `Onderwerp: ${subject}\n` : "") +
        `\nBericht:\n${message}`,
    });

    if (error) {
      console.error("Resend error:", error);
      return jsonResponse({ error: "Versturen mislukt. Mail me gerust direct op info@liebenberg.ai." }, 502);
    }

    return jsonResponse({ ok: true }, 200);
  } catch (err) {
    console.error("Contact form error:", err);
    return jsonResponse({ error: "Er ging iets mis. Mail me gerust direct op info@liebenberg.ai." }, 500);
  }
};

export const ALL: APIRoute = () => jsonResponse({ error: "Method not allowed." }, 405);
