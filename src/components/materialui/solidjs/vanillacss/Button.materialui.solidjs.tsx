import styles from './Button.materialui.solidjs.module.css'
import { JSX, Component, splitProps } from 'solid-js'
import { Dynamic } from 'solid-js/web'
import type { IComponentMetadata } from '@/types'

export const METADATA: IComponentMetadata = {
  type: 'button',
  designSystem: 'materialui',
  styled: true,
  tags: [],
}

/* TYPES: Exclusive */
/* :START: */
type Props = {
  href?: string
} & Exclusive<{ outlined?: true }, { text?: true }> &
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

export const Examples: Component[] = [
  () => <Button>Click Me!</Button>,
  () => <Button href="#home">I am a Link</Button>,
  () => <Button outlined={true}>Click Me!</Button>,
  () => <Button text={true}>Click Me!</Button>,
]

export default Button
