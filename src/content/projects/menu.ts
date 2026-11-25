/**
 * Project menu for Header and Footer, built on the server from the registry so
 * client components never import project content. A new project appears in the
 * menus as soon as it is added to ./index.ts.
 */
import type { Locale } from "../index";
import { projectHref, type ProjectMenu } from "@/lib/routes";
import { getFeaturedProject, projects } from "./index";

export function projectMenu(locale: Locale): ProjectMenu {
  // The featured project comes first: the header's desktop menu showcases menu[0].
  const featured = getFeaturedProject();
  const ordered = [featured, ...projects.filter((p) => p !== featured)];
  return ordered.map((p) => ({
    slug: p.slug,
    name: p.navLabel[locale],
    href: projectHref({ project: p.slug }, locale),
    branches: p.branches.map((b) => {
      const branchHref = projectHref({ project: p.slug, branch: b.id }, locale);
      return {
        id: b.id,
        category: b.category,
        label: b.label[locale],
        href: branchHref,
        links: b.sections
          .filter((s) => s.nav && s.id !== "enquire")
          .map((s) => ({
            label: s.label[locale],
            href: s.id === "overview" ? branchHref : projectHref({ project: p.slug, branch: b.id, anchor: s.id }, locale),
          })),
      };
    }),
  }));
}
