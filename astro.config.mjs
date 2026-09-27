// @ts-check
import { defineConfig, fontProviders } from "astro/config";

import netlify from "@astrojs/netlify";

import react from "@astrojs/react";

import icon from "astro-icon";

import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  site: "https://truecarercm360solutions.com",
  i18n: {
    locales: ["en", "es"],
    defaultLocale: "en",
    routing: {
      prefixDefaultLocale: false,
    },
  },
  fonts: [
    {
      provider: fontProviders.fontsource(),
      name: "Noto Sans",
      cssVariable: "--font-noto-sans",
    },
    {
      provider: fontProviders.fontsource(),
      name: "Noto Serif",
      cssVariable: "--font-noto-serif",
    },
  ],

  adapter: netlify(),
  integrations: [
    react(),
    icon({
      include: { gg: ["menu"] },
    }),
    sitemap(),
  ],
});
