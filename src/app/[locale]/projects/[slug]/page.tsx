import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ProjectAmenities, ProjectLocation, ProjectMasterPlan } from "@/components/projects/detail/ProjectExtras";
import { ProjectComponents } from "@/components/projects/detail/ProjectComponents";
import { ProjectGallery } from "@/components/projects/detail/ProjectGallery";
import { ProjectHero } from "@/components/projects/detail/ProjectHero";
import { ProjectInquiry, RelatedProjects } from "@/components/projects/detail/ProjectInquiry";
import { ProjectLifestyle } from "@/components/projects/detail/ProjectLifestyle";
import { ProjectOverview } from "@/components/projects/detail/ProjectOverview";
import { SectionNav } from "@/components/projects/detail/SectionNav";
import { getDictionary, isLocale, locales, type Locale } from "@/content";
import { getProject, getProjects, legacyProjectSlugs } from "@/content/projects";
import { absoluteUrl, languageAlternates } from "@/lib/seo";

export function generateStaticParams() {
  const slugs = [...getProjects().map((p) => p.slug), ...Object.keys(legacyProjectSlugs)];
  return locales.flatMap((locale) => slugs.map((slug) => ({ locale, slug })));
}

type Params = Promise<{ locale: string; slug: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { locale, slug } = await params;
  const project = getProject(slug);
  if (!project || !isLocale(locale)) return {};
  const copy = project.copy[locale];
  const path = `/projects/${project.slug}`;
  return {
    title: project.name,
    description: copy.intro,
    alternates: { canonical: absoluteUrl(`/${locale}${path}`), languages: languageAlternates(path) },
    openGraph: {
      title: project.name,
      description: copy.intro,
      url: absoluteUrl(`/${locale}${path}`),
      images: [{ url: project.image }],
    },
  };
}

export default async function ProjectPage({ params }: { params: Params }) {
  const { locale: rawLocale, slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const locale = rawLocale as Locale;
  const dict = getDictionary(locale);
  const copy = project.copy[locale];
  const n = dict.projectDetail.nav;
  const isLegacy = slug !== project.slug;

  // Only link to sections that have content for this project.
  const sections = [
    { id: "overview", label: n.overview, show: true },
    { id: "components", label: n.components, show: copy.components.length > 0 },
    { id: "lifestyle", label: n.lifestyle, show: !!copy.lifestyle },
    { id: "master-plan", label: n.masterPlan, show: !!project.masterPlan },
    { id: "amenities", label: n.amenities, show: copy.amenities.length > 0 },
    { id: "gallery", label: n.gallery, show: project.images.gallery.length > 0 },
    { id: "location", label: n.location, show: !!copy.location },
    { id: "enquire", label: n.contact, show: true },
  ]
    .filter((s) => s.show)
    .map(({ id, label }) => ({ id, label }));

  return (
    <>
      {isLegacy && (
        <div className="bg-[#FDF2F2] px-4 py-3 text-center text-[12.5px] text-[#9F121A]">
          {locale === "ar" ? "تم نقل هذه الصفحة. " : "This page has moved. "}
          <Link href={`/${locale}/projects/${project.slug}`} className="font-semibold underline underline-offset-2">
            {locale === "ar" ? "افتح الرابط الجديد" : "Open the new address"}
          </Link>
        </div>
      )}
      <ProjectHero project={project} dict={dict} locale={locale} />
      <SectionNav items={sections} label={dict.projectDetail.sectionsLabel} />
      <ProjectOverview project={project} dict={dict} locale={locale} />
      {copy.facts.length > 0 && (
        <p className="container-x -mt-12 pb-8 text-[11.5px] text-[#8C939B]">{dict.projectDetail.footnote}</p>
      )}
      <ProjectComponents project={project} dict={dict} locale={locale} />
      <ProjectLifestyle project={project} dict={dict} locale={locale} />
      <ProjectMasterPlan project={project} dict={dict} />
      <ProjectAmenities project={project} dict={dict} locale={locale} />
      {project.images.gallery.length > 0 && (
        <ProjectGallery images={project.images.gallery} name={project.name} labels={dict.projectDetail.gallery} />
      )}
      <ProjectLocation project={project} dict={dict} locale={locale} />
      <ProjectInquiry project={project} dict={dict} locale={locale} />
      <RelatedProjects projects={getProjects().filter((p) => p.slug !== project.slug)} dict={dict} locale={locale} />
    </>
  );
}
