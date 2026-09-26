import { useState } from 'react'
import { ArrowDown } from 'lucide-react'
import { flow, rails } from '../../data/architecture'
import type { ArchNode } from '../../data/types'
import { Section } from '../ui/Section'

const all = [...flow, ...rails]

export function Architecture() {
  const [selected, setSelected] = useState('bigquery')
  const node = all.find((n) => n.id === selected) ?? flow[0]
  const railSelected = rails.some((r) => r.id === selected)

  return (
    <Section
      id="architecture"
      title="The data platform pattern I build"
      tone="sunken"
      intro={
        <p>
          A reference architecture on Google Cloud, from source systems to AI/ML. Select any component to see what it
          does, the technology behind it and what I own there. Orchestration, CI/CD and monitoring run across every
          layer.
        </p>
      }
    >
      <div className="grid gap-8 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-7">
          {/* Mobile: cross-cutting concerns as a row */}
          <div className="mb-4 md:hidden">
            <p className="mb-2 text-[0.875rem] text-muted">Across the whole platform</p>
            <div className="grid grid-cols-3 gap-2">
              {rails.map((r) => (
                <button
                  key={r.id}
                  type="button"
                  aria-pressed={selected === r.id}
                  onClick={() => setSelected(r.id)}
                  className={`rounded-md border px-2 py-2.5 text-[0.8125rem] font-medium ${
                    selected === r.id ? 'border-accent bg-accent text-accent-ink' : 'border-rule bg-surface'
                  }`}
                >
                  {r.label}
                </button>
              ))}
            </div>
            {railSelected && <InlineDetail node={node} />}
          </div>

          <div className="flex gap-3">
            {rails
              .filter((r) => r.side === 'left')
              .map((r) => (
                <Rail key={r.id} node={r} active={selected === r.id} onSelect={setSelected} />
              ))}

            <ol className="min-w-0 flex-1" aria-label="Data flow, top to bottom">
              {flow.map((n, i) => {
                const active = selected === n.id
                const future = n.id === 'aiml'
                return (
                  <li key={n.id}>
                    <button
                      type="button"
                      aria-pressed={active}
                      onClick={() => setSelected(n.id)}
                      className={`flex w-full items-center justify-between gap-3 rounded-lg border px-4 py-2.5 text-left transition-colors ${
                        active
                          ? 'border-accent bg-accent text-accent-ink'
                          : railSelected
                            ? 'border-accent/40 bg-accent-soft'
                            : future
                              ? 'border-dashed border-focus bg-focus-soft hover:border-focus'
                              : 'border-rule bg-surface hover:border-ink/40'
                      }`}
                    >
                      <span className="shrink-0 font-medium sm:whitespace-nowrap">{n.label}</span>
                      <span
                        className={`hidden min-w-0 truncate text-[0.8125rem] sm:block ${active ? 'text-accent-ink/80' : 'text-muted'}`}
                      >
                        {n.tech}
                      </span>
                    </button>
                    {active && (
                      <div className="lg:hidden">
                        <InlineDetail node={n} />
                      </div>
                    )}
                    {i < flow.length - 1 && (
                      <div aria-hidden className="flex justify-center py-1 text-muted">
                        <ArrowDown size={14} />
                      </div>
                    )}
                  </li>
                )
              })}
            </ol>

            {rails
              .filter((r) => r.side === 'right')
              .map((r) => (
                <Rail key={r.id} node={r} active={selected === r.id} onSelect={setSelected} />
              ))}
          </div>
          {railSelected && (
            <div className="hidden md:block lg:hidden">
              <InlineDetail node={node} />
            </div>
          )}
        </div>

        <aside className="hidden lg:col-span-5 lg:block" aria-live="polite">
          <div className="sticky top-24">
            <DetailCard node={node} />
          </div>
        </aside>
      </div>
    </Section>
  )
}

function Rail({ node, active, onSelect }: { node: ArchNode; active: boolean; onSelect: (id: string) => void }) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={() => onSelect(node.id)}
      className={`hidden w-11 shrink-0 items-center justify-center rounded-lg border py-4 md:flex ${
        active ? 'border-accent bg-accent text-accent-ink' : 'border-rule bg-surface hover:border-ink/40'
      }`}
    >
      <span className="rotate-180 whitespace-nowrap text-[0.875rem] font-medium [writing-mode:vertical-rl]">
        {node.label}
      </span>
    </button>
  )
}

function DetailCard({ node }: { node: ArchNode }) {
  return (
    <div className="rounded-xl border border-rule bg-surface p-6">
      <p className="text-[0.875rem] text-muted">Selected component</p>
      <h3 className="mt-1 text-[1.375rem] font-medium">{node.label}</h3>
      <dl className="mt-5 space-y-4">
        <Row term="Technology" value={node.tech} />
        <Row term="Purpose" value={node.purpose} />
        <Row term="Typical responsibility" value={node.responsibility} />
      </dl>
    </div>
  )
}

function InlineDetail({ node }: { node: ArchNode }) {
  return (
    <div className="fade-in mt-2 rounded-lg border border-rule bg-surface p-4" aria-live="polite">
      <dl className="space-y-3">
        <Row term="Technology" value={node.tech} />
        <Row term="Purpose" value={node.purpose} />
        <Row term="Typical responsibility" value={node.responsibility} />
      </dl>
    </div>
  )
}

function Row({ term, value }: { term: string; value: string }) {
  return (
    <div>
      <dt className="text-[0.8125rem] font-medium text-muted">{term}</dt>
      <dd className="mt-0.5 leading-relaxed">{value}</dd>
    </div>
  )
}
