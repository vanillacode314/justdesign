import {
  JSX,
  Component,
  splitProps,
  JSXElement,
  createSignal,
  Show,
  createEffect,
} from 'solid-js'

type Props = {
  text: string
  onCopy?: () => void
  successFallback?: JSXElement
} & JSX.HTMLAttributes<HTMLButtonElement>

export const CopyBtn: Component<Props> = (props) => {
  const [local, others] = splitProps(props, [
    'text',
    'children',
    'onCopy',
    'successFallback',
  ])
  const [success, setSuccess] = createSignal<boolean>(false)
  let timer: any

  return (
    <button
      class="bg-transparent outline-none border-none font-mono"
      onClick={() => {
        navigator.clipboard.writeText(props.text).then(() => {
          clearTimeout(timer)
          setSuccess(true)
          timer = setTimeout(() => setSuccess(false), 5 * 1000)
          local.onCopy?.()
        })
      }}
      {...others}
    >
      <Show
        when={!success()}
        fallback={local.successFallback || local.children}
      >
        {local.children}
      </Show>
    </button>
  )
}

export default CopyBtn
