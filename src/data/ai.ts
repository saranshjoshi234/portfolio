import type { Evidence } from './types'

// The production vs learning distinction is deliberate. Keep it accurate as things change.

export const aiPath: { step: string; evidence: Evidence }[] = [
  { step: 'Data engineering foundation', evidence: 'production' },
  { step: 'Reliable, monitored data', evidence: 'production' },
  { step: 'Governed data pipelines', evidence: 'production' },
  { step: 'Feature & ML pipelines', evidence: 'learning' },
  { step: 'Model deployment', evidence: 'learning' },
  { step: 'Model monitoring', evidence: 'learning' },
  { step: 'AI applications', evidence: 'hands-on' },
]

export const aiIntro =
  'Models are only as good as the data under them. The skills that make a data platform trustworthy — contracts, validation, lineage, orchestration, monitoring — are the same ones an ML platform needs. I am building on that foundation rather than starting over.'

export const production = [
  'Batch data pipelines on BigQuery, dbt and Cloud Composer',
  'Data validation, reconciliation and observability as code',
  'CI/CD for data models with GitHub Actions',
]

export const handsOn = [
  'Built a supply-chain risk intelligence agent in Glean for an internal AI hackathon (2026), analysing 71 priority ingredients across six risk dimensions',
  'Built a multi-agent technical-debt analyser running in GitHub Copilot Agent Mode',
  'Integrated Google Cloud ADK with GitHub Copilot through stack-specific prompt files',
]

export const learning = [
  'Vertex AI',
  'MLOps and ML pipelines',
  'Feature engineering',
  'Model deployment and monitoring',
  'RAG infrastructure and vector search',
  'AI data pipelines',
]
