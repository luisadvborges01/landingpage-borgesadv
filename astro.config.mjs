// @ts-check
import { defineConfig } from 'astro/config';
import { copyFile } from 'node:fs/promises';
import sitemap from '@astrojs/sitemap';

import react from '@astrojs/react';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://borgesprev.com.br',
  integrations: [
    react(),
    sitemap({
      // Only reviewed, indexable pages. NFC cards must stay excluded.
      filter: (page) => ['/', '/planejamento-previdenciario/'].includes(new URL(page).pathname),
    }),
    {
      name: 'sitemap-public-url',
      hooks: {
        // Keep the official generated index (including all chunks) at the requested URL.
        'astro:build:done': async ({ dir }) => {
          await copyFile(new URL('sitemap-index.xml', dir), new URL('sitemap.xml', dir));
        },
      },
    },
  ],

  vite: {
    plugins: [tailwindcss()]
  }
});
