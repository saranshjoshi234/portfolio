import { ArrowUpRight } from 'lucide-react'
import { insights, repositories } from '../../data/insights'
import { isPlaceholder } from '../../lib/content'
import { GithubIcon } from '../ui/BrandIcons'
import { Placeholder } from '../ui/Placeholder'
import { Section } from '../ui/Section'

export function OpenSource() {
  return (
    <Section
      id="writing"
      title="Open source & engineering insights"
      intro={<p>Public code and writing will live here. Nothing is listed until it’s actually published.</p>}
    >
      <div className="grid gap-12 lg:grid-cols-2">
        <div>
          <h3 className="flex items-center gap-2 font-medium">
            <GithubIcon size={18} />
            Repositories
          </h3>
          <ul className="mt-4 space-y-3">
            {repositories.map((r, i) => (
              <li key={i} className="rounded-lg border border-dashed border-rule p-4">
                {r.href ? (
                  <a href={r.href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 font-medium hover:underline">
                    {r.name}
                    <ArrowUpRight size={15} aria-hidden />
                  </a>
                ) : isPlaceholder(r.name) ? (
                  <Placeholder text={r.name} />
                ) : (
                  <span className="font-medium">{r.name}</span>
                )}
                <p className="mt-1.5 text-[0.9375rem] text-muted">{r.description}</p>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="font-medium">Engineering insights</h3>
          <ul className="mt-4 divide-y divide-rule border-y border-rule">
            {insights.map((a) => (
              <li key={a.topic} className="flex items-center justify-between gap-4 py-3.5">
                {a.href ? (
                  <a href={a.href} className="font-medium hover:underline">
                    {a.topic}
                  </a>
                ) : (
                  <span>{a.topic}</span>
                )}
                {!a.href && <span className="shrink-0 text-[0.8125rem] text-muted">Coming soon</span>}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  )
}
