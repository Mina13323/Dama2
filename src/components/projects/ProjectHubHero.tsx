import Image from "next/image";
import type { Locale } from "@/content";
import type { Project } from "@/content/projects";
import { projectCrumbs, projectHref } from "@/lib/routes";
import { ButtonLink, Breadcrumbs } from "../ui";

/**
 * Project hub hero: breadcrumbs on the cream ground (the site header stays readable),
 * then a near full-bleed image card with the name, location, tagline and one button
 * per branch over a dark gradient.
 */
export function ProjectHubHero({ project, locale }: { project: Project; locale: Locale }) {
  const image = project.hubHero.image[locale];
  return (
    <section aria-labelledby="project-hub-title" className="bg-cream px-3 pb-10 pt-24 sm:px-5 sm:pt-28 lg:pb-14">
      <Breadcrumbs items={projectCrumbs(locale, { slug: project.slug, name: project.navLabel[locale] })} className="enter-fade mb-5 px-2 sm:px-4 lg:px-[calc(5.5vw-20px)]" />
      <div className="relative isolate flex min-h-[min(78svh,760px)] items-end overflow-hidden rounded-card sm:rounded-panel">
        <Image src={image.src} alt={image.alt} fill priority sizes="100vw" className="kenburns -z-20 object-cover" />
        {/* Legibility: dark from the bottom and from the leading edge, image stays clear at the top/trailing corner. */}
        <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-t from-charcoal/85 via-charcoal/35 to-transparent" />
        <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-r from-charcoal/55 to-transparent rtl:bg-gradient-to-l" />

        <div className="w-full px-6 pb-9 pt-40 sm:px-10 sm:pb-12 lg:px-[5.5vw] lg:pb-16">
          <div className="enter-fade flex items-center gap-3 text-white/85" style={{ animationDelay: "100ms" }}>
            <span className="h-[2px] w-6 bg-red-light" aria-hidden />
            <p className="text-small font-semibold tracking-[0.16em] uppercase rtl:tracking-normal">{project.copy[locale].location}</p>
          </div>
          <h1 id="project-hub-title" className="enter-line mt-5 font-display text-[clamp(3rem,7vw,7rem)] font-normal leading-[0.98] tracking-tight text-white" style={{ animationDelay: "200ms" }}>
            {project.name}
          </h1>
          <p className="enter-up mt-4 max-w-xl font-display text-[clamp(1.25rem,2.2vw,2rem)] italic leading-snug text-white/90" style={{ animationDelay: "400ms" }}>
            {project.hubHero.tagline[locale]}
          </p>
          <div className="enter-up mt-9 flex flex-wrap gap-3" style={{ animationDelay: "550ms" }}>
            {project.branches.map((b, i) => (
              <ButtonLink key={b.id} href={projectHref({ project: project.slug, branch: b.id }, locale)} variant={i === 0 ? "red" : "light"}>
                {b.label[locale]}
              </ButtonLink>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
