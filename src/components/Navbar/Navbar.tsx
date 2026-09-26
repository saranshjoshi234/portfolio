import { useEffect, useRef, useState } from 'react'
import { Download, Menu, Moon, Sun, X } from 'lucide-react'
import { navItems, pageSections } from '../../data/navigation'
import { profile } from '../../data/profile'
import { useActiveSection } from '../../hooks/useActiveSection'
import { useTheme } from '../../hooks/useTheme'


export function Navbar() {
  const current = useActiveSection(pageSections)
  const active = navItems.find((n) => n.sections.includes(current))?.id
  const { theme, toggle } = useTheme()
  const [open, setOpen] = useState(false)
  const menuBtn = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false)
        menuBtn.current?.focus()
      }
    }
    const onResize = () => window.innerWidth >= 1024 && setOpen(false)
    window.addEventListener('keydown', onKey)
    window.addEventListener('resize', onResize)
    return () => {
      window.removeEventListener('keydown', onKey)
      window.removeEventListener('resize', onResize)
    }
  }, [open])

  const ThemeIcon = theme === 'dark' ? Sun : Moon

  return (
    <header className="sticky top-[env(safe-area-inset-top,0px)] z-40 border-b border-rule bg-bg/90 backdrop-blur-sm">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-50 focus:rounded focus:bg-surface focus:px-3 focus:py-2"
      >
        Skip to content
      </a>
      <nav aria-label="Primary" className="mx-auto flex h-16 max-w-[1120px] items-center gap-4 px-5 sm:px-8">
        <a href="#home" className="flex items-center gap-2.5 font-medium" aria-label={`${profile.name}, home`}>
          <span
            aria-hidden
            className="grid h-8 w-8 place-items-center rounded-md bg-ink text-[0.8125rem] font-semibold tracking-wide text-bg"
          >
            {profile.initials}
          </span>
          <span className="hidden sm:inline">{profile.name}</span>
        </a>

        <ul className="ml-auto hidden items-center gap-1 lg:flex">
          {navItems.slice(1).map((n) => (
            <li key={n.id}>
              <a
                href={`#${n.id}`}
                aria-current={active === n.id ? 'true' : undefined}
                className={`rounded-md px-3 py-2 text-[0.9375rem] transition-colors ${
                  active === n.id ? 'bg-accent-soft text-accent' : 'text-muted hover:text-ink'
                }`}
              >
                {n.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="ml-auto flex items-center gap-2 lg:ml-2">
          <button
            type="button"
            onClick={toggle}
            aria-label={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
            className="grid h-10 w-10 place-items-center rounded-md text-muted hover:bg-surface hover:text-ink"
          >
            <ThemeIcon size={18} aria-hidden />
          </button>
          <a
            href={profile.resumeHref}
            download
            className="hidden items-center gap-2 rounded-md bg-accent px-3.5 py-2 text-[0.9375rem] font-medium text-accent-ink hover:opacity-90 sm:inline-flex"
          >
            <Download size={16} aria-hidden />
            Download resume
          </a>
          <button
            ref={menuBtn}
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? 'Close menu' : 'Open menu'}
            className="grid h-10 w-10 place-items-center rounded-md text-ink hover:bg-surface lg:hidden"
          >
            {open ? <X size={20} aria-hidden /> : <Menu size={20} aria-hidden />}
          </button>
        </div>
      </nav>

      {open && (
        <div id="mobile-nav" className="fade-in border-t border-rule bg-bg lg:hidden">
          <ul className="mx-auto max-w-[1120px] px-5 py-3 sm:px-8">
            {navItems.map((n) => (
              <li key={n.id}>
                <a
                  href={`#${n.id}`}
                  onClick={() => setOpen(false)}
                  aria-current={active === n.id ? 'true' : undefined}
                  className={`block rounded-md px-3 py-3 text-base ${
                    active === n.id ? 'bg-accent-soft text-accent' : 'text-ink'
                  }`}
                >
                  {n.label}
                </a>
              </li>
            ))}
            <li className="mt-2 border-t border-rule pt-3 sm:hidden">
              <a
                href={profile.resumeHref}
                download
                className="flex items-center justify-center gap-2 rounded-md bg-accent px-3 py-3 font-medium text-accent-ink"
              >
                <Download size={16} aria-hidden />
                Download resume
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  )
}
