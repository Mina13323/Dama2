import type { MetadataRoute } from "next";
import { locales } from "@/content";
import { getNewsArticles } from "@/content/news";
import { projects } from "@/content/projects";
import { absoluteUrl, languageAlternates } from "@/lib/seo";

export const dynamic = "force-static";

/** Locale-agnostic paths. URLs follow NEXT_PUBLIC_SITE_URL / NEXT_PUBLIC_BASE_PATH. */
function paths(): string[] {
  return [
    "",
    "/about",
    "/projects",
    ...projects.map((p) => `/projects/${p.slug}`),
    "/projects/rawasin/mall",
    "/news",
    ...getNewsArticles().map((a) => `/news/${a.slug}`),
    "/contact",
    "/careers",
    "/privacy-policy",
    "/terms-of-use",
  ];
}

export default function sitemap(): MetadataRoute.Sitemap {
  return paths().flatMap((path) =>
    locales.map((locale) => ({
      url: absoluteUrl(`/${locale}${path}`),
      changeFrequency: "monthly" as const,
      priority: path === "" ? 1 : 0.6,
      alternates: { languages: languageAlternates(path) },
    })),
  );
}
