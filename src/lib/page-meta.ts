import type { Metadata } from "next";
import type { Locale } from "@/content";
import { absoluteUrl, languageAlternates } from "@/lib/seo";
import { pagePath, type PageKey } from "@/lib/routes";

/** Canonical + hreflang metadata derived from the route registry. */
export function pageMetadata(
  key: PageKey,
  locale: Locale,
  opts: { title: string; description?: string; param?: string; noindex?: boolean },
): Metadata {
  return pathMetadata(pagePath(key, opts.param), locale, opts);
}

/** Same as pageMetadata for a locale-relative path that is not a PageKey (e.g. project pages). */
export function pathMetadata(
  path: string,
  locale: Locale,
  opts: { title: string; description?: string; noindex?: boolean },
): Metadata {
  return {
    title: opts.title,
    description: opts.description,
    alternates: { canonical: absoluteUrl(`/${locale}${path}`), languages: languageAlternates(path) },
    ...(opts.noindex ? { robots: { index: false, follow: true } } : {}),
  };
}
