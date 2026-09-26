import type { Role } from './types'

// Newest first. Historical roles come from the 2011â€“2017+ resume.
// Placeholders mark facts the old resume did not include or that need confirming.

export const experience: Role[] = [
  {
    company: 'General Mills',
    title: 'Data Engineer',
    period: 'Aug 2022 â€“ Present',
    location: 'Bengaluru',
    current: true,
    depth: 'detailed',
    scope:
      'Data Science & Engineering, Global Impact â€” the sustainability and supply-chain data platform on Google Cloud.',
    responsibilities: [
      'Build and maintain BigQuery and dbt models for greenhouse-gas (GHG), packaging and extended producer responsibility (EPR) reporting.',
      'Orchestrate pipelines on Cloud Composer (Apache Airflow) and run CI for dbt in GitHub Actions with dbt-project-evaluator.',
      'Validate data through the legacy PLM â†’ NextGen PLM migration: attribute mapping, BigQuery diff queries and reconciliation.',
      'Work with sustainability and packaging stakeholders to translate reporting rules into data models.',
    ],
    achievements: [
      'Built a monitor-as-code system: Monte Carlo data-observability monitors defined in version control and deployed through Airflow and GitHub Actions.',
      'Root-caused a 4.5Ã— inflation in reported GHG figures to a missing filter on a restricted BigQuery view, and a separate 4Ã— discrepancy between local and scheduled dbt runs; wrote incident summaries for stakeholders.',
      'Designed ordered fallback ("waterfall") logic that assigns an organisational unit to every line in indirect-spend GHG models.',
      'Built an indirect-spend pipeline joining procurement (GEP) and ERP (SAP) spend data.',
      'Identified a 240Ã— scale multiplier in a packaging quantity field during PLM migration validation and escalated it as an incident.',
    ],
    technologies: [
      'BigQuery',
      'dbt Core',
      'Cloud Composer',
      'Apache Airflow',
      'Monte Carlo',
      'GitHub Actions',
      'Python',
      'SQL',
      'GCP',
    ],
  },
  {
    company: 'Accenture',
    title: 'Application Development Team Lead',
    period: 'May 2017 â€“ Jul 2022',
    depth: 'detailed',
    scope: 'Client-facing data engineering delivery; team lead for a 25-person team.',
    responsibilities: [
      'Led a team of 25: sprint planning, task allocation and delivery tracking in an Agile cadence.',
      'Owned client-facing project planning and requirement analysis through to end-to-end implementation.',
      'Built ETL/ELT pipelines from relational databases and file-based sources.',
      'Set up data visualisation, monitoring and Splunk alerting for production pipelines.',
    ],
    achievements: [
      'Migrated a Hive-based data lake to Google Cloud Platform.',
      'Built Azure CI/CD pipelines that load data into GCP.',
      'Automated recurring manual operational work to reduce hands-on effort.',
      'Created the Daily Monitor Guide to standardise day-to-day pipeline monitoring.',
      'Used AWS Lambda for serverless processing within the delivery stack.',
    ],
    technologies: ['GCP', 'Hive', 'Hadoop', 'Azure CI/CD', 'AWS Lambda', 'Splunk', 'Kibana', 'ETL / ELT'],
  },
  {
    company: 'TCS',
    title: 'IT Analyst',
    period: 'May 2016 â€“ Apr 2017',
    depth: 'compact',
    responsibilities: ['[ADD 1â€“2 HIGHLIGHTS FROM RESUME]'],
    achievements: [],
    technologies: [],
  },
  {
    company: 'Tech Mahindra',
    title: 'Senior Software Engineer',
    period: 'Aug 2014 â€“ Apr 2016',
    depth: 'compact',
    responsibilities: ['[ADD 1â€“2 HIGHLIGHTS FROM RESUME]'],
    achievements: [],
    technologies: [],
  },
  {
    company: 'Syntel',
    title: 'Software Engineer',
    period: 'Oct 2011 â€“ Jul 2014',
    depth: 'compact',
    responsibilities: ['[ADD 1â€“2 HIGHLIGHTS FROM RESUME]'],
    achievements: [],
    technologies: [],
  },
]

/**
 * Technologies from the historical resume that aren't pinned to a single role above.
 * Move each into the right role's `technologies` once confirmed.
 */
export const earlierStack = ['Hadoop', 'Hive', 'Kafka', 'Spark', 'Talend', 'Kibana', 'Splunk', 'Qlik']

/** Career evolution shown in the hero. `evidence` is what supports each stage. */
export const careerStages: { stage: string; evidence: string; status: 'done' | 'current' | 'next' }[] = [
  { stage: 'Software engineering', evidence: 'Syntel, Tech Mahindra, TCS (2011â€“2017)', status: 'done' },
  { stage: 'Big data engineering', evidence: 'Hadoop, Hive, Kafka, Spark', status: 'done' },
  { stage: 'Cloud data engineering', evidence: 'Hive data lake â†’ GCP migration', status: 'done' },
  { stage: 'Modern data platforms', evidence: 'BigQuery, dbt, Cloud Composer', status: 'current' },
  { stage: 'Data quality & automation', evidence: 'Monitor-as-code, CI for dbt', status: 'current' },
  { stage: 'AI/ML platform engineering', evidence: 'Vertex AI, MLOps (current focus)', status: 'next' },
]

export const education = {
  degree: 'Bachelor of Engineering, Electrical Engineering',
  school: 'Konark Institute of Science and Technology',
  period: '2007 â€“ 2011',
}
