import { hasPlaceholder } from '../../lib/content'

/** Renders text; any "[ADD ...]" parts are shown as a clearly marked placeholder so they can't ship unnoticed. */
export function Text({ children }: { children: string }) {
  if (!hasPlaceholder(children)) return <>{children}</>
  const parts = children.split(/(\[ADD[^\]]*\])/g)
  return (
    <>
      {parts.map((p, i) =>
        /^\[ADD/.test(p) ? <Placeholder key={i} text={p} /> : <span key={i}>{p}</span>,
      )}
    </>
  )
}

export function Placeholder({ text }: { text: string }) {
  return (
    <span
      className="inline-block max-w-full rounded border border-dashed border-focus bg-focus-soft px-1.5 py-px align-baseline text-[0.8125rem] font-medium text-focus"
      title="Placeholder — replace in src/data before publishing"
    >
      {text.replace(/^\[|\]$/g, '')}
    </span>
  )
}
