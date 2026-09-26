import { About } from '../components/About/About'
import { AIPlatform } from '../components/AIPlatform/AIPlatform'
import { Architecture } from '../components/Architecture/Architecture'
import { Certifications } from '../components/Certifications/Certifications'
import { Contact } from '../components/Contact/Contact'
import { Engineering } from '../components/Engineering/Engineering'
import { Experience } from '../components/Experience/Experience'
import { Hero } from '../components/Hero/Hero'
import { Impact } from '../components/Impact/Impact'
import { Leadership } from '../components/Leadership/Leadership'
import { OpenSource } from '../components/OpenSource/OpenSource'
import { Projects } from '../components/Projects/Projects'
import { Skills } from '../components/Skills/Skills'

// Order follows reader intent: recruiter facts first, then evidence, then depth for technical reviewers.
export function Home() {
  return (
    <>
      <Hero />
      <Impact />
      <About />
      <Skills />
      <Experience />
      <Projects />
      <Architecture />
      <Engineering />
      <AIPlatform />
      <Leadership />
      <Certifications />
      <OpenSource />
      <Contact />
    </>
  )
}
