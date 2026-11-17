/**
 * Canonical URL helpers for the static GitHub Pages export.
 *
 * `NEXT_PUBLIC_BASE_PATH` is set by the deploy workflow (/DAMA). Absolute URLs
 * are used in metadata so canonical/hreflang tags stay correct under a base
 * path and so the same build can be pointed at DAMA's own domain later by
 * setting NEXT_PUBLIC_SITE_URL.
 */
const basePath = (process.env.NEXT_PUBLIC_BASE_PATH || "").replace(/\/$/, "");
const origin = (process.env.NEXT_PUBLIC_SITE_URL || "https://mina13323.github.io").replace(/\/$/, "");

export const siteBase = `${origin}${basePath}`;

/** Absolute URL for a site-root-relative path, e.g. "/en/about" -> "https://…/DAMA/en/about". */
export function absoluteUrl(path: string): string {
  const withSlash = path.startsWith("/") ? path : `/${path}`;
  return `${siteBase}${withSlash === "/" ? "/" : withSlash.replace(/\/$/, "")}`;
}

/** hreflang set for a locale-agnostic path such as "/about" or "" (home). */
export function languageAlternates(path = "") {
  const suffix = path ? (path.startsWith("/") ? path : `/${path}`) : "";
  return {
    en: absoluteUrl(`/en${suffix}`),
    ar: absoluteUrl(`/ar${suffix}`),
    "x-default": absoluteUrl(`/en${suffix}`),
  } as const;
}

/** Organisation structured data — only fields that are actually known. */
export const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "RealEstateAgent",
  name: "DAMA Development",
  url: siteBase,
  description:
    "DAMA Development brings ambition and vision to create refined urban communities in Upper Egypt.",
  areaServed: { "@type": "Place", name: "Upper Egypt" },
} as const;
