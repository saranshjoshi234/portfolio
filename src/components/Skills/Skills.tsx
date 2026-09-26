import { skillGroups } from '../../data/skills'
import { Chip, EvidenceTag } from '../ui/Evidence'
import { Section } from '../ui/Section'

export function Skills() {
  return (
    <Section
      id="capabilities"
      title="Engineering capabilities"
      tone="sunken"
      intro={
        <p>
          Grouped by what the work needs, not by keyword. Anything not yet used in production is marked, so you can
          tell <EvidenceTag evidence="hands-on" short /> and <EvidenceTag evidence="learning" short /> apart from
          everyday tools.
        </p>
      }
    >
      <div className="grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
        {skillGroups.map((g) => (
          <div key={g.name} className="border-t-2 border-ink/80 pt-4">
            <h3 className="font-medium">{g.name}</h3>
            <p className="mt-1 text-[0.9375rem] text-muted">{g.blurb}</p>
            <ul className="mt-4 flex flex-wrap gap-2">
              {g.items.map((it) => (
                <li key={it.name} className="inline-flex items-center gap-1.5">
                  {it.evidence && it.evidence !== 'production' ? (
                    <span
                      className={`inline-flex items-center gap-1.5 rounded-md border px-2 py-0.5 text-[0.8125rem] ${
                        it.evidence === 'learning'
                          ? 'border-dashed border-focus bg-focus-soft text-focus'
                          : 'border-handson/40 bg-handson-soft text-handson'
                      }`}
                    >
                      {it.name}
                      <span className="sr-only">
                        ({it.evidence === 'learning' ? 'current focus, learning' : 'hands-on, outside production'})
                      </span>
                    </span>
                  ) : (
                    <Chip>{it.name}</Chip>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  )
}
