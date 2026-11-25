# Adding a new development

Every development is data. Pages, menus, footer, sitemap, breadcrumbs and the
developments listing are all built from the project registry, so adding a project
needs **no new route files**.

```
src/content/projects/
  index.ts          registry: export const projects = [rawasin, …]
  types.ts          the Project model (checked by TypeScript)
  _template/        starter for a new project (never published)
  rawasin/          a full example (custom sections, mall, apartments)
```

A project with slug `nile-gardens` and a branch `residential` is served at:

| Page | URL |
|---|---|
| Hub | `/en/developments/nile-gardens/` (and `/ar/…`) |
| Branch | `/en/developments/nile-gardens/residential/` |
| A chapter | `/en/developments/nile-gardens/residential/#location` |
| An apartment card | `/en/developments/nile-gardens/residential/#apartments-type-2` |

## Steps

1. **Copy the template**
   `src/content/projects/_template/` → `src/content/projects/<slug>/`
   Set `slug` at the top of the file. Use lowercase words and hyphens: it becomes the URL.

2. **Add the media** under `public/images/<slug>/`:
   cover, overview, lifestyle and gallery images, the master plan, the hub hero image,
   and for apartments `public/images/<slug>/apartments/<model id>.webp`.

3. **Fill in the copy**, English and Arabic, from approved sources only.
   Every `TODO` must be replaced. Do not invent figures, prices, distances or dates:
   the site publishes only what DAMA has confirmed (see `docs/CONTENT-MAPPING.md`).

4. **Shape the pages** with the generic building blocks. Each `Section` with `nav: true`
   becomes a chapter in the page's chapter bar.

   | Part | Shows |
   |---|---|
   | `{ type: "hero" }` | full hero with the project's facts |
   | `{ type: "overview" }` | overview copy and image |
   | `{ type: "lifestyle" }` | lifestyle copy and images |
   | `{ type: "location" }`, `{ type: "masterPlan" }` | map link, location note, master plan |
   | `{ type: "apartmentShowcase" }` | stacked apartment cards from `copy.models` |
   | `{ type: "inquiry" }` | enquiry form |
   | `{ type: "branches" }` | hub cards linking to each branch |
   | `{ type: "film", film: "…" }` | a film from the project's `films` |
   | `{ type: "tabs", tabs: […] }` | tabbed panels (floors, unit types, …) |
   | `{ type: "blocks", from, ids }` | blocks from a block set: `bento`, `ranges`, `facts`, `cards`, `table`, `split`, `cta`, … |

   For anything truly bespoke, register a component in
   `src/components/projects/ProjectSections.tsx` (`custom` map) and use
   `{ type: "custom", component: "<name>" }`.

5. **Register it** in `src/content/projects/index.ts`:
   ```ts
   import { nileGardens } from "./nile-gardens";
   export const projects: Project[] = [rawasin, nileGardens];
   ```
   Set `featured: true` on the project the home page and header menu should showcase
   (only one).

6. **Update the corporate copy that names Rawasin as the only development**
   (e.g. the "portfolio" and "two branches" blocks in `developmentsBlocks`,
   `src/content/page-content.ts`), and the integrity test's portfolio assertions in
   `scripts/test-integrity.ts` (it currently expects exactly one project).

7. **Check**
   ```bash
   npx tsc --noEmit
   npm test                      # lint + integrity (anchors, links, redirects)
   npm run build && npm run test:links && npm run test:e2e
   ```

## What updates by itself

- Developments listing card and category filters
- Header menu (featured project first) and the mobile drawer
- Footer columns, one per branch ("Project · Branch" once there is more than one project)
- Sitemap, canonical and hreflang tags, breadcrumbs
- Chapter bar, anchors and deep links for every section and tab

## Retiring or renaming a page

Add the old path to `src/lib/redirects.ts`. The build writes a redirect page for it
and fails if the old path would overwrite a live page.
