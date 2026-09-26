import type { ReactNode } from 'react'
import { isPlaceholder } from '../../lib/content'
import { Placeholder } from './Placeholder'

interface Props {
  value: string
  kind: 'email' | 'url'
  label: string
  icon: ReactNode
  className?: string
}

/** Links only when a real value exists; otherwise shows a visible placeholder (never a dead link). */
export function ContactLink({ value, kind, label, icon, className = '' }: Props) {
  if (isPlaceholder(value)) {
    return (
      <span className={`inline-flex items-center gap-2 text-muted ${className}`}>
        {icon}
        <span className="sr-only">{label}:</span>
        <Placeholder text={value || `[ADD ${label.toUpperCase()}]`} />
      </span>
    )
  }
  const href = kind === 'email' ? `mailto:${value}` : value
  const ext = kind === 'url' ? { target: '_blank', rel: 'noopener noreferrer' } : {}
  return (
    <a href={href} {...ext} className={`inline-flex items-center gap-2 underline-offset-4 hover:underline ${className}`}>
      {icon}
      <span>{kind === 'email' ? value : label}</span>
    </a>
  )
}
