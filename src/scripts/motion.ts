/* motion.ts — hero-choreografie, scroll-reveal, count-up tellers,
   scrollspy, FAQ-accordion en kaart-tilt.
   Vanilla, geen dependencies. Respecteert prefers-reduced-motion. */

const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const finePointer = window.matchMedia("(hover:hover) and (pointer:fine)").matches;

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

/* ---------- 2. Kaart-mockup: pins vallen zodra hij in beeld is ---------- */
const mapCard = document.querySelector<HTMLElement>(".map-card");
if (mapCard) {
  if (reduced) {
    mapCard.classList.add("pins-in");
  } else {
    const pinObserver = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            mapCard.classList.add("pins-in");
            obs.disconnect();
          }
        });
      },
      { threshold: 0.35 }
    );
    pinObserver.observe(mapCard);
  }
}

/* ---------- 3. Kaart-mockup: 3D-tilt volgt de cursor ---------- */
if (mapCard && finePointer && !reduced) {
  let raf = 0;
  mapCard.addEventListener("pointerenter", () => {
    mapCard.style.transition = "transform .25s ease, box-shadow .5s ease";
  });
  mapCard.addEventListener("pointermove", (e) => {
    if (raf) return;
    raf = requestAnimationFrame(() => {
      raf = 0;
      const r = mapCard.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      mapCard.style.transform =
        `perspective(1000px) rotateX(${(-y * 3.5).toFixed(2)}deg) rotateY(${(x * 4.5).toFixed(2)}deg) translateY(-5px)`;
    });
  });
  mapCard.addEventListener("pointerleave", () => {
    if (raf) { cancelAnimationFrame(raf); raf = 0; }
    mapCard.style.transition = "";
    mapCard.style.transform = "";
  });
}

/* ---------- 4. Count-up tellers ---------- */
// Parseert tekst als "1.000+", "10.000+", "#2", "300+" en telt op naar het getal,
// met behoud van prefix (#, €) en suffix (+, "organisch", enz.).
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

// Tel-doelen: proof-strip, case-metrics, livefeed en de sprint-prijs.
const counters: ParsedCounter[] = [];
document
  .querySelectorAll<HTMLElement>(".proof-item .pv, .feat-metrics .mv, .lf-row b, .price-num")
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

/* ---------- 5. Scrollspy: actieve sectie in de navbar ---------- */
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

/* ---------- 6. FAQ: vloeiend open- en dichtklappen ---------- */
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
