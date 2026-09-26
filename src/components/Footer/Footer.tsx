import { ArrowUp } from 'lucide-react'
import { profile } from '../../data/profile'

export function Footer() {
  return (
    <footer className="border-t border-rule">
      <div className="mx-auto flex max-w-[1120px] flex-col gap-3 px-5 py-8 text-[0.875rem] text-muted sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <p>
          © {new Date().getFullYear()} {profile.name}. {profile.title}, {profile.location}.
        </p>
        <a href="#home" className="inline-flex items-center gap-1.5 hover:text-ink">
          <ArrowUp size={15} aria-hidden />
          Back to top
        </a>
      </div>
    </footer>
  )
}
