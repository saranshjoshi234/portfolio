import type { Evidence } from '../../data/types'
import { evidenceLabel } from '../../data/skills'

const styles: Record<Evidence, string> = {
  production: 'border-accent/40 bg-accent-soft text-accent',
  'hands-on': 'border-handson/40 bg-handson-soft text-handson',
  learning: 'border-dashed border-focus bg-focus-soft text-focus',
}

export function EvidenceTag({ evidence, short = false }: { evidence: Evidence; short?: boolean }) {
  const label = short
    ? { production: 'Production', 'hands-on': 'Hands-on', learning: 'Learning' }[evidence]
    : evidenceLabel[evidence]
  return (
    <span className={`inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-medium ${styles[evidence]}`}>
      {label}
    </span>
  )
}

export function Chip({ children }: { children: string }) {
  return (
    <span className="inline-flex items-center rounded-md border border-rule bg-surface px-2 py-0.5 text-[0.8125rem] text-ink">
      {children}
    </span>
  )
}
