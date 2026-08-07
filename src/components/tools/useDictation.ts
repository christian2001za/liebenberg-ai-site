/**
 * Dicteren met MediaRecorder → /api/transcribe.
 *
 * Bewust prerecorded en niet realtime: de gebruiker praat, klikt op stop, en
 * ziet dan zijn hele tekst verschijnen om te corrigeren. Dat is precies de UX
 * die we willen, en het scheelt een websocket plus een token-endpoint.
 *
 * De opname is Opus in een WebM-container op 16 kHz mono — ~2 KB per seconde,
 * zodat een antwoord van een minuut ongeveer 120 KB is in plaats van 2 MB.
 */

import { useCallback, useEffect, useRef, useState } from "react";

export type DictationStatus = "idle" | "recording" | "transcribing";

/** Volgorde van voorkeur; de browser pakt het eerste dat hij ondersteunt. */
const MIME_CANDIDATES = [
  "audio/webm;codecs=opus",
  "audio/webm",
  "audio/ogg;codecs=opus",
  "audio/mp4",
];

function pickMimeType(): string | undefined {
  if (typeof MediaRecorder === "undefined") return undefined;
  return MIME_CANDIDATES.find((type) => MediaRecorder.isTypeSupported(type));
}

export function useDictation(onTranscript: (text: string) => void) {
  const [status, setStatus] = useState<DictationStatus>("idle");
  const [error, setError] = useState<string | null>(null);
  const [seconds, setSeconds] = useState(0);
  const [supported, setSupported] = useState(true);

  const recorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const streamRef = useRef<MediaStream | null>(null);
  const timerRef = useRef<number | null>(null);
  // onTranscript verandert bij elke render van de parent; via een ref blijft de
  // stop-handler stabiel en hoeven we de recorder niet opnieuw op te tuigen.
  const callbackRef = useRef(onTranscript);

  useEffect(() => {
    callbackRef.current = onTranscript;
  }, [onTranscript]);

  useEffect(() => {
    const hasApi =
      typeof navigator !== "undefined" &&
      Boolean(navigator.mediaDevices?.getUserMedia) &&
      typeof MediaRecorder !== "undefined";
    setSupported(hasApi);
  }, []);

  const cleanup = useCallback(() => {
    if (timerRef.current !== null) {
      window.clearInterval(timerRef.current);
      timerRef.current = null;
    }
    streamRef.current?.getTracks().forEach((track) => track.stop());
    streamRef.current = null;
    recorderRef.current = null;
    chunksRef.current = [];
    setSeconds(0);
  }, []);

  useEffect(() => cleanup, [cleanup]);

  const transcribe = useCallback(async (blob: Blob) => {
    setStatus("transcribing");
    try {
      const res = await fetch("/api/transcribe", {
        method: "POST",
        headers: { "Content-Type": "application/octet-stream" },
        body: blob,
      });
      const data = (await res.json()) as { text?: string; error?: string };

      if (!res.ok || !data.text) {
        setError(data.error ?? "Transcriberen mislukt. Typ je antwoord, dan gaan we door.");
        return;
      }
      callbackRef.current(data.text);
    } catch {
      setError("Verbinding mislukt. Typ je antwoord, dan gaan we door.");
    } finally {
      setStatus("idle");
    }
  }, []);

  const start = useCallback(async () => {
    setError(null);

    const mimeType = pickMimeType();
    if (!mimeType) {
      setSupported(false);
      setError("Je browser ondersteunt geen opnames. Typ je antwoord.");
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          channelCount: 1,
          sampleRate: 16000,
          echoCancellation: true,
          noiseSuppression: true,
        },
      });
      streamRef.current = stream;

      const recorder = new MediaRecorder(stream, {
        mimeType,
        audioBitsPerSecond: 16000,
      });
      recorderRef.current = recorder;
      chunksRef.current = [];

      recorder.ondataavailable = (event) => {
        if (event.data.size > 0) chunksRef.current.push(event.data);
      };

      recorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: mimeType });
        cleanup();
        if (blob.size < 1000) {
          setError("Dat was te kort. Houd de opname wat langer aan.");
          setStatus("idle");
          return;
        }
        void transcribe(blob);
      };

      recorder.start();
      setStatus("recording");

      const startedAt = Date.now();
      timerRef.current = window.setInterval(() => {
        setSeconds(Math.floor((Date.now() - startedAt) / 1000));
      }, 250);
    } catch (err) {
      cleanup();
      setStatus("idle");
      const name = (err as { name?: string })?.name;
      setError(
        name === "NotAllowedError"
          ? "Geen toegang tot je microfoon. Sta het toe in je browser, of typ je antwoord."
          : "De microfoon werkt niet. Typ je antwoord, dan gaan we door."
      );
    }
  }, [cleanup, transcribe]);

  const stop = useCallback(() => {
    if (recorderRef.current?.state === "recording") {
      recorderRef.current.stop();
    }
  }, []);

  const toggle = useCallback(() => {
    if (status === "recording") stop();
    else if (status === "idle") void start();
  }, [status, start, stop]);

  return { status, error, seconds, supported, toggle, clearError: () => setError(null) };
}
