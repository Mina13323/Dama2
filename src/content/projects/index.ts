/**
 * Project registry — single source of truth for DAMA developments.
 *
 * Routes, navigation, sitemap and listings all derive from `projects`. To add a
 * development: create ./<slug>/index.ts exporting a `Project`, put its media under
 * public/images/projects/<slug>/, and append it below.
 */
import { rawasin } from "./rawasin";
import type { Branch, Project, ProjectCategory, ProjectSlug } from "./types";

export * from "./types";

export const projects: Project[] = [rawasin];

/** Retired slugs that still resolve (e.g. the historic /projects/rwasin spelling). */
export const legacyProjectSlugs: Record<string, ProjectSlug> = {
  rwasin: "rawasin",
};

export function getProjects(): Project[] {
  return projects;
}

export function getProject(slug: string): Project | undefined {
  const canonical = legacyProjectSlugs[slug] || slug;
  return projects.find((p) => p.slug === canonical);
}

/** The project the home page and header menu feature: the one flagged `featured`, else the first. */
export function getFeaturedProject(): Project {
  return projects.find((p) => p.featured) ?? projects[0];
}

export function getBranch(project: Project, id: string): Branch | undefined {
  return project.branches.find((b) => b.id === id);
}

/** Categories present in the registry, in display order. */
export function availableCategories(): ProjectCategory[] {
  const order: ProjectCategory[] = ["residential", "commercial", "mixed-use"];
  return order.filter((c) => projects.some((p) => p.categories.includes(c)));
}

/** Every (project, branch) pair, for generateStaticParams and the sitemap. */
export function projectBranchParams(): { project: string; branch: string }[] {
  return projects.flatMap((p) => p.branches.map((b) => ({ project: p.slug, branch: b.id })));
}
