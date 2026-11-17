import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Dictionary, Locale } from "@/content";
import { rawasinMall } from "@/content/rawasin";
import { SectionIntro } from "../ui";
import { stagger } from "../motion/Lines";

/**
 * Collaborations. The brochure only establishes *project-specific* roles for
 * Dar Arafa Architecture, ACCORD and WE on Rawasin Mall, so each entry carries
 * an explicit context label. No organisation is described as a company-wide
 * strategic partner, and no logos are shown (none were supplied).
 */
export function Partners({ dict }: { dict: Dictionary }) {
  const t = dict.about.partners;
  const locale = dict.locale as Locale;
  const ar = locale === "ar";
  const entries = rawasinMall[locale].partners.entries;

  return (
    <section id="partners" aria-labelledby="partners-title" className="bg-[#FBFBFA] py-20 sm:py-24">
      <div className="container-x grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-start lg:gap-10">
        <div className="lg:col-span-4">
          <SectionIntro id="partners-title" eyebrow={t.eyebrow} lines={t.titleLines} body={t.body} />
          <p className="mt-6 text-[11.5px] leading-relaxed text-[#8C939B]">{rawasinMall[locale].partners.logoNote}</p>
          <Link
            href={`/${locale}/projects/rawasin/mall#partners`}
            className="group mt-7 inline-flex min-h-11 items-center gap-2 border-b-2 border-[#C51E28] pb-1 text-[13px] font-bold text-[#14171A] transition-colors hover:text-[#C51E28]"
          >
            {ar ? "شركاء مول رواسين" : "Rawasin Mall partners"}
            <ArrowRight aria-hidden className="flip-rtl size-4 text-[#C51E28] transition-transform duration-200 group-hover:translate-x-1 rtl:group-hover:-translate-x-1" />
          </Link>
        </div>

        <ul className="grid gap-4 lg:col-span-8">
          {entries.map((entry, i) => (
            <li key={entry.name} data-reveal="up" style={stagger(2 + i)}>
              <article className="grid gap-4 rounded-[24px] border border-[#ECEAE5] bg-white p-6 shadow-xs sm:grid-cols-[minmax(0,190px)_1fr] sm:p-8">
                <div>
                  <p className="font-display text-2xl text-[#14171A]" dir="ltr">{entry.name}</p>
                  <span className="mt-3 inline-flex rounded-full bg-[#FDF2F2] px-3 py-1 text-[10.5px] font-semibold tracking-wide text-[#C51E28]">
                    {entry.context}
                  </span>
                </div>
                <div>
                  <h3 className="text-[13px] font-semibold text-[#C51E28]">{entry.role}</h3>
                  <p className="mt-2 text-[13.5px] leading-relaxed text-[#687076]">{entry.description}</p>
                </div>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
