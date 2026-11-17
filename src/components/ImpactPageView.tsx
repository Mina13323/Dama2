import { CircleDashed } from "lucide-react";
import type { Locale } from "@/content";
import { impactContent } from "@/content/pages";
import { Breadcrumbs, ButtonLink, SectionIntro } from "./ui";
import { stagger } from "./motion/Lines";

/**
 * Our Impact. No sustainability commitments, statistics, certificates or
 * awards are invented. The page exposes the section framework ready for
 * approved content while making the content-pending state explicit.
 */
export function ImpactPageView({ locale }: { locale: Locale }) {
  const t = impactContent[locale];
  const ar = locale === "ar";
  const base = `/${locale}`;

  return (
    <div className="bg-[#FBFBFA]">
      <section aria-labelledby="impact-title" className="relative isolate overflow-hidden bg-[#F3F2EF] pb-16 pt-32 sm:pb-24 sm:pt-40 lg:pt-44">
        <div className="container-x max-w-4xl">
          <Breadcrumbs items={[{ label: ar ? "الرئيسية" : "Home", href: base }, { label: ar ? "أثرنا" : "Our Impact" }]} />
          <p className="mt-8 flex items-center gap-3 text-[11px] font-bold tracking-[0.26em] text-[#C51E28] uppercase rtl:tracking-normal">
            <span className="h-[2px] w-5 rounded-full bg-[#C51E28]" aria-hidden />
            {t.hero.eyebrow}
          </p>
          <h1 id="impact-title" className="mt-5 font-display text-[clamp(2.6rem,5vw,4.5rem)] leading-[1.05] text-[#14171A]">
            <span className="block">{t.hero.titleLines[0]}</span>
            <span className="mt-1 block italic text-[#C51E28]">{t.hero.titleLines[1].replace(/\*/g, "")}</span>
          </h1>
          <p className="mt-6 max-w-2xl text-[16px] leading-relaxed text-[#687076]">{t.hero.body}</p>
        </div>
      </section>

      <section className="border-y border-[#ECEAE5] bg-white">
        <div className="container-x grid gap-10 py-16 sm:py-20 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-7">
            <SectionIntro eyebrow={t.status.eyebrow} lines={t.status.titleLines} body={t.status.body} />
          </div>
          <div className="rounded-[24px] border border-[#ECEAE5] bg-[#F7F6F3] p-7 lg:col-span-5">
            <CircleDashed aria-hidden strokeWidth={1.4} className="size-7 text-[#C51E28]" />
            <p className="mt-4 text-[13.5px] leading-relaxed text-[#687076]">{t.status.note}</p>
          </div>
        </div>
      </section>

      <section aria-labelledby="impact-framework-title" className="bg-[#F3F2EF] py-16 sm:py-24">
        <div className="container-x">
          <p className="text-[11px] font-bold tracking-[0.24em] text-[#C51E28] uppercase rtl:tracking-normal">{t.framework.eyebrow}</p>
          <h2 id="impact-framework-title" className="mt-3 font-display text-[clamp(2rem,3.6vw,3rem)] text-[#14171A]">
            {t.framework.titleLines[0]} <span className="italic text-[#C51E28]">{t.framework.titleLines[1].replace(/\*/g, "")}</span>
          </h2>
          <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {t.framework.items.map((item, i) => (
              <li key={item.title} data-reveal="up" style={stagger(i)} className="rounded-[24px] border border-[#ECEAE5] bg-white p-6 sm:p-7">
                <span className="text-[11px] font-bold tracking-[0.2em] text-[#C51E28]">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-4 font-display text-xl text-[#14171A]">{item.title}</h3>
                <p className="mt-2 text-[13.5px] leading-relaxed text-[#687076]">{item.body}</p>
              </li>
            ))}
          </ul>
          <p className="mt-6 text-[11.5px] text-[#8C939B]">
            {ar ? "هذه البنية جاهزة لاستقبال محتوى معتمد فقط." : "This structure is ready to receive approved content only."}
          </p>
        </div>
      </section>

      <section className="bg-[#111417] text-white">
        <div className="container-x flex flex-col gap-6 py-16 sm:flex-row sm:items-center sm:justify-between sm:py-20">
          <div>
            <p className="text-[11px] font-bold tracking-[0.24em] text-[#E4545C] uppercase rtl:tracking-normal">{t.cta.eyebrow}</p>
            <h2 className="mt-3 font-display text-[clamp(1.8rem,3.2vw,2.8rem)] text-white">
              {t.cta.titleLines[0]} <span className="italic text-[#E4545C]">{t.cta.titleLines[1].replace(/\*/g, "")}</span>
            </h2>
            <p className="mt-3 max-w-lg text-[14.5px] leading-relaxed text-white/70">{t.cta.body}</p>
          </div>
          <ButtonLink href={`${base}/projects`}>{t.cta.button}</ButtonLink>
        </div>
      </section>
    </div>
  );
}
