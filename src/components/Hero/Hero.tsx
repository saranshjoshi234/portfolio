import { ArrowRight, Download, Mail, MapPin } from 'lucide-react'
import { careerStages } from '../../data/experience'
import { profile } from '../../data/profile'
import { ContactLink } from '../ui/ContactLink'
import { GithubIcon, LinkedinIcon } from '../ui/BrandIcons'

export function Hero() {
  const glance = [
    { term: 'Role', value: profile.title },
    { term: 'Based in', value: profile.location },
    { term: 'Experience', value: profile.experienceLabel },
    { term: 'Core stack', value: profile.coreStack.join(', ') },
    { term: 'Specialises in', value: profile.specialization },
    { term: 'Heading toward', value: profile.direction },
  ]

  return (
    <section id="home" aria-labelledby="hero-title" className="relative">
      <div className="mx-auto grid max-w-[1120px] gap-12 px-5 pb-14 pt-14 sm:px-8 sm:pt-20 lg:grid-cols-12 lg:gap-10 lg:pb-20">
        <div className="lg:col-span-7">
          <p className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[0.9375rem] text-muted">
            <span className="font-medium text-ink">{profile.name}</span>
            <span className="inline-flex items-center gap-1.5">
              <MapPin size={15} aria-hidden />
              {profile.location}
            </span>
            <span>{profile.experienceLabel}</span>
          </p>

          <h1
            id="hero-title"
            className="mt-6 max-w-[18ch] text-[2.25rem] font-medium leading-[1.08] sm:text-[3rem] lg:text-[3.5rem]"
          >
            {profile.headline}
          </h1>

          <p className="mt-6 max-w-[58ch] text-[1.0625rem] leading-relaxed text-muted sm:text-lg">{profile.supporting}</p>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <a
              href="#experience"
              className="inline-flex items-center gap-2 rounded-md bg-accent px-5 py-3 font-medium text-accent-ink hover:opacity-90"
            >
              View experience
              <ArrowRight size={17} aria-hidden />
            </a>
            <a
              href="#projects"
              className="inline-flex items-center gap-2 rounded-md border border-rule bg-surface px-5 py-3 font-medium hover:border-ink/40"
            >
              Explore projects
            </a>
            <a
              href={profile.resumeHref}
              download
              className="inline-flex items-center gap-2 rounded-md px-3 py-3 font-medium text-accent underline-offset-4 hover:underline"
            >
              <Download size={17} aria-hidden />
              Download resume
            </a>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-[0.9375rem]">
            <ContactLink kind="url" value={profile.linkedin} label="LinkedIn" icon={<LinkedinIcon size={17} />} />
            <ContactLink kind="url" value={profile.github} label="GitHub" icon={<GithubIcon size={17} />} />
            <ContactLink kind="email" value={profile.email} label="Email" icon={<Mail size={17} aria-hidden />} />
          </div>
        </div>

        <CareerLineage />
      </div>

      <div className="border-y border-rule bg-surface">
        <dl className="mx-auto grid max-w-[1120px] grid-cols-2 gap-x-6 gap-y-5 px-5 py-6 sm:grid-cols-3 sm:px-8 lg:grid-cols-6">
          {glance.map((g) => (
            <div key={g.term} className="min-w-0">
              <dt className="text-[0.8125rem] text-muted">{g.term}</dt>
              <dd className="mt-1 text-[0.9375rem] font-medium leading-snug">{g.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}

/** The career rendered as a lineage graph — the site's signature element. */
function CareerLineage() {
  return (
    <figure className="lg:col-span-5 lg:pl-4" aria-labelledby="lineage-caption">
      <figcaption id="lineage-caption" className="mb-4 flex items-baseline justify-between gap-4 text-[0.9375rem]">
        <span className="font-medium">How the work has evolved</span>
        <span className="text-[0.8125rem] text-muted">2011 to now</span>
      </figcaption>
      <ol className="relative">
        {careerStages.map((s, i) => {
          const last = i === careerStages.length - 1
          const box =
            s.status === 'current'
              ? 'border-accent/50 bg-accent-soft'
              : s.status === 'next'
                ? 'border-dashed border-focus bg-focus-soft'
                : 'border-rule bg-surface'
          const dot =
            s.status === 'current' ? 'bg-accent' : s.status === 'next' ? 'border-2 border-dashed border-focus bg-bg' : 'bg-muted/60'
          return (
            <li key={s.stage} className="relative pl-8">
              {!last && (
                <span
                  aria-hidden
                  className={`lineage-edge absolute left-[7px] top-[22px] h-[calc(100%-4px)] w-px ${
                    careerStages[i + 1].status === 'next' ? 'border-l border-dashed border-focus' : 'bg-rule'
                  }`}
                  style={{ animationDelay: `${120 + i * 90}ms` }}
                />
              )}
              <span
                aria-hidden
                className={`lineage-node absolute left-0 top-[15px] h-[15px] w-[15px] rounded-full ${dot}`}
                style={{ animationDelay: `${i * 90}ms` }}
              />
              <div
                className={`lineage-node mb-2.5 rounded-lg border px-4 py-2.5 ${box}`}
                style={{ animationDelay: `${i * 90}ms` }}
              >
                <div className="flex items-baseline justify-between gap-3">
                  <span className={`font-medium ${s.status === 'current' ? 'text-accent' : s.status === 'next' ? 'text-focus' : ''}`}>
                    {s.stage}
                  </span>
                  {s.status === 'current' && <span className="shrink-0 text-xs text-accent">Now</span>}
                  {s.status === 'next' && <span className="shrink-0 text-xs text-focus">Next</span>}
                </div>
                <div className="mt-0.5 text-[0.8125rem] leading-snug text-muted">{s.evidence}</div>
              </div>
            </li>
          )
        })}
      </ol>
    </figure>
  )
}
