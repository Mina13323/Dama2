/**
 * STARTER TEMPLATE for a new DAMA development. Not registered, never rendered.
 *
 *   1. Copy this folder to src/content/projects/<slug>/ (e.g. "nile-gardens").
 *   2. Replace every "TODO" with approved, sourced copy (EN + AR) and real image paths
 *      under public/images/<slug>/. Never ship placeholder text.
 *   3. Rename `templateProject`, then add it to `projects` in src/content/projects/index.ts.
 *
 * Full guide: docs/ADDING-A-PROJECT.md. `tsc` checks this file, so it always matches the model.
 */
import type { Locale } from "../../index";
import { tr, type BlockSet } from "../../blocks";
import type { Localized, Project, ProjectInfo, Section } from "../types";

const slug = "TODO-slug";
const img = (file: string) => `${process.env.NEXT_PUBLIC_BASE_PATH || ""}/images/${slug}/${file}`;
const L = (en: string, ar: string): Localized<string> => ({ en, ar });

/* ---------------------------------------------------------------- */
/* 1. Listing info: cards, filters, hero facts                        */
/* ---------------------------------------------------------------- */
const info: ProjectInfo = {
  slug,
  name: "TODO Project Name", // Latin brand wordmark
  categories: ["residential"], // "residential" | "commercial" | "mixed-use"
  image: img("cover.webp"),
  images: { overview: img("overview.webp"), lifestyle: [img("lifestyle-1.webp"), img("lifestyle-2.webp")], gallery: [img("gallery-1.webp")] },
  masterPlan: { image: img("master-plan.webp") },
  mapUrl: "https://www.google.com/maps/search/?api=1&query=TODO",
  copy: {
    en: {
      location: "TODO City, Region",
      summary: "TODO one-line summary for cards and listings.",
      intro: "TODO hero introduction.",
      overview: { titleLines: ["TODO first line,", "*TODO accent line*"], paragraphs: ["TODO paragraph."] },
      lifestyle: { titleLines: ["TODO", "*TODO*"], body: "TODO lifestyle copy." },
      locationNote: "TODO location note.",
      facts: [{ icon: "location", label: "Location", value: "TODO" }],
      amenities: [{ icon: "parks", label: "TODO amenity" }],
      components: [],
      // Optional: apartment layouts. Plans go in public/images/<slug>/apartments/<id>.webp
      models: [{ id: "type-1", type: "Type 1", bedrooms: 2, area: "TODO m²", name: "TODO", description: "TODO", highlights: ["TODO"] }],
    },
    ar: {
      location: "TODO المدينة، المنطقة",
      summary: "TODO",
      intro: "TODO",
      overview: { titleLines: ["TODO", "*TODO*"], paragraphs: ["TODO"] },
      lifestyle: { titleLines: ["TODO", "*TODO*"], body: "TODO" },
      locationNote: "TODO",
      facts: [{ icon: "location", label: "الموقع", value: "TODO" }],
      amenities: [{ icon: "parks", label: "TODO" }],
      components: [],
      models: [{ id: "type-1", type: "نموذج 1", bedrooms: 2, area: "TODO م²", name: "TODO", description: "TODO", highlights: ["TODO"] }],
    },
  },
};

/* ---------------------------------------------------------------- */
/* 2. Optional structured sections (bento grids, tables, …)          */
/* ---------------------------------------------------------------- */
function highlightBlocks(l: Locale): BlockSet {
  const t = tr(l);
  return {
    figures: {
      kind: "bento", id: "figures", eyebrow: t("TODO eyebrow", "TODO"), lines: [t("TODO title,", "TODO"), t("*TODO accent*", "*TODO*")],
      body: t("TODO intro.", "TODO"),
      tiles: [
        { t: "stat", value: "TODO", label: t("TODO label", "TODO"), tone: "red" },
        { t: "image", image: { src: img("tile.webp"), w: 1600, h: 1000, alt: t("TODO alt text", "TODO") }, span: "big" },
        { t: "text", title: t("TODO", "TODO"), body: t("TODO", "TODO") },
      ],
    },
  };
}

/* ---------------------------------------------------------------- */
/* 3. Pages: hub + one page per branch (chapters = sections with nav) */
/* ---------------------------------------------------------------- */
const residential: Section[] = [
  { id: "overview", label: L("Overview", "نظرة عامة"), nav: true, parts: [{ type: "hero" }, { type: "overview" }, { type: "blocks", from: highlightBlocks, ids: ["figures"] }] },
  { id: "lifestyle", label: L("Lifestyle", "نمط الحياة"), nav: true, parts: [{ type: "lifestyle" }] },
  { id: "apartments", label: L("Apartments", "الشقق"), nav: true, parts: [{ type: "apartmentShowcase" }] },
  { id: "location", label: L("Location", "الموقع"), nav: true, parts: [{ type: "location" }, { type: "masterPlan" }] },
  { id: "enquire", label: L("Enquire", "استفسر"), nav: true, parts: [{ type: "inquiry" }] },
];

export const templateProject: Project = {
  ...info,
  navLabel: L("TODO Name", "TODO الاسم"),
  hubHero: {
    image: { en: { src: img("hero.webp"), alt: "TODO alt text" }, ar: { src: img("hero.webp"), alt: "TODO" } },
    tagline: L("TODO tagline", "TODO"),
  },
  hub: [{ id: "branches", label: L("Explore", "استكشف"), parts: [{ type: "branches" }] }],
  branches: [
    {
      id: "residential",
      label: L("Residential", "سكني"),
      category: "residential",
      ownHero: true,
      card: { image: img("overview.webp"), text: L("TODO card text", "TODO") },
      meta: { en: { title: "TODO page title", description: "TODO meta description" }, ar: { title: "TODO", description: "TODO" } },
      sections: residential,
    },
  ],
};
