import { defineConfig } from 'astro/config'
import Unocss from '@unocss/vite'
import {
  transformerCompileClass,
  presetWebFonts,
  presetUno,
  presetIcons,
} from 'unocss'
import solidJs from '@astrojs/solid-js'

// https://astro.build/config
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
    transformers: [transformerCompileClass()],
  },
  integrations: [solidJs(), svelte(), react(), preact(), vue()],
})
