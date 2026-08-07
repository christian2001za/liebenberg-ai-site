/**
 * Eén beurt van het AI-scan-interview.
 *
 * Werkt in twee stappen per aanroep:
 *   1. Het model vult de state bij via een verplichte tool-call (update_state).
 *   2. Met die state in de hand formuleert het zijn spiegeling + volgende vraag.
 *
 * De twee stappen zijn bewust gescheiden. Als je het model in één keer laat
 * antwoorden én de state laat bijwerken, gaat de kwaliteit van allebei omlaag:
 * het schrijft dan een vraag op basis van wat het denkt te weten in plaats van
 * op basis van wat het net heeft vastgelegd.
 */

import type { APIRoute } from "astro";
import Anthropic from "@anthropic-ai/sdk";
import {
  INTERVIEW_SYSTEM_PROMPT,
  MAX_TURNS,
  REPLY_FORMAT_INSTRUCTION,
  buildReplyInstruction,
  buildTurnInstruction,
  stripStateLeak,
} from "../../../lib/ai-scan/prompt";
import {
  SAY_TOOL_SCHEMA,
  STATE_TOOL_SCHEMA,
  type ScanState,
  canConclude,
  emptyState,
} from "../../../lib/ai-scan/schema";
import {
  createInterview,
  loadInterview,
  saveTurn,
  type ConversationMessage,
} from "../../../lib/ai-scan/store";

export const prerender = false;

const MODEL = "claude-haiku-4-5";

const MAX_BODY_BYTES = 200_000;
const MAX_ANSWER_CHARS = 4000;

const HOUR_MS = 60 * 60 * 1000;
const DAY_MS = 24 * HOUR_MS;
/** Eén interview is max 15 beurten; dit laat ~4 sessies per uur toe. */
const HOURLY_LIMIT = 60;
const DAILY_LIMIT = 200;

const OPENING_QUESTION =
  "Laten we bij het begin beginnen. Wat voor bedrijf heb je, en hoeveel mensen werken er?";

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

/** Start een nieuw interview: geen model-aanroep nodig, de openingsvraag staat vast. */
async function startInterview(request: Request): Promise<Response> {
  const id = await createInterview({
    referrer: request.headers.get("referer"),
    userAgent: request.headers.get("user-agent"),
  });

  const state = emptyState();
  const conversation: ConversationMessage[] = [
    { role: "assistant", content: OPENING_QUESTION },
  ];

  if (id) {
    await saveTurn(id, { conversation, state, turnCount: 0 });
  }

  return jsonResponse(
    {
      interviewId: id,
      question: OPENING_QUESTION,
      state,
      turnCount: 0,
      done: false,
    },
    200
  );
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

  const limit = checkRateLimit(ip);
  if (!limit.ok) {
    return jsonResponse(
      {
        error:
          limit.window === "day"
            ? "De AI-scan is vandaag veel gebruikt. Probeer het morgen opnieuw, of plan direct een gesprek."
            : "Even rustig — probeer het over een kwartiertje opnieuw.",
      },
      429
    );
  }

  let body: Record<string, unknown>;
  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return jsonResponse({ error: "Ongeldige aanvraag." }, 400);
  }

  if (body.action === "start") {
    return startInterview(request);
  }

  const answer = typeof body.answer === "string" ? body.answer.trim() : "";
  const interviewId = typeof body.interviewId === "string" ? body.interviewId : null;

  if (!answer) {
    return jsonResponse({ error: "Geen antwoord meegegeven." }, 400);
  }
  if (answer.length > MAX_ANSWER_CHARS) {
    return jsonResponse(
      { error: `Dat antwoord is wel erg lang (max ${MAX_ANSWER_CHARS} tekens).` },
      400
    );
  }

  // De conversatie komt uit de database, niet uit de request: de browser mag
  // wel een antwoord aanleveren, maar niet de gespreksgeschiedenis herschrijven.
  const stored = interviewId ? await loadInterview(interviewId) : null;

  if (interviewId && stored?.status === "completed") {
    return jsonResponse({ error: "Dit interview is al afgerond." }, 409);
  }

  const conversation: ConversationMessage[] = stored?.conversation ?? [
    { role: "assistant", content: OPENING_QUESTION },
  ];
  const state: ScanState = stored?.state ?? emptyState();
  const turnCount = stored?.turn_count ?? 0;

  conversation.push({ role: "user", content: answer });

  const anthropic = new Anthropic({ apiKey });
  const messages = conversation.map((m) => ({ role: m.role, content: m.content }));
  const nextTurnCount = turnCount + 1;

  try {
    // Stap 1 — state bijwerken. tool_choice dwingt de call af, zodat het model
    // niet kan besluiten "deze beurt sla ik de scorekaart even over".
    const stateResponse = await anthropic.messages.create({
      model: MODEL,
      max_tokens: 2000,
      system: INTERVIEW_SYSTEM_PROMPT,
      tools: [
        {
          name: "update_state",
          description:
            "Werk de scorekaart van dit interview bij op basis van het laatste antwoord van de klant. Roep dit elke beurt aan, vóór je je vraag stelt.",
          input_schema: STATE_TOOL_SCHEMA as Anthropic.Tool["input_schema"],
        },
      ],
      tool_choice: { type: "tool", name: "update_state" },
      messages: [
        ...messages,
        {
          role: "user",
          content: `[Systeem] ${buildTurnInstruction(state, turnCount)}\n\nWerk nu de state bij op basis van het laatste antwoord.`,
        },
      ],
    });

    const toolUse = stateResponse.content.find(
      (block): block is Anthropic.ToolUseBlock => block.type === "tool_use"
    );

    // Valt de tool-call weg, dan gaan we door met de vorige state. Het interview
    // wordt daar hooguit iets minder scherp van; stoppen zou erger zijn.
    const nextState: ScanState = toolUse
      ? ({ ...state, ...(toolUse.input as Partial<ScanState>) } as ScanState)
      : state;

    // Stap 2 — de beurt afronden. De harde grens ligt in code, niet bij het model.
    const reachedLimit = nextTurnCount >= MAX_TURNS;
    const modelIsDone = nextState.phase === "klaar";
    const done = modelIsDone || reachedLimit;

    // Let op: stap 2 krijgt buildReplyInstruction, niet buildTurnInstruction.
    // De volledige scorekaart-instructie hoort bij stap 1; geef je die hier
    // ook mee, dan gaat het model zijn eigen administratie navertellen.
    const closingInstruction = done
      ? `Het interview is klaar. Schrijf twee zinnen: bedank kort en zeg dat je de bevindingen op een rij gaat zetten. Stel géén vraag meer.\n\n${REPLY_FORMAT_INSTRUCTION}`
      : buildReplyInstruction(nextState, nextTurnCount);

    // Ook stap 2 gaat via een verplichte tool-call. Dat is niet omdat we hier
    // gestructureerde data nodig hebben — we willen juist gewone tekst — maar
    // omdat vrije tekst niet betrouwbaar schoon te krijgen was: het model
    // schreef zijn administratie steeds in een nieuw formaat het antwoord in
    // (JSON, bullets, <>…</>, kale key: value). Binnen een tool-call kan dat
    // niet: alles wat het model zegt, zit in het veld waar het in hoort.
    const replyResponse = await anthropic.messages.create({
      model: MODEL,
      max_tokens: 400,
      system: INTERVIEW_SYSTEM_PROMPT,
      tools: [
        {
          name: "say",
          description:
            "Zeg iets tegen de ondernemer. Dit is het enige dat hij op zijn scherm te zien krijgt.",
          input_schema: SAY_TOOL_SCHEMA as Anthropic.Tool["input_schema"],
        },
      ],
      tool_choice: { type: "tool", name: "say" },
      messages: [
        ...messages,
        { role: "user", content: `[Systeem] ${closingInstruction}` },
      ],
    });

    const sayUse = replyResponse.content.find(
      (block): block is Anthropic.ToolUseBlock =>
        block.type === "tool_use" && block.name === "say"
    );

    // stripStateLeak blijft als vangnet staan voor het geval het model toch
    // iets in het tekstveld propt. Valt de tool-call weg, dan vallen we terug
    // op de losse tekstblokken.
    const rawReply =
      typeof (sayUse?.input as { text?: unknown } | undefined)?.text === "string"
        ? ((sayUse!.input as { text: string }).text)
        : replyResponse.content
            .filter((block): block is Anthropic.TextBlock => block.type === "text")
            .map((block) => block.text)
            .join("\n");

    const reply = stripStateLeak(rawReply);

    if (!reply) {
      return jsonResponse({ error: "Geen antwoord ontvangen. Probeer opnieuw." }, 502);
    }

    conversation.push({ role: "assistant", content: reply });

    // canConclude bewaakt de ondergrens: bij de harde vragenlimiet zonder bewijs
    // levert het rapport straks eerlijk "te weinig informatie" op.
    if (done && !nextState.verdict) {
      nextState.verdict = canConclude(nextState) ? "te_vroeg" : "geen_case";
    }
    if (done) nextState.phase = "klaar";

    if (interviewId) {
      await saveTurn(interviewId, {
        conversation,
        state: nextState,
        turnCount: nextTurnCount,
        status: done ? "completed" : "in_progress",
      });
    }

    return jsonResponse(
      {
        interviewId,
        question: reply,
        state: nextState,
        turnCount: nextTurnCount,
        done,
      },
      200
    );
  } catch (err: unknown) {
    console.error("AI-scan turn error:", err);
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
