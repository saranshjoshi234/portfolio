import { metrics } from '../../data/metrics'
import { isPlaceholder } from '../../lib/content'
import { Placeholder } from '../ui/Placeholder'

export function Impact() {
  return (
    <section aria-labelledby="impact-title" className="mx-auto max-w-[1120px] px-5 pt-16 sm:px-8 sm:pt-20">
      <h2 id="impact-title" className="text-[0.9375rem] font-medium text-muted">
        Impact, in documented numbers
      </h2>
      <dl className="mt-5 grid grid-cols-2 gap-x-6 border-t border-rule lg:grid-cols-3">
        {metrics.map((m) => (
          <div key={m.label} className="min-w-0 border-b border-rule py-6 sm:pr-8">
            <dt className="sr-only">{m.label}</dt>
            <dd>
              <div className="min-h-[2.5rem] text-[1.875rem] sm:min-h-[2.75rem] sm:text-[2.25rem] font-medium leading-none tracking-tight">
                {isPlaceholder(m.value) ? <Placeholder text={m.value} /> : m.value}
              </div>
              <div className="mt-2 font-medium">{m.label}</div>
              <div className="mt-0.5 text-[0.875rem] text-muted">{m.source}</div>
            </dd>
          </div>
        ))}
      </dl>
    </section>
  )
}
