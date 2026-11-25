/**
 * Named places on the Rawasin pages, used by Rawasin copy and components to link
 * across the hub, residential and mall pages. Anchors match the section and tab
 * ids declared in ./index.ts (checked by scripts/test-integrity.ts).
 *
 * Client-safe: imports only route helpers, never the registry.
 */
import type { Locale } from "../../index";
import { projectHref, type ProjectTarget } from "@/lib/routes";

const project = "rawasin";
const hub = (anchor?: string): ProjectTarget => ({ project, anchor });
const res = (anchor?: string): ProjectTarget => ({ project, branch: "residential", anchor });
const mall = (anchor?: string): ProjectTarget => ({ project, branch: "mall", anchor });

const places = {
  rawasin: () => hub(),
  commercial: () => hub("commercial"),
  residential: () => res(),
  "residential-architecture": () => res("architecture"),
  "residential-lifestyle": () => res("lifestyle"),
  "residential-apartments": () => res("apartments"),
  "residential-apartment": (type?: string) => res(`apartments-${type}`),
  "residential-location": () => res("location"),
  mall: () => mall(),
  "mall-master-plan": () => mall("master-plan"),
  "mall-floors": () => mall("floors"),
  "mall-floor": (floor?: string) => mall(`floors-${floor}`),
  "mall-units": () => mall("units"),
  "mall-unit": (unit?: string) => mall(`units-${unit}`),
  "mall-medical": () => mall("medical"),
  "mall-lifestyle": () => mall("lifestyle"),
  "mall-operations": () => mall("operations"),
  "mall-partners": () => mall("partners"),
  "mall-location": () => mall("location"),
} satisfies Record<string, (param?: string) => ProjectTarget>;

export type RawasinPlace = keyof typeof places;

/** Link target for a Rawasin place; `param` is the apartment type, floor or unit id. */
export function rawasinLink(place: RawasinPlace, param?: string): ProjectTarget {
  return places[place](param);
}

export function rawasinHref(place: RawasinPlace, locale: Locale, param?: string): string {
  return projectHref(rawasinLink(place, param), locale);
}
