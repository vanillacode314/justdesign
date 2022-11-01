import {
  Component,
  createEffect,
  createSignal,
  JSXElement,
  Show,
} from 'solid-js'

type Props = {
  title: string
  onChange?: (open: boolean) => void
  children: JSXElement
}

export const Accordion: Component<Props> = (props) => {
  const [open, setOpen] = createSignal<boolean>(false)
  createEffect(() => props.onChange?.(open()))
  return (
    <div class="flex flex-col gap-1">
      <button
        class="flex justify-between items-center bg-gray-200 px-3 py-2 rounded uppercase text-sm font-semibold tracking-wide text-gray-600 border-none outline-none"
        onClick={() => setOpen((_) => !_)}
      >
        <span>{props.title}</span>
        <span class={open() ? 'i-mdi-expand-less' : 'i-mdi-expand-more'}></span>
      </button>
      <Show when={open()}>
        <div class="bg-gray-200 px-3 py-2 rounded">{props.children}</div>
      </Show>
    </div>
  )
}

export default Accordion
