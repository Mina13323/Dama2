/**
 * Site map for DAMA's corporate pages, plus link helpers for project pages.
 *
 * Corporate pages are a fixed table (`pages`). Project pages are not listed here:
 * they come from the project registry (src/content/projects) and are served by
 * /developments/[project] and /developments/[project]/[branch]. This file stays
 * free of registry imports so client components can use it cheaply; menus built
 * from the registry are passed down as `ProjectMenu` (see content/projects/menu).
 * Paths are locale-relative: the same hierarchy is served under /en and /ar.
 */
import type { Locale } from "@/content";

export type PageKey =
  | "home"
  | "about"
  | "developments"
  | "news"
  | "news-article"
  | "contact"
  | "privacy"
  | "terms"
  | "careers";

type Entry = { path: string; parent?: PageKey; en: string; ar: string };

export const pages: Record<PageKey, Entry> = {
  home: { path: "", en: "Home", ar: "الرئيسية" },
  about: { path: "/about", parent: "home", en: "About DAMA", ar: "عن داما" },
  developments: { path: "/developments", parent: "home", en: "Our Developments", ar: "مشروعاتنا" },
  news: { path: "/news", parent: "home", en: "News & Media", ar: "الأخبار والإعلام" },
  "news-article": { path: "/news/[slug]", parent: "news", en: "Article", ar: "مقال" },
  contact: { path: "/contact", parent: "home", en: "Contact", ar: "تواصل معنا" },
  privacy: { path: "/privacy-policy", parent: "home", en: "Privacy Policy", ar: "سياسة الخصوصية" },
  terms: { path: "/terms", parent: "home", en: "Terms of Use", ar: "شروط الاستخدام" },
  careers: { path: "/careers", parent: "home", en: "Careers", ar: "الوظائف" },
};

/** Locale-relative path, with an optional value for the page's dynamic segment. */
export function pagePath(key: PageKey, param?: string): string {
  const path = pages[key].path;
  return param === undefined ? path : path.replace(/\[[a-z]+\]/, param);
}

/** Absolute site path for a locale, e.g. href("news-article", "en", "launch"). */
export function href(key: PageKey, locale: Locale, param?: string): string {
  return `/${locale}${pagePath(key, param)}`;
}

export function pageLabel(key: PageKey, locale: Locale): string {
  return pages[key][locale];
}

export type Crumb = { label: string; href?: string };

/** Breadcrumb trail from Home to `key`. `leaf` overrides the final label (dynamic pages). */
export function crumbs(key: PageKey, locale: Locale, leaf?: string, param?: string): Crumb[] {
  const trail: Crumb[] = [];
  let current: PageKey | undefined = key;
  let first = true;
  while (current) {
    const e: Entry = pages[current];
    // Only the final crumb can be a dynamic page; ancestors are always static.
    trail.unshift({ label: first && leaf ? leaf : e[locale], href: href(current, locale, first ? param : undefined) });
    first = false;
    current = e.parent;
  }
  // Last crumb is rendered as the current page (no link).
  const last = trail[trail.length - 1];
  trail[trail.length - 1] = { label: last.label };
  return trail;
}

/** Locale-agnostic paths for every static corporate page, used by the sitemap and tests. */
export function staticPagePaths(): string[] {
  return (Object.keys(pages) as PageKey[])
    .filter((k) => !pages[k].path.includes("["))
    .map((k) => pages[k].path);
}

/* ------------------------------------------------------------------ */
/* Project pages                                                        */
/* ------------------------------------------------------------------ */

/** A place on a project page: hub, branch, and/or section anchor (or tab, e.g. "floors-ground"). */
export type ProjectTarget = { project: string; branch?: string; anchor?: string };

/** Any internal link target: a corporate page or a project page. */
export type LinkTarget = { key: PageKey; param?: string } | ProjectTarget;

/** Locale-relative path of a project page, e.g. /developments/rawasin/mall#floors. */
export function projectPath({ project, branch, anchor }: ProjectTarget): string {
  return `/developments/${project}${branch ? `/${branch}` : ""}${anchor ? `#${anchor}` : ""}`;
}

export function projectHref(target: ProjectTarget, locale: Locale): string {
  return `/${locale}${projectPath(target)}`;
}

export function linkHref(target: LinkTarget, locale: Locale): string {
  return "key" in target ? href(target.key, locale, target.param) : projectHref(target, locale);
}

/** Breadcrumbs for a project hub or branch: Home › Our Developments › Project [› Branch]. */
export function projectCrumbs(locale: Locale, project: { slug: string; name: string }, branch?: { id: string; label: string }): Crumb[] {
  const base = crumbs("developments", locale);
  const trail: Crumb[] = [...base.slice(0, -1), { label: base[base.length - 1].label, href: href("developments", locale) }];
  if (!branch) return [...trail, { label: project.name }];
  return [...trail, { label: project.name, href: projectHref({ project: project.slug }, locale) }, { label: branch.label }];
}

/**
 * Serializable project menu, built on the server from the registry
 * (content/projects/menu) and handed to Header and Footer.
 */
export type ProjectMenu = {
  slug: string;
  name: string;
  href: string;
  branches: { id: string; category: "residential" | "commercial"; label: string; href: string; links: { label: string; href: string }[] }[];
}[];

/* ------------------------------------------------------------------ */
/* Footer                                                               */
/* ------------------------------------------------------------------ */
export type NavLeaf = { key: PageKey; label?: { en: string; ar: string } };

export function leafLabel(leaf: NavLeaf, locale: Locale): string {
  return leaf.label ? leaf.label[locale] : pageLabel(leaf.key, locale);
}

/** Corporate footer groups. Project groups are inserted between them from the ProjectMenu. */
export const footerGroups: {
  id: "company" | "contact";
  title: { en: string; ar: string };
  links: NavLeaf[];
}[] = [
  {
    id: "company",
    title: { en: "Company", ar: "الشركة" },
    links: [{ key: "home" }, { key: "about" }, { key: "developments" }, { key: "news" }, { key: "careers" }],
  },
  {
    id: "contact",
    title: { en: "Contact", ar: "تواصل معنا" },
    links: [
      { key: "contact", label: { en: "Contact Us", ar: "تواصل معنا" } },
      { key: "privacy" },
      { key: "terms" },
    ],
  },
];
