/**
 * Rawasin: page structure for the generic project routes.
 *
 *   /developments/rawasin              hub
 *   /developments/rawasin/residential  compound: architecture, lifestyle, apartments, location
 *   /developments/rawasin/mall         mall: master plan, floors, units, medical, lifestyle,
 *                                      operations, partners, location
 *
 * Former sub-pages are anchored sections; apartment types, floors and unit types
 * are tabs. Content lives in ./project, ./mall, ./story, ./media and ./blocks.
 */
import type { Locale } from "../../index";
import type { Localized, Project, Section, SectionPart } from "../types";
import { pick, type BlockSet } from "../../blocks";
import { mergeBento } from "../../bento";
import { rawasinProject } from "./project";
import { floorIds, mallImages, rawasinMall, unitTypeIds, type FloorId } from "./mall";
import { rawasinStory } from "./story";
import { rawasinVideos } from "./media";
import { res } from "../../assets";
import {
  apartmentsBlocks,
  architectureBlocks,
  commercialBlocks,
  floorDetailBlocks,
  floorsIndexBlocks,
  lifestyleBlocks,
  mallLifestyleBlocks,
  mallLocationBlocks,
  mallOverviewBlocks,
  masterPlanBlocks,
  medicalBlocks,
  operationsBlocks,
  partnersBlocks,
  rawasinHubBlocks,
  residentialBlocks,
  residentialLocationBlocks,
  unitDetailBlocks,
  unitsBlocks,
} from "./blocks";

export { rawasinProject } from "./project";

const L = (en: string, ar: string): Localized<string> => ({ en, ar });
const both = <T,>(f: (l: Locale) => T): Localized<T> => ({ en: f("en"), ar: f("ar") });

/** Several existing blocks shown as one bento grid (copy reused verbatim, see content/bento). */
const merged = (id: string, from: (l: Locale) => BlockSet, ids: string[]): SectionPart => ({
  type: "blocks",
  from: (l: Locale) => {
    const set = from(l);
    const missing = ids.filter((k) => !set[k]);
    if (missing.length) throw new Error(`merged("${id}"): unknown block ids ${missing.join(", ")}`);
    return { [id]: mergeBento(id, pick(set, ids)) };
  },
  ids: [id],
});

/** A slice of MallPageView, the bespoke Rawasin Mall component. */
const mallView = (sections: string[], floorIds?: FloorId[]): SectionPart => ({
  type: "custom",
  component: "rawasin.mall",
  props: floorIds ? { sections, floorIds } : { sections },
});


/* ------------------------------------------------------------------ */
/* Hub: /developments/rawasin                                           */
/* ------------------------------------------------------------------ */
const hub: Section[] = [
  {
    id: "overview",
    label: L("Overview", "نظرة عامة"),
    parts: [{ type: "blocks", from: rawasinHubBlocks, ids: ["positioning", "figures"] }],
  },
  {
    id: "branches",
    label: L("Residential & Commercial", "السكني والتجاري"),
    nav: true,
    parts: [{ type: "branches" }],
  },
  {
    id: "commercial",
    label: L("Commercial", "تجاري"),
    nav: true,
    parts: [{ type: "blocks", from: commercialBlocks, ids: ["intro", "figures", "destinations", "bento"] }],
  },
  {
    id: "community",
    label: L("Community", "المجتمع"),
    nav: true,
    parts: [{ type: "blocks", from: rawasinHubBlocks, ids: ["community", "portraits", "location", "cta"] }],
  },
];

/* ------------------------------------------------------------------ */
/* Residential: /developments/rawasin/residential                       */
/* ------------------------------------------------------------------ */
const residential: Section[] = [
  {
    id: "overview",
    label: L("Overview", "نظرة عامة"),
    nav: true,
    parts: [{ type: "hero" }, { type: "overview" }, { type: "blocks", from: residentialBlocks, ids: ["duo"] }],
  },
  {
    id: "architecture",
    label: L("Architecture", "العمارة"),
    nav: true,
    parts: [
      { type: "blocks", from: architectureBlocks, ids: ["identity", "between", "rail"] },
    ],
  },
  {
    id: "lifestyle",
    label: L("Lifestyle & Amenities", "نمط الحياة والمرافق"),
    nav: true,
    parts: [
      { type: "film", film: "residential" },
      { type: "lifestyle" },
      { type: "blocks", from: lifestyleBlocks, ids: ["together"] },
      { type: "custom", component: "rawasin.smart" },
      { type: "custom", component: "rawasin.clubhouse" },
      { type: "custom", component: "rawasin.mosque" },
      { type: "film", film: "mosque", tone: "dark" },
      { type: "blocks", from: lifestyleBlocks, ids: ["access"] },
    ],
  },
  {
    id: "apartments",
    label: L("Apartments", "الشقق"),
    nav: true,
    parts: [
      { type: "blocks", from: apartmentsBlocks, ids: ["figures"] },
      { type: "apartmentShowcase" },
      { type: "blocks", from: apartmentsBlocks, ids: ["finishing"] },
    ],
  },
  {
    id: "location",
    label: L("Location", "الموقع"),
    nav: true,
    parts: [
      { type: "blocks", from: residentialLocationBlocks, ids: ["where"] },
    ],
  },
  {
    id: "partners",
    label: L("Partners", "الشركاء"),
    parts: [{ type: "custom", component: "rawasin.partners" }],
  },
  {
    id: "enquire",
    label: L("Enquire", "استفسر"),
    nav: true,
    parts: [{ type: "inquiry" }],
  },
];

/* ------------------------------------------------------------------ */
/* Mall: /developments/rawasin/mall                                     */
/* ------------------------------------------------------------------ */
const mall: Section[] = [
  {
    id: "overview",
    label: L("Overview", "نظرة عامة"),
    nav: true,
    parts: [
      mallView(["hero"]),
      merged("intro", mallOverviewBlocks, ["concept", "specs", "duo"]),
      merged("levels", mallOverviewBlocks, ["levels"]),
      mallView(["vision"]),
      merged("experience", mallOverviewBlocks, ["experience", "management"]),
    ],
  },
  {
    id: "master-plan",
    label: L("Master Plan", "المخطط العام"),
    nav: true,
    parts: [mallView(["master-plan"]), merged("plan", masterPlanBlocks, ["zoning", "distribution", "circulation"])],
  },
  {
    id: "floors",
    label: L("Floor Plans", "مخططات الأدوار"),
    nav: true,
    parts: [
      { type: "custom", component: "rawasin.mall.floorIndex" },
      merged("guide", floorsIndexBlocks, ["overview", "reading"]),
      // The explorer already switches between all five plans; the tabs carry each floor's own copy.
      mallView(["floors"]),
      {
        type: "tabs",
        tabs: floorIds.map((id) => ({
          id,
          label: both((l) => rawasinMall[l].floors.list.find((f) => f.id === id)!.label),
          parts: [merged("floor", (l: Locale) => floorDetailBlocks(l, id), ["focus", "neighbours"])],
        })),
      },
    ],
  },
  {
    id: "units",
    label: L("Unit Types", "أنواع الوحدات"),
    nav: true,
    parts: [
      merged("business", unitsBlocks, ["business", "duo"]),
      {
        type: "tabs",
        tabs: unitTypeIds.map((unit) => ({
          id: unit,
          label: both((l) => rawasinMall[l].unitTypes[unit].title),
          parts: [
            { type: "custom", component: "rawasin.mall.unitType", props: { unit } },
            merged("figures", (l: Locale) => unitDetailBlocks(l, unit), ["banner", "figures"]),
            { type: "blocks", from: (l: Locale) => unitDetailBlocks(l, unit), ids: ["byFloor"] },
          ],
        })),
      },
    ],
  },
  {
    id: "medical",
    label: L("Medical Destination", "الوجهة الطبية"),
    nav: true,
    parts: [merged("medical", medicalBlocks, ["concept", "banner", "departments", "standards"])],
  },
  {
    id: "lifestyle",
    label: L("Lifestyle & Leisure", "نمط الحياة والترفيه"),
    nav: true,
    parts: [
      merged("leisure", mallLifestyleBlocks, ["dining", "bento", "family", "fitness"]),
      mallView(["film"]),
      { type: "blocks", from: mallLifestyleBlocks, ids: ["rail"] },
    ],
  },
  {
    id: "operations",
    label: L("Management & Operations", "الإدارة والتشغيل"),
    nav: true,
    parts: [
      mallView(["operations"]),
      merged("services", operationsBlocks, ["scope", "banner", "parking", "safety"]),
      merged("standards", operationsBlocks, ["lighting", "maintenance", "waste"]),
    ],
  },
  {
    id: "partners",
    label: L("Partners", "الشركاء"),
    nav: true,
    parts: [mallView(["partners"]), merged("partnership", partnersBlocks, ["accord", "technology", "design"])],
  },
  {
    id: "location",
    label: L("Location", "الموقع"),
    nav: true,
    parts: [
      merged("setting", mallLocationBlocks, ["positioning", "banner"]),
      mallView(["location"]),
      merged("context", mallLocationBlocks, ["site", "community"]),
    ],
  },
  {
    id: "enquire",
    label: L("Enquire", "استفسر"),
    nav: true,
    parts: [mallView(["gallery", "enquire", "source"])],
  },
];

export const rawasin: Project = {
  ...rawasinProject,
  featured: true,
  navLabel: L("Rawasin", "رواسين"),
  films: {
    residential: { video: rawasinVideos.residential, copy: both((l) => rawasinStory[l].videos.residential) },
    mosque: { video: rawasinVideos.mosque, copy: both((l) => rawasinStory[l].videos.mosque) },
  },
  hubHero: {
    image: both((l) => ({ src: res(l).aerial2.src, alt: res(l).aerial2.alt })),
    tagline: both((l) => rawasinProject.copy[l].overview.titleLines.join(" ").replace(/\*/g, "")),
  },
  hub,
  branches: [
    {
      id: "residential",
      label: L("Residential", "سكني"),
      category: "residential",
      ownHero: true,
      card: { image: rawasinProject.images.overview, text: both((l) => rawasinProject.copy[l].summary) },
      meta: both((l) => ({ title: `${l === "ar" ? "سكني" : "Residential"} | Rawasin`, description: rawasinProject.copy[l].intro })),
      sections: residential,
    },
    {
      id: "mall",
      label: L("Rawasin Mall", "رواسين مول"),
      category: "commercial",
      ownHero: true,
      card: { image: mallImages.hero, text: both((l) => rawasinMall[l].hero.description) },
      meta: both((l) => rawasinMall[l].meta),
      sections: mall,
    },
  ],
};
