import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProjectSections } from "@/components/projects/ProjectSections";
import { getDictionary, isLocale, locales, type Locale } from "@/content";
import { getBranch, getProject, projectBranchParams } from "@/content/projects";
import { pathMetadata } from "@/lib/page-meta";

/** Project branch, e.g. /developments/rawasin/residential. One page per branch in the registry. */
export const dynamicParams = false;

export function generateStaticParams() {
  return locales.flatMap((locale) => projectBranchParams().map((p) => ({ locale, ...p })));
}

type Params = Promise<{ locale: string; project: string; branch: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { locale, project: slug, branch: id } = await params;
  const project = getProject(slug);
  const branch = project && getBranch(project, id);
  if (!isLocale(locale) || !project || !branch) return {};
  return pathMetadata(`/developments/${project.slug}/${branch.id}`, locale, branch.meta[locale]);
}

export default async function ProjectBranchPage({ params }: { params: Params }) {
  const { locale: l, project: slug, branch: id } = await params;
  const locale = l as Locale;
  const project = getProject(slug);
  const branch = project && getBranch(project, id);
  if (!project || !branch) notFound();
  return <ProjectSections project={project} sections={branch.sections} locale={locale} dict={getDictionary(locale)} ownHero={branch.ownHero} />;
}
