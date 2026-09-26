import { useRef, useState, type KeyboardEvent } from 'react'
import { ArrowDown, ArrowRight, RotateCcw } from 'lucide-react'
import {
  airflowConcepts,
  airflowDag,
  bigQueryCurrent,
  bigQueryPractices,
  dbtLineage,
  dbtPractices,
  principles,
} from '../../data/engineering'
import { Section } from '../ui/Section'

const tabs = [
  { id: 'bigquery', label: 'BigQuery' },
  { id: 'dbt', label: 'dbt' },
  { id: 'airflow', label: 'Airflow / Composer' },
] as const
type TabId = (typeof tabs)[number]['id']

export function Engineering() {
  return (
    <Section
      id="engineering"
      title="How I build data platforms"
      intro={<p>The principles I apply on every pipeline, followed by how they show up in the three tools I use most.</p>}
    >
      <ul className="grid border-t border-rule md:grid-cols-2">
        {principles.map((p, i) => (
          <li
            key={p.name}
            className={`border-b border-rule py-6 md:pr-10 ${i % 2 === 1 ? 'md:border-l md:pl-10 md:pr-0' : ''}`}
          >
            <h3 className="font-medium">{p.name}</h3>
            <p className="mt-1 text-[0.9687rem]">{p.summary}</p>
            <p className="mt-2 text-[0.9063rem] leading-relaxed text-muted">{capitalize(p.points.join(', '))}</p>
          </li>
        ))}
      </ul>

      <DeepDives />
    </Section>
  )
}

function DeepDives() {
  const [tab, setTab] = useState<TabId>('bigquery')
  const refs = useRef<(HTMLButtonElement | null)[]>([])

  const onKey = (e: KeyboardEvent<HTMLButtonElement>, i: number) => {
    const dir = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0
    if (!dir && e.key !== 'Home' && e.key !== 'End') return
    e.preventDefault()
    const next = e.key === 'Home' ? 0 : e.key === 'End' ? tabs.length - 1 : (i + dir + tabs.length) % tabs.length
    setTab(tabs[next].id)
    refs.current[next]?.focus()
  }

  return (
    <div className="mt-16">
      <h3 className="text-[1.375rem] font-medium">In practice</h3>
      <div role="tablist" aria-label="Engineering deep dives" className="mt-5 flex gap-1 overflow-x-auto border-b border-rule">
        {tabs.map((t, i) => (
          <button
            key={t.id}
            ref={(el) => {
              refs.current[i] = el
            }}
            role="tab"
            id={`tab-${t.id}`}
            aria-selected={tab === t.id}
            aria-controls={`panel-${t.id}`}
            tabIndex={tab === t.id ? 0 : -1}
            onClick={() => setTab(t.id)}
            onKeyDown={(e) => onKey(e, i)}
            className={`-mb-px whitespace-nowrap border-b-2 px-4 py-3 font-medium ${
              tab === t.id ? 'border-accent text-accent' : 'border-transparent text-muted hover:text-ink'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div role="tabpanel" id={`panel-${tab}`} aria-labelledby={`tab-${tab}`} tabIndex={0} className="pt-8">
        {tab === 'bigquery' && <BigQueryPanel />}
        {tab === 'dbt' && <DbtPanel />}
        {tab === 'airflow' && <AirflowPanel />}
      </div>
    </div>
  )
}

function BigQueryPanel() {
  return (
    <div className="fade-in">
      <h4 className="sr-only">BigQuery engineering practices</h4>
      <dl className="grid gap-x-10 gap-y-6 sm:grid-cols-2">
        {bigQueryPractices.map((p) => (
          <div key={p.name}>
            <dt className="font-medium">{p.name}</dt>
            <dd className="mt-1 text-[0.9687rem] leading-relaxed text-muted">{p.detail}</dd>
          </div>
        ))}
      </dl>
      <div className="mt-8 flex flex-col gap-2 rounded-lg border border-dashed border-focus bg-focus-soft p-5 sm:flex-row sm:gap-4">
        <span className="shrink-0 text-[0.875rem] font-medium text-focus">In progress</span>
        <p className="text-[0.9687rem] leading-relaxed">{bigQueryCurrent}</p>
      </div>
    </div>
  )
}

function DbtPanel() {
  return (
    <div className="fade-in">
      <h4 className="sr-only">Analytics engineering with dbt</h4>
      <p className="max-w-[64ch] text-muted">
        Layered models from sources to marts. The lineage below is illustrative, with generic model names.
      </p>
      <ol className="mt-6 grid gap-2 md:grid-cols-4 md:gap-0" aria-label="Illustrative dbt lineage">
        {dbtLineage.map((l, i) => (
          <li key={l.layer} className="relative flex flex-col md:pr-8">
            <div className="text-[0.875rem] font-medium">{l.layer}</div>
            <div className="mb-3 mt-0.5 min-h-[2.6em] text-[0.8125rem] leading-snug text-muted">{l.role}</div>
            <ul className="flex flex-col gap-2">
              {l.models.map((m) => (
                <li
                  key={m}
                  className={`rounded-md border px-3 py-2 font-mono text-[0.8125rem] ${
                    l.layer === 'Marts' ? 'border-accent/50 bg-accent-soft text-accent' : 'border-rule bg-surface'
                  }`}
                >
                  {m}
                </li>
              ))}
            </ul>
            {i < dbtLineage.length - 1 && (
              <>
                <ArrowRight aria-hidden size={16} className="absolute right-2 top-1/2 hidden text-muted md:block" />
                <ArrowDown aria-hidden size={16} className="mx-auto mt-2 text-muted md:hidden" />
              </>
            )}
          </li>
        ))}
      </ol>
      <ul className="mt-8 grid gap-x-10 gap-y-2 sm:grid-cols-2">
        {dbtPractices.map((p) => (
          <li key={p} className="flex gap-3 text-[0.9687rem]">
            <span aria-hidden className="mt-[0.7em] h-px w-3 shrink-0 bg-muted" />
            {p}
          </li>
        ))}
      </ul>
    </div>
  )
}

function AirflowPanel() {
  return (
    <div className="fade-in">
      <h4 className="sr-only">Orchestration with Airflow and Cloud Composer</h4>
      <p className="max-w-[64ch] text-muted">A typical DAG. Each task is idempotent, so any run can be retried or backfilled.</p>
      <ol className="mt-6 flex flex-col items-stretch gap-1.5 sm:flex-row sm:flex-wrap sm:items-center" aria-label="DAG tasks in order">
        {airflowDag.map((t, i) => (
          <li key={t} className="flex flex-col items-center gap-1.5 sm:flex-row">
            <span
              className={`w-full rounded-md border px-3 py-2 text-center text-[0.9063rem] sm:w-auto ${
                t === 'Data quality' || t === 'Validate'
                  ? 'border-accent/50 bg-accent-soft text-accent'
                  : 'border-rule bg-surface'
              }`}
            >
              {t}
            </span>
            {i < airflowDag.length - 1 && (
              <>
                <ArrowDown aria-hidden size={14} className="text-muted sm:hidden" />
                <ArrowRight aria-hidden size={14} className="hidden text-muted sm:block" />
              </>
            )}
          </li>
        ))}
        <li className="flex items-center gap-1.5 text-[0.8125rem] text-muted sm:ml-2">
          <RotateCcw aria-hidden size={14} />
          retries and alerts on every task
        </li>
      </ol>
      <dl className="mt-8 grid gap-x-10 gap-y-6 sm:grid-cols-2 lg:grid-cols-3">
        {airflowConcepts.map((c) => (
          <div key={c.name}>
            <dt className="font-medium">{c.name}</dt>
            <dd className="mt-1 text-[0.9687rem] leading-relaxed text-muted">{c.detail}</dd>
          </div>
        ))}
      </dl>
    </div>
  )
}

const capitalize = (t: string) => t.charAt(0).toUpperCase() + t.slice(1)
