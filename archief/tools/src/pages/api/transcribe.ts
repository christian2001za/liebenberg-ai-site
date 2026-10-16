/**
 * Spraak-naar-tekst voor de AI-scan, via Reson8 (prerecorded).
 *
 * De audio loopt bewust via onze eigen server in plaats van rechtstreeks vanuit
 * de browser naar Reson8: zo blijft de API-key server-side en kunnen we rate
 * limiten. De opname is Opus in een WebM-container op 16 kHz mono (~2 KB/sec),
 * zodat die extra hop niet voelbaar is.
 */

import type { APIRoute } from "astro";

export const prerender = false;

const RESON8_URL = "https://api.reson8.dev/v1/speech-to-text/prerecorded";

/** ~6 minuten Opus op 16 kHz mono. Ruim boven een normaal antwoord. */
const MAX_AUDIO_BYTES = 8_000_000;
const MIN_AUDIO_BYTES = 1_000;

const REQUEST_TIMEOUT_MS = 30_000;

const HOUR_MS = 60 * 60 * 1000;
/** Eén interview kost ~15 opnames; dit laat een paar volledige sessies per uur toe. */
const HOURLY_LIMIT = 80;

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

export const POST: APIRoute = async ({ request, clientAddress }) => {
  const apiKey = import.meta.env.RESON8_API_KEY;
  if (!apiKey) {
    console.error("RESON8_API_KEY ontbreekt in environment.");
    return jsonResponse({ error: "Spraakinvoer is niet geconfigureerd." }, 500);
  }

  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0].trim() ||
    clientAddress ||
    "unknown";

  if (!checkRateLimit(ip)) {
    return jsonResponse(
      { error: "Te veel opnames achter elkaar. Typ je antwoord, of probeer het zo opnieuw." },
      429
    );
  }

  const declared = Number(request.headers.get("content-length") ?? 0);
  if (declared > MAX_AUDIO_BYTES) {
    return jsonResponse({ error: "Opname is te lang. Houd het onder de vijf minuten." }, 413);
  }

  const audio = await request.arrayBuffer();

  if (audio.byteLength > MAX_AUDIO_BYTES) {
    return jsonResponse({ error: "Opname is te lang. Houd het onder de vijf minuten." }, 413);
  }
  if (audio.byteLength < MIN_AUDIO_BYTES) {
    return jsonResponse({ error: "De opname is te kort. Houd de knop wat langer aan." }, 400);
  }

  // encoding=auto laat Reson8 de container zelf herkennen (WebM/Opus, OGG, WAV).
  // filler_mode=clean haalt "eh" en "uhm" eruit — bij dicteren wil je de tekst,
  // niet het denkgeluid. Taal vastzetten op nl geeft betere kwaliteit dan
  // auto-detect, met en als terugval voor Engelse vaktermen.
  const params = new URLSearchParams({
    encoding: "auto",
    language: "nl,en",
    filler_mode: "clean",
  });

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  try {
    const res = await fetch(`${RESON8_URL}?${params}`, {
      method: "POST",
      headers: {
        Authorization: `ApiKey ${apiKey}`,
        "Content-Type": "application/octet-stream",
      },
      body: audio,
      signal: controller.signal,
    });

    if (!res.ok) {
      const detail = await res.text().catch(() => "");
      console.error("Reson8 error:", res.status, detail.slice(0, 500));
      return jsonResponse(
        { error: "Transcriberen mislukt. Probeer het opnieuw, of typ je antwoord." },
        502
      );
    }

    const data = (await res.json()) as { text?: unknown };
    const text = typeof data.text === "string" ? data.text.trim() : "";

    if (!text) {
      return jsonResponse(
        { error: "We hoorden geen spraak. Probeer opnieuw, of typ je antwoord." },
        422
      );
    }

    return jsonResponse({ text }, 200);
  } catch (err) {
    if ((err as { name?: string })?.name === "AbortError") {
      return jsonResponse(
        { error: "Transcriberen duurde te lang. Probeer het opnieuw, of typ je antwoord." },
        504
      );
    }
    console.error("Transcribe error:", err);
    return jsonResponse({ error: "Er ging iets mis. Typ je antwoord, dan gaan we door." }, 500);
  } finally {
    clearTimeout(timeout);
  }
};

export const ALL: APIRoute = () => jsonResponse({ error: "Method not allowed." }, 405);
