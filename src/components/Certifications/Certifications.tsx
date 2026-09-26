import { Award, GraduationCap } from 'lucide-react'
import { certifications } from '../../data/certifications'
import { education } from '../../data/experience'
import { isPlaceholder } from '../../lib/content'
import { Placeholder, Text } from '../ui/Placeholder'
import { Section } from '../ui/Section'

export function Certifications() {
  return (
    <Section id="credentials" title="Certifications & education" tone="sunken">
      <div className="grid gap-10 lg:grid-cols-12">
        <ul className="grid gap-3 sm:grid-cols-3 lg:col-span-8">
          {certifications.map((c, i) => (
            <li
              key={`${c.name}-${i}`}
              className={`rounded-lg border p-5 ${
                c.status === 'planned' ? 'border-dashed border-focus bg-focus-soft' : 'border-rule bg-surface'
              }`}
            >
              <Award size={20} aria-hidden className={c.status === 'planned' ? 'text-focus' : 'text-accent'} />
              <div className="mt-3 font-medium leading-snug">
                {isPlaceholder(c.name) ? <Placeholder text={c.name} /> : c.name}
              </div>
              <div className="mt-1 text-[0.875rem] text-muted">
                {c.issuer}
                {c.year && (
                  <>
                    {', '}
                    <Text>{c.year}</Text>
                  </>
                )}
              </div>
              {c.status === 'planned' && <div className="mt-2 text-[0.8125rem] text-focus">Not yet earned</div>}
            </li>
          ))}
        </ul>
        <div className="lg:col-span-4">
          <div className="flex items-start gap-3">
            <GraduationCap size={20} aria-hidden className="mt-0.5 shrink-0 text-muted" />
            <div>
              <div className="font-medium">{education.degree}</div>
              <div className="text-[0.9375rem] text-muted">
                {education.school}, {education.period}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Section>
  )
}
