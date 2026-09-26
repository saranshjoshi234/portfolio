import { leadership } from '../../data/leadership'
import { Text } from '../ui/Placeholder'
import { Section } from '../ui/Section'

export function Leadership() {
  return (
    <Section
      id="leadership"
      title="Leadership & collaboration"
      intro={<p>Leadership as an engineering skill: planning the work, making it visible, and helping others do it well.</p>}
    >
      <dl className="grid gap-x-10 border-t border-rule sm:grid-cols-2 lg:grid-cols-3">
        {leadership.map((l) => (
          <div key={l.name} className="border-b border-rule py-5">
            <dt className="font-medium">{l.name}</dt>
            <dd className="mt-1 text-[0.9687rem] leading-relaxed text-muted">
              <Text>{l.detail}</Text>
            </dd>
          </div>
        ))}
      </dl>
    </Section>
  )
}
