import { useEffect, useRef } from 'react'
import { ArrowDown, ArrowRight, X } from 'lucide-react'
import type { CaseStudy, Project } from '../../data/types'
import { Chip } from '../ui/Evidence'
import { Text } from '../ui/Placeholder'

const sections: { key: keyof CaseStudy; title: string }[] = [
  { key: 'businessProblem', title: 'Business problem' },
  { key: 'technicalChallenge', title: 'Technical challenge' },
  { key: 'architecture', title: 'Architecture' },
  { key: 'engineeringApproach', title: 'Engineering approach' },
  { key: 'technologyStack', title: 'Technology stack' },
  { key: 'dataQualityStrategy', title: 'Data quality strategy' },
  { key: 'automation', title: 'Automation' },
  { key: 'businessImpact', title: 'Business impact' },
  { key: 'lessonsLearned', title: 'Lessons learned' },
  { key: 'futureImprovements', title: 'Future improvements' },
]

export function CaseStudyModal({ project, onClose }: { project: Project; onClose: () => void }) {
  const panel = useRef<HTMLDivElement>(null)
  const closeBtn = useRef<HTMLButtonElement>(null)
  const cs = project.caseStudy

  useEffect(() => {
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    closeBtn.current?.focus()

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        onClose()
        return
      }
      if (e.key !== 'Tab' || !panel.current) return
      const focusables = panel.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
      )
      if (!focusables.length) return
      const first = focusables[0]
      const last = focusables[focusables.length - 1]
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }
    document.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = prev
      document.removeEventListener('keydown', onKey)
    }
  }, [onClose])

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center sm:p-6">
      <div aria-hidden className="fade-in absolute inset-0 bg-ink/50" onClick={onClose} />
      <div
        ref={panel}
        role="dialog"
        aria-modal="true"
        aria-labelledby="case-title"
        className="sheet-in relative flex max-h-[92vh] w-full max-w-[860px] flex-col overflow-hidden rounded-t-2xl border border-rule bg-bg shadow-2xl sm:max-h-[88vh] sm:rounded-2xl"
      >
        <header className="flex items-start justify-between gap-4 border-b border-rule bg-surface px-5 py-5 sm:px-8">
          <div>
            <p className="text-[0.875rem] text-muted">Case study, {project.domain}</p>
            <h2 id="case-title" className="mt-1 text-[1.375rem] font-medium leading-snug sm:text-[1.625rem]">
              {project.title}
            </h2>
          </div>
          <button
            ref={closeBtn}
            type="button"
            onClick={onClose}
            aria-label="Close case study"
            className="grid h-10 w-10 shrink-0 place-items-center rounded-md text-muted hover:bg-sunken hover:text-ink"
          >
            <X size={20} aria-hidden />
          </button>
        </header>

        <div className="overflow-y-auto overscroll-contain px-5 py-6 sm:px-8 sm:py-8">
          <ol className="space-y-9">
            {sections.map((s, i) => (
              <li key={s.key} className="grid gap-2 sm:grid-cols-[3rem_1fr] sm:gap-4">
                <span aria-hidden className="font-mono text-[0.875rem] text-muted sm:pt-0.5">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <section aria-label={s.title}>
                  <h3 className="font-medium">{s.title}</h3>
                  <div className="mt-2.5">{renderBody(s.key, cs)}</div>
                </section>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  )
}

function renderBody(key: keyof CaseStudy, cs: CaseStudy) {
  const v = cs[key]
  if (typeof v === 'string') {
    return (
      <p className="max-w-[68ch] leading-relaxed text-muted">
        <Text>{v}</Text>
      </p>
    )
  }
  if (key === 'architecture') {
    return (
      <ol className="flex flex-col items-start gap-1.5 sm:flex-row sm:flex-wrap sm:items-center" aria-label="Data flow">
        {v.map((step, i) => (
          <li key={step} className="flex flex-col items-start gap-1.5 sm:contents">
            <span className="rounded-md border border-rule bg-surface px-2.5 py-1.5 text-[0.875rem]">{step}</span>
            {i < v.length - 1 && (
              <>
                <ArrowDown size={14} aria-hidden className="ml-3 text-muted sm:hidden" />
                <ArrowRight size={14} aria-hidden className="hidden text-muted sm:block" />
              </>
            )}
          </li>
        ))}
      </ol>
    )
  }
  if (key === 'technologyStack') {
    return (
      <ul className="flex flex-wrap gap-2">
        {v.map((t) => (
          <li key={t}>
            <Chip>{t}</Chip>
          </li>
        ))}
      </ul>
    )
  }
  return (
    <ul className="space-y-2 leading-relaxed">
      {v.map((x) => (
        <li key={x} className="flex gap-3">
          <span aria-hidden className="mt-[0.7em] h-px w-3 shrink-0 bg-muted" />
          <span className="text-ink/90">
            <Text>{x}</Text>
          </span>
        </li>
      ))}
    </ul>
  )
}
