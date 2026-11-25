import type { Metadata } from "next";
import { ProjectsBrowser, type ProjectListItem } from "@/components/projects/ProjectsBrowser";
import { ProjectsCta } from "@/components/projects/ProjectsCta";
import { ProjectsHero } from "@/components/projects/ProjectsHero";
import { getDictionary, isLocale, locales, type Locale } from "@/content";
import { availableCategories, getProjects } from "@/content/projects";
import { pageMetadata } from "@/lib/page-meta";
import { PageSections } from "@/components/sections/PageSections";
import { developmentsBlocks, pick } from "@/content/page-content";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

type Params = Promise<{ locale: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const { projectsPage } = getDictionary(locale);
  return pageMetadata("developments", locale, { title: projectsPage.meta.title, description: projectsPage.meta.description });
}

export default async function DevelopmentsPage({ params }: { params: Params }) {
  const locale = (await params).locale as Locale;
  const dict = getDictionary(locale);
  const projects = getProjects();
  const items: ProjectListItem[] = projects.map((p) => ({
    slug: p.slug,
    name: p.name,
    image: p.image,
    location: p.copy[locale].location,
    summary: p.copy[locale].summary,
    categories: p.categories,
  }));
  return (
    <>
      <ProjectsHero dict={dict} image={projects[0].images.overview} />
      <ProjectsBrowser items={items} categories={availableCategories()} locale={locale} labels={dict.projectsPage} />
      <PageSections locale={locale} blocks={pick(developmentsBlocks(locale), ["figures", "main", "branches", "approach"])} />
      <ProjectsCta dict={dict} />
    </>
  );
}
