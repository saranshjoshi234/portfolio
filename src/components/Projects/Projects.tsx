import { useCallback, useRef, useState } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { projects } from '../../data/projects'
import type { Project } from '../../data/types'
import { isPlaceholder } from '../../lib/content'
import { Chip } from '../ui/Evidence'
import { Placeholder, Text } from '../ui/Placeholder'
import { Section } from '../ui/Section'
import { CaseStudyModal } from './CaseStudyModal'

export function Projects() {
  const [openId, setOpenId] = useState<string | null>(null)
  const opener = useRef<HTMLButtonElement | null>(null)
  const open = projects.find((p) => p.id === openId) ?? null

  const close = useCallback(() => {
    setOpenId(null)
    requestAnimationFrame(() => opener.current?.focus())
  }, [])

  return (
    <Section
      id="projects"
      title="Featured engineering work"
      intro={
        <p>
          Real projects, described at the level I can share publicly. Each case study walks through the problem,
          architecture, data-quality strategy and what I would do next.
        </p>
      }
    >
      <div className="border-t border-rule">
        {projects.map((p) => (
          <ProjectRow
            key={p.id}
            project={p}
            onOpen={(btn) => {
              opener.current = btn
              setOpenId(p.id)
            }}
          />
        ))}
      </div>
      {open && <CaseStudyModal project={open} onClose={close} />}
    </Section>
  )
}

function ProjectRow({ project: p, onOpen }: { project: Project; onOpen: (btn: HTMLButtonElement) => void }) {
  return (
    <article aria-labelledby={`${p.id}-title`} className="grid gap-8 border-b border-rule py-10 lg:grid-cols-12 lg:gap-10">
      <div className="lg:col-span-7">
        <p className="text-[0.875rem] text-muted">{p.domain}</p>
        <h3 id={`${p.id}-title`} className="mt-1.5 text-[1.5rem] font-medium leading-snug sm:text-[1.75rem]">
          {p.title}
        </h3>
        <p className="mt-3 max-w-[62ch] text-[1.0625rem] leading-relaxed text-muted">{p.summary}</p>

        <dl className="mt-6 grid gap-4 sm:grid-cols-3 sm:gap-6">
          {[
            ['Problem', p.problem],
            ['Approach', p.approach],
            ['Impact', p.impact],
          ].map(([k, v]) => (
            <div key={k}>
              <dt className="text-[0.875rem] font-medium">{k}</dt>
              <dd className="mt-1 text-[0.9375rem] leading-relaxed text-muted">
                <Text>{v}</Text>
              </dd>
            </div>
          ))}
        </dl>
      </div>

      <div className="flex flex-col gap-6 lg:col-span-5">
        <dl
          className="grid gap-px overflow-hidden rounded-lg border border-rule bg-rule"
          style={{ gridTemplateColumns: `repeat(${p.facts.length}, minmax(0, 1fr))` }}
        >
          {p.facts.map((f) => (
            <div key={f.label} className="bg-surface p-4">
              <dt className="sr-only">{f.label}</dt>
              <dd>
                <div className="text-[1.75rem] font-medium leading-none tracking-tight">
                  {isPlaceholder(f.value) ? <Placeholder text={f.value} /> : f.value}
                </div>
                <div className="mt-2 text-[0.8125rem] leading-snug text-muted">{f.label}</div>
              </dd>
            </div>
          ))}
        </dl>
        <ul className="flex flex-wrap gap-2" aria-label="Technology">
          {p.stack.map((s) => (
            <li key={s}>
              <Chip>{s}</Chip>
            </li>
          ))}
        </ul>
        <div>
          <button
            type="button"
            onClick={(e) => onOpen(e.currentTarget)}
            aria-haspopup="dialog"
            className="inline-flex items-center gap-2 rounded-md border border-ink/80 px-4 py-2.5 font-medium hover:bg-ink hover:text-bg"
          >
            View case study
            <ArrowUpRight size={17} aria-hidden />
            <span className="sr-only">: {p.title}</span>
          </button>
        </div>
      </div>
    </article>
  )
}
