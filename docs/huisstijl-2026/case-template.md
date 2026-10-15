# Case-template (okt 2026)

Eén Astro-layout voor alle case studies, zodat elke case dezelfde opbouw en stijl heeft. Vervangt de losse HTML-bestanden in `public/case-study/`, die elk hun eigen fonts, kleuren en CSS hebben.

Stijl en stem: `docs/BRAND.md`. Visuele referentie voor de onderdelen: `docs/huisstijl-2026/stijlpagina.html` (secties Componenten, Iconen en motief, Homepage).

## Opbouw

Niet elke case heeft elke sectie nodig. De volgorde staat vast.

| # | Sectie | Inhoud |
|---|---|---|
| 1 | **Kop** | Gravure van de case als embleem (`src/assets/huisstijl/gravures/`, ± 160 px, links naast of boven de titel; ontbreekt hij nog, dan weglaten). Mono-label (`Platform · Bestrijding · Live` of `· In ontwikkeling, oplevering Q4 2026`), H1 van één zin, één zin eronder over de klant en wat er nu draait. Knop "Plan een kennismaking". |
| 2 | **Productbeeld** | Echte screenshot of video van het product, in een productframe op een schilderijvlak (`mesdag-bomschuiten-voor-anker.jpg` of `mesdag-kalme-zee.jpg`). Bij een case in ontwikkeling: de demo of een schets. Video's muted, met controls, geen autoplay met geluid. |
| 3 | **Cijfers** | Cijferstrip in mono, alleen echte en actuele cijfers. Weglaten als er nog geen zijn. |
| 4 | **Hoe het was** | Twee of drie korte alinea's: hoe het werk liep, waar het vastzat, wat dat de eigenaar kostte aan groei. In de woorden van de klant. |
| 4b | **Stilleven** | Tussenbeeld uit `src/assets/huisstijl/stillevens/` (`<case>-stilleven.jpg`), volle breedte of in het raster, radius 10. Alleen als het bestand bestaat. Sfeerbeeld, geen bewijs. |
| 5 | **Wat ik bouwde** | Lijst met haarlijnen (geen kaarten), elk item met een icoon uit de eigen set, een korte titel en één of twee zinnen. |
| 6 | **Hoe het werkt** | Processchema in de lijnstijl: de echte stappen, met de plek waar een mens beslist. |
| 7 | **Wat het systeem zelf doet en wat het aan jou laat** | Kort blok. Dit is het verhaal van het merk; elke case laat het concreet zien. |
| 8 | **Citaat** | Klantcitaat, groot, zonder kader. Alleen een echt citaat met naam en functie. |
| 9 | **Contact** | Hetzelfde contactblok als de homepage (kop links, zeegezicht met knop). |

## Regels

- **Ik-vorm** en de rest van de stem uit `docs/BRAND.md` §8. Geen "wij", "ons" of "onze".
- **Cijfers kloppen overal hetzelfde.** Hoornaar: 3.500+ accounts, 35.000+ meldingen, #1 organisch op de kernzoekterm, aangeraden in Google's AI Overview (stand oktober 2026). Op de huidige Hoornaar-casepagina staat nog "#2": dat wordt #1.
- **Geen verzonnen details.** Feiten komen uit de bestaande casepagina's en de vault-notities (alleen lezen):
  - Hoornaar: `~/Developer/Second Brain/04 Projecten/Hoornaar Platform.md`
  - Evenementen (Karafan): `~/Developer/Second Brain/02 Mensen & Bedrijven/Bedrijven/Juuls Karafan.md` en `~/Developer/Second Brain/04 Projecten/Juuls Karafan — Voorstel v4 (3 sep, volledige scope).md`, plus `public/case-study/ai-sales-evenementenbranche.html`. Let op: prijzen en voorstelbedragen uit die notities gaan niet de site op.
  - Eye Motion Lab: `public/case-study/imotion-lab-erp.html` en `public/case-study/EML-casestudy/`
  - Twijfel je of iets klopt of openbaar mag: weglaten en noteren in de PR.
- **Klantnamen:** alleen namen gebruiken die nu al op de site staan (Rob Voesten / NatuurlijkRob, Eye Motion Lab). De evenementenklant blijft "een verhuurbedrijf in de evenementenbranche".
- **Geen prijzen** en geen beloftes die de voorwaarden tegenspreken (`docs/BRAND.md` §8, Grens met de voorwaarden).
- **Beweging:** de pagina staat stil. Alleen product-video of een productloop beweegt.

## URL's

De huidige URL's blijven werken: `/case-study/meldpunt-aziatische-hoornaar.html`, `/case-study/imotion-lab-erp.html`, `/case-study/ai-sales-evenementenbranche.html`. Verandert een URL toch, dan een 301-redirect van de oude naar de nieuwe, en de sitemap in `astro.config.mjs` bijwerken. Interne links op de homepage meenemen.

## Volgorde van overzetten

1. Hoornaar (de uitgelichte case, het meeste bewijs)
2. Evenementenverhuur
3. Eye Motion Lab

De oude HTML-bestanden pas verwijderen als de nieuwe pagina staat en de redirects werken. De bronmap `public/case-study/EML-casestudy/` mag blijven staan zolang hij uit de sitemap blijft.
