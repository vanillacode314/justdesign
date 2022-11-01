<script lang="ts">
import * as Ex from './Button.materialui.vue.example.vue'
export const Example = Ex.default
import type { IComponentMetadata } from '@/types'
export const METADATA: IComponentMetadata = {
  framework: 'vue',
  type: 'button',
  designSystem: 'materialui',
  styleProcessor: 'vanillacss',
  styled: true,
  typescript: true,
  tags: [],
}
</script>

<!-- :START: -->
<script setup lang="ts">
import { mergeProps } from 'vue'

type Props = {
  href?: string
  outlined?: true
  text?: true
}

const props = defineProps<Props>()

const merged = mergeProps(props, {
  class: { btn: true, outlined: props.outlined, text: props.text },
})
</script>

<template>
  <component :is="href ? 'a' : 'button'" v-bind="merged">
    <slot />
  </component>
</template>

<style>
.btn {
  --primary-color-rgb: 185 28 28;
  --primary-color: rgb(var(--primary-color-rgb));
  --bg-alpha: 1;
  --bg-color-rgb: var(--primary-color-rgb);
  --fg-color: white;
  --radius: 0.25rem;

  display: inline-block;
  padding: 0.5rem 1rem;
  background-color: rgb(var(--bg-color-rgb) / var(--bg-alpha));
  color: var(--fg-color);
  border-radius: var(--radius);
  transition-property: background-color;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
  font-weight: 600;
  font-size: 0.875rem;
  line-height: 1.25rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  border-style: none;
  outline: 2px solid transparent;
  outline-offset: 2px;
  text-decoration: none;
}

.btn.outlined {
  --border-color: #aaa;
  --fg-color: var(--primary-color);
  --bg-alpha: 0;

  border: 1px solid var(--border-color);
}

.btn.text {
  --fg-color: var(--primary-color);
  --bg-alpha: 0;
}

.btn.text:is(:hover, :focus) {
  --bg-alpha: 0.2;
}

.btn.outlined:is(:hover, :focus) {
  --bg-alpha: 0.2;
}

.btn:not(:is(.outlined, .text)):is(:hover, :focus) {
  --bg-color-rgb: 153 27 27;
}
</style>
<!-- :END: -->
