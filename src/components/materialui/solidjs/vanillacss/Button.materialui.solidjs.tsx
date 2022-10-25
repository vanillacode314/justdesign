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

/* :START: */
interface Props extends JSX.HTMLAttributes<HTMLButtonElement> {
  href?: string
  outlined?: boolean
}

export const Button: Component<Props> = (props) => {
  const [local, others] = splitProps(props, [
    'href',
    'children',
    'ref',
    'class',
    'outlined',
  ])

  const _class = () =>
    local.class ? styles.btn + ' ' + local.class : styles.btn

  return (
    <Dynamic
      ref={local.ref}
      component={local.href ? 'a' : 'button'}
      href={local.href}
      class={_class()}
      classList={{ [styles.outlined]: local.outlined }}
      {...others}
    >
      {local.children}
    </Dynamic>
  )
}
/* :END: */

export const Examples: Component[] = [
  () => <Button>Click Me!</Button>,
  () => <Button outlined>Click Me!</Button>,
]

export default Button
