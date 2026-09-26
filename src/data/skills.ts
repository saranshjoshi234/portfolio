import type { SkillGroup } from './types'

// No proficiency bars or percentages. `evidence` marks anything that is not production experience.
// If you haven't used an item in production, set evidence: 'learning' or remove it.

export const skillGroups: SkillGroup[] = [
  {
    name: 'Data engineering',
    blurb: 'Moving data from source to trusted model.',
    items: [
      { name: 'Data ingestion' },
      { name: 'ETL / ELT' },
      { name: 'Batch processing' },
      { name: 'Data transformation' },
      { name: 'Data modeling' },
      { name: 'Data pipelines' },
      { name: 'Data validation' },
      { name: 'Data quality' },
    ],
  },
  {
    name: 'Cloud',
    blurb: 'Google Cloud as the primary platform.',
    items: [
      { name: 'GCP' },
      { name: 'BigQuery' },
      { name: 'Cloud Storage' },
      { name: 'Dataflow' },
      { name: 'Pub/Sub' },
      { name: 'Cloud SQL' },
      { name: 'GKE' },
      { name: 'IAM' },
      { name: 'Monitoring & Logging' },
    ],
  },
  {
    name: 'Analytics engineering',
    blurb: 'SQL models that are tested, documented and reviewable.',
    items: [
      { name: 'dbt Core' },
      { name: 'SQL' },
      { name: 'BigQuery' },
      { name: 'Data modeling' },
      { name: 'Testing' },
      { name: 'Documentation' },
      { name: 'CI/CD' },
    ],
  },
  {
    name: 'Orchestration',
    blurb: 'Scheduling, dependencies and recovery.',
    items: [
      { name: 'Apache Airflow' },
      { name: 'Cloud Composer' },
      { name: 'DAG development' },
      { name: 'Pipeline monitoring' },
    ],
  },
  {
    name: 'Programming',
    blurb: 'The languages the work is written in.',
    items: [{ name: 'Python' }, { name: 'SQL' }],
  },
  {
    name: 'DevOps & observability',
    blurb: 'Shipping and watching pipelines like software.',
    items: [
      { name: 'GitHub' },
      { name: 'GitHub Actions' },
      { name: 'CI/CD' },
      { name: 'Deployment automation' },
      { name: 'Monte Carlo' },
    ],
  },
  {
    name: 'AI / ML platform',
    blurb: 'Where the career is heading.',
    items: [
      { name: 'LLM application infrastructure', evidence: 'hands-on' },
      { name: 'AI-enabled data platforms', evidence: 'hands-on' },
      { name: 'Vertex AI', evidence: 'learning' },
      { name: 'MLOps', evidence: 'learning' },
      { name: 'ML pipelines', evidence: 'learning' },
      { name: 'Model deployment', evidence: 'learning' },
    ],
  },
]

export const evidenceLabel = {
  production: 'Production experience',
  'hands-on': 'Hands-on, outside production',
  learning: 'Current focus / learning',
} as const
