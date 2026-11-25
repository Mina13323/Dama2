import type { MetadataRoute } from "next";
import { locales } from "@/content";
import { getNewsArticles } from "@/content/news";
import { projects } from "@/content/projects";
import { pagePath, projectPath, staticPagePaths } from "@/lib/routes";
import { absoluteUrl, languageAlternates } from "@/lib/seo";

export const dynamic = "force-static";

/**
 * Locale-agnostic paths: corporate pages from the route table, project hubs and
 * branches from the project registry. Tabs and sections are anchors, not URLs.
 * URLs follow NEXT_PUBLIC_SITE_URL / NEXT_PUBLIC_BASE_PATH.
 */
function paths(): string[] {
  return [
    ...staticPagePaths(),
    ...projects.flatMap((p) => [projectPath({ project: p.slug }), ...p.branches.map((b) => projectPath({ project: p.slug, branch: b.id }))]),
    ...getNewsArticles().map((a) => pagePath("news-article", a.slug)),
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
