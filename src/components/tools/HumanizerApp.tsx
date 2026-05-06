import { useEffect, useRef, useState } from "react";

const MAX_CHARS = 15000;
const REQUEST_TIMEOUT_MS = 90_000;

const LOADING_STAGES = [
  "Tekst lezen…",
  "AI-patronen herkennen…",
  "Em-dashes en clichés strippen…",
  "Herschrijven met menselijke ritmiek…",
  "Anti-AI audit, nog laatste tells eruit…",
  "Bijna klaar, output afronden…",
];

export default function HumanizerApp() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [stageIndex, setStageIndex] = useState(0);
  const [elapsedMs, setElapsedMs] = useState(0);
  const outputRef = useRef<HTMLDivElement | null>(null);
  const loadingRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (output && outputRef.current) {
      outputRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [output]);

  useEffect(() => {
    if (!loading) {
      setStageIndex(0);
      setElapsedMs(0);
      return;
    }

    if (loadingRef.current) {
      loadingRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
    }

    const startedAt = Date.now();
    const tick = window.setInterval(() => {
      const elapsed = Date.now() - startedAt;
      setElapsedMs(elapsed);
      // Geleidelijk door de stages lopen, vertraagd hoe langer het duurt.
      const idx = Math.min(
        LOADING_STAGES.length - 1,
        Math.floor(elapsed / 4000)
      );
      setStageIndex(idx);
    }, 200);

    return () => window.clearInterval(tick);
  }, [loading]);

  async function handleHumanize() {
    setError(null);
    const trimmed = input.trim();
    if (!trimmed) {
      setError("Plak eerst wat tekst.");
      return;
    }

    setOutput("");
    setLoading(true);
    const controller = new AbortController();
    const timeoutId = window.setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

    try {
      const res = await fetch("/api/humanize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: trimmed }),
        signal: controller.signal,
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data?.error ?? "Er ging iets mis. Probeer het opnieuw.");
        return;
      }
      setOutput(data.output ?? "");
    } catch (err) {
      if ((err as { name?: string })?.name === "AbortError") {
        setError("De aanvraag duurde te lang. Probeer het opnieuw.");
      } else {
        setError("Er ging iets mis. Controleer je verbinding en probeer opnieuw.");
      }
    } finally {
      window.clearTimeout(timeoutId);
      setLoading(false);
    }
  }

  async function handleCopy() {
    if (!output) return;
    try {
      await navigator.clipboard.writeText(output);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setError("Kopiëren mislukt. Selecteer en kopieer handmatig.");
    }
  }

  function handleClearInput() {
    setInput("");
    setError(null);
  }

  function handleClearOutput() {
    setOutput("");
  }

  const charCount = input.length;
  const overLimit = charCount > MAX_CHARS;
  const seconds = Math.floor(elapsedMs / 1000);

  return (
    <div className="space-y-8">
      <section>
        <div className="flex items-baseline justify-between mb-3">
          <label htmlFor="humanizer-input" className="label-uppercase text-muted-foreground">
            Jouw tekst
          </label>
          <span
            className={`label-uppercase ${
              overLimit ? "text-destructive" : "text-muted-foreground"
            }`}
          >
            {charCount.toLocaleString("nl-NL")} / {MAX_CHARS.toLocaleString("nl-NL")}
          </span>
        </div>
        <textarea
          id="humanizer-input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          maxLength={MAX_CHARS}
          rows={12}
          placeholder="Plak hier je AI-gegenereerde tekst…"
          className="w-full bg-card text-foreground p-5 ghost-border-20 focus:outline-none focus:ring-1 focus:ring-foreground resize-y font-sans leading-relaxed"
          disabled={loading}
        />
        <div className="mt-3 flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={handleHumanize}
            disabled={loading || overLimit}
            className="bg-foreground text-background px-6 py-3 label-uppercase hover:opacity-90 transition-opacity disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {loading ? "Bezig met humaniseren…" : "Humanize tekst"}
          </button>
          <button
            type="button"
            onClick={handleClearInput}
            disabled={loading || !input}
            className="px-5 py-3 label-uppercase text-muted-foreground hover:text-foreground transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Wis tekst
          </button>
        </div>
        {error && (
          <p className="mt-4 text-destructive text-sm" role="alert">
            {error}
          </p>
        )}
      </section>

      {loading && (
        <section
          ref={loadingRef}
          aria-live="polite"
          aria-busy="true"
          className="relative overflow-hidden bg-card ghost-border-20 p-8 md:p-10"
        >
          <div className="humanizer-shimmer pointer-events-none absolute inset-0" />

          <div className="relative">
            <div className="flex items-center gap-3 mb-6">
              <span className="humanizer-dot inline-block w-2 h-2 rounded-full bg-foreground" />
              <span className="humanizer-dot humanizer-dot-2 inline-block w-2 h-2 rounded-full bg-foreground" />
              <span className="humanizer-dot humanizer-dot-3 inline-block w-2 h-2 rounded-full bg-foreground" />
              <span className="ml-2 label-uppercase text-muted-foreground">
                Aan het denken{seconds > 0 ? ` · ${seconds}s` : ""}
              </span>
            </div>

            <p
              key={stageIndex}
              className="font-heading text-2xl md:text-3xl humanizer-stage-fade"
            >
              {LOADING_STAGES[stageIndex]}
            </p>

            <div className="mt-6 space-y-2">
              {LOADING_STAGES.map((stage, i) => (
                <div
                  key={stage}
                  className={`flex items-center gap-3 text-sm transition-opacity ${
                    i < stageIndex
                      ? "text-muted-foreground opacity-60"
                      : i === stageIndex
                        ? "text-foreground"
                        : "text-muted-foreground opacity-30"
                  }`}
                >
                  <span
                    aria-hidden="true"
                    className={`inline-block w-1.5 h-1.5 rounded-full ${
                      i < stageIndex
                        ? "bg-muted-foreground"
                        : i === stageIndex
                          ? "bg-foreground humanizer-pulse"
                          : "bg-muted-foreground/40"
                    }`}
                  />
                  <span>{stage}</span>
                </div>
              ))}
            </div>

            <p className="mt-6 text-xs text-muted-foreground">
              Dit duurt meestal 10–25 seconden. Bij langere teksten kan het tot een
              minuut oplopen.
            </p>
          </div>
        </section>
      )}

      {output && !loading && (
        <section ref={outputRef} className="pt-2">
          <div className="flex items-baseline justify-between mb-3">
            <h2 className="font-heading text-2xl">Resultaat</h2>
            <span className="label-uppercase text-muted-foreground">
              {output.length.toLocaleString("nl-NL")} tekens
            </span>
          </div>
          <textarea
            value={output}
            readOnly
            rows={Math.min(24, Math.max(8, Math.ceil(output.length / 80)))}
            className="w-full bg-card text-foreground p-5 ghost-border-20 focus:outline-none focus:ring-1 focus:ring-foreground resize-y font-sans leading-relaxed"
          />
          <div className="mt-3 flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={handleCopy}
              className="bg-foreground text-background px-6 py-3 label-uppercase hover:opacity-90 transition-opacity"
            >
              {copied ? "Gekopieerd ✓" : "Kopieer resultaat"}
            </button>
            <button
              type="button"
              onClick={handleClearOutput}
              className="px-5 py-3 label-uppercase text-muted-foreground hover:text-foreground transition-colors"
            >
              Wis resultaat
            </button>
          </div>
        </section>
      )}

      <p className="text-sm text-muted-foreground border-t border-border/15 pt-6">
        Gratis te gebruiken, maximaal 5 keer per uur en 15 keer per dag per
        bezoeker. Je tekst wordt niet opgeslagen, we sturen alleen jouw input
        live door naar het taalmodel en geven het resultaat direct terug.
      </p>
    </div>
  );
}
