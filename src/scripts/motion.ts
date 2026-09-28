/* motion.ts — hero-choreografie, scroll-reveal, count-up tellers,
   scrollspy, FAQ-accordion en de case-video.
   Vanilla, geen dependencies. Respecteert prefers-reduced-motion. */

const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// Markeer dat JS-motion actief is (CSS verbergt reveal-doelen pas hierna,
// zodat de site zonder JS volledig zichtbaar blijft).
document.documentElement.classList.add("js-motion");

/* ---------- 0. Hero-intro ----------
   Twee frames wachten zodat de initiële (verborgen) staat is toegepast,
   daarna start de choreografie via één class. */
const hero = document.querySelector<HTMLElement>(".hero");
if (hero) {
  if (reduced) {
    hero.classList.add("hero-in");
  } else {
    requestAnimationFrame(() => requestAnimationFrame(() => hero.classList.add("hero-in")));
  }
}

/* ---------- 1. Scroll-reveal ---------- */
const revealTargets: Element[] = [];

// Secties: elke .container krijgt reveal; binnen grids stagger op de directe kinderen.
document.querySelectorAll<HTMLElement>(".sec .container, .proofstrip .container").forEach((el) => {
  el.classList.add("reveal");
  revealTargets.push(el);
});

// Stagger op grids en lijsten met meerdere losse items.
document.querySelectorAll<HTMLElement>(
  ".svc-grid, .mini-grid, .phase-grid, .proof-grid, .feat-metrics, .contrast, .faq, .sprint-list, .contact-cards"
).forEach((grid) => {
  grid.classList.add("reveal");
  grid.setAttribute("data-stagger", "");
  revealTargets.push(grid);
});

// Na afloop van de animatie ruimen we de reveal-machinerie op, zodat
// hover-transities (kaart-lifts e.d.) hun eigen timing terugkrijgen.
function finishReveal(el: Element) {
  window.setTimeout(() => {
    el.classList.remove("reveal", "is-in");
    el.removeAttribute("data-stagger");
  }, 1600);
}

if (reduced) {
  revealTargets.forEach((el) => {
    el.classList.add("is-in");
    finishReveal(el);
  });
} else {
  const revealObserver = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-in");
          finishReveal(entry.target);
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
  );
  revealTargets.forEach((el) => revealObserver.observe(el));
}

/* ---------- 2. Case-video: speelt gedempt af zodra hij in beeld is ----------
   Zonder JS, bij reduced-motion of databesparing blijft het een gewone
   video met poster en bedieningselementen. */
const caseVideo = document.querySelector<HTMLVideoElement>(".case-video video");
const soundBtn = document.querySelector<HTMLButtonElement>(".case-video .cv-sound");
const saveData =
  (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData === true;

if (caseVideo && soundBtn && !reduced && !saveData) {
  const label = soundBtn.querySelector<HTMLElement>(".cv-label");
  let inView = false;
  let restarted = false;

  caseVideo.controls = false;
  soundBtn.hidden = false;

  // Autoplay kan alsnog geweigerd worden (bv. iOS-energiebesparing):
  // dan vallen we terug op de gewone bediening. Een AbortError (pause()
  // tijdens snel doorscrollen) is geen weigering en negeren we.
  const play = () =>
    caseVideo.play().catch((err: DOMException) => {
      if (err.name !== "NotAllowedError") return;
      caseVideo.controls = true;
      soundBtn.hidden = true;
    });

  new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        inView = entry.isIntersecting;
        if (inView) play();
        else caseVideo.pause();
      });
    },
    { threshold: 0.5 }
  ).observe(caseVideo);

  soundBtn.addEventListener("click", () => {
    const soundOn = caseVideo.muted;
    caseVideo.muted = !soundOn;
    // Eerste keer geluid aan: terug naar het begin, zodat de voice-over compleet is.
    if (soundOn && !restarted) {
      caseVideo.currentTime = 0;
      restarted = true;
    }
    soundBtn.setAttribute("aria-pressed", String(soundOn));
    if (label) label.textContent = soundOn ? "Geluid uit" : "Geluid aan";
    if (inView) play();
  });
}

/* ---------- 3. Count-up tellers ---------- */
// Parseert tekst als "2.500+", "25.000+", "#2", "300+" en telt op naar het getal,
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

// Tel-doelen: proof-strip, case-metrics en de sprint-prijs.
const counters: ParsedCounter[] = [];
document
  .querySelectorAll<HTMLElement>(".proof-item .pv, .feat-metrics .mv, .price-num")
  .forEach((el) => {
    const parsed = parseCounter(el);
    if (!parsed) return; // bv. "EU hosted", "MSc", "AI Overview" — overslaan
    el.classList.add("counter");
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

/* ---------- 4. Scrollspy: actieve sectie in de navbar ---------- */
const navLinks = Array.from(
  document.querySelectorAll<HTMLAnchorElement>(".floatbar nav a[href^='#']")
);
if (navLinks.length) {
  const byId = new Map(
    navLinks
      .map((a) => [a.getAttribute("href")!.slice(1), a] as const)
      .filter(([id]) => id.length > 0)
  );
  const sections = Array.from(byId.keys())
    .map((id) => document.getElementById(id))
    .filter((s): s is HTMLElement => Boolean(s));

  function setActive(id: string | null) {
    navLinks.forEach((a) => a.classList.toggle("is-active", a.getAttribute("href") === `#${id}`));
  }

  if (sections.length) {
    const spyObserver = new IntersectionObserver(
      (entries) => {
        // Kies de bovenste zichtbare sectie.
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible.length) setActive(visible[0].target.id);
        else if (window.scrollY < 200) setActive(null);
      },
      { rootMargin: "-30% 0px -55% 0px" }
    );
    sections.forEach((s) => spyObserver.observe(s));
  }
}

/* ---------- 5. FAQ: vloeiend open- en dichtklappen ---------- */
document.querySelectorAll<HTMLDetailsElement>(".faq details").forEach((details) => {
  const summary = details.querySelector<HTMLElement>("summary");
  const content = details.querySelector<HTMLElement>(".ans");
  if (!summary || !content) return;

  let anim: Animation | null = null;

  summary.addEventListener("click", (e) => {
    e.preventDefault();
    if (reduced || typeof details.animate !== "function") {
      details.open = !details.open;
      return;
    }
    if (anim) anim.cancel();
    const startH = details.offsetHeight;

    if (!details.open) {
      details.open = true;
      const endH = details.offsetHeight;
      details.style.overflow = "hidden";
      anim = details.animate(
        { height: [`${startH}px`, `${endH}px`] },
        { duration: 360, easing: "cubic-bezier(.4,0,.2,1)" }
      );
      content.animate(
        { opacity: [0, 1], transform: ["translateY(-6px)", "none"] },
        { duration: 320, delay: 80, easing: "ease-out", fill: "backwards" }
      );
      anim.onfinish = () => { details.style.overflow = ""; anim = null; };
    } else {
      // Dichtklappen: eerst naar de hoogte van alleen de summary animeren.
      details.style.overflow = "hidden";
      const styles = getComputedStyle(details);
      const endH =
        summary.offsetHeight + parseFloat(styles.paddingTop) + parseFloat(styles.paddingBottom);
      anim = details.animate(
        { height: [`${startH}px`, `${endH}px`] },
        { duration: 300, easing: "cubic-bezier(.4,0,.2,1)" }
      );
      anim.onfinish = () => {
        details.open = false;
        details.style.overflow = "";
        anim = null;
      };
      anim.oncancel = () => { details.style.overflow = ""; anim = null; };
    }
  });
});
