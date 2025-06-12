// @ts-check
import { defineConfig } from 'astro/config';

import react from '@astrojs/react';

import vercel from '@astrojs/vercel/serverless';

import tailwindcss from '@tailwindcss/vite';

import icon from 'astro-icon';

// https://astro.build/config
export default defineConfig({
  integrations: [react(), icon()],
  output: 'server',
  adapter: vercel(
    {
      webAnalytics: {
        enabled: true,
      },
    }
  ),

  vite: {
    plugins: [tailwindcss()]
  }
});