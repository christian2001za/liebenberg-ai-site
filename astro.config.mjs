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
  integrations: [
    react(),
    tailwind(),
    sitemap({
      // De case studies zijn statische HTML in /public en zijn dus geen Astro-routes;
      // we voegen ze hier expliciet toe zodat ze in de sitemap komen.
      customPages: [
        "https://www.liebenberg.ai/case-study/meldpunt-aziatische-hoornaar.html",
        "https://www.liebenberg.ai/case-study/imotion-lab-erp.html",
      ],
      // Sluit losse scratch-bestanden en de 404 uit.
      filter: (page) =>
        !page.includes("/case-study/EML-casestudy/") &&
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
