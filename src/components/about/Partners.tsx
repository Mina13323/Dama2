import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Dictionary, Locale } from "@/content";
import { partnerLogoAt } from "@/content/assets";
import { rawasinMall } from "@/content/projects/rawasin/mall";
import { Accent, stagger } from "../motion/Lines";
import { rawasinHref } from "@/content/projects/rawasin/links";

/**
 * Collaborations. The brochure only establishes *project-specific* roles, so each card carries its
 * context tag. Logos are the files DAMA supplied (ACCORD, WE, Middle East Engineering Consultants);
 * Dar Arafa Architecture has no logo file, so its name is set as type rather than an invented mark.
 */
export function Partners({ dict }: { dict: Dictionary }) {
  const t = dict.about.partners;
  const locale = dict.locale as Locale;
  const ar = locale === "ar";
  const entries = rawasinMall[locale].partners.entries;

  return (
    <section id="partners" aria-labelledby="partners-title" className="relative isolate scroll-mt-24 overflow-hidden bg-gradient-to-b from-cream to-[#F6EFE9] py-section sm:py-section-lg">
      <div aria-hidden className="pointer-events-none absolute -top-[30%] end-[-12%] -z-10 hidden aspect-square w-[46vw] rounded-full border border-white lg:block" />

      <div className="mx-auto grid w-full max-w-[1600px] gap-12 px-4 sm:px-8 lg:grid-cols-13 lg:items-start lg:gap-10 lg:px-14">
        <div className="lg:col-span-5">
          <p className="flex items-center gap-2.5 text-small font-bold tracking-[0.16em] text-red-primary uppercase rtl:tracking-normal">
            <span aria-hidden className="h-[2px] w-5 bg-red-primary" />
            {t.eyebrow}
          </p>
          <h2 id="partners-title" className="mt-5 font-display text-[clamp(2.6rem,4.6vw,4.8rem)] leading-[1.04] text-ink">
            {t.titleLines.map((line) => (
              <span key={line} className="block">
                <Accent text={line} />
              </span>
            ))}
          </h2>
          <p className="mt-6 max-w-md text-body leading-[1.75] text-muted">{t.body}</p>
          <Link
            href={rawasinHref("mall-partners", locale)}
            className="group mt-9 inline-flex min-h-12 items-center gap-3 rounded-full border-[1.5px] border-red-primary px-7 text-body-sm font-medium text-red-primary transition-colors hover:bg-red-primary hover:text-white"
          >
            {ar ? "شركاء مول رواسين" : "Rawasin Mall Partners"}
            <ArrowRight aria-hidden className="flip-rtl size-4 transition-transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1" />
          </Link>
        </div>

        <ul className="grid gap-5 sm:grid-cols-2 lg:col-span-8 lg:mt-16">
          {entries.map((entry, i) => {
            const logo = partnerLogoAt(rawasinMall.en.partners.entries[i]?.name);
            return (
              <li key={entry.name} data-reveal="up" style={stagger(2 + i)}>
                <article className="flex h-full flex-col justify-between gap-6 rounded-card border border-white bg-white/80 p-7 shadow-card backdrop-blur-md sm:p-9">
                  <div className="flex items-center gap-6">
                    <div className="flex h-20 min-w-0 flex-1 items-center">
                      {logo ? (
                        <Image src={logo.src} alt={entry.name} width={logo.w} height={logo.h} loading="lazy" className="max-h-16 w-auto max-w-[200px] object-contain object-left mix-blend-multiply rtl:object-right" />
                      ) : (
                        <p className="font-display text-[clamp(1.5rem,2vw,1.9rem)] leading-tight text-ink">{entry.name}</p>
                      )}
                    </div>
                    <span aria-hidden className="h-16 w-px shrink-0 bg-ink/12" />
                    <h3 className="w-[42%] shrink-0 text-body-sm leading-snug text-ink-soft">{entry.role}</h3>
                  </div>
                  <span className="inline-flex w-fit rounded-full bg-red-soft px-4 py-1.5 text-body-sm text-red-primary">{entry.context}</span>
                </article>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
