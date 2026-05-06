import type { APIRoute } from "astro";
import Anthropic from "@anthropic-ai/sdk";
import { HUMANIZER_SYSTEM_PROMPT } from "../../lib/humanizer-prompt";

export const prerender = false;

const MAX_INPUT_CHARS = 15000;
const MAX_BODY_BYTES = 200_000;

const HOUR_MS = 60 * 60 * 1000;
const DAY_MS = 24 * HOUR_MS;
const HOURLY_LIMIT = 5;
const DAILY_LIMIT = 15;

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

export const POST: APIRoute = async ({ request, clientAddress }) => {
  const apiKey = import.meta.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    console.error("ANTHROPIC_API_KEY ontbreekt in environment.");
    return jsonResponse({ error: "Server is niet geconfigureerd." }, 500);
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
        ? "Je hebt vandaag het maximum van 15 humanizes bereikt. Probeer het morgen opnieuw."
        : "Even rustig — je kunt 5 keer per uur humanizen. Probeer het zo opnieuw.";
    return jsonResponse({ error: message }, 429);
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return jsonResponse({ error: "Ongeldige JSON." }, 400);
  }

  const text =
    body && typeof body === "object" && "text" in body
      ? (body as { text: unknown }).text
      : null;

  if (typeof text !== "string" || text.trim().length === 0) {
    return jsonResponse({ error: "Geen tekst meegegeven." }, 400);
  }
  if (text.length > MAX_INPUT_CHARS) {
    return jsonResponse(
      { error: `Tekst is te lang (max ${MAX_INPUT_CHARS} karakters).` },
      400
    );
  }

  const anthropic = new Anthropic({ apiKey });

  try {
    const message = await anthropic.messages.create({
      model: "claude-sonnet-4-6",
      max_tokens: 4096,
      system: HUMANIZER_SYSTEM_PROMPT,
      messages: [{ role: "user", content: text }],
    });

    const output = message.content
      .filter((block): block is Anthropic.TextBlock => block.type === "text")
      .map((block) => block.text)
      .join("\n")
      .trim();

    if (!output) {
      return jsonResponse({ error: "Geen output ontvangen. Probeer opnieuw." }, 502);
    }

    return jsonResponse({ output }, 200);
  } catch (err: unknown) {
    console.error("Humanizer error:", err);
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

export const ALL: APIRoute = () => {
  return jsonResponse({ error: "Method not allowed." }, 405);
};
