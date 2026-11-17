import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Dictionary, Locale } from "@/content";
import type { Project } from "@/content/projects";
import { SectionIntro } from "../../ui";
import { stagger } from "../../motion/Lines";

/** Project hierarchy: Main Project -> Components (e.g. Rawasin -> Rawasin Mall). */
export function ProjectComponents({ project, dict, locale }: { project: Project; dict: Dictionary; locale: Locale }) {
  const components = project.copy[locale].components;
  if (components.length === 0) return null;
  const t = dict.projectDetail.components;

  return (
    <section id="components" aria-labelledby="components-title" className="scroll-mt-36 border-t border-[#ECEAE5] bg-white py-20 sm:py-24">
      <div className="container-x">
        <SectionIntro id="components-title" eyebrow={t.eyebrow} lines={t.titleLines} />
        <ul className="mt-10 grid gap-5 lg:grid-cols-2">
          {components.map((c, i) => (
            <li key={c.name} data-reveal="card" style={stagger(1 + i)}>
              <Link
                href={`/${locale}/projects/${project.slug}/${c.href}`}
                className="group flex h-full flex-col overflow-hidden rounded-[28px] border border-[#ECEAE5] bg-[#FBFBFA] shadow-xs transition-all hover:border-[#C51E28]/50 hover:shadow-lg sm:flex-row"
              >
                <span className="relative block aspect-[16/10] shrink-0 overflow-hidden sm:aspect-auto sm:w-[42%]">
                  <Image src={project.images.overview} alt="" fill sizes="(min-width:640px) 20vw, 100vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
                </span>
                <span className="flex flex-1 flex-col justify-between gap-5 p-6">
                  <span>
                    <span className="font-display text-2xl text-[#14171A] transition-colors group-hover:text-[#C51E28]" dir="ltr">{c.name}</span>
                    <span className="mt-3 block text-[13.5px] leading-relaxed text-[#687076]">{c.description}</span>
                  </span>
                  <span className="inline-flex min-h-11 w-fit items-center gap-3 rounded-full bg-[#C51E28] px-5 text-[12.5px] font-semibold text-white transition-colors group-hover:bg-[#9F121A]">
                    {t.explore}
                    <ArrowRight aria-hidden className="flip-rtl size-4" />
                  </span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
