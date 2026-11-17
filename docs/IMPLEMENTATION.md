# DAMA Development — Website Enhancement Implementation Report

**Branch:** `arena/2b5e7b3a-dama2`
**Date:** 17 November 2026
**Framework:** Next.js 15 App Router (React 19, TypeScript), static export to GitHub Pages

> **Source-file notice.** The `Rawasin Mall - Final.pdf` brochure referenced in the
> brief was **not attached to this workspace** (it is absent from the workspace,
> the repository, and every branch). Every brochure fact quoted in the prompt has
> been transcribed into a structured content module, and every item that exists
> *only inside the brochure's drawings* (floor-plan images, retail unit numbers
> and areas, individual clinic numbers and areas) is marked **source-pending**
> rather than invented. See §7 and §8.

---

## 1. Existing website audit

| Area | Finding |
| --- | --- |
| Framework / build | Next.js 15.5.28 App Router, `output: "export"`, `basePath` from `NEXT_PUBLIC_BASE_PATH` (`/DAMA` on GitHub Pages), `trailingSlash: true`. Deployed by `.github/workflows/deploy.yml` via `upload-pages-artifact` → `out/`. |
| Routing | `[locale]` segment (`en`, `ar`) with `dynamicParams = false`; pages for home, about, projects + `[slug]`, living, growth, news + `[slug]`, careers, contact, privacy, terms. Root `(landing)` group redirects by browser language. |
| Styling | Tailwind CSS v4 with `@theme inline` tokens in `src/app/globals.css`; no `tailwind.config`. |
| Data | Plain TypeScript modules in `src/content/` (`site.ts`, `projects.ts`, `news.ts`, `careers.ts`, `en.ts`, `ar.ts`). No CMS or API content layer. |
| Forms | `ContactForm`, `InquiryForm`, careers application modal → `NEXT_PUBLIC_LEADS_ENDPOINT`; `src/app/api/leads/route.ts` is a starting point for a separately-hosted endpoint. Static GitHub Pages cannot execute it. |
| Motion | CSS reveal system (`data-reveal`, `.enter-*`), `RevealController`, `Lines`, `Counter`, `Parallax`; `prefers-reduced-motion` honoured in `globals.css`. framer-motion is a dependency but is not used by the section components. |
| Icons | `lucide-react`; inline SVG for the traced DAMA wordmark and social glyphs. |

### Design system findings (preserved)

| Token | Value |
| --- | --- |
| Primary | `#C51E28` (`red-primary`), dark hover `#9F121A`, soft `#FDF2F2`, border `#FCA5A5` |
| Surfaces | Canvas `#FBFBFA`, card `#FFFFFF`, stone `#F3F2EF` / `#ECEAE5`, charcoal `#111417` |
| Ink | `#14171A`; muted `#687076`; border `#ECEAE5` |
| Type | Manrope (body, 400–700), Gilda Display (display, 400), IBM Plex Sans Arabic (400–700, used for all Arabic display + body), Montserrat (logo wordmark) |
| Type scale | `.heading-xl` `clamp(2.4rem,5.2vw,4.25rem)`, `.heading-lg` `clamp(2rem,3.6vw,3rem)`, `.heading-md` `clamp(1.4rem,2.4vw,1.85rem)`; eyebrow 11px/0.28em uppercase; body 14.5–16px |
| Layout | `.container-x` max-width 1240px, padding 16 / 32 / 48px; `--u: 1vw` frame-unit grid on the mockup-matched home sections; 12-column grids elsewhere |
| Shape | Pill buttons (`rounded-full`, min-height 44–48px), 18–36px card radii, `clip-slant` / `clip-chevron` / `clip-step` architectural masks, mirrored for RTL |
| Elevation | Soft shadows (`shadow-xs`, `0_24px_50px_-30px`), 1px borders rather than heavy elevation |
| Motion | `--ease-soft: cubic-bezier(0.22,1,0.36,1)`, 200 / 650 / 900ms durations, 90ms stagger |
| Components | `ButtonLink`, `Button`, `Badge`, `Breadcrumbs`, `Logo`, `SectionIntro`, `Lines`, `Carousel`, `SectionNav`, `ProjectGallery` (lightbox + keyboard + swipe), `ProjectHero` / `Overview` / `Extras` / `Inquiry` / `RelatedProjects`, `ProjectsBrowser`, `NewsBrowser`, `Header`, `Footer` |

**Changes to the design system (minimal, deliberate):**

- Fonts are now **self-hosted** (`src/fonts/*.woff2`, loaded with `next/font/local`). The
  exact same four typefaces are used; this fixes a build that previously failed
  offline because `next/font/google` could not reach `fonts.googleapis.com`,
  removes a render-blocking third-party request and keeps the export reproducible.
- All temporary Unsplash image URLs were replaced with local `/public/images`
  assets — no third-party image host is used at runtime.
- No new palette, typeface, button shape, radius scale or competing card system
  was introduced. New components reuse `container-x`, `SectionIntro`,
  `ButtonLink`, `Badge`, `SectionNav`, `ProjectGallery`, `stagger` and the reveal
  attributes.

### Problems found and fixed

1. **Build broken in this environment** — Google Fonts fetch failure (fixed with local fonts).
2. **Unverified company statistics published as fact** — “25+ years”, “10+ communities”, “3K+ families”, “100% commitment”. Replaced with four **brochure-confirmed Rawasin Mall facts**, explicitly captioned and sourced.
3. **Fabricated newsroom** — four invented articles with future dates (2026), fictional construction milestones, quotes and a 2028 handover promise. Removed. The newsroom now has a designed content-pending state and zero articles.
4. **Invented project data** — Golden Square / New Cairo locations, 480 residences, 72% landscaping, “Biophilic Modernism”, “Under Construction”, 260 boutique residences, resort pools, etc. Removed. Rawasin is now New Sohag / Upper Egypt; DAMA Residence and DAMA View publish no unapproved facts.
5. **Invented careers content** — four speculative job postings removed; the careers page and application form remain functional with an “awaiting approved vacancies” state.
6. **Broken/incoherent hierarchy** — `Rwasin` was spelled inconsistently and Rawasin Mall did not exist. Canonical spelling is now **Rawasin / رواسين** (pending DAMA confirmation, §8); `/projects/rwasin` still resolves and points to the canonical URL.
7. **No Rawasin Mall experience, no Living page, no Our Impact page** (both were 13-line stubs) — all implemented.
8. **SEO** — `metadataBase` pointed at a domain DAMA does not own; no robots.txt, no sitemap, relative canonicals that break under `basePath`. Fixed.

---

## 2. Implementation plan that was executed

| Phase | Work |
| --- | --- |
| 0 | Repository + live-site + reference-site audit, design-token inventory, route/link audit, content-integrity audit. |
| 1 | Local fonts, corrected data layer, new `Header` (mega-menu, EN/AR switcher, mobile drawer), new `Footer`, rebuilt homepage, About DAMA (source-based who/mission/vision, leadership framework, org chart, project-specific partners), Living, Our Impact, News, Contact + sales enquiry. |
| 2 | Corrected project hierarchy, categories/filters, dedicated project landing pages, `ProjectComponents`, legacy URL compatibility, `/developments` aliases. |
| 3 | Full Rawasin Mall experience: hero, about, vision, location, master plan, interactive 5-floor explorer with zoom/lightbox, unit types, partners, gallery, sales enquiry. |
| 4 | Living page, Our Impact framework, newsroom template with content-pending state. |
| 5 | Build, lint, 71-assertion integrity suite, broken-link/image audit, SEO/metadata validation, automated Chromium screenshots + console/overflow checks at desktop / tablet / mobile in EN and AR, reduced-motion check. |

---

## 3. Final sitemap

Canonical routes (each has an EN and AR version, with reciprocal `hreflang` and a canonical tag). Legal pages are intentionally `noindex` and excluded from `sitemap.xml` until DAMA supplies approved text:

```
/en                                  Home
/en/about                            About DAMA
/en/projects                         Our Developments (filters: all / residential / commercial / mixed-use)
/en/projects/rawasin                  Rawasin (main development)
/en/projects/rawasin/mall             Rawasin Mall (component / destination)
/en/projects/dama-residence           DAMA Residence
/en/projects/dama-view                DAMA View
/en/news                              News & Media
/en/news/[slug]                       Article detail template (no approved articles yet)
/en/contact                           Contact Us + enquiry form
/en/careers                           Careers (secondary, no approved vacancies)
/en/privacy-policy                    Privacy Policy
/en/terms-of-use                      Terms of Use
/ar/...                               Arabic equivalents of all the above
```

Compatibility routes: `/{locale}/projects/rwasin` renders Rawasin with a canonical
tag and a visible “page moved” link; `/{locale}/developments`,
`/{locale}/developments/{slug}` and `/{locale}/developments/rawasin/mall` are
`noindex` redirect pages to the canonical `/projects/...` URLs. No existing URL
was broken. `robots.txt` and `sitemap.xml` (24 `<loc>` entries with hreflang
alternates) are in `public/`.

---

## 4. Implemented pages

All 14 canonical page templates listed above, in both languages, plus the
compatibility aliases. Home now has: hero → verified Rawasin Mall fact strip →
About DAMA → development card grid → featured Rawasin → Rawasin Mall feature →
Living → mission pillars → Our Impact teaser → News & Media → contact CTA.

---

## 5. Reusable components created or improved

**Improved:** `Header` (accessible mega-menu, EN/AR switcher, expandable mobile
projects submenu, focus return, Escape/outside-click handling), `Footer`
(complete link set, contact details, all projects), `Hero` (data-driven headline),
`Stats` (sourced fact strip), `News` (empty state), `Projects`, `NewsBrowser`
(data-driven categories), `InquiryForm` (optional enquiry-type select),
`CareersView` (empty state), `Leadership`, `Partners`, `ProjectGallery` (reused).

**Created:** `src/lib/seo.ts`, `components/CorporateHeroJsonLd.tsx`,
`components/LivingPageView.tsx`, `components/ImpactPageView.tsx`,
`components/sections/CorporateFeatures.tsx` (`MallFeature`, `ImpactTeaser`),
`components/about/OrgStructure.tsx`,
`components/projects/detail/ProjectComponents.tsx`,
`components/rawasin/FloorExplorer.tsx` (tabs, zoom, pan, lightbox, schedules),
`components/rawasin/MallPageView.tsx`,
`content/rawasin.ts`, `content/pages.ts`.

**Data:** `content/projects.ts` (hierarchy + `components`), `content/news.ts`
(empty, typed), `content/careers.ts` (empty, typed), `content/site.ts` (local
images only), `content/en.ts` / `content/ar.ts` (new nav labels, source-based
corporate copy, corrected filters and enquiry types).

---

## 6. Rawasin Mall content integration summary

All brochure statements quoted in the brief were converted into structured,
bilingual, editable data in `src/content/rawasin.ts` and rendered as an
architectural website experience rather than a PDF gallery:

- Hero, tagline “Where Heritage Meets Tomorrow.”, five supporting points, CTAs.
- About the Mall: lead statement + three structured statements + separate
  commercial-customer copy.
- Vision: “To bring new energy to New Sohag, step by step…”.
- Location: strategic southern-expansion statement, six nearby destinations,
  road network, New Airport Axis, area map link, explicit “no published travel
  times / no exact plot coordinates” note.
- Master Plan: 6,280 m² commercial land, 123 m frontage, five levels, level-stack
  orientation diagram, aerial context image, CTA into the floor explorer.
- Floor Explorer: 5 selectable levels, per-level activities, confirmed facility
  cards with exact areas, unit schedule table, source notes, zoom/lightbox.
- Unit Types: retail and medical sections with confirmed areas and a disclaimer
  that availability, pricing, payment plans and ownership are not published.
- Partners: ACCORD (mall management & operations), WE (telecommunications and
  technology infrastructure), Dar Arafa Architecture / Walid Arafa (architectural
  direction) — each with an explicit **project-specific context** label.
- Gallery (existing `ProjectGallery` lightbox with keyboard + mobile swipe),
  sales enquiry form with five Rawasin Mall enquiry types, source footnote.

---

## 7. Floor-by-floor content validation report

| Floor | Published (exact) | Source-pending (not invented) |
| --- | --- | --- |
| Basement | “Everyday Essentials in One Place”; hypermarket **754 m²**; underground parking; convenient access. | No numbered retail schedule exists for this level in the brief — stated as such. |
| Ground | Categories: Retail Shops, Restaurants, Cafés, Pharmacies, Medical Reception. Restaurant 1 **192.5 m²**, Restaurant 2 **168.9 m²**, Café **191.55 m²**; medical reception is a separate functional component. | Retail unit numbers and areas from the original Ground Floor plan. No rounding, no approximation. |
| First | Only the label and an explicit statement that the original plan is authoritative. | All unit categories, unit numbers, areas, service and facility labels. **No first-floor function was inferred.** |
| Second | Medical & Healthcare; **22 clinics** ranging **18.32 to 45.4 m²**; Medical Laboratory 1 **189 m²**; Medical Laboratory 2 **174.3 m²**; Obstetrics & Gynecology Department **638 m²** (explicitly a department, not a clinic); reception / waiting / medical services references. | The 22 individual clinic numbers and areas from the original plan. |
| Third | Indoor Gym **350.7 m²**, Outdoor Gym **212.8 m²**, Health Club **186.7 m²**, Beauty Centre **71.9 m²**, Clinic **38 m²**, Café **154 m²**, Outdoor Café **148 m²**; indoor/outdoor distinction; published 7-row schedule. | — |

Master plan: **6,280 m²**, **123 metres**, Basement + Ground + First + Second +
Third. All measurements are stored as the exact strings from the brief (Latin
digits in both languages, `dir="ltr"` in technical tables), and
`scripts/test-integrity.ts` asserts every value.

**Plan images:** the brief requires the original brochure plans to be shown at a
readable resolution with zoom/lightbox support. Because the PDF was not supplied,
the plan viewer renders a clearly-labelled “original floor plan pending” state
with a contact CTA — no redrawn or approximate plan is displayed. The viewer is
fully implemented and **activates automatically at build time** when a file named
`basement.jpg|png|webp`, `ground.*`, `first.*`, `second.*`, `third.*` is placed in
`public/images/rawasin/plans/`. No code change is needed. No artificial unit
hotspots were created.

The official master-plan *drawing* is likewise pending; the aerial image is
explicitly captioned “for context” so it is not presented as a technical plan.

---

## 8. Information still required from DAMA

**Blocking the remaining Rawasin Mall items**

1. The `Rawasin Mall - Final.pdf` source file (or exported high-resolution floor
   plan images for all five levels and the master-plan drawing).
2. Exact retail unit schedule (numbers + areas) for the Ground Floor.
3. All First Floor unit categories, numbers, areas and service/facility labels.
4. The 22 individual Second Floor clinic numbers and areas.
5. Official logos for ACCORD, WE and Dar Arafa Architecture.
6. Exact plot coordinates and a verified Google Maps pin (only an area search
   link is published today).

**Company information pending confirmation**

7. Board of Directors and Executive Management names, official titles, portraits,
   biographies and reporting structure.
8. Company-wide strategic partnerships (the three known partners are
   project-specific only).
9. Verified impact/sustainability content: programmes, certifications, awards,
   statistics and achievements.
10. Approved news, press releases, project updates and events.
11. Approved current vacancies.
12. DAMA Residence / DAMA View: locations, areas, unit types, status, imagery,
    delivery dates.
13. Current unit availability, prices, payment plans, ownership/rental terms.
14. Verification of carried-over contact details (phone, emails, office address,
    working hours, social URLs) — these were on the previous site and are
    **not independently verified**; they are currently hidden from the public UI.
15. Confirmation of the approved spelling of **Rawasin / Rawaseen** (EN and AR).
    The build uses `Rawasin` / `رواسين` consistently; the legacy `rwasin` slug is
    retained only as a URL alias.
16. Approval of the proposed marketing headlines (the brief marks them as draft
    copy): “Building Communities. Shaping Tomorrow.”, “Where Heritage Meets
    Tomorrow.”, “More Than Places. Experiences That Bring Life Together.”,
    “Designed Around the Way You Live.”, “Let's Start a Conversation.”
17. Replacement of the current art-direction photography with approved official
    DAMA project imagery.
18. Approved privacy policy and terms of use text, plus an approved publication
    date (the previous "October 2026" date was invented).
19. Approved careers culture/values copy (the four previous pillars were
    speculative).

---

## 9. Responsive / accessibility / QA results

- **Build:** `NEXT_PUBLIC_BASE_PATH=/DAMA npm run build` → compiled successfully,
  48 static pages generated, static export completed, zero TypeScript errors.
- **Lint:** `npm run lint` → clean (no warnings/errors).
- **Integrity:** `npm run test:integrity` → 71 assertions passed, 0 failed
  (dictionary parity, hierarchy, exact measurements, source-pending schedules,
  no fabricated news/vacancies, lead validation).
- **Browser checks:** automated Chromium (153) screenshots at 1440×900 desktop,
  834×1112 tablet and 390×844 mobile, including EN LTR and AR RTL. All nine
  captures report `scrollWidth === clientWidth` (no horizontal overflow), one
  `<h1>` per page, zero console errors and zero uncaught page errors. A
  hydration mismatch on the developments listing caused by `useReducedMotion()`
  during SSR was found and fixed (CSS override in `globals.css` + stable markup
  in `Parallax`).
- **Functional browser tests:** 24 headless-Chromium assertions passed: five
  floor tabs with correct `aria-selected`, floor headline/schedule updates,
  exact third-floor areas, keyboard tab navigation, source-pending notices,
  desktop mega-menu open/close, gallery lightbox open/Escape close, enquiry
  inline validation with no fake success, mobile drawer + projects submenu,
  EN/AR switcher, zero uncaught page errors.
- **Plan viewer:** verified with a temporary QA image that was deleted
  immediately afterwards — zoom in to 125%, full-screen lightbox open, Escape
  close. **No plan image is published** because the brochure PDF is missing.
- **Links/images:** automated crawl of all 45 exported HTML files → **0 broken
  internal links, 0 broken images**, 0 references to `images.unsplash.com`.
  Pending legal pages are `noindex` and omitted from `sitemap.xml`.
  External hosts are limited to Google Maps area links and the site's own
  canonical URLs (unverified social profiles and contact details are hidden).
- **Responsive:** all new grids use `sm:`/`lg:` breakpoints with single-column
  mobile layouts; the floor selector is a horizontally-scrollable tablist; the
  unit schedule scrolls horizontally inside its card; form columns collapse to
  one; no fixed-width elements on small screens; `overflow-x: clip` on `body`
  plus `no-scrollbar` on scroll strips prevents horizontal overflow.
- **Accessibility:** semantic `header/nav/main/footer/section`, skip link,
  breadcrumbs, `aria-current`, labelled tablist with arrow/Home/End keyboard
  navigation, `aria-selected`/`aria-controls`, labelled zoom controls, lightbox
  `role="dialog"` + `aria-modal` + focus management + Escape, visible
  `:focus-visible` outline, `aria-live` form status, inline validation with
  `aria-invalid`/`aria-describedby`, descriptive `alt` text, `dir="ltr"` on
  technical/number strings inside RTL, mirrored icons via `.flip-rtl`.
- **Motion:** entrance animations are CSS-only and gated by `reveal-on`;
  `prefers-reduced-motion` disables all transitions/animations in
  `globals.css`. Floor changes use a 300ms transform and no autoplay looping.
- **RTL:** automated AR mobile capture confirms `lang="ar"`, `dir="rtl"` and
  mirrored layout; every new section uses logical properties (`start/end`, `ps/pe`,
  `ms/me`) and the existing `[dir="rtl"]` clip-path overrides; Arabic uses IBM
  Plex Sans Arabic for both display and body.
- **Performance:** self-hosted `woff2` with `display: swap` and `preload` for
  Latin fonts, no third-party image hosts, `next/image` with `sizes`/`fill`
  throughout, lazy loading for below-the-fold images, no new runtime
  dependencies (only `tsx` added as a dev tool). Floor Explorer is the only new
  client bundle (~4.3 kB on the mall route).

> **Captured screenshots** are in `docs/screenshots/`:
> `home-desktop.png`, `home-tablet.png`, `home-mobile.png`,
> `developments-desktop.png`, `developments-mobile.png`,
> `rawasin-mall-desktop.png`, `rawasin-mall-tablet.png`,
> `rawasin-mall-mobile.png`, `rawasin-mall-ar-mobile.png`,
> `rawasin-mall-third-floor.png` (Floor Explorer with the Third Floor tab
> active).
> These are automated headless-Chromium captures of the live preview; real-device
> testing on physical hardware has not been performed.

---

## 10. SEO and performance improvements

- Correct `metadataBase` (`https://mina13323.github.io/DAMA`, overridable with
  `NEXT_PUBLIC_SITE_URL` + `NEXT_PUBLIC_BASE_PATH`).
- Absolute canonical URLs and `hreflang` (`en`, `ar`, `x-default`) on every page;
  aliases are `noindex`.
- Per-page titles, descriptions and Open Graph (including Twitter card,
  `og:locale`, `og:url`).
- `robots.txt` + valid `sitemap.xml` with 24 URLs and hreflang alternates;
  pending legal pages are `noindex` and omitted.
- Accurate JSON-LD: `RealEstateAgent` organisation on the homepage and `Place`
  for Rawasin Mall (no invented ratings, addresses or awards).
- Semantic HTML, descriptive `alt`, lazy-loaded/responsively-sized imagery,
  self-hosted fonts, reduced JS.

---

## 11. Known limitations

1. **The brochure PDF was not supplied.** Floor-plan images, the master-plan
   drawing and all drawing-only unit schedules are source-pending and visibly
   marked as such. See §7 for the zero-code-change activation path.
2. **No backend is connected.** Forms validate, show accurate loading/success/
   error states and never display fake success. `NEXT_PUBLIC_LEADS_ENDPOINT`
   must point to a CORS-enabled endpoint; `src/app/api/leads/route.ts` is a
   starting point that must be secured, connected to a CRM/webhook and deployed
   separately from the static export. Set the variable in the deploy workflow
   once available. `NEXT_PUBLIC_` values are never secrets.
3. `output: "export"` cannot issue HTTP 301s. Compatibility aliases use an
   immediate `location.replace`, a `<meta refresh>` fallback, a visible link,
   `noindex` and a canonical tag.
4. The Our Impact page and newsroom are intentionally in a content-pending state
   because DAMA has not supplied approved information. The article detail route
   keeps a non-indexed placeholder page so the static export can build; it is
   replaced automatically as soon as an approved article is added to
   `src/content/news.ts`.
5. Careers is a secondary page (not in the main navigation) with no published
   vacancies until DAMA approves them.
6. Contact details, social URLs, legal text and the remaining photography were
   carried over from the previous site and are either hidden or explicitly
   marked content-pending until the verification listed in §8 is complete.
7. Visual QA used automated headless Chromium captures (see §9); real-device
   testing on physical hardware has not been performed.

---

## 12. How to run / verify

```bash
npm ci
npm run dev                                  # local development
npm run lint                                 # eslint
npm run test:integrity                       # 71 data-integrity assertions
NEXT_PUBLIC_BASE_PATH=/DAMA npm run build    # production static export -> out/
```

To publish the original floor plans, drop files into
`public/images/rawasin/plans/` (`basement.jpg`, `ground.jpg`, `first.jpg`,
`second.jpg`, `third.jpg` — PNG/WebP also supported) and rebuild. To publish
approved news or vacancies, add entries to `src/content/news.ts` or
`src/content/careers.ts`; to add a development, add one object to
`src/content/projects.ts`.

**Sitemap regeneration:** `public/sitemap.xml` and `public/robots.txt` target
the current GitHub Pages origin. If DAMA moves to its own domain, set
`NEXT_PUBLIC_SITE_URL` / `NEXT_PUBLIC_BASE_PATH` and regenerate both files.
