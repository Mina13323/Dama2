# DAMA CMS — plan

A custom admin for DAMA staff to create and edit **projects, news and careers**, with
their own logins, while the public website stays a fast static site.

## 1. Architecture

```
 ┌──────────────── Admin (new) ────────────────┐        ┌──────── Public website (existing) ────────┐
 │ admin.<domain>  ·  Next.js (server)         │        │ <domain> · static export                  │
 │  • email + password logins, roles           │ build  │  • same pages, menus, chapters, bento     │
 │  • forms for projects, news, careers        │ ─────► │  • reads content generated at build time  │
 │  • image upload → optimised WebP sizes      │        │  • GitHub Pages = client preview          │
 │  • "Publish to preview" / "Go live"         │        │  • Hostinger    = live site               │
 │ MySQL (Hostinger) · media folder or S3      │        └───────────────────────────────────────────┘
 └─────────────────────────────────────────────┘
```

- **Why keep the public site static:** it runs on any host, costs nothing extra, loads fast,
  and the admin can be down without the website being affected.
- **Publishing:** the admin triggers a GitHub Actions build (`repository_dispatch`). The build
  downloads a content snapshot and the images from the admin, generates the content files,
  builds the static site and deploys it.
  - *Publish to preview* → GitHub Pages (the link you send the client).
  - *Go live* → Hostinger (FTP/SFTP on shared hosting, SSH on a VPS).
  A build takes a few minutes; the admin shows its status.

## 2. Hosting needs

| Piece | Needs | Hostinger fit |
|---|---|---|
| Public site | static files | any plan |
| Admin app | Node.js 20+ | Business / Cloud (Node.js apps) or VPS |
| Database | MySQL 8 | included in those plans |
| Media | disk folder (or S3-compatible storage) | plan disk; S3 optional for large libraries |

Until the plan is chosen, the admin runs locally / on a temporary host and publishes the
GitHub Pages preview; the Hostinger deploy step is switched on later with its credentials
stored as GitHub secrets.

## 3. Access

- Email + password, hashed (Argon2), sessions in the database, login rate limiting.
- Roles: **Admin** (users, settings, go live), **Editor** (create/edit, publish to preview),
  **Viewer** (read only). Admin invites users by email; first-login password setup.
- Every change is logged (who, what, when) and each record keeps a version history.

## 4. Content model (mirrors `src/content/projects/types.ts`)

Every text field is **bilingual (English + Arabic, side by side)** and required in both before
publishing.

- **Project:** slug, name, Arabic nav label, categories, location, summary, intro, overview,
  lifestyle, location note, map link, facts, amenities, featured flag, hub hero image + tagline.
- **Media:** cover, overview, lifestyle, gallery, master plan, films; alt text in both languages.
- **Apartment types:** id, type, bedrooms, area range, description, plan image.
- **Branches:** residential / commercial pages with their chapters.
- **Chapters and blocks:** editors pick from the existing building blocks (hero, overview,
  bento grid, stats, text, gallery, location, master plan, apartment cards, tabs, enquiry)
  and order them by drag and drop. The design stays consistent because only these blocks exist.
- **News:** title, date, category, cover, body (rich text), both languages.
- **Careers:** job title, department, location, type, description, requirements, open/closed.
- **Validation before publish:** both languages filled, images have alt text, no "TODO",
  required facts present (the same rules as `scripts/test-integrity.ts`).

## 5. Website changes

- Project, news and careers content moves from TypeScript files to **generated JSON** produced
  by the build from the CMS snapshot, validated with a schema. The registry
  (`src/content/projects/index.ts`) loads it, so pages, menus, sitemap, redirects and tests
  keep working unchanged.
- **Rawasin migration:** a one-time script seeds the CMS with all Rawasin content and images.
  The mall-specific parts (floor explorer, unit schedules, operations) need their own CMS
  forms; until those exist they stay code-managed, so nothing is lost.

## 6. Phases

1. **Foundation:** admin app, database schema, logins and roles, user invites, audit log.
2. **Projects:** project forms, image uploads, chapters and blocks editor, validation.
3. **Publishing:** snapshot export, build pipeline, *Publish to preview* (GitHub Pages),
   build status in the admin.
4. **News and careers** forms and pages.
5. **Rawasin migration** (seed script), then the mall-specific forms.
6. **Go live on Hostinger:** deploy step and admin hosting once the plan is chosen.

## 7. Decisions still open

- Hostinger plan (decides the admin host and deploy method).
- Domain for the admin (e.g. `admin.damadevelopments.com`).
- Who are the first Admin users.
