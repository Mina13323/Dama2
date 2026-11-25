import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Locale } from "@/content";
import type { Project } from "@/content/projects";
import { projectHref } from "@/lib/routes";

/** Project hub: one card per branch, with shortcuts to that branch's sections. */
export function ProjectBranches({ locale, project }: { locale: Locale; project: Project }) {
  return (
    <section className="bg-cream pb-24">
      <div className={`frame-wide grid gap-6 ${project.branches.length > 1 ? "lg:grid-cols-2" : ""}`}>
        {project.branches.map((b) => {
          const to = projectHref({ project: project.slug, branch: b.id }, locale);
          const links = b.sections.filter((s) => s.nav && s.id !== "overview" && s.id !== "enquire");
          return (
            <article key={b.id} className="flex flex-col overflow-hidden rounded-card border border-white bg-white/85 shadow-card backdrop-blur-md">
              <div className="relative order-2 aspect-[16/10] lg:order-1">
                <Image src={b.card.image} alt="" fill sizes="(min-width:1024px) 50vw, 100vw" className="object-cover" />
              </div>
              <div className="order-1 p-7 sm:p-9 lg:order-2">
                <h2 className="font-serif text-3xl text-ink">
                  <Link href={to} className="hover:text-red-primary">
                    {b.label[locale]}
                  </Link>
                </h2>
                <p className="mt-3 text-body-sm leading-golden text-ink-soft">{b.card.text[locale]}</p>
                <ul className="mt-6 flex flex-wrap gap-2">
                  {links.map((s) => (
                    <li key={s.id}>
                      <Link
                        href={projectHref({ project: project.slug, branch: b.id, anchor: s.id }, locale)}
                        className="inline-flex min-h-9 items-center rounded-full border border-border px-4 text-small text-ink hover:border-red-primary hover:text-red-primary"
                      >
                        {s.label[locale]}
                      </Link>
                    </li>
                  ))}
                </ul>
                <Link href={to} className="mt-7 inline-flex items-center gap-2 text-small font-semibold text-red-primary">
                  {b.label[locale]}
                  <ArrowRight aria-hidden className="flip-rtl size-4" />
                </Link>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
