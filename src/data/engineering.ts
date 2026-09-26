// "How I build data platforms" and the three technical deep-dives.

export const principles: { name: string; summary: string; points: string[] }[] = [
  {
    name: 'Data quality first',
    summary: 'Correctness is designed in, not inspected in afterwards.',
    points: ['validation at ingestion', 'data contracts with source owners', 'schema checks', 'reconciliation between models', 'automated tests', 'monitoring'],
  },
  {
    name: 'Reliability',
    summary: 'Pipelines fail; what matters is how visibly and how recoverably.',
    points: ['retry strategies', 'failure handling', 'observability', 'alerting to owners', 'pipeline monitoring'],
  },
  {
    name: 'Scalability',
    summary: 'Design for next year’s data volume and this month’s bill.',
    points: ['partitioning', 'clustering', 'incremental processing', 'efficient transformations', 'cost-aware BigQuery design'],
  },
  {
    name: 'Automation',
    summary: 'If it’s done twice by hand, it becomes code.',
    points: ['CI/CD', 'automated validation', 'GitHub Actions', 'Airflow', 'Python', 'dbt automation'],
  },
  {
    name: 'Security',
    summary: 'Access is granted deliberately and reviewed.',
    points: ['IAM', 'least privilege', 'secrets management', 'environment separation'],
  },
  {
    name: 'Developer experience',
    summary: 'Make the right way the easy way for the whole team.',
    points: ['reusable components', 'documentation', 'standards', 'code quality checks', 'automated recommendations'],
  },
  {
    name: 'Business alignment',
    summary: 'A model is correct only if it matches how the business works.',
    points: ['understand requirements', 'translate them into data models', 'validate outputs with stakeholders', 'measure impact'],
  },
]

export const bigQueryPractices: { name: string; detail: string }[] = [
  { name: 'Partitioning', detail: 'Partition large tables on the column queries filter by — usually a date — so scans touch only what they need.' },
  { name: 'Clustering', detail: 'Cluster on high-selectivity filter and join keys to cut bytes scanned within partitions.' },
  { name: 'Query optimization', detail: 'Select only needed columns, filter early, and check the execution plan before a query goes into a schedule.' },
  { name: 'Incremental processing', detail: 'Process new or changed data with incremental dbt models and MERGE rather than full rebuilds.' },
  { name: 'Cost optimization', detail: 'Find the tables and query patterns that drive scanned bytes, then fix the biggest first.' },
  { name: 'Data modeling', detail: 'Declare the grain of every table; most “wrong totals” are grain mismatches.' },
  { name: 'Materialization strategy', detail: 'Views for thin logic, tables for heavy reuse, incremental for large append-mostly data.' },
  { name: 'Data quality', detail: 'Assert uniqueness at the declared grain and reconcile totals across layers.' },
]

/** Current initiative — keep the status honest and update when it ships. */
export const bigQueryCurrent =
  'Currently part of an internal Cost & Performance Optimization cohort proposing a BigQuery cost-optimization agent: it identifies inefficient scan patterns, attributes cost by table and recommends fixes. Status: proposal / MVP in progress.'

/** Illustrative dbt lineage. Generic names, not a real project. */
export const dbtLineage: { layer: string; role: string; models: string[] }[] = [
  { layer: 'Sources', role: 'Declared raw tables with freshness checks', models: ['src_plm.packaging', 'src_erp.shipments'] },
  { layer: 'Staging', role: 'One model per source table: rename, cast, deduplicate', models: ['stg_packaging', 'stg_shipments'] },
  { layer: 'Intermediate', role: 'Business logic and joins at a declared grain', models: ['int_packaging_weights'] },
  { layer: 'Marts', role: 'Tested, documented tables for consumers', models: ['fct_packaging_footprint', 'dim_product'] },
]

export const dbtPractices = [
  'Tests on keys, relationships and accepted values',
  'Documentation and lineage generated with every build',
  'Incremental models for large, append-mostly data',
  'CI on pull requests with dbt-project-evaluator',
  'Code-quality checks and automated recommendations',
]

export const airflowDag = ['Extract', 'Validate', 'Transform', 'Load', 'Data quality', 'Publish', 'Monitor']

export const airflowConcepts: { name: string; detail: string }[] = [
  { name: 'Scheduling', detail: 'Schedules match when source data actually lands, not a round number.' },
  { name: 'Dependencies', detail: 'Quality checks run only after the model they test succeeds.' },
  { name: 'Retries', detail: 'Retries with backoff for transient failures; no retries for logic errors.' },
  { name: 'Sensors', detail: 'Wait for upstream data instead of guessing with a fixed delay.' },
  { name: 'Alerts', detail: 'Failures alert the owning team with enough context to act.' },
  { name: 'Backfills', detail: 'Idempotent tasks so any date range can be re-run safely.' },
]
