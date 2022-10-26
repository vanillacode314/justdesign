export type ComponentType = 'button' | 'input' | 'textarea'
export type Framework = 'vanillajs' | 'svelte' | 'solidjs' | 'webcomponent'
export type StyleProcessor = 'vanillacss' | 'tailwindcss' | 'scss' | 'less'
export type DesignSystem = 'materialui' | 'bootstrap'

export type IComponentMetadata = {
  framework: Framework
  type: ComponentType
  tags: string[]
} & Exclusive<
  {
    styled: true
    designName?: DesignSystem
    processor?: StyleProcessor
  },
  {
    styled: false
  }
>
