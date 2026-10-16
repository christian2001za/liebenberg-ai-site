/**
 * De AI-scan: een Mom Test-interview met spraakinvoer.
 *
 * Flow: intro → gesprek (max 15 vragen) → diagnose gratis op het scherm →
 * e-mailgate → volledig plan.
 *
 * De conversatie leeft in sessionStorage zodat een verdwaalde refresh bij
 * vraag 12 niet het hele gesprek weggooit, en wordt server-side per beurt naar
 * Supabase geschreven.
 */

import { useCallback, useEffect, useRef, useState } from "react";
import { useDictation } from "./useDictation";

type Message = { role: "assistant" | "user"; content: string };
type Phase = "intro" | "interview" | "diagnosis" | "plan";

const STORAGE_KEY = "liebenberg-ai-scan";
const MAX_TURNS = 15;
/** Onder deze lengte vragen we om meer, in plaats van een beurt te verbranden. */
const MIN_ANSWER_CHARS = 15;
const SHORT_ANSWER_ALLOWED = /^(ja|nee|jawel|nope|klopt|niet|geen|weet ik niet)\b/i;

type Saved = {
  interviewId: string | null;
  messages: Message[];
  turnCount: number;
  done: boolean;
};

function loadSaved(): Saved | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.sessionStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Saved) : null;
  } catch {
    return null;
  }
}

function saveSession(data: Saved) {
  try {
    window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {
    // sessionStorage kan vol of geblokkeerd zijn; het gesprek loopt gewoon door.
  }
}

/** Minimale Markdown-render voor het rapport (kopjes, bullets, vet). */
function Markdown({ text }: { text: string }) {
  const blocks: React.ReactNode[] = [];
  const lines = text.split("\n");
  let list: string[] = [];

  const inline = (s: string) =>
    s.split(/(\*\*[^*]+\*\*)/g).map((part, i) =>
      part.startsWith("**") && part.endsWith("**") ? (
        <strong key={i}>{part.slice(2, -2)}</strong>
      ) : (
        part
      )
    );

  const flushList = () => {
    if (list.length === 0) return;
    blocks.push(
      <ul key={`ul-${blocks.length}`} className="list-disc pl-5 space-y-1 my-3">
        {list.map((item, i) => (
          <li key={i}>{inline(item)}</li>
        ))}
      </ul>
    );
    list = [];
  };

  for (const line of lines) {
    const trimmed = line.trim();
    if (trimmed.startsWith("- ")) {
      list.push(trimmed.slice(2));
      continue;
    }
    flushList();
    if (!trimmed) continue;

    if (trimmed.startsWith("### ")) {
      blocks.push(
        <h4 key={blocks.length} className="font-heading text-lg mt-5 mb-1">
          {inline(trimmed.slice(4))}
        </h4>
      );
    } else if (trimmed.startsWith("## ")) {
      blocks.push(
        <h3 key={blocks.length} className="font-heading text-xl mt-6 mb-2">
          {inline(trimmed.slice(3))}
        </h3>
      );
    } else {
      blocks.push(
        <p key={blocks.length} className="my-3 leading-relaxed">
          {inline(trimmed)}
        </p>
      );
    }
  }
  flushList();

  return <>{blocks}</>;
}

export default function AiScanApp() {
  const [phase, setPhase] = useState<Phase>("intro");
  const [messages, setMessages] = useState<Message[]>([]);
  const [interviewId, setInterviewId] = useState<string | null>(null);
  const [turnCount, setTurnCount] = useState(0);
  const [input, setInput] = useState("");
  const [thinking, setThinking] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [nudge, setNudge] = useState<string | null>(null);

  const [diagnosis, setDiagnosis] = useState("");
  const [plan, setPlan] = useState("");
  const [email, setEmail] = useState("");
  const [sending, setSending] = useState(false);

  const bottomRef = useRef<HTMLDivElement | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const handleTranscript = useCallback((text: string) => {
    // Aanvullen in plaats van vervangen: iemand kan eerst typen en dan inspreken.
    setInput((prev) => (prev ? `${prev.trimEnd()} ${text}` : text));
    setNudge(null);
    textareaRef.current?.focus();
  }, []);

  const dictation = useDictation(handleTranscript);

  useEffect(() => {
    const saved = loadSaved();
    if (saved && saved.messages.length > 0) {
      setMessages(saved.messages);
      setInterviewId(saved.interviewId);
      setTurnCount(saved.turnCount);
      setPhase(saved.done ? "diagnosis" : "interview");
    }
  }, []);

  useEffect(() => {
    if (phase === "interview" && messages.length > 0) {
      bottomRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
    }
  }, [messages, thinking, phase]);

  const persist = useCallback(
    (next: Partial<Saved>) => {
      saveSession({
        interviewId,
        messages,
        turnCount,
        done: false,
        ...next,
      });
    },
    [interviewId, messages, turnCount]
  );

  async function startInterview() {
    setError(null);
    setThinking(true);
    setPhase("interview");

    try {
      const res = await fetch("/api/ai-scan/turn", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "start" }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data?.error ?? "Starten mislukt. Probeer het opnieuw.");
        setPhase("intro");
        return;
      }

      const first: Message[] = [{ role: "assistant", content: data.question }];
      setMessages(first);
      setInterviewId(data.interviewId ?? null);
      setTurnCount(0);
      saveSession({
        interviewId: data.interviewId ?? null,
        messages: first,
        turnCount: 0,
        done: false,
      });
    } catch {
      setError("Verbinding mislukt. Controleer je internet en probeer opnieuw.");
      setPhase("intro");
    } finally {
      setThinking(false);
    }
  }

  async function sendAnswer() {
    const answer = input.trim();
    if (!answer || thinking) return;

    // Korte antwoorden vangen we in de UI af: scheelt een API-call én een
    // van de vijftien beurten.
    if (answer.length < MIN_ANSWER_CHARS && !SHORT_ANSWER_ALLOWED.test(answer)) {
      setNudge("Kun je daar iets meer over vertellen? Hoe meer context, hoe scherper het advies.");
      return;
    }

    setNudge(null);
    setError(null);

    const withAnswer: Message[] = [...messages, { role: "user", content: answer }];
    setMessages(withAnswer);
    setInput("");
    setThinking(true);

    try {
      const res = await fetch("/api/ai-scan/turn", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ interviewId, answer }),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data?.error ?? "Er ging iets mis. Probeer het opnieuw.");
        // Antwoord teruggeven zodat er niets verloren gaat.
        setMessages(messages);
        setInput(answer);
        return;
      }

      const next: Message[] = [...withAnswer, { role: "assistant", content: data.question }];
      setMessages(next);
      setTurnCount(data.turnCount ?? turnCount + 1);
      saveSession({
        interviewId,
        messages: next,
        turnCount: data.turnCount ?? turnCount + 1,
        done: Boolean(data.done),
      });

      if (data.done) void fetchDiagnosis();
    } catch {
      setError("Verbinding mislukt. Je antwoord staat nog in het veld.");
      setMessages(messages);
      setInput(answer);
    } finally {
      setThinking(false);
    }
  }

  async function fetchDiagnosis() {
    setThinking(true);
    setError(null);
    try {
      const res = await fetch("/api/ai-scan/report", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ interviewId, action: "diagnosis" }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data?.error ?? "De diagnose kon niet worden opgehaald.");
        return;
      }
      setDiagnosis(data.diagnosis ?? "");
      setPhase("diagnosis");
    } catch {
      setError("Verbinding mislukt bij het ophalen van de diagnose.");
    } finally {
      setThinking(false);
    }
  }

  async function requestPlan(event: React.FormEvent) {
    event.preventDefault();
    if (sending) return;

    setError(null);
    setSending(true);
    try {
      const res = await fetch("/api/ai-scan/report", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ interviewId, action: "plan", email: email.trim() }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data?.error ?? "Versturen mislukt. Probeer het opnieuw.");
        return;
      }
      setPlan(data.plan ?? "");
      setPhase("plan");
    } catch {
      setError("Verbinding mislukt. Probeer het opnieuw.");
    } finally {
      setSending(false);
    }
  }

  function restart() {
    try {
      window.sessionStorage.removeItem(STORAGE_KEY);
    } catch {
      // niets aan te doen
    }
    setPhase("intro");
    setMessages([]);
    setInterviewId(null);
    setTurnCount(0);
    setInput("");
    setDiagnosis("");
    setPlan("");
    setEmail("");
    setError(null);
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (event.key === "Enter" && (event.metaKey || event.ctrlKey)) {
      event.preventDefault();
      void sendAnswer();
    }
  }

  const recording = dictation.status === "recording";
  const transcribing = dictation.status === "transcribing";
  const progress = Math.min(100, Math.round((turnCount / MAX_TURNS) * 100));

  // ---------------------------------------------------------------- intro

  if (phase === "intro") {
    return (
      <div className="space-y-8">
        <section className="bg-card ghost-border-20 p-8 md:p-10">
          <h2 className="font-heading text-2xl md:text-3xl mb-4">Wat je kunt verwachten</h2>
          <ul className="space-y-3 text-muted-foreground">
            <li className="flex gap-3">
              <span aria-hidden="true">→</span>
              <span>
                <strong className="text-foreground">Ongeveer tien minuten.</strong> Maximaal
                vijftien vragen, vaak minder. Hoe scherper je antwoordt, hoe korter het duurt.
              </span>
            </li>
            <li className="flex gap-3">
              <span aria-hidden="true">→</span>
              <span>
                <strong className="text-foreground">Praten werkt beter dan typen.</strong> Klik op
                de microfoon, vertel je verhaal, klik weer op stop. Je ziet je tekst verschijnen en
                kunt hem aanpassen voor je verstuurt.
              </span>
            </li>
            <li className="flex gap-3">
              <span aria-hidden="true">→</span>
              <span>
                <strong className="text-foreground">Halve antwoorden geven half advies.</strong> Er
                wordt doorgevraagd naar concrete voorbeelden: wat gebeurde er vorige maand, hoe
                vaak, en wat heb je al geprobeerd.
              </span>
            </li>
            <li className="flex gap-3">
              <span aria-hidden="true">→</span>
              <span>
                <strong className="text-foreground">Ook "nee" is een uitkomst.</strong> Zit er geen
                zinnige AI-toepassing in je bedrijf, dan lees je dat gewoon.
              </span>
            </li>
          </ul>

          <button
            type="button"
            onClick={() => void startInterview()}
            disabled={thinking}
            className="mt-8 bg-foreground text-background px-7 py-4 label-uppercase hover:opacity-90 transition-opacity disabled:opacity-40"
          >
            {thinking ? "Bezig…" : "Start het gesprek"}
          </button>

          {error && (
            <p className="mt-4 text-destructive text-sm" role="alert">
              {error}
            </p>
          )}
        </section>

        <p className="text-sm text-muted-foreground border-t border-border/15 pt-6">
          Je antwoorden worden opgeslagen om het advies te kunnen maken en om de scan te
          verbeteren. Laat je geen e-mailadres achter, dan verwijder ik het gesprek na 90 dagen.
          Meer daarover in de{" "}
          <a href="/privacyverklaring/" className="underline hover:no-underline">
            privacyverklaring
          </a>
          .
        </p>
      </div>
    );
  }

  // ------------------------------------------------------------- interview

  if (phase === "interview") {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <span className="label-uppercase text-muted-foreground">
            Vraag {Math.min(turnCount + 1, MAX_TURNS)} van maximaal {MAX_TURNS}
          </span>
          <div className="h-px flex-1 mx-4 bg-border/30" aria-hidden="true">
            <div className="h-px bg-foreground transition-all" style={{ width: `${progress}%` }} />
          </div>
        </div>

        <section className="space-y-5" aria-live="polite">
          {messages.map((message, i) => (
            <div
              key={i}
              className={
                message.role === "assistant"
                  ? "bg-card ghost-border-20 p-6"
                  : "pl-6 border-l-2 border-foreground/20"
              }
            >
              <p className="label-uppercase text-muted-foreground mb-2">
                {message.role === "assistant" ? "Interviewer" : "Jij"}
              </p>
              <p className="leading-relaxed whitespace-pre-wrap">{message.content}</p>
            </div>
          ))}

          {thinking && (
            <div className="bg-card ghost-border-20 p-6">
              <div className="flex items-center gap-2">
                <span className="humanizer-dot inline-block w-2 h-2 rounded-full bg-foreground" />
                <span className="humanizer-dot humanizer-dot-2 inline-block w-2 h-2 rounded-full bg-foreground" />
                <span className="humanizer-dot humanizer-dot-3 inline-block w-2 h-2 rounded-full bg-foreground" />
                <span className="ml-2 label-uppercase text-muted-foreground">Denkt na…</span>
              </div>
            </div>
          )}
          <div ref={bottomRef} />
        </section>

        <section className="pt-2">
          <label htmlFor="ai-scan-answer" className="sr-only">
            Jouw antwoord
          </label>
          <textarea
            id="ai-scan-answer"
            ref={textareaRef}
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
              if (nudge) setNudge(null);
            }}
            onKeyDown={handleKeyDown}
            rows={5}
            disabled={thinking}
            placeholder={
              recording
                ? "Aan het luisteren… klik op stop als je klaar bent."
                : "Klik op de microfoon en vertel, of typ je antwoord."
            }
            className="w-full bg-card text-foreground p-5 ghost-border-20 focus:outline-none focus:ring-1 focus:ring-foreground resize-y leading-relaxed disabled:opacity-60"
          />

          <div className="mt-3 flex flex-wrap items-center gap-3">
            {dictation.supported && (
              <button
                type="button"
                onClick={dictation.toggle}
                disabled={thinking || transcribing}
                aria-pressed={recording}
                className={`flex items-center gap-2 px-6 py-3 label-uppercase transition-opacity disabled:opacity-40 ${
                  recording
                    ? "bg-destructive text-background"
                    : "bg-foreground text-background hover:opacity-90"
                }`}
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  className="w-4 h-4"
                  aria-hidden="true"
                >
                  {recording ? (
                    <rect x="6" y="6" width="12" height="12" rx="1" fill="currentColor" />
                  ) : (
                    <>
                      <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3z" />
                      <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
                      <path d="M12 19v3" />
                    </>
                  )}
                </svg>
                {recording
                  ? `Stop opname · ${dictation.seconds}s`
                  : transcribing
                    ? "Uitwerken…"
                    : "Spreek in"}
              </button>
            )}

            <button
              type="button"
              onClick={() => void sendAnswer()}
              disabled={thinking || recording || !input.trim()}
              className="px-6 py-3 label-uppercase ghost-border-20 hover:bg-card transition-colors disabled:opacity-40"
            >
              Verstuur
            </button>

            <span className="text-xs text-muted-foreground">
              {recording
                ? "Praat rustig door — je ziet de tekst zodra je stopt."
                : "⌘/Ctrl + Enter verstuurt"}
            </span>
          </div>

          {nudge && <p className="mt-3 text-sm text-muted-foreground">{nudge}</p>}
          {dictation.error && (
            <p className="mt-3 text-destructive text-sm" role="alert">
              {dictation.error}
            </p>
          )}
          {error && (
            <p className="mt-3 text-destructive text-sm" role="alert">
              {error}
            </p>
          )}
        </section>
      </div>
    );
  }

  // -------------------------------------------------------- diagnose & plan

  return (
    <div className="space-y-8">
      <section className="bg-card ghost-border-20 p-8 md:p-10">
        <p className="label-uppercase text-muted-foreground mb-3">Wat er uit het gesprek kwam</p>
        <div className="text-foreground">
          {diagnosis ? <Markdown text={diagnosis} /> : <p>De diagnose wordt opgesteld…</p>}
        </div>
      </section>

      {phase === "diagnosis" && (
        <section className="ghost-border-20 p-8 md:p-10">
          <h2 className="font-heading text-2xl mb-3">En zo zou je het aanpakken</h2>
          <p className="text-muted-foreground mb-6">
            Het uitgewerkte plan — de aanpak in stappen, de eerste concrete stap, welke tools en
            koppelingen erbij komen kijken, een indicatie van tijd en geld, en waar dit soort
            projecten meestal op stukloopt. Vul je e-mailadres in, dan zie je het direct én krijg je
            het toegestuurd.
          </p>

          <form onSubmit={requestPlan} className="flex flex-wrap gap-3">
            <label htmlFor="ai-scan-email" className="sr-only">
              E-mailadres
            </label>
            <input
              id="ai-scan-email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="jij@bedrijf.nl"
              className="flex-1 min-w-[240px] bg-card text-foreground px-5 py-3 ghost-border-20 focus:outline-none focus:ring-1 focus:ring-foreground"
            />
            <button
              type="submit"
              disabled={sending}
              className="bg-foreground text-background px-7 py-3 label-uppercase hover:opacity-90 transition-opacity disabled:opacity-40"
            >
              {sending ? "Bezig…" : "Toon het plan"}
            </button>
          </form>

          {error && (
            <p className="mt-4 text-destructive text-sm" role="alert">
              {error}
            </p>
          )}
        </section>
      )}

      {phase === "plan" && plan && (
        <section className="bg-card ghost-border-20 p-8 md:p-10">
          <p className="label-uppercase text-muted-foreground mb-3">Het plan</p>
          <div className="text-foreground">
            <Markdown text={plan} />
          </div>
          <p className="mt-8 pt-6 border-t border-border/15 text-muted-foreground">
            Het volledige rapport staat ook in je mailbox. Wil je dit een keer doorspreken?{" "}
            <a href="/#contact" className="underline hover:no-underline">
              Plan een gesprek
            </a>{" "}
            — dat levert bijna altijd meer op dan een rapport.
          </p>
        </section>
      )}

      <button
        type="button"
        onClick={restart}
        className="text-sm text-muted-foreground hover:text-foreground transition-colors underline"
      >
        Opnieuw beginnen
      </button>
    </div>
  );
}
