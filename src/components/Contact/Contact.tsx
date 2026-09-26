import { Download, FileText, Mail } from 'lucide-react'
import { profile } from '../../data/profile'
import { GithubIcon, LinkedinIcon } from '../ui/BrandIcons'
import { ContactLink } from '../ui/ContactLink'

export function Contact() {
  return (
    <section id="contact" aria-labelledby="contact-title" className="bg-ink text-bg">
      <div className="mx-auto grid max-w-[1120px] gap-10 px-5 py-20 sm:px-8 sm:py-24 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <h2 id="contact-title" className="text-[2.25rem] font-medium leading-[1.1] sm:text-[3rem]">
            Let’s build better data platforms.
          </h2>
          <p className="mt-5 max-w-[52ch] text-[1.0625rem] leading-relaxed opacity-75">
            Open to senior data engineering and data platform roles, and to conversations about AI/ML platform work.
            Based in {profile.location}.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={profile.resumeHref}
              download
              className="inline-flex items-center gap-2 rounded-md bg-bg px-5 py-3 font-medium text-ink hover:opacity-90"
            >
              <Download size={17} aria-hidden />
              Download resume
            </a>
            <a
              href={profile.resumeHref}
              target="_blank"
              rel="noopener"
              className="inline-flex items-center gap-2 rounded-md border border-bg/30 px-5 py-3 font-medium hover:border-bg/70"
            >
              <FileText size={17} aria-hidden />
              View resume
            </a>
          </div>
        </div>
        <ul className="space-y-5 self-end text-[1.0625rem] lg:col-span-5 [&_.text-muted]:text-bg/70">
          <li>
            <ContactLink kind="email" value={profile.email} label="Email" icon={<Mail size={19} aria-hidden />} />
          </li>
          <li>
            <ContactLink kind="url" value={profile.linkedin} label="LinkedIn" icon={<LinkedinIcon size={19} />} />
          </li>
          <li>
            <ContactLink kind="url" value={profile.github} label="GitHub" icon={<GithubIcon size={19} />} />
          </li>
        </ul>
      </div>
    </section>
  )
}
