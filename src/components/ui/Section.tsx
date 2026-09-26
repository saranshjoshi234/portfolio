import type { ReactNode } from 'react'

interface Props {
  id: string
  title: string
  intro?: ReactNode
  children: ReactNode
  tone?: 'plain' | 'sunken'
}

export function Section({ id, title, intro, children, tone = 'plain' }: Props) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      className={tone === 'sunken' ? 'border-y border-rule bg-sunken' : undefined}
    >
      <div className="mx-auto max-w-[1120px] px-5 py-20 sm:px-8 sm:py-24">
        <header className="mb-10 max-w-[68ch] sm:mb-12">
          <h2 id={`${id}-title`} className="text-[1.75rem] font-medium leading-tight sm:text-[2.125rem]">
            {title}
          </h2>
          {intro && <div className="mt-3 text-[1.0625rem] text-muted">{intro}</div>}
        </header>
        {children}
      </div>
    </section>
  )
}
