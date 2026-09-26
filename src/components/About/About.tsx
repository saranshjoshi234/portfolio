import { about, summary } from '../../data/profile'
import { Section } from '../ui/Section'

export function About() {
  return (
    <Section id="about" title="About">
      <div className="grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <p className="max-w-[60ch] text-xl leading-relaxed sm:text-[1.375rem]">{summary.lead}</p>
          <div className="mt-6 max-w-[64ch] space-y-4 text-[1.0625rem] leading-relaxed text-muted">
            {summary.body.map((p) => (
              <p key={p.slice(0, 24)}>{p}</p>
            ))}
          </div>
        </div>
        <aside className="lg:col-span-5 lg:border-l lg:border-rule lg:pl-10" aria-label="Personal statement">
          <h3 className="font-medium">How I think about the work</h3>
          <div className="mt-3 space-y-4 text-[0.9875rem] leading-relaxed text-muted">
            {about.statement.map((p) => (
              <p key={p.slice(0, 24)}>{p}</p>
            ))}
          </div>
          <h3 className="mt-8 font-medium">Focus right now</h3>
          <ul className="mt-3 space-y-2 text-[0.9875rem]">
            {about.focusNow.map((f) => (
              <li key={f} className="flex gap-3">
                <span aria-hidden className="mt-[0.6em] h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                {f}
              </li>
            ))}
          </ul>
        </aside>
      </div>
    </Section>
  )
}
