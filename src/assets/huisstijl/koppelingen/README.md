# Koppelingen — logo's voor de strook "Werkt met wat je al gebruikt"

Eén kleur: alle vullingen staan op `currentColor`, zodat de kleur uit de site komt (`var(--fg-2)`, gedimd). Breedte en hoogte zijn uit de bestanden gehaald; alleen de `viewBox` staat erin. Opgehaald op 16 okt 2026.

| Bestand | Merk | Bron | Bewerking |
|---|---|---|---|
| `gmail.svg` | Gmail | Simple Icons (npm `simple-icons`, icoon `gmail`) | Titel weg, `fill="currentColor"` |
| `google-agenda.svg` | Google Agenda | Simple Icons (`googlecalendar`) | Idem |
| `whatsapp.svg` | WhatsApp | Simple Icons (`whatsapp`) | Idem |
| `hubspot.svg` | HubSpot | Simple Icons (`hubspot`) | Idem |
| `moneybird.svg` | Moneybird | moneybird.nl, `/assets/images/moneybird-logo-full-blue.svg` | Blauw naar `currentColor`, `viewBox` toegevoegd (was alleen width/height) |
| `e-boekhouden.svg` | e-Boekhouden | cdn.e-boekhouden.nl, `/branding/eb-logo-full-white.svg` | Wit naar `currentColor`; in het beeldmerk de achterste cirkel op 45% dekking en de "e" uitgespaard in `var(--bg)` |
| `exact-online.svg` | Exact Online | exact.com/nl, inline logo in de paginakop (`svg.exact__logo`) | `fill="currentColor"` |

**Geen nette SVG, op de site als naam in Geist Mono:**

- **Outlook** en **Excel**: Microsoft heeft zijn logo's uit Simple Icons laten halen, en de officiële Microsoft 365-iconen zijn meerkleurig; een eenkleurige versie mag volgens de merkrichtlijnen niet.
- **Mollie**: geen pers- of merkpagina met een downloadbaar logo gevonden; alleen logosites van derden.

Komt er een officiële SVG bij, zet hem hier met dezelfde bewerking en voeg hem toe in `src/components/brand/Koppelingen.astro`.
