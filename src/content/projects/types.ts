/**
 * Project model. A project is plain data: its listing info (ProjectInfo) plus the
 * structure the generic project routes render (hub sections and branches).
 * Adding a development means adding a folder under ./<slug>/ and one line in
 * ./index.ts — no new route files.
 */
import type { Locale } from "../index";
import type { BlockSet } from "../blocks";

export type Localized<T> = Record<Locale, T>;

/** A film with its poster. */
export type VideoItem = { id: string; src: string; poster: string; seconds: number };

/** URL segment of a project, e.g. "rawasin" → /developments/rawasin. */
export type ProjectSlug = string;
export type ProjectCategory = "residential" | "commercial" | "mixed-use";
export type FactIcon = "type" | "units" | "location" | "status" | "green" | "style";
export type AmenityIcon = "clubhouse" | "pool" | "sports" | "parks" | "paths" | "community";

export type ProjectFact = { icon: FactIcon; label: string; value: string };
export type ProjectAmenity = { icon: AmenityIcon; label: string };


export interface ProjectComponent {
  name: string;
  href: string;
  description: string;
}

export interface ApartmentModel {
  id: string;
  type: string;
  bedrooms: number;
  area: string;
  name: string;
  description: string;
  highlights: string[];
}

export interface ProjectCopy {
  location: string;
  /** One-line description for cards and listings. */
  summary: string;
  /** Hero description on the details page. */
  intro: string;
  overview: { titleLines: string[]; paragraphs: string[] };
  lifestyle?: { titleLines: string[]; body: string };
  locationNote?: string;
  facts: ProjectFact[];
  amenities: ProjectAmenity[];
  components: ProjectComponent[];
  models?: ApartmentModel[];
}

export interface ProjectInfo {
  slug: ProjectSlug;
  name: string;
  categories: ProjectCategory[];
  image: string;
  images: { overview: string; lifestyle: string[]; gallery: string[] };
  masterPlan?: { image: string; pdf?: string };
  mapUrl?: string;
  copy: Localized<ProjectCopy>;
}

/* ------------------------------------------------------------------ */
/* Page structure                                                       */
/* ------------------------------------------------------------------ */

/** Copy for a film section (VideoShowcase). */
export type FilmCopy = { eyebrow: string; titleLines: string[]; body: string; label: string };

/**
 * One renderable piece of a section. Generic parts work for any project; `custom`
 * is the escape hatch for a bespoke component registered by name in the
 * section renderer (e.g. Rawasin's clubhouse story).
 */
export type SectionPart =
  /** Blocks picked by id from a block set (rendered by PageSections). */
  | { type: "blocks"; from: (l: Locale) => BlockSet; ids: string[] }
  /** Full-bleed project hero with facts (ProjectHero). */
  | { type: "hero" }
  /** Overview copy + image (ProjectOverview). */
  | { type: "overview" }
  /** Lifestyle copy + images (ProjectLifestyle). */
  | { type: "lifestyle" }
  /** Map + location note (ProjectLocation). */
  | { type: "location" }
  /** Master plan image (ProjectMasterPlan). */
  | { type: "masterPlan" }
  /** All apartment models as stacked, parallax cards; each card is anchored #<section>-<model id>. */
  | { type: "apartmentShowcase" }
  /** Enquiry form scoped to the project (ProjectInquiry). */
  | { type: "inquiry" }
  /** Film from the project's `films` map (VideoShowcase). */
  | { type: "film"; film: string; tone?: "light" | "dark" }
  /** Tabbed panels: apartment types, floors, unit types. Each tab is a mini section. */
  | { type: "tabs"; tabs: { id: string; label: Localized<string>; parts: SectionPart[] }[] }
  /** One card per branch, linking to the branch page and its sections (ProjectBranches). */
  | { type: "branches" }
  /** Bespoke component, looked up by name in the section renderer. */
  | { type: "custom"; component: string; props?: Record<string, unknown> };

/** An anchored section of a project page (#id). Listed in the in-page nav when `nav` is set. */
export interface Section {
  id: string;
  label: Localized<string>;
  nav?: boolean;
  parts: SectionPart[];
}

/** A branch page: /developments/<project>/<branch>. */
export interface Branch {
  id: string;
  label: Localized<string>;
  category: Exclude<ProjectCategory, "mixed-use">;
  meta: Localized<{ title: string; description: string }>;
  /** Card on the project hub and listings. */
  card: { image: string; text: Localized<string> };
  /** Replaces the default page header (e.g. a full hero rendered by the first section). */
  ownHero?: boolean;
  sections: Section[];
}

export interface Project extends ProjectInfo {
  /** Shown in the home page "featured project" section and first in the header menu. Set on one project. */
  featured?: boolean;
  /** Name in navigation text (breadcrumbs, menus); `name` stays the Latin brand wordmark. */
  navLabel: Localized<string>;
  /** Films referenced by `film` parts. */
  films?: Record<string, { video: VideoItem; copy: Localized<FilmCopy> }>;
  /** Cinematic hero at the top of the hub: one landscape image and a one-line tagline. */
  hubHero: { image: Localized<{ src: string; alt: string }>; tagline: Localized<string> };
  /** Sections of the project hub, /developments/<project>. */
  hub: Section[];
  branches: Branch[];
}
