# Saransh Joshi — personal site

React + TypeScript + Vite + Tailwind CSS v4 + Lucide. Single page, data-driven.

## Run

```bash
npm install
npm run dev          # http://localhost:5173
npm run build        # production build in dist/
npm run preview      # serve dist/ locally
npm run typecheck
npm run lint
npm run check:placeholders   # lists every [ADD ...] still in the content
```

`npm run build:single` produces one self-contained `dist-single/index.html` (useful for quick previews).

## Editing content

All copy lives in `src/data/`. Components only render it.

| File | What it holds |
| --- | --- |
| `profile.ts` | Name, headline, contact links, summary, about |
| `experience.ts` | Roles, career stages (hero lineage), education |
| `projects.ts` | Featured projects and full case studies |
| `skills.ts` | Capability groups; `evidence` marks hands-on / learning items |
| `architecture.ts` | Interactive platform diagram nodes |
| `engineering.ts` | Principles, BigQuery, dbt and Airflow content |
| `ai.ts` | AI/ML path; production vs hands-on vs learning |
| `metrics.ts` | Impact numbers (documented only) |
| `leadership.ts`, `certifications.ts`, `insights.ts` | The rest |

Any string written as `[ADD SOMETHING]` renders as a visible amber placeholder and is never turned into a link.
Replace them all before publishing; `npm run check:placeholders` exits non-zero while any remain.

## Before you publish

1. Put the latest resume at `public/resume.pdf` (a placeholder ships now). Keep home address and phone off the public copy.
2. Fill email, LinkedIn and GitHub in `src/data/profile.ts`.
3. Replace `[ADD CANONICAL URL]` in `index.html` and `public/robots.txt`.
4. Confirm current-role dates, the Accenture end date and the metric placeholders.
5. Check your employer’s policy on describing internal projects publicly.
6. Keep the original resume at `docs/Saransh-Joshi-Resume.pdf` for reference; it is not deployed.

## Analytics

Off by default. To enable GA4, set `VITE_ANALYTICS_ID=G-XXXXXXX` in `.env` (see `.env.example`).

## Deploy

Any static host (Netlify, Vercel, Cloudflare Pages, GitHub Pages): build command `npm run build`, output directory `dist`.
