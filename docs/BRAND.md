# Liebenberg AI — Brand Guidelines

De visuele en verbale identiteit van Liebenberg AI. Alles wat we bouwen volgt deze
gids, zodat elke pagina herkenbaar in dezelfde stijl blijft.

De technische bron van waarheid is [`src/styles/brand.css`](../src/styles/brand.css):
daar staan alle waarden hieronder als CSS-variabelen. Verwijs in code **altijd** naar
die tokens (`var(--ink)`), nooit naar losse hex-codes.

---

## 1. Merkkarakter

Rustig, wiskundig onderbouwd, betrouwbaar. Geen hype, geen buzzwords. We bewijzen
in plaats van te beloven. De uitstraling is die van een redactioneel, "papieren"
document: warm, serieus, met ruimte om te ademen.

Drie woorden: **onderbouwd · helder · warm.**

---

## 2. Kleuren

| Token | Hex | Gebruik |
|---|---|---|
| `--ink` | `#233138` | Primaire donkere kleur: tekst, donkere secties, primaire knoppen |
| `--ink-2` | `#2c3a42` | Hover op donkere knoppen |
| `--paper` | `#f4efe6` | Achtergrond van de site (warm crème) |
| `--card` | `#fbf8f2` | Kaarten / lichtere vlakken op paper |
| `--canvas` | `#e7e1d4` | Diepere crème vlakken |
| `--soft` | `#5d666c` | Gedempte bodytekst, bijschriften |
| `--line` | `#e2dacb` | Haarlijntjes / borders op paper |
| `--ochre` | `#bf6a34` | Accent: links, eyebrows, accent-knoppen, highlights |
| `--ochre-deep` | `#a85b2b` | Hover op ochre |
| `--ochre-light` | `#e0a06a` | Accent op donkere (ink) achtergronden |
| `--wa-green` | `#22a45a` | Uitsluitend WhatsApp-knoppen |

**Regels**
- Ochre is een **accent**, geen vlakvuller. Gebruik het spaarzaam: één à twee
  accenten per scherm-sectie.
- Op `--ink` achtergronden gebruik je `--ochre-light` (niet `--ochre`) voor leesbaarheid.
- Wit (`#fff`) alleen voor knop-tekst en heel subtiele highlights; de "witte" vlakken
  van de site zijn altijd `--paper` of `--card`.

---

## 3. Typografie

Twee fonts, strak gescheiden in rol.

- **EB Garamond** (`--font-serif`) — koppen, citaten, grote cijfers, eyebrow-italics.
  Gewichten 400/500/600, plus italic. Letterspacing op grote koppen: `-0.01em`.
- **Figtree** (`--font-sans`) — alle bodytekst, navigatie, knoppen, labels, UI.
  Gewichten 400/500/600/700.

**Patronen**
- `eyebrow`: Figtree, 13px, `letter-spacing: .18em`, uppercase, kleur `--ochre`,
  met een klein gevuld ochre-bolletje ervoor.
- Koppen mogen één woord *cursief* (EB Garamond italic) hebben als nadruk, vaak
  gevolgd door een ochre punt: *Meer resultaat<span class="ac-dot">.</span>*
- Bodytekst: 16–18px, `line-height: 1.5–1.6`, kleur `--ink` of `--soft`.

Laad de fonts via Google Fonts:
`EB+Garamond:ital,wght@0,400;0,500;0,600;1,400;1,500;1,600` en
`Figtree:wght@400;500;600;700`.

---

## 4. Knoppen

Allemaal pill-vormig (`--r-pill`), Figtree 600, ~15.5px, met soepele `.16s` transitie.
Pijl-icoontjes schuiven `3px` naar rechts op hover.

| Variant | Achtergrond | Tekst | Gebruik |
|---|---|---|---|
| `btn-ink` | `--ink` | `--paper` | Primaire actie (Plan kennismaking) |
| `btn-ghost` | transparant, border `--ink` | `--ink` | Secundaire actie |
| `btn-paper` | `--paper`/`#fff` | `--ink` | Primaire actie óp donkere secties |
| `btn-ochre` | `--ochre` | `#fff` | Accent-CTA (belafspraak) |
| WhatsApp | `--wa-green` | `#fff` | Uitsluitend WhatsApp |

**Vaste link-bestemmingen** (nooit hardcoden buiten deze waarden om):
- Plan kennismaking / belafspraak → `https://cal.com/christianliebenberg`
- WhatsApp ("Stuur een appje" + zwevende knop) → `https://wa.me/31637220535`
- E-mail → `info@liebenberg.ai` · Telefoon → `+31 6 37220535`
- LinkedIn → `https://linkedin.com/in/christian-liebenberg-a0511060`

---

## 5. Layout & ruimte

- Max. inhoudsbreedte: `--maxw` (1180px), gecentreerd, padding 32px.
- Secties: royale verticale ruimte (`clamp(78px, 11vh, 140px)`).
- Donkere secties (`--ink`) wisselen af met paper-secties voor ritme.
- Radii: kaarten `--r-md`/`--r-lg`, knoppen `--r-pill`, kleine elementen `--r-sm`.
- Schaduwen zijn zacht en laag-contrast (zie `--shadow-*` tokens).
- Korrel-overlay (grain) en zachte gradient-glows geven warmte en diepte; subtiel houden.

---

## 6. Iconografie & logo

- Logo: het "berglijn"-mark in `--ink` op paper, of in `--paper` op ink (inverted).
  Assets staan in `public/` en `src/assets/`.
- Iconen: dunne lijn-iconen (`stroke-width` ~2), `currentColor`, klein (15–16px in knoppen).
- Het favicon/mark is de berglijn met afgeronde hoek-achtergrond.

---

## 7. Tone of voice (Nederlands)

- Direct, zakelijk, zonder jargon. Korte zinnen.
- Bewijs > belofte: noem concrete cijfers en live resultaten.
- "Wij" voor het bedrijf, "je/jij" naar de lezer (informeel-professioneel).
- Vermijd AI-hype-woorden. Leg uit wat iets oplevert, niet hoe geavanceerd het is.
- Een ochre punt of één cursief woord mag als subtiele nadruk; niet overdrijven.

---

## 8. Toepassen in code

1. Importeer `src/styles/brand.css` (via de layout) zodat de tokens beschikbaar zijn.
2. Gebruik `var(--token)` overal; voeg geen nieuwe hex-codes toe zonder ze hier én in
   `brand.css` vast te leggen.
3. Pagina-specifieke CSS (bv. `landing.css`) bouwt bovenop deze tokens.
4. Nieuwe pagina's erven automatisch de juiste stijl mits ze de tokens gebruiken.
