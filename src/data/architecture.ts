import type { ArchNode } from './types'

// Reference architecture for the kind of platform I build on GCP.
// This is a pattern, not a diagram of any one employer's system.

export const flow: ArchNode[] = [
  {
    id: 'sources',
    label: 'Source systems',
    tech: 'ERP, PLM, procurement, operational databases',
    purpose: 'Where business data originates.',
    responsibility: 'Understand ownership, grain and change patterns of each source before ingesting it.',
  },
  {
    id: 'interfaces',
    label: 'Files, APIs, databases, events',
    tech: 'Batch extracts, REST APIs, CDC, event streams',
    purpose: 'The interfaces data arrives through.',
    responsibility: 'Agree formats and delivery expectations with source owners; treat them as contracts.',
  },
  {
    id: 'landing',
    label: 'Pub/Sub & Cloud Storage',
    tech: 'Pub/Sub, Cloud Storage',
    purpose: 'Durable landing for streaming and batch data.',
    responsibility: 'Keep raw data replayable so any downstream step can be rebuilt.',
  },
  {
    id: 'ingestion',
    label: 'Dataflow ingestion',
    tech: 'Dataflow, Python',
    purpose: 'Parse, validate and load raw data at scale.',
    responsibility: 'Schema checks at the door; quarantine bad records instead of failing silently.',
  },
  {
    id: 'bigquery',
    label: 'BigQuery',
    tech: 'BigQuery (partitioned, clustered tables)',
    purpose: 'The warehouse: raw, staged and modeled layers.',
    responsibility: 'Partitioning, clustering and cost-aware table design; IAM on datasets and views.',
  },
  {
    id: 'dbt',
    label: 'dbt transformation',
    tech: 'dbt Core',
    purpose: 'Versioned SQL transformations with tests and lineage.',
    responsibility: 'Staging → intermediate → marts, with tests and documentation on every model.',
  },
  {
    id: 'curated',
    label: 'Curated data models',
    tech: 'dbt marts in BigQuery',
    purpose: 'Business-ready tables with clear definitions.',
    responsibility: 'Reconcile outputs with stakeholders; publish definitions alongside the data.',
  },
  {
    id: 'analytics',
    label: 'Analytics & reporting',
    tech: 'BI tools, reporting views',
    purpose: 'Where people consume the numbers.',
    responsibility: 'Serve through governed views; monitor freshness and totals, not just row counts.',
  },
  {
    id: 'aiml',
    label: 'AI / ML platform',
    tech: 'Vertex AI, feature and training pipelines',
    purpose: 'Models and AI applications built on trusted data.',
    responsibility: 'Current focus: reliable feature data, ML pipelines and model monitoring.',
  },
]

export const rails: (ArchNode & { side: 'left' | 'right' })[] = [
  {
    id: 'composer',
    side: 'left',
    label: 'Orchestration',
    tech: 'Cloud Composer (Apache Airflow)',
    purpose: 'Schedules and sequences every step, with dependencies and retries.',
    responsibility: 'DAG design, retry policy, backfills and gating quality checks on upstream success.',
  },
  {
    id: 'cicd',
    side: 'right',
    label: 'CI/CD',
    tech: 'GitHub, GitHub Actions',
    purpose: 'Every change to pipelines, models and monitors goes through review and automated checks.',
    responsibility: 'dbt builds and project evaluation on pull requests; automated deployment.',
  },
  {
    id: 'monitoring',
    side: 'right',
    label: 'Monitoring & logging',
    tech: 'Cloud Monitoring & Logging, Monte Carlo',
    purpose: 'Observability across the whole platform.',
    responsibility: 'Freshness, volume and distribution monitors defined as code; alerting to owners.',
  },
]
