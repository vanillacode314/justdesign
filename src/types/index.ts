export type ComponentType = 'button' | 'input' | 'textarea'
export type Framework =
  | 'vanillajs'
  | 'svelte'
  | 'solidjs'
  | 'webcomponent'
  | 'vue'
  | 'svelte'
export type StyleProcessor = 'vanillacss' | 'tailwindcss' | 'scss' | 'less'
export type DesignSystem = 'materialui' | 'bootstrap'

export type IComponentMetadata = {
  framework: Framework
  type: ComponentType
  tags: string[]
  typescript: boolean
} & Xor<
  {
    styled: true
    designSystem: DesignSystem
    styleProcessor: StyleProcessor
  },
  {
    styled: false
  }
>
