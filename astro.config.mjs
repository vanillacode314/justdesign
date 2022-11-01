import { defineConfig } from 'astro/config'
import Unocss from '@unocss/vite'
import {
  presetWebFonts,
  presetUno,
  presetIcons,
  transformerDirectives,
} from 'unocss'
import solidJs from '@astrojs/solid-js'
import svelte from '@astrojs/svelte'
import react from '@astrojs/react'
import preact from '@astrojs/preact'
import vue from '@astrojs/vue'

// https://astro.build/config
export default defineConfig({
  ssr: true,
  vite: {
    plugins: [
      Unocss({
        transformCSS: true,
        transformers: [transformerDirectives()],
        presets: [
          presetWebFonts({
            provider: 'google',
            fonts: {
              sans: ['Roboto:400,500,600,700'],
              mono: ['JetBrains Mono:400,500,600,700'],
            },
          }),
          presetUno(),
          presetIcons({
            extraProperties: {
              display: 'inline-block',
              'vertical-align': 'middle',
            },
          }),
        ],
      }),
    ],
  },
  integrations: [solidJs(), svelte(), react(), preact(), vue()],
})
