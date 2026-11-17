import Link from "next/link";
import { ArrowRight, Landmark, UserRound, UsersRound } from "lucide-react";
import type { Dictionary } from "@/content";
import { SectionIntro } from "../ui";
import { stagger } from "../motion/Lines";

/**
 * Leadership framework.
 *
 * DAMA has not supplied approved names, portraits, biographies or official
 * position titles. This section therefore presents the *structure* only and
 * states clearly that profiles are pending approval — no people or quotes are
 * invented. Once `content/site.ts -> leadership` is populated, the same grid
 * can render the approved profiles.
 */
export function Leadership({ dict }: { dict: Dictionary }) {
  const t = dict.about.leadership;
  const ar = dict.locale === "ar";

  const tiers = [
    {
      Icon: Landmark,
      kicker: ar ? "المستوى الأول" : "Tier 01",
      title: ar ? "مجلس الإدارة" : "Board of Directors",
      body: ar
        ? "الأسماء والمناصب الرسمية والسير الذاتية تُنشر بعد اعتمادها من داما."
        : "Names, official positions and biographies will be published once approved by DAMA.",
    },
    {
      Icon: UsersRound,
      kicker: ar ? "المستوى الثاني" : "Tier 02",
      title: ar ? "الإدارة التنفيذية" : "Executive Management",
      body: ar
        ? "الهيكل التنفيذي وخطوط الإبلاغ تُنشر بعد اعتمادها رسميًا."
        : "The executive structure and reporting lines will be published once formally approved.",
    },
    {
      Icon: UserRound,
      kicker: ar ? "الملفات الفردية" : "Profiles",
      title: ar ? "السير الذاتية والصور الرسمية" : "Leadership Profiles",
      body: ar
        ? "تدعم الصفحة الصور الرسمية والمناصب والسير الذاتية وروابط الملفات المهنية فور توفرها."
        : "The page supports official portraits, positions, biographies and profile links as soon as they are supplied.",
    },
  ];

  return (
    <section id="leadership" aria-labelledby="leadership-title" className="relative isolate overflow-hidden bg-[#111417] text-white">
      <div className="container-x grid grid-cols-1 gap-12 py-20 sm:py-24 lg:grid-cols-12 lg:items-start lg:gap-10 lg:py-28">
        <div className="lg:col-span-4">
          <SectionIntro id="leadership-title" tone="light" eyebrow={t.eyebrow} lines={t.titleLines} body={t.body} />
          <Link
            href={`/${dict.locale}/contact`}
            className="mt-8 inline-flex min-h-11 items-center gap-3 rounded-full border border-white/25 px-6 text-[12.5px] font-semibold text-white transition-colors hover:border-white/60"
          >
            {ar ? "استفسارات الشركة" : "Corporate enquiries"}
            <ArrowRight aria-hidden className="flip-rtl size-4" />
          </Link>
        </div>

        <ul className="grid gap-5 lg:col-span-8">
          {tiers.map((tier, i) => {
            const Icon = tier.Icon;
            return (
              <li key={tier.title} data-reveal="card" style={stagger(2 + i)}>
                <article className="flex items-start gap-5 rounded-[24px] border border-white/10 bg-white/[0.06] p-6 sm:p-8">
                  <span className="flex size-12 shrink-0 items-center justify-center rounded-full border border-[#C51E28]/50 bg-[#C51E28]/15 text-[#E4545C]">
                    <Icon aria-hidden strokeWidth={1.5} className="size-5" />
                  </span>
                  <div>
                    <p className="text-[10px] font-bold tracking-[0.26em] text-white/45 uppercase rtl:tracking-normal">{tier.kicker}</p>
                    <h3 className="mt-2 font-display text-2xl text-white">{tier.title}</h3>
                    <p className="mt-2 max-w-xl text-[13.5px] leading-relaxed text-white/65">{tier.body}</p>
                  </div>
                </article>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
