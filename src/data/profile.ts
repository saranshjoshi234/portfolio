// ─────────────────────────────────────────────────────────────
// Profile & contact. Anything in [ADD ...] renders as a visible
// placeholder and is NOT linked. Run `npm run check:placeholders`
// before deploying to find what is left.
// ─────────────────────────────────────────────────────────────

export const profile = {
  name: 'Saransh Joshi',
  initials: 'SJ',
  title: 'Senior Data Engineer',
  location: 'Bengaluru, India',
  careerStartYear: 2011,
  experienceLabel: '10+ years in technology',

  headline: 'Senior Data Engineer building scalable data platforms and intelligent systems.',
  supporting:
    'Designing reliable cloud data platforms, scalable pipelines and automated data products across GCP, BigQuery, dbt, Python and Airflow — with a growing focus on AI/ML platform engineering.',

  coreStack: ['GCP', 'BigQuery', 'Python', 'SQL', 'dbt', 'Airflow'],
  specialization: 'Cloud data platforms, data quality and pipeline automation',
  direction: 'AI/ML platform engineering',

  // Contact — replace placeholders with real values.
  email: 'saransh234@gmail.com',
  linkedin: 'https://www.linkedin.com/in/saransh-joshi-63a9aa19',
  github: 'https://github.com/saranshjoshi234',

  // Put the latest resume at /public/resume.pdf (a placeholder file ships for now).
  resumeHref: '/resume.pdf',

  siteUrl: '[ADD CANONICAL URL]',
}

export const summary = {
  // Executive summary (recruiter / hiring-manager read).
  lead:
    'Data engineer with a career that started in application development in 2011 and moved steadily toward the data layer — from big-data stacks to cloud migration to running modern data platforms on Google Cloud.',
  body: [
    'Today I build and operate BigQuery and dbt data models for enterprise sustainability and supply-chain reporting — greenhouse-gas, packaging and extended producer responsibility data — orchestrated on Cloud Composer and checked by automated data-quality monitoring.',
    'Before that I led a 25-person delivery team at Accenture, owning client-facing planning and end-to-end implementation, including the migration of a Hive data lake to GCP.',
    'The thread through all of it is trust in the numbers: validation, reconciliation and observability built into the pipeline rather than bolted on after an incident. I am now extending that foundation toward AI/ML platform engineering.',
  ],
}

export const about = {
  statement: [
    'I like the part of data engineering that sits between a source system and a reported number — where a missing filter or a unit-of-measure mismatch can quietly multiply a figure, and where good engineering means someone catches it before a stakeholder does.',
    'Most of my recent work lives there: mapping attributes through a system migration, reconciling versions of the same dataset, tracing inflated figures back to their cause, and turning those checks into code that runs on every load.',
    'I work closely with the business teams who own the numbers, because a data model is only correct if it matches how the business actually works.',
  ],
  // Keep this honest; edit freely.
  focusNow: [
    'Monitoring and data-quality checks defined as code',
    'BigQuery cost and performance',
    'AI/ML platform engineering foundations on Vertex AI',
  ],
}
