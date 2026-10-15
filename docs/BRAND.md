# Liebenberg AI — Brand Guidelines

De visuele en verbale identiteit van Liebenberg AI: **rustig vakwerk**. Alles wat we bouwen volgt deze gids, zodat elke pagina herkenbaar in dezelfde stijl blijft.

- **Visuele referentie:** open `docs/huisstijl-2026/stijlpagina.html` in een browser. Daar staat alles live: tokens, typografie, iconen, beweging, componenten, de homepage en een offertepagina.
- **Referentiecode:** `docs/huisstijl-2026/stijlpagina.css` en `stijlpagina-gedrag.js`. Bouw daaruit na, importeer ze niet direct.
- **Technische bron van waarheid na de bouw:** `src/styles/brand.css`. Verwijs in code altijd naar tokens (`var(--fg)`), nooit naar losse hex-codes.
- **Achtergrond en beslissingen** staan in de vault van Christian (`~/Developer/Second Brain/01 Bedrijf/Design-brief — huisstijl rustig vakwerk.md`). Lezen mag, schrijven niet.

> Deze gids vervangt de huisstijl van juli 2026 (crème papier, EB Garamond, oker accent, eyebrow met bolletje, pill-knoppen). Die look is de standaardesthetiek van AI-gebouwde sites en gaat eruit.

---

## 1. Principes

1. **Het logo is het enige ornament.** Serif en oker leven alleen in het woordmerk. De rest van de pagina heeft geen versiering nodig.
2. **Het product is het beeld, het schilderij is het podium.** Echte productschermen op een gedempte Hollandse lucht (Haagse School). Een schilderij staat nooit los: er ligt altijd een scherm of een knop op.
3. **Eén letter, twee stemmen.** Geist voor taal, Geist Mono voor cijfers, data en kleine labels.
4. **Hiërarchie komt uit grootte, grijs en raster.** Twaalf kolommen, alles links uitgelijnd, haarlijnen tussen secties. Kleur alleen voor status.
5. **Eén claim per scherm, één actie.** De enige knop die telt is "Plan een kennismaking".

Elke keuze is terug te voeren op een ontwerper: Rams (zo weinig mogelijk ontwerp), Vignelli (weinig lettertypes), Müller-Brockmann (raster), Tschichold (asymmetrisch, links), Bringhurst (regellengte, schaal), Tufte (alleen inkt die data draagt), Otl Aicher (iconen uit één systeem), Kenya Hara (leegte met textuur), Paul Rand (logo als handtekening).

---

## 2. Kleur

| Token | Hex | Gebruik |
|---|---|---|
| `--bg` | `#F7F7F4` | Achtergrond, warm neutraal grijs. Geen crème. |
| `--surface` | `#EFEEE9` | Vlakken, hover-vlak, geselecteerde rij |
| `--raised` | `#FFFFFF` | Productframes, invoervelden |
| `--line` | `#E4E3DD` | Haarlijnen |
| `--line-strong` | `#D2D0C8` | Randen van knoppen, velden, frames |
| `--muted` | `#73776F` | Labels, bijschriften |
| `--fg-2` | `#4A5357` | Lopende tekst |
| `--fg` | `#1E272B` | Koppen, tekst |
| `--brand` | `#233138` | Ink, de merkkleur: primaire knoppen en het logo |
| `--on-brand` | `#F4F5F2` | Tekst op ink |
| `--ochre` | `#BF6A34` | **Alleen in het logo** (de superscript AI) |
| `--ok` / `--ok-bg` | `#2F7D5B` / `#E5F0EA` | Status: klaar, ingepland |
| `--warn` / `--warn-bg` | `#9A5F0C` / `#F8EEDB` | Status: wacht op jou |

- Alleen een licht thema op de site. Donkere waarden staan in de stijlpagina-CSS voor later.
- Geen gradients, geen accentkleur, geen gekleurde kaarten.

### Korrel

Fijne ruis over de hele pagina: `src/assets/huisstijl/grain.png` (tegel van 160px, zwarte en witte spikkels op 2 tot 5% dekking), als `position: fixed` laag met `pointer-events: none`. Je ziet hem pas als je ernaar zoekt. Vervangt `GrainOverlay` en `DynamicGradientBackground`.

### Schilderijen

Vier gedempte uitsneden uit het Rijksmuseum, in `src/assets/huisstijl/schilderijen/` (zie `CREDITS.md` daar). Gebruik als `background-size: cover` onder een productscherm of knop, radius 14.

| Bestand | Gebruik |
|---|---|
| `mesdag-kalme-zee.jpg` | Standaard achter productschermen. In de hero `background-position: center 12%`. |
| `mesdag-bomschuiten-voor-anker.jpg` | Warme lucht: cases, tweede productscherm |
| `roelofs-zeegezicht-bij-heijst.jpg` | Contactblok onderaan, één keer per pagina |
| `maris-strand-bij-avond.jpg` | Donker, spaarzaam |

Geen bergen of bossen in beeld (met een berglogo leest dat als Norde). Geen gegenereerde texturen of AI-landschappen.

---

## 3. Typografie

- **Geist** (`--font-sans`), gewichten 400 en 500. Koppen op 500.
- **Geist Mono** (`--font-mono`), gewicht 400. Cijfers, bedragen, ID's en labels, altijd `font-variant-numeric: tabular-nums`.
- Zelf hosten via npm: `@fontsource-variable/geist` en `@fontsource-variable/geist-mono` (of het `geist`-pakket). Geen Google Fonts meer.
- Het logo is het enige serif-element.

| Rol | Grootte / regelhoogte | Letterafstand |
|---|---|---|
| Display (hero) | 64–68 / 1.02 | −3.5% tot −3.8% |
| H1 | 44 / 1.06 | −3% |
| H2 | 28 / 1.15 | −2% |
| H3 | 20 / 1.3 | −1.2% |
| Lead | 19 / 1.55 | |
| Body | 16 / 1.6, max 65 tekens per regel | |
| Small | 14 / 1.5 | |
| Label | Mono 12 / 1.4, kleine letters | +2% |
| Mono-cijfer | 30–40 / 1 | −3% |

Koppen krijgen `text-wrap: balance`. Labels nooit in hoofdletters en zonder bolletje ervoor.

---

## 4. Ruimte, raster en vorm

- Twaalf kolommen, goot 24px, spatiëring in stappen van 8. Inhoud maximaal ± 1120px breed, links uitgelijnd. Niets centreren behalve één knop op een schilderij.
- Secties gescheiden door een haarlijn en witruimte, niet door kaarten.
- Radii: `--r-1` 6px (knoppen, velden), `--r-2` 10px (panelen, foto's), `--r-3` 14px (schilderijvlakken).
- Eén zachte schaduw, alleen op productframes en de knop op een schilderij.

---

## 5. Componenten

| Component | Specificatie |
|---|---|
| Primaire knop | Ink, `--on-brand`, radius 6, hoogte 42 (klein: 34), Geist 500 15px, pijl in mono |
| Secundaire knop | Transparant, rand `--line-strong` |
| Tekstlink | Onderlijn `--line-strong`, pijl in mono |
| Navigatie | Logo links, Werk · Werkwijze · Over · Vragen, primaire knop rechts |
| Label | Mono 12, `--muted` |
| Cijferstrip | Vier cijfers in mono 30px, gescheiden door haarlijnen, label eronder |
| Case-regel | Lijst met haarlijnen: mono-label, titel 22px, één zin, pijl rechts |
| Citaat | 26px Geist 400, zonder kader of aanhalingsteken-ornament |
| Status | Klein vlak, radius 5, stip ervoor: ok (groen), warn (amber), neutraal |
| Productframe | Wit, rand `--line-strong`, radius 10, schaduw, op een schilderijvlak met padding 20–64px |
| Contactblok | Kop en tekst links, daaronder een brede band met het zeegezicht en één ink-knop in het midden |

### Feedback: alles wat klikbaar is, reageert (160 ms)

| Element | Hover | Indrukken |
|---|---|---|
| Primaire knop | Iets lichter (`color-mix(brand 90%, bg)`), zachte schaduw eronder, pijl 3px naar rechts | 1px omlaag en `scale(.985)` |
| Secundaire knop | Vlak `--surface`, donkerdere rand | Zelfde klik |
| Tekstlink | Volle onderstreping in `--fg`, pijl schuift op | |
| Case-regel | Zacht vlak `--surface`, pijl 4px naar rechts | |
| Navigatie | Tekst wordt `--fg` | |

Focus met het toetsenbord: ring van 2px in `--fg`, 3px los van het element.

### Iconen

Eigen set in `src/assets/huisstijl/icons/`: melding, lezen, maken, koppeling, controle, drempel, mens, planning, factuur, berglijn. Raster 24, lijn 1,5, ronde uiteinden en hoeken, geen vulling, `currentColor`. Alleen naast tekst, nooit als decoratie op een kaart. Geen Lucide of andere bibliotheek meer voor zichtbare iconen.

### Illustraties en motief

- Illustraties zijn processchema's in dezelfde lijnstijl, met echte stappen (bijvoorbeeld: melding binnen → systeem leest → zekerheid ≥ 85%? → ingepland / naar jou).
- De berglijn uit het logo is een tijdreeks. Gebruik hem alleen als echte grafiek met data, nooit als versiering.

---

## 6. Beweging

1. **De pagina staat stil.** Geen scroll-reveals, geen parallax, geen inzoomende foto's, geen tellers. Alles is zichtbaar bij het laden.
2. **Het product beweegt.** Eén productloop van 10 seconden in de hero (zie `stijlpagina-gedrag.js`): nieuwe melding verschijnt (Nieuw), systeem leest foto 1 en 2 (Leest, pulserende stip), meter vult in 2,2 s tot 64% en stopt vóór de drempel van 85%, status wordt Naar jou, reden en knoppen verschijnen, paneel dimt, opnieuw. Start meteen, met een pauzeknop.
3. **Cijfers staan er meteen.** Optellen vanaf 0 laat zoekmachines en previews "0+" lezen.
4. **Data mag zich tekenen.** Een grafiek met echte data bouwt zich één keer op als hij in beeld komt.
5. **Reacties zijn kort.** `--dur-1` 160 ms (hover, focus), `--dur-2` 280 ms (statuswissels), `--dur-3` 2200 ms (meters, grafieken). Eén curve: `--ease: cubic-bezier(.2,.7,.2,1)`.

Met `prefers-reduced-motion: reduce` staat alles stil en toont de productloop zijn eindtoestand.

---

## 7. Fotografie

Echte mensen, echte plekken, daglicht. Gebruik het portret (`src/assets/LiebenbergAI_portrait_Christian.jpeg`) in de sectie Over en de kantoorfoto met het logo op de muur (`src/assets/LAI_kantoor.jpg`) bij werkwijze of contact. Geen AI-gegenereerde foto's van mensen. Geen stockfoto's.

---

## 8. Stem (Nederlands)

- **Ik-vorm** voor het bedrijf, **je/jij** naar de lezer. Klantcitaten blijven zoals ze zijn.
- **Omvang-regel:** verzin nooit een team ("ons team", "onze engineers"), maar zeg ook nergens dat het één persoon is ("solo", "in mijn eentje", "eenmanszaak").
- **Concrete woorden uit de wereld van de klant:** melding, aanvraag, werkbon, planning, offerte, WhatsApp, magazijn, busje. Geen systeemtaal ("ongestructureerde input", "redeneerstap", "end-to-end").
- **Open op capaciteit en groei, niet op uren besparen.** "Meer klussen aannemen zonder er iemand bij te zetten."
- **Bewijs boven belofte:** echte cijfers (3.500+ accounts, 35.000+ meldingen, #1 organisch op de kernzoekterm), echte cases.
- **Geen prijzen** op de site: geen bedragen, geen "vanaf", geen bandbreedtes. Wel hoe de prijs tot stand komt (vaste prijs per fase, vooraf bekend).

**Woorden**

| Wel | Niet |
|---|---|
| automatiseren, bouwen, afmaken, blijven | AI-transformatie, AI-training, AI-workshop |
| "wat het systeem níét zelf beslist" | "volledig autonoom", "agent die alles doet" |
| uren, stappen, het proces van de klant | "revolutionair", "game-changer", "naadloos", "ontzorgen", "slim", "next level" |

**AI-patronen die eruit moeten:** "niet X, maar Y", rijtjes van drie als stijlmiddel, gedachtestreepjes als aside, zinnen over de tekst zelf ("geen catalogus van buzzwords"), steken naar andere bureaus, dubbele punt gevolgd door een onthulling.

### Grens met de voorwaarden

De copy noemt geen voorwaarden, maar mag ze niet tegenspreken.

| Mag | Mag niet |
|---|---|
| Je data blijft van jou, altijd te exporteren | "Het is van jou" zonder uitleg, "je wordt eigenaar", "de IP is van jou" |
| De software draait op jouw naam (hosting, database, domein) | Beloftes over broncode of gebruiksrecht bij producten of abonnementen |
| Een ander mag het overnemen of onderhouden | Bedragen of bandbreedtes |

---

## 9. Vaste bestemmingen

Nooit hardcoden buiten deze waarden om.

- Plan een kennismaking → `https://cal.com/christianliebenberg`
- WhatsApp → `https://wa.me/31637220535` (alleen in de footer en het contactblok, geen zwevende knop)
- E-mail → `info@liebenberg.ai` · Telefoon → `+31 6 37220535`
- LinkedIn → `https://linkedin.com/in/christian-liebenberg-a0511060`

---

## 10. Toepassen in code

1. Alle pagina's gebruiken `src/layouts/BrandLayout.astro`, die `src/styles/brand.css` laadt. Daar staan de tokens.
2. Gebruik overal `var(--token)`. Nieuwe kleuren eerst hier en in `brand.css` vastleggen.
3. Componenten hergebruiken, niet per pagina opnieuw stylen.
4. Nieuwe pagina's erven de stijl via de layout en de componenten.
