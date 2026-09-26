import { earlierStack, education, experience } from '../../data/experience'
import type { Role } from '../../data/types'
import { Chip } from '../ui/Evidence'
import { Text } from '../ui/Placeholder'
import { Section } from '../ui/Section'

export function Experience() {
  const detailed = experience.filter((r) => r.depth === 'detailed')
  const compact = experience.filter((r) => r.depth === 'compact')

  return (
    <Section
      id="experience"
      title="Experience"
      intro={<p>Since 2011: from application code toward the data layer, with more ownership at each step.</p>}
    >
      <ol className="relative">
        {detailed.map((r) => (
          <DetailedRole key={r.company} role={r} />
        ))}
        <li className="relative grid gap-3 pb-2 md:grid-cols-[11rem_1fr] md:gap-10">
          <TimelineRail size="sm" />
          <div className="hidden text-[0.9375rem] text-muted md:block md:pt-1">2011 – 2017</div>
          <div className="pl-8 md:pl-10">
            <h3 className="font-medium">Earlier roles</h3>
            <ul className="mt-3 divide-y divide-rule border-y border-rule">
              {compact.map((r) => (
                <li key={r.company} className="grid gap-1 py-3.5 sm:grid-cols-[1fr_auto] sm:gap-6">
                  <div>
                    <span className="font-medium">{r.title}</span>
                    <span className="text-muted">, {r.company}</span>
                    <div className="mt-1 text-[0.9375rem] text-muted">
                      {r.responsibilities.map((x) => (
                        <Text key={x}>{x}</Text>
                      ))}
                    </div>
                  </div>
                  <div className="text-[0.9375rem] text-muted sm:text-right">{r.period}</div>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-[0.9375rem] text-muted">Technologies across the earlier roles</p>
            <ul className="mt-2 flex flex-wrap gap-2">
              {earlierStack.map((t) => (
                <li key={t}>
                  <Chip>{t}</Chip>
                </li>
              ))}
            </ul>
          </div>
        </li>
      </ol>

      <div className="mt-12 flex flex-col gap-1 border-t border-rule pt-6 text-[0.9375rem] sm:flex-row sm:items-baseline sm:gap-4">
        <span className="text-muted">Education</span>
        <span>
          <span className="font-medium">{education.degree}</span>, {education.school}, {education.period}
        </span>
      </div>
    </Section>
  )
}

function TimelineRail({ size, current }: { size: 'lg' | 'sm'; current?: boolean }) {
  const dot =
    size === 'lg'
      ? 'left-0 top-1.5 h-[15px] w-[15px] md:left-[calc(13.5rem-7px)]'
      : 'left-[3px] top-2.5 h-[9px] w-[9px] md:left-[calc(13.5rem-4px)]'
  const fill = current ? 'bg-accent ring-4 ring-accent-soft' : size === 'lg' ? 'bg-ink' : 'bg-muted'
  return (
    <>
      <span aria-hidden className="absolute bottom-0 left-[7px] top-2 w-px bg-rule md:left-[13.5rem]" />
      <span aria-hidden className={`absolute rounded-full ${dot} ${fill}`} />
    </>
  )
}

function DetailedRole({ role: r }: { role: Role }) {
  return (
    <li className="relative grid gap-3 pb-14 md:grid-cols-[11rem_1fr] md:gap-10">
      <TimelineRail size="lg" current={r.current} />
      <div className="pl-8 text-[0.9375rem] text-muted md:pl-0 md:pt-0.5">
        <Text>{r.period}</Text>
        {r.location && <div>{r.location}</div>}
      </div>
      <article className="pl-8 md:pl-10">
        <h3 className="text-xl font-medium sm:text-[1.375rem]">
          {r.title}
          <span className="text-muted">, {r.company}</span>
        </h3>
        {r.scope && <p className="mt-2 max-w-[66ch] text-muted">{r.scope}</p>}

        <div className="mt-6 grid gap-8 lg:grid-cols-2">
          <div>
            <h4 className="text-[0.9375rem] font-medium">What the role covers</h4>
            <ul className="mt-3 space-y-2.5 text-[0.9687rem] leading-relaxed">
              {r.responsibilities.map((x) => (
                <li key={x} className="flex gap-3">
                  <span aria-hidden className="mt-[0.7em] h-px w-3 shrink-0 bg-muted" />
                  <span>
                    <Text>{x}</Text>
                  </span>
                </li>
              ))}
            </ul>
          </div>
          {r.achievements.length > 0 && (
            <div className="rounded-lg border border-rule bg-surface p-5">
              <h4 className="text-[0.9375rem] font-medium">Selected achievements</h4>
              <ul className="mt-3 space-y-2.5 text-[0.9687rem] leading-relaxed">
                {r.achievements.map((x) => (
                  <li key={x} className="flex gap-3">
                    <span aria-hidden className="mt-[0.6em] h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                    <span>
                      <Text>{x}</Text>
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <ul className="mt-6 flex flex-wrap gap-2" aria-label="Technologies">
          {r.technologies.map((t) => (
            <li key={t}>
              <Chip>{t}</Chip>
            </li>
          ))}
        </ul>
      </article>
    </li>
  )
}
