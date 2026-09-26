import type { Project } from './types'

// Featured work. Every metric here is either documented or an explicit [ADD ...] placeholder.
// Internal system names are kept generic on purpose — check your employer's policy before adding more.

export const projects: Project[] = [
  {
    id: 'plm-migration',
    title: 'NextGen PLM data migration & validation',
    domain: 'Packaging data, System migration',
    summary:
      'Validated packaging data as the source of record moved from a legacy PLM system to NextGen PLM, so downstream reporting kept producing the same answers.',
    problem: 'A PLM migration could silently break every packaging report downstream.',
    approach: 'Attribute-level mapping on name, values, length and type, plus BigQuery diffs of old vs new outputs.',
    impact: '18 attributes assessed: 11 mapped, 7 routed back to the NextGen PLM team for updates.',
    facts: [
      { value: '18', label: 'relevant attributes assessed' },
      { value: '11', label: 'mapped successfully' },
      { value: '7', label: 'flagged for NextGen PLM updates' },
    ],
    stack: ['BigQuery', 'SQL', 'dbt', 'GCP'],
    caseStudy: {
      businessProblem:
        'Packaging specifications feed sustainability and packaging reporting. Replacing the legacy PLM system meant every downstream model depended on the new system delivering the same fields in the same shape. The business needed continuity through the cut-over, not a new set of numbers.',
      technicalChallenge:
        'A field can match by name and still break downstream through its allowed values, its length or its data type. The extracts also carried duplicates at the product-packaging grain, which would drown real differences in noise, and one quantity-per-unit field arrived with a 240× scale multiplier.',
      architecture: [
        'Legacy PLM extract',
        'NextGen PLM extract',
        'BigQuery staging',
        'Attribute mapping matrix',
        'Diff & reconciliation queries',
        'Output table comparison',
        'Findings to PLM team',
      ],
      engineeringApproach: [
        'Built a mapping of the 18 relevant attributes, comparing each on field name, values, length and data type.',
        'Wrote BigQuery diff queries comparing legacy and NextGen packaging data record by record, and compared final output tables.',
        'Deduplicated the dbt models for PET product packaging before comparison, so differences reflected real change.',
        'Traced the 240× multiplier in a packaging quantity field and communicated it as an incident.',
        'Prepared the validation to run again against GCP tables after cut-over.',
      ],
      technologyStack: ['BigQuery', 'SQL', 'dbt', 'GCP'],
      dataQualityStrategy: [
        'Four-way attribute checks: name, allowed values, length, data type.',
        'Deduplicate to the declared grain before diffing.',
        'Row-level diffs plus output-level comparisons.',
        'Scale sanity checks on unit-of-measure fields.',
      ],
      automation: ['Reusable diff queries that can be re-run for each new extract. [ADD DETAIL IF SCHEDULED]'],
      businessImpact: [
        '11 of 18 attributes confirmed as mapped.',
        '7 attributes identified as needing updates in NextGen PLM before downstream use.',
        'A 240× scale defect identified and escalated as an incident.',
        '[ADD VERIFIED METRIC]',
      ],
      lessonsLearned: [
        'Mapping by field name is not enough; values, length and type break pipelines just as often.',
        'Duplicates at the wrong grain make a diff report your own data problems instead of the migration’s.',
      ],
      futureImprovements: [
        'Promote the reconciliation queries into dbt tests that run on every load after cut-over.',
        'Add range checks on unit-of-measure fields so scale defects fail a build instead of reaching a report.',
      ],
    },
  },
  {
    id: 'packaging-platform',
    title: 'Packaging data platform',
    domain: 'Packaging, Recyclability, Regional reporting',
    summary:
      'Data models behind packaging and recyclability reporting across regions, including EU/AU, with version comparison and reconciliation built in.',
    problem: 'Packaging and recyclability reporting needs weights that are correct, current and comparable across versions.',
    approach: 'Version-aware weight models with reconciliation checks and tolerance-based comparison.',
    impact: 'Improved EU/AU data accuracy and availability. [ADD VERIFIED METRIC]',
    facts: [
      { value: '[ADD VERIFIED METRIC]', label: 'EU/AU data accuracy improvement' },
      { value: '[ADD VERIFIED METRIC]', label: 'EU/AU data availability improvement' },
    ],
    stack: ['BigQuery', 'SQL', 'dbt', 'Airflow'],
    caseStudy: {
      businessProblem:
        'Packaging recyclability and packaging-weight reporting drive sustainability commitments. Regional teams, including EU/AU, needed data they could rely on and that arrived when they needed it.',
      technicalChallenge:
        'The same product appears in several versions of the data, and weights must be aggregated without losing descriptive attributes. Totals have to agree between intermediate and final outputs, and comparisons between sources need tolerance for legitimate rounding.',
      architecture: [
        'PLM & invoice sources',
        'BigQuery staging',
        'Weight aggregation',
        'Version comparison (new vs old)',
        'Recyclability change model',
        'Final reporting output',
      ],
      engineeringApproach: [
        'Aggregated total packaging weight at the product grain while keeping the remaining attributes intact.',
        'Compared new and old versions and excluded base products whose weight did not change, so reviewers saw only real changes.',
        'Added a reconciliation check requiring summed weight differences to match between the recyclability-change model and the final output.',
        'Compared PLM data with invoice data using category and quantity matches and a ±10% tolerance on net weight.',
        'Rebuilt a versioned output table by appending regional data, including EU/AU, and realigning run dates after a backup mismatch.',
      ],
      technologyStack: ['BigQuery', 'SQL', 'dbt', 'Apache Airflow'],
      dataQualityStrategy: [
        'Cross-model reconciliation of summed weight differences.',
        'Version-over-version change detection.',
        'Tolerance bands for cross-source comparison.',
      ],
      automation: ['[ADD DETAIL: scheduling, alerting or automated checks for this platform]'],
      businessImpact: [
        'EU/AU data accuracy improvement: [ADD VERIFIED METRIC]',
        'EU/AU data availability improvement: [ADD VERIFIED METRIC]',
      ],
      lessonsLearned: [
        'A reconciliation check between two models is cheap and catches logic drift that unit tests miss.',
        'Showing reviewers only what changed between versions makes validation faster and more likely to happen.',
      ],
      futureImprovements: [
        'Turn tolerance comparisons into dbt tests with thresholds stored as configuration.',
        'Publish freshness and completeness indicators alongside regional reports.',
      ],
    },
  },
  {
    id: 'ghg-pipeline',
    title: 'GHG data pipelines',
    domain: 'Sustainability, Greenhouse-gas reporting',
    summary:
      'Greenhouse-gas data models covering packaging weight logic and indirect spend, with incident-grade root-cause analysis when figures went wrong.',
    problem: 'GHG figures feed sustainability reporting; an inflated number is a credibility problem, not just a bug.',
    approach: 'Explicit assignment rules, multi-source joins and disciplined incident analysis.',
    impact: 'Traced a 4.5× and a 4× inflation to their causes and documented both for stakeholders.',
    facts: [
      { value: '4.5×', label: 'inflation traced to a missing view filter' },
      { value: '4×', label: 'local vs scheduled dbt discrepancy resolved' },
    ],
    stack: ['BigQuery', 'dbt Core', 'Cloud Composer', 'SQL'],
    caseStudy: {
      businessProblem:
        'Greenhouse-gas reporting combines packaging, sales and spend data. The numbers feed sustainability reporting, so they must be traceable and defensible, including for EU/AU and North Asia use cases.',
      technicalChallenge:
        'Indirect-spend lines need an organisational owner even when source data is incomplete. Spend comes from separate procurement and ERP systems. And inflated figures can come from places that no test covers — a view’s access filter, or a difference between how dbt runs locally and on the scheduler.',
      architecture: [
        'Procurement (GEP) spend',
        'ERP (SAP) spend',
        'BigQuery staging',
        'Org-unit assignment waterfall',
        'GHG models (dbt)',
        'Reporting views',
      ],
      engineeringApproach: [
        'Designed an ordered fallback ("waterfall") that assigns an organisational unit to every indirect-spend line.',
        'Built the indirect-spend pipeline joining GEP procurement data with SAP spend data.',
        'Implemented packaging weight logic feeding GHG models for EU/AU and North Asia.',
        'Root-caused a 4.5× inflation to a missing team filter on a restricted BigQuery view.',
        'Root-caused a 4× discrepancy between local and scheduled dbt runs of a sales-volume model.',
        'Wrote one-page incident summaries so stakeholders understood cause, scope and fix.',
      ],
      technologyStack: ['BigQuery', 'dbt Core', 'Cloud Composer', 'Apache Airflow', 'SQL'],
      dataQualityStrategy: [
        'Assignment rules that are explicit and ordered rather than implicit in joins.',
        'Compare environment outputs (local vs scheduled) when figures disagree.',
        'Treat access-layer filters as part of the data contract.',
      ],
      automation: ['Scheduled on Cloud Composer. [ADD DETAIL]'],
      businessImpact: [
        'Two inflation incidents (4.5× and 4×) traced to root cause and documented.',
        '[ADD VERIFIED METRIC]',
      ],
      lessonsLearned: [
        'Row counts can look normal while totals are wildly wrong; check aggregates against a known baseline.',
        'The environment a model runs in is part of the model.',
      ],
      futureImprovements: [
        'Add aggregate-level anomaly monitors on reported GHG totals.',
        'Test view filters explicitly as part of CI.',
      ],
    },
  },
  {
    id: 'dbt-quality',
    title: 'dbt data-quality automation',
    domain: 'Analytics engineering, Developer productivity',
    summary:
      'Automated checks and recommendations for dbt projects, so structural and quality issues surface in pull requests instead of production.',
    problem: 'Quality rules that live in reviewers’ heads are applied inconsistently.',
    approach: 'dbt-project-evaluator in GitHub Actions, plus a dbt Code Quality Assistant for recommendations.',
    impact: '[ADD VERIFIED METRIC]',
    facts: [{ value: '[ADD VERIFIED METRIC]', label: 'e.g. issues caught in CI per month' }],
    stack: ['dbt Core', 'GitHub Actions', 'dbt-project-evaluator', 'Python'],
    caseStudy: {
      businessProblem:
        'As a dbt project grows, missing tests, undocumented models and tangled dependencies make it slower to change safely. Reviews catch some of it, inconsistently.',
      technicalChallenge:
        'Make project standards checkable by machines and visible at the point of change, without slowing down contributors.',
      architecture: [
        'Pull request',
        'GitHub Actions',
        'dbt build & tests',
        'dbt-project-evaluator',
        'Code Quality Assistant',
        'Recommendations on PR',
      ],
      engineeringApproach: [
        'Ran dbt-project-evaluator in GitHub Actions to check project structure, testing and documentation coverage.',
        'Built a dbt Code Quality Assistant that produces automated data-quality recommendations. [ADD DETAIL]',
        'Wrote GitHub Copilot prompt files tailored to the team’s GCP and dbt stack.',
      ],
      technologyStack: ['dbt Core', 'GitHub Actions', 'dbt-project-evaluator', 'GitHub Copilot'],
      dataQualityStrategy: [
        'Standards enforced in CI rather than by convention.',
        'Recommendations delivered where the developer is working: the pull request.',
      ],
      automation: ['Runs on every pull request through GitHub Actions.'],
      businessImpact: ['[ADD VERIFIED METRIC]'],
      lessonsLearned: ['A check that runs on every change beats a guideline that runs on memory.'],
      futureImprovements: ['Track evaluator findings over time as a project-health trend.'],
    },
  },
  {
    id: 'automation',
    title: 'Data engineering automation',
    domain: 'Monitoring, Validation, Orchestration',
    summary:
      'Monitoring and validation treated as code: observability monitors in version control, quality checks sequenced in Airflow, and runbooks for day-to-day operations.',
    problem: 'Manual monitoring doesn’t scale and drifts from the pipelines it watches.',
    approach: 'Monitor-as-code with Monte Carlo, Airflow and GitHub Actions; generated validation SQL.',
    impact: 'Monitors versioned and deployed with the pipelines they protect.',
    facts: [{ value: '[ADD VERIFIED METRIC]', label: 'e.g. monitors managed as code' }],
    stack: ['Monte Carlo', 'Apache Airflow', 'GitHub Actions', 'Python', 'SQL'],
    caseStudy: {
      businessProblem:
        'Data-quality monitors created by hand in a UI fall out of step with the pipelines they watch, and nobody can review what changed.',
      technicalChallenge:
        'Monitors must deploy alongside the models they cover, run only when the data they check is fresh, and be reviewable like any other code.',
      architecture: [
        'Monitor definitions (Git)',
        'GitHub Actions deploy',
        'Airflow DAG',
        'dbt model task',
        'Monte Carlo rules',
        'Alerts',
      ],
      engineeringApproach: [
        'Built a monitor-as-code system: Monte Carlo monitors defined in version control and deployed through GitHub Actions and Airflow.',
        'Sequenced quality rules in Airflow so they run only after the dbt model task succeeds.',
        'Generated validation SQL from metadata queries and executed it programmatically.',
        'Earlier, at Accenture: created the Daily Monitor Guide, set up Splunk alerts and automated manual operational work.',
      ],
      technologyStack: ['Monte Carlo', 'Apache Airflow', 'Cloud Composer', 'GitHub Actions', 'Python', 'SQL', 'Splunk'],
      dataQualityStrategy: [
        'Monitors reviewed in pull requests.',
        'Checks gated on upstream success to avoid false alarms on stale data.',
      ],
      automation: ['Deployment and scheduling fully automated through GitHub Actions and Airflow.'],
      businessImpact: ['[ADD VERIFIED METRIC]'],
      lessonsLearned: ['Monitoring is part of the pipeline’s definition, not an afterthought in another tool.'],
      futureImprovements: ['Generate baseline monitors automatically for every new dbt model.'],
    },
  },
]
