# Gearchiveerde tools (16 okt 2026)

De AI-scan (`/ai-scan`), de humanizer (`/tools/humanizer`) en het tools-overzicht (`/tools`) staan niet meer online. De code staat hier, in dezelfde mappenstructuur als in `src/`, zodat hij later terug kan.

Terugzetten: verplaats de bestanden onder `archief/tools/src/` weer naar `src/` (zelfde paden), zet de link "Tools" terug in `src/components/site/SiteFooter.astro` en controleer de privacyverklaring.

Wat erbij hoort:
- `src/pages/ai-scan.astro`, `src/pages/api/ai-scan/`, `src/lib/ai-scan/`, `src/components/tools/AiScanApp.tsx`: de AI-scan (Anthropic, opslag in Supabase).
- `src/pages/api/transcribe.ts`, `src/components/tools/useDictation.ts`: ingesproken antwoorden via Reson8.
- `src/pages/tools/`, `src/pages/api/humanize.ts`, `src/lib/humanizer-prompt.ts`, `src/components/tools/HumanizerApp.tsx`: de humanizer.

Deze map valt buiten `src/` en wordt dus niet gebouwd.
