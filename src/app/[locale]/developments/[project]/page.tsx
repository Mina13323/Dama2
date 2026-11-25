import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProjectHubHero } from "@/components/projects/ProjectHubHero";
import { ProjectSections } from "@/components/projects/ProjectSections";
import { getDictionary, isLocale, locales, type Locale } from "@/content";
import { getProject, projects } from "@/content/projects";
import { pathMetadata } from "@/lib/page-meta";

/** Project hub, e.g. /developments/rawasin. One page per project in the registry. */
export const dynamicParams = false;

export function generateStaticParams() {
  return locales.flatMap((locale) => projects.map((p) => ({ locale, project: p.slug })));
}

type Params = Promise<{ locale: string; project: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { locale, project: slug } = await params;
  const project = getProject(slug);
  if (!isLocale(locale) || !project) return {};
  return pathMetadata(`/developments/${project.slug}`, locale, { title: project.name, description: project.copy[locale].intro });
}

export default async function ProjectHubPage({ params }: { params: Params }) {
  const { locale: l, project: slug } = await params;
  const locale = l as Locale;
  const project = getProject(slug);
  if (!project) notFound();
  const dict = getDictionary(locale);
  return (
    <ProjectSections
      project={project}
      sections={project.hub}
      locale={locale}
      dict={dict}
      header={<ProjectHubHero project={project} locale={locale} />}
      nav={false}
    />
  );
}
