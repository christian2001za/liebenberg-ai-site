Voer de redesign "rustig vakwerk" van liebenberg.ai in één keer door: nieuw design system, nieuwe homepage en de case studies in de nieuwe stijl en stem.

**Lees eerst, in deze volgorde:**
1. `CLAUDE.md` en `docs/BRAND.md`: de merkgids met principes, tokens, typografie, componenten, beweging, stem en de grens met de voorwaarden. Bij een conflict wint `docs/BRAND.md`.
2. `docs/huisstijl-2026/stijlpagina.html`: open hem in de browser. Dit is de visuele referentie. De code erachter staat in `stijlpagina.css` en `stijlpagina-gedrag.js`: nabouwen, niet importeren.
3. `docs/huisstijl-2026/homepage-copy.md`: de letterlijke tekst voor de homepage.
4. `docs/huisstijl-2026/case-template.md`: opbouw en regels voor de case studies.

Assets staan klaar in `src/assets/huisstijl/` (vier schilderijen met `CREDITS.md`, `grain.png`, tien iconen, in `gravures/` de embleem-gravures per case en een gravure voor de 404-pagina, en in `stillevens/` tussenbeelden per case; zie de README's daar). Portret en kantoorfoto staan al in `src/assets/`.

**Werkwijze**
- Nieuwe branch `redesign/rustig-vakwerk` vanaf `main`. Commit per stap. Aan het eind een draft-PR. Niet mergen en niet naar `main` pushen.
- Na elke stap moet `npm run build` slagen. Bekijk de pagina in de browser op 1440 en 390 breed en vergelijk met de stijlpagina.
- Twijfel over inhoud of feiten: weglaten en noteren in de PR. Niets verzinnen.

**Stappen**
1. **Fundament.** `src/styles/brand.css` naar de nieuwe tokens (BRAND §2 t/m §4). Geist en Geist Mono zelf hosten via `@fontsource-variable/geist` en `@fontsource-variable/geist-mono`; Google Fonts eruit. De korrel als vaste laag in `BrandLayout`. Uit `motion.css` en `src/scripts/motion.ts`: scroll-reveals, optellende cijfers en de hero-zoom. `GrainOverlay`, `DynamicGradientBackground` en `NeuralNetworkMesh` niet meer gebruiken.
2. **Componenten.** Knop (primair, secundair, link, met de hover- en klikstates uit BRAND §5), navigatie, label, cijferstrip, case-regel, citaat, status, icoon (de eigen set), schilderijvlak, productframe, contactblok, processchema en de productloop voor de hero (10 seconden, pauzeknop, bij reduced motion de eindtoestand). `SiteNav` en `SiteFooter` in de nieuwe stijl. De zwevende WhatsApp-knop gaat eruit.
3. **Homepage.** `src/pages/index.astro` herbouwen met `homepage-copy.md`. Title en meta uit de copy. De FAQ in het `faqItems`-schema en in de sectie gelijk houden. De Debatwijzer gaat van de homepage af.
4. **Cases.** Eén Astro-layout volgens `case-template.md`, met de gravure van de case als embleem in de kop en in de case-lijst op de homepage (alleen als het bestand bestaat; anders weglaten). Bouw het zo dat een nieuwe gravure in `src/assets/huisstijl/gravures/` met de naam van de case vanzelf verschijnt. Zet om, in deze volgorde: Hoornaar, evenementenverhuur, Eye Motion Lab. Herschrijf de copy met de stem uit BRAND §8. Huidige URL's blijven werken (anders 301-redirects), sitemap in `astro.config.mjs` bijwerken. De oude HTML-bestanden pas weghalen als de nieuwe pagina's en redirects werken.
5. **404-pagina:** de gravure `gravures/404.png` met een korte tekst en een link terug naar de homepage.
6. **Overige pagina's** (blog, tools, ai-scan, privacyverklaring, algemene voorwaarden, 404): alleen de nieuwe layout en tokens, inhoud niet herschrijven. `accountancy/veiligexcel` niet aanpassen en nergens naar linken; noteer hem in de PR.
7. **Controle.**
   - Zoek in `src/` op de verboden woorden onderaan `homepage-copy.md` en op `wij`, `ons ` en `onze` in zichtbare tekst.
   - Geen hex-codes buiten `brand.css`.
   - Lighthouse op homepage en één case, geen console-fouten.
   - Links naar cal.com en wa.me werken.
   - Een nieuwe OG-afbeelding in de nieuwe stijl, of noteer dat hij nog moet.

**Klaar is:** een draft-PR met een korte samenvatting voor Christian: wat er staat, wat bewust is blijven liggen, en de open vragen.
