/* motion.ts — scroll-reveal + count-up tellers
   Vanilla, geen dependencies. Respecteert prefers-reduced-motion. */

const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// Markeer dat JS-motion actief is (CSS verbergt reveal-doelen pas hierna,
// zodat de site zonder JS volledig zichtbaar blijft).
document.documentElement.classList.add("js-motion");

/* ---------- 1. Scroll-reveal ---------- */
const revealTargets: Element[] = [];

// Secties: elke .container krijgt reveal; binnen grids stagger op de directe kinderen.
document.querySelectorAll<HTMLElement>(".sec .container, .proofstrip .container").forEach((el) => {
  el.classList.add("reveal");
  revealTargets.push(el);
});

// Hero-content schuift apart in (los van de media-kolom).
const heroCt = document.querySelector(".hero-ct");
if (heroCt) {
  heroCt.classList.add("reveal");
  revealTargets.push(heroCt);
}

// Stagger op grids met meerdere losse items.
document.querySelectorAll<HTMLElement>(
  ".svc-grid, .mini-grid, .phase-grid, .proof-grid, .feat-metrics"
).forEach((grid) => {
  const wrap = grid.closest<HTMLElement>(".reveal");
  // Geef de grid zelf de stagger-rol als hij niet al een reveal-container is.
  grid.classList.add("reveal");
  grid.setAttribute("data-stagger", "");
  if (!wrap || wrap !== grid) revealTargets.push(grid);
});

if (reduced) {
  // Direct tonen, geen observer.
  revealTargets.forEach((el) => el.classList.add("is-in"));
} else {
  const revealObserver = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-in");
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
  );
  revealTargets.forEach((el) => revealObserver.observe(el));
}

/* ---------- 2. Count-up tellers ---------- */
// Parseert tekst als "1.000+", "10.000+", "#2", "300+" en telt op naar het getal,
// met behoud van prefix (#) en suffix (+, "organisch", enz.).
type ParsedCounter = {
  el: HTMLElement;
  prefix: string;
  target: number;
  suffix: string;
  decimals: number;
  useGrouping: boolean;
};

function parseCounter(el: HTMLElement): ParsedCounter | null {
  const raw = el.textContent?.trim() ?? "";
  // Vind het eerste getal (met optionele duizend-punten of decimale komma).
  const match = raw.match(/(\d[\d.]*(?:,\d+)?)/);
  if (!match) return null;

  const numStr = match[1];
  const start = match.index ?? 0;
  const prefix = raw.slice(0, start);
  const suffix = raw.slice(start + numStr.length);

  // NL-notatie: punt = duizendtal, komma = decimaal.
  const useGrouping = numStr.includes(".");
  const normalized = numStr.replace(/\./g, "").replace(",", ".");
  const target = parseFloat(normalized);
  if (!isFinite(target)) return null;

  const decimals = normalized.includes(".") ? normalized.split(".")[1].length : 0;

  return { el, prefix, target, suffix, decimals, useGrouping };
}

function formatNumber(value: number, p: ParsedCounter): string {
  const fixed = value.toFixed(p.decimals);
  if (p.useGrouping) {
    const [intPart, decPart] = fixed.split(".");
    const grouped = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    return decPart ? `${grouped},${decPart}` : grouped;
  }
  return p.decimals ? fixed.replace(".", ",") : fixed;
}

function animateCounter(p: ParsedCounter) {
  const duration = 1400;
  let startTime: number | null = null;
  // easeOutCubic — snel starten, zacht uitlopen.
  const ease = (t: number) => 1 - Math.pow(1 - t, 3);

  function step(now: number) {
    if (startTime === null) startTime = now;
    const t = Math.min((now - startTime) / duration, 1);
    const value = p.target * ease(t);
    p.el.textContent = p.prefix + formatNumber(value, p) + p.suffix;
    if (t < 1) requestAnimationFrame(step);
    else p.el.textContent = p.prefix + formatNumber(p.target, p) + p.suffix;
  }
  requestAnimationFrame(step);
}

// Tel-doelen: proof-strip cijfers en case-metrics.
const counters: ParsedCounter[] = [];
document.querySelectorAll<HTMLElement>(".proof-item .pv, .feat-metrics .mv").forEach((el) => {
  const parsed = parseCounter(el);
  if (!parsed) return; // bv. "EU hosted", "MSc", "AI Overview" — overslaan
  el.classList.add("counter");
  // Reserveer de eindbreedte zodat er geen layout-shift is, daarna op 0 zetten.
  if (!reduced) {
    el.textContent = parsed.prefix + formatNumber(0, parsed) + parsed.suffix;
  }
  counters.push(parsed);
});

if (!reduced && counters.length) {
  const counterObserver = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const p = counters.find((c) => c.el === entry.target);
        if (p) animateCounter(p);
        obs.unobserve(entry.target);
      });
    },
    { threshold: 0.6 }
  );
  counters.forEach((p) => counterObserver.observe(p.el));
}
