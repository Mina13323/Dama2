import Link from "next/link";
import { ArrowLeft, FileText, Shield } from "lucide-react";
import { Breadcrumbs } from "@/components/ui";
import { stagger } from "@/components/motion/Lines";
import type { Dictionary, Locale } from "@/content";
import { legalVerified } from "@/content/site";

/**
 * Legal pages. The previous site published fully-written privacy/terms text
 * and a "last updated" date that DAMA had never approved. Those are hidden
 * behind `legalVerified`; once DAMA supplies and approves the text, set the
 * flag in content/site.ts and the approved sections render automatically.
 */
export function LegalPageView({ locale, dict, kind }: { locale: Locale; dict: Dictionary; kind: "privacy" | "terms" }) {
  const t = kind === "privacy" ? dict.privacyPage : dict.termsPage;
  const Icon = kind === "privacy" ? Shield : FileText;
  const ar = locale === "ar";

  return (
    <div className="min-h-screen bg-[#FBFBFA]">
      <header className="container-x pb-12 pt-32 sm:pt-40">
        <Breadcrumbs items={[{ label: dict.nav.home, href: `/${locale}` }, { label: t.hero.title }]} />

        <div className="mt-8 flex items-center gap-3">
          <span className="flex size-9 items-center justify-center rounded-full border border-[#C51E28]/35 bg-[#FDF2F2] text-[#C51E28]">
            <Icon aria-hidden className="size-4" />
          </span>
          <span className="text-[11px] font-semibold tracking-[0.24em] text-[#C51E28] uppercase rtl:tracking-normal">
            {t.hero.eyebrow}
          </span>
        </div>

        <h1 className="mt-4 font-serif text-[clamp(2.5rem,4.5vw,3.75rem)] font-normal text-[#14171A]">
          <span className="enter-line block">{t.hero.title}</span>
        </h1>
        <p className="mt-3 text-[13px] text-[#8C939B]">{t.hero.lastUpdated}</p>
      </header>

      <main className="container-x pb-24 sm:pb-32">
        <div className="max-w-3xl rounded-[32px] border border-[#ECEAE5] bg-white p-8 shadow-sm sm:p-14">
          {legalVerified ? (
            <div className="space-y-10">
              {t.sections.map((section, idx) => (
                <section key={idx} data-reveal="up" style={stagger(idx)}>
                  <h2 className="font-serif text-[clamp(1.4rem,2.2vw,1.8rem)] font-normal text-[#14171A]">{section.heading}</h2>
                  <div className="mt-4 space-y-3">
                    {section.paragraphs.map((p, pIdx) => (
                      <p key={pIdx} className="text-[15.5px] leading-relaxed text-[#555E68]">{p}</p>
                    ))}
                  </div>
                </section>
              ))}
            </div>
          ) : (
            <div className="space-y-5">
              <h2 className="font-display text-2xl text-[#14171A]">
                {ar ? "النص القانوني المعتمد قيد الانتظار" : "Approved legal text is pending"}
              </h2>
              <p className="text-[15.5px] leading-relaxed text-[#555E68]">
                {ar
                  ? "لم توفر داما بعد النص المعتمد لسياسة الخصوصية وشروط الاستخدام. تم إخفاء المسودة السابقة لأنها غير معتمدة، ولا ننشر التزامات قانونية أو بيانات تواصل أو تواريخ تحديث غير مؤكدة."
                  : "DAMA has not yet supplied approved privacy and terms text. The previous draft was removed because it was not approved; no legal commitments, contact details or publication dates are published until the official text is provided."}
              </p>
              <p className="text-[15.5px] leading-relaxed text-[#555E68]">
                {ar
                  ? "للحصول على المستندات الرسمية، يرجى التواصل مع فريق داما عبر نموذج الاستفسار."
                  : "For official documents, please contact the DAMA team through the enquiry form."}
              </p>
              <div className="flex flex-wrap gap-3 pt-2">
                <Link href={`/${locale}/contact`} className="inline-flex min-h-11 items-center rounded-full bg-[#C51E28] px-6 text-[13px] font-semibold text-white hover:bg-[#9F121A]">
                  {ar ? "تواصل مع الفريق" : "Contact our team"}
                </Link>
              </div>
            </div>
          )}

          <div className="mt-14 border-t border-[#ECEAE5] pt-8">
            <Link href={`/${locale}`} className="inline-flex min-h-12 items-center gap-2.5 rounded-full border border-[#ECEAE5] bg-white px-7 text-[13px] font-semibold text-[#14171A] shadow-xs transition-colors hover:border-[#C51E28] hover:text-[#C51E28]">
              <ArrowLeft aria-hidden className="flip-rtl size-4" />
              <span>{dict.pages.backHome}</span>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
