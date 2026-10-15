import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";
import sitemap from "@astrojs/sitemap";
import vercel from "@astrojs/vercel";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
  site: "https://www.liebenberg.ai",
  output: "static",
  adapter: vercel(),
  // De case studies waren losse HTML-bestanden; de oude URL's blijven werken via een 301.
  redirects: {
    "/case-study/meldpunt-aziatische-hoornaar.html": { status: 301, destination: "/case-study/meldpunt-aziatische-hoornaar/" },
    "/case-study/ai-sales-evenementenbranche.html": { status: 301, destination: "/case-study/ai-sales-evenementenbranche/" },
    "/case-study/imotion-lab-erp.html": { status: 301, destination: "/case-study/imotion-lab-erp/" },
  },
  integrations: [
    react(),
    tailwind(),
    sitemap({
      // De case studies zijn nu Astro-pagina's en komen vanzelf in de sitemap.
      // Sluit de oude .html-redirects, losse scratch-bestanden, de 404 en de verborgen pagina('s) uit.
      filter: (page) =>
        !page.endsWith(".html") &&
        !page.includes("/case-study/EML-casestudy/") &&
        !page.includes("/accountancy/veiligexcel") &&
        !page.endsWith("/404"),
    }),
  ],
  vite: {
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
  },
});
