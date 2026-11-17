# DAMA Development — corporate website

Bilingual (EN/AR) corporate real estate website built with **Next.js 15 App
Router**, React 19, TypeScript and Tailwind CSS v4. It is a **static export**
deployed to GitHub Pages by `.github/workflows/deploy.yml`.

## Getting started

```bash
npm ci
npm run dev            # http://localhost:3000 (redirects to /en or /ar)
npm run lint            # eslint
npm run test:integrity  # 71 data-integrity assertions
NEXT_PUBLIC_BASE_PATH=/DAMA npm run build   # production static export -> out/
```

The deploy workflow injects `NEXT_PUBLIC_BASE_PATH` from the Pages
configuration, so a local GitHub Pages build should set it to `/DAMA`.

## Architecture

```
src/app/[locale]/                 EN + AR routes (static, dynamicParams = false)
src/app/[locale]/projects/rawasin/mall/   Rawasin Mall destination
src/app/[locale]/developments/[[...path]]  compatibility aliases -> /projects
src/components/                   global + section components
  sections/                       homepage sections
  about/                          corporate profile sections
  projects/detail/                project landing page template
  rawasin/                        Rawasin Mall page + Floor Explorer
src/content/                      all content (single source of truth)
  projects.ts                     development hierarchy + cards + copy
  rawasin.ts                      Rawasin Mall brochure data, floors, partners
  pages.ts                        Living / Our Impact copy
  news.ts / careers.ts            typed, intentionally empty until approved
  site.ts / en.ts / ar.ts         site config + UI dictionaries
src/fonts/                        self-hosted woff2 (Manrope, Gilda Display,
                                  IBM Plex Sans Arabic, Montserrat)
src/lib/seo.ts                    canonical / hreflang / JSON-LD helpers
public/robots.txt, sitemap.xml    SEO
docs/IMPLEMENTATION.md            full audit, sitemap, content report, QA
```

Content is data-driven: adding a project, article or vacancy is a data edit,
not a template edit. The design tokens live in `src/app/globals.css` and are
intentionally unchanged (see `docs/IMPLEMENTATION.md` §1).

## Content policy

Only brochure-confirmed or DAMA-approved information is published. The site
previously contained invented statistics, news, project facts and job postings;
these were removed. Sections without approved content (Our Impact, Newsroom,
careers vacancies, leadership profiles, organisational detail, original floor
plans) render explicit content-pending states rather than placeholders that
look like facts. `npm run test:integrity` enforces this.

**The `Rawasin Mall - Final.pdf` was not supplied with this build.** Drawing-only
data (floor-plan images, retail unit numbers/areas, individual clinic
numbers/areas) is marked source-pending. To activate the plan viewer without a
code change, place `basement.jpg`, `ground.jpg`, `first.jpg`, `second.jpg`,
`third.jpg` (or `.png` / `.webp`) in `public/images/rawasin/plans/` and rebuild.
See `docs/IMPLEMENTATION.md` for the full list of information required from DAMA.

## Forms / integration boundary

`ContactForm`, project `InquiryForm` and the careers application modal validate
client-side and POST to `NEXT_PUBLIC_LEADS_ENDPOINT`. GitHub Pages is static, so
`src/app/api/leads/route.ts` is **not** hosted there: it is a starting point for
a separately deployed, CORS-enabled endpoint that forwards to a CRM/webhook.
Without a configured endpoint the forms report that the message was **not**
sent — they never show fake success. Never put a secret in a `NEXT_PUBLIC_`
variable; use `LEADS_WEBHOOK_URL` / `LEADS_WEBHOOK_TOKEN` on the server.

## Review before publishing

- Verify contact details, social URLs, legal text and the remaining
  art-direction photography (carried over from the previous site). Until then,
  `contactVerified`, `socialVerified` and `legalVerified` in
  `src/content/site.ts` keep unverified details out of the public UI.
- Obtain DAMA's approved spelling of Rawasin / Rawaseen (EN + AR). The build
  uses `Rawasin` / `رواسين`; `/projects/rwasin` remains as a URL alias.
- Obtain approval for the draft marketing headlines and for all corporate,
  leadership, impact and news content.
- Regenerate `public/sitemap.xml` / `robots.txt` if the production domain or
  base path changes.
