import { aiIntro, aiPath, handsOn, learning, production } from '../../data/ai'
import type { Evidence } from '../../data/types'
import { EvidenceTag } from '../ui/Evidence'
import { Section } from '../ui/Section'

const stepStyle: Record<Evidence, string> = {
  production: 'border-accent/50 bg-accent-soft',
  'hands-on': 'border-handson/50 bg-handson-soft',
  learning: 'border-dashed border-focus bg-focus-soft',
}

export function AIPlatform() {
  return (
    <Section
      id="ai-ml"
      title="From data engineering to AI/ML platform engineering"
      tone="sunken"
      intro={<p>{aiIntro}</p>}
    >
      <ol className="grid gap-2 sm:grid-cols-2 lg:grid-cols-7 lg:gap-0" aria-label="Path from data engineering to AI applications">
        {aiPath.map((s, i) => (
          <li key={s.step} className="relative lg:pr-3">
            <div className={`flex h-full flex-col justify-between gap-3 rounded-lg border p-3.5 ${stepStyle[s.evidence]}`}>
              <span className="font-mono text-[0.75rem] text-muted" aria-hidden>
                {String(i + 1).padStart(2, '0')}
              </span>
              <span className="text-[0.9375rem] font-medium leading-snug">{s.step}</span>
              <span className="sr-only">({s.evidence})</span>
            </div>
          </li>
        ))}
      </ol>
      <div className="mt-4 flex flex-wrap gap-2 text-[0.8125rem]" aria-hidden>
        <EvidenceTag evidence="production" />
        <EvidenceTag evidence="hands-on" />
        <EvidenceTag evidence="learning" />
      </div>

      <div className="mt-12 grid gap-10 md:grid-cols-3">
        <Column evidence="production" items={production} />
        <Column evidence="hands-on" items={handsOn} />
        <Column evidence="learning" items={learning} />
      </div>
    </Section>
  )
}

function Column({ evidence, items }: { evidence: Evidence; items: string[] }) {
  const bullet = { production: 'bg-accent', 'hands-on': 'bg-handson', learning: 'border border-dashed border-focus' }[evidence]
  return (
    <div>
      <h3>
        <EvidenceTag evidence={evidence} />
      </h3>
      <ul className="mt-4 space-y-3 text-[0.9687rem] leading-relaxed">
        {items.map((x) => (
          <li key={x} className="flex gap-3">
            <span aria-hidden className={`mt-[0.55em] h-2 w-2 shrink-0 rounded-full ${bullet}`} />
            {x}
          </li>
        ))}
      </ul>
    </div>
  )
}
