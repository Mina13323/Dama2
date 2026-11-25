import Link from "next/link";
import { ArrowLeft, MapPin } from "lucide-react";
import type { Dictionary, Locale } from "@/content";
import type { Project } from "@/content/projects";
import { ButtonLink } from "../../ui";
import { CurvedHero } from "../../media/CurvedHero";

export function ProjectHero({ project, dict, locale }: { project: Project; dict: Dictionary; locale: Locale }) {
  const copy = project.copy[locale];
  const t = dict.projectDetail;
  return (
    <CurvedHero
      id="project-title"
      top={
        <>
          <Link href={`/${locale}/developments`} className="group inline-flex min-h-11 items-center gap-2 text-small font-semibold text-red-primary transition-colors hover:text-red-dark">
            <ArrowLeft aria-hidden className="flip-rtl size-4 transition-transform duration-200 group-hover:-translate-x-1 rtl:group-hover:translate-x-1" />
            <span>{t.back}</span>
          </Link>
          <span className="rounded-full bg-red-soft px-3.5 py-1 text-small font-medium text-red-primary">
            {project.categories.map((c) => c.charAt(0).toUpperCase() + c.slice(1)).join(" • ")}
          </span>
        </>
      }
      eyebrow={
        <span className="inline-flex items-center gap-2">
          <MapPin aria-hidden strokeWidth={1.8} className="size-4" />
          {copy.location}
        </span>
      }
      title={<span dir="ltr">{project.name}</span>}
      body={<p>{copy.intro}</p>}
      image={project.image}
      imageAlt={project.name}
    >
      <ButtonLink href="#enquire" variant="red">
        {t.requestInfo}
      </ButtonLink>
      {project.mapUrl && (
        <a
          href={project.mapUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center gap-3 text-body-sm font-semibold text-ink"
        >
          <span className="flex size-12 shrink-0 items-center justify-center rounded-full border-2 border-ink transition-colors group-hover:border-red-primary group-hover:text-red-primary">
            <MapPin aria-hidden className="size-4" />
          </span>
          <span className="border-b border-red-primary pb-1 transition-colors group-hover:text-red-primary">{dict.footer.viewMap}</span>
        </a>
      )}
    </CurvedHero>
  );
}
