/**
 * Retired URLs and where they now live.
 *
 * Static export cannot send HTTP 301s, so scripts/write-redirects.ts runs after
 * `next build` and writes a small noindex HTML page at each old path (canonical
 * link, location.replace, meta refresh, visible link). No route files needed.
 *
 * Paths are trailing-slash-free and start with "/". Targets may carry an #anchor.
 */
import { rawasinLink, type RawasinPlace } from "@/content/projects/rawasin/links";
import { floorIds, unitTypeIds } from "@/content/projects/rawasin/mall";
import { rawasinProject } from "@/content/projects/rawasin/project";
import { pagePath, projectPath } from "@/lib/routes";

export type Redirect = { from: string; to: string };

const R = "/developments/rawasin";
const at = (place: RawasinPlace, param?: string) => projectPath(rawasinLink(place, param));

/** Served under every locale: /en<from> → /en<to>, /ar<from> → /ar<to>. */
export const localeRedirects: Redirect[] = [
  // Pre-"developments" project URLs.
  { from: "/projects", to: pagePath("developments") },
  { from: "/projects/rawasin", to: at("rawasin") },
  { from: "/projects/rwasin", to: at("rawasin") },
  { from: "/projects/rawasin/mall", to: at("mall") },
  { from: "/projects/dama-residence", to: pagePath("developments") },
  { from: "/projects/dama-view", to: pagePath("developments") },
  { from: "/terms-of-use", to: pagePath("terms") },
  // Forms now confirm inline.
  { from: "/thank-you", to: pagePath("contact") },

  // Rawasin sub-pages, merged into sections and tabs of the hub, residential and mall pages.
  { from: `${R}/commercial`, to: at("commercial") },
  { from: `${R}/commercial/mall`, to: at("mall") },
  ...(["master-plan", "floors", "units", "medical", "lifestyle", "operations", "partners", "location"] as const).map((s) => ({
    from: `${R}/commercial/mall/${s}`,
    to: at(`mall-${s}`),
  })),
  ...floorIds.map((f) => ({ from: `${R}/commercial/mall/floors/${f}`, to: at("mall-floor", f) })),
  ...unitTypeIds.map((u) => ({ from: `${R}/commercial/mall/units/${u}`, to: at("mall-unit", u) })),
  ...(["architecture", "lifestyle", "apartments", "location"] as const).map((s) => ({
    from: `${R}/residential/${s}`,
    to: at(`residential-${s}`),
  })),
  ...(rawasinProject.copy.en.models ?? []).map((m) => ({ from: `${R}/residential/apartments/${m.id}`, to: at("residential-apartment", m.id) })),
];

/** Pre-locale URLs at the site root. The target locale follows the browser language (default en). */
export const rootRedirects: Redirect[] = [
  { from: "/about", to: pagePath("about") },
  { from: "/careers", to: pagePath("careers") },
  { from: "/contact", to: pagePath("contact") },
  { from: "/news", to: pagePath("news") },
  { from: "/privacy-policy", to: pagePath("privacy") },
  { from: "/projects", to: pagePath("developments") },
  { from: "/terms-of-use", to: pagePath("terms") },
];
