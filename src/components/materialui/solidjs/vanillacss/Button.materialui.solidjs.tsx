import styles from './Button.materialui.solidjs.module.css'
import { JSX, Component, splitProps, createSignal } from 'solid-js'
import { Dynamic } from 'solid-js/web'
import type { IComponentMetadata } from '@/types'

export const METADATA: IComponentMetadata = {
  framework: 'solidjs',
  type: 'button',
  designSystem: 'materialui',
  styleProcessor: 'vanillacss',
  styled: true,
  typescript: true,
  tags: [],
}

/* TYPES: Xor */
/* :START: */
type Props = {
  href?: string
} & Xor<{ outlined?: true }, { text?: true }> &
  JSX.HTMLAttributes<HTMLButtonElement>

export const Button: Component<Props> = (props) => {
  const [local, others] = splitProps(props, [
    'href',
    'children',
    'ref',
    'class',
    'outlined',
    'text',
  ])

  const _class = () =>
    local.class ? styles.btn + ' ' + local.class : styles.btn

  return (
    <Dynamic
      ref={local.ref}
      component={local.href ? 'a' : 'button'}
      href={local.href}
      class={_class()}
      classList={{
        [styles.outlined]: !!local.outlined,
        [styles.text]: !!local.text,
      }}
      {...others}
    >
      {local.children}
    </Dynamic>
  )
}
/* :END: */

export const Example: Component = () => {
  const [count, setCount] = createSignal<number>(0)
  return (
    <div class="p-5 flex flex-wrap gap-3">
      <Button onClick={() => setCount((c) => c + 1)}>
        Click Me! {count()}
      </Button>
      <Button href="#home">I am a Link</Button>
      <Button outlined>Outlined</Button>
      <Button text>Text</Button>
    </div>
  )
}

export default Button
