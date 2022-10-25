import { Dynamic } from 'solid-js/web'
import { JSX, Component, splitProps } from 'solid-js'
import type { IComponentMetadata } from '@/src/types'

export const METADATA: IComponentMetadata = {
  framework: 'solidjs',
  tags: [],
  type: 'button',
  styled: false,
}

/* :START: */
interface Props extends JSX.HTMLAttributes<HTMLButtonElement> {
  href?: string
}

export const Button: Component<Props> = (props) => {
  const [local, others] = splitProps(props, ['href', 'children', 'ref'])

  return (
    <Dynamic
      ref={local.ref}
      component={local.href ? 'a' : 'button'}
      href={local.href}
      {...others}
    >
      {local.children}
    </Dynamic>
  )
}
/* :END: */

export const Examples: Component[] = [() => <Button>Click Me!</Button>]

export default Button
