import Link from "next/link";
import { ArrowLeft, FileText, Shield } from "lucide-react";
import { Breadcrumbs } from "@/components/ui";
import { crumbs } from "@/lib/routes";
import { stagger } from "@/components/motion/Lines";
import type { Dictionary, Locale } from "@/content";
import { legalVerified } from "@/content/site";
import { buttonClass } from "@/components/ui";

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
    <div className="min-h-screen bg-canvas">
      <header className="frame-wide pb-12 pt-32 sm:pt-40">
        <Breadcrumbs items={crumbs(kind === "privacy" ? "privacy" : "terms", locale)} />

        <div className="mt-8 flex items-center gap-3">
          <span className="flex size-9 items-center justify-center rounded-full border border-red-primary/35 bg-red-soft text-red-primary">
            <Icon aria-hidden className="size-4" />
          </span>
          <span className="text-caption font-semibold tracking-[0.24em] text-red-primary uppercase rtl:tracking-normal">
            {t.hero.eyebrow}
          </span>
        </div>

        <h1 className="mt-4 font-serif text-[clamp(2.5rem,4.5vw,3.75rem)] font-normal text-ink">
          <span className="enter-line block">{t.hero.title}</span>
        </h1>
        <p className="mt-3 text-small text-subtle">{t.hero.lastUpdated}</p>
      </header>

      <main className="frame-wide pb-24 sm:pb-32">
        <div className="max-w-3xl rounded-card border border-white bg-white/85 backdrop-blur-md p-8 shadow-card sm:p-14">
          {legalVerified ? (
            <div className="space-y-10">
              {t.sections.map((section, idx) => (
                <section key={idx} data-reveal="up" style={stagger(idx)}>
                  <h2 className="font-serif text-[clamp(1.4rem,2.2vw,1.8rem)] font-normal text-ink">{section.heading}</h2>
                  <div className="mt-4 space-y-3">
                    {section.paragraphs.map((p, pIdx) => (
                      <p key={pIdx} className="text-body leading-golden text-ink-soft">{p}</p>
                    ))}
                  </div>
                </section>
              ))}
            </div>
          ) : (
            <div className="space-y-5">
              <h2 className="font-display text-2xl text-ink">
                {ar ? "النص القانوني المعتمد قيد الانتظار" : "Approved legal text is pending"}
              </h2>
              <p className="text-body leading-golden text-ink-soft">
                {ar
                  ? "لم توفر داما بعد النص المعتمد لسياسة الخصوصية وشروط الاستخدام. تم إخفاء المسودة السابقة لأنها غير معتمدة، ولا ننشر التزامات قانونية أو بيانات تواصل أو تواريخ تحديث غير مؤكدة."
                  : "DAMA has not yet supplied approved privacy and terms text. The previous draft was removed because it was not approved; no legal commitments, contact details or publication dates are published until the official text is provided."}
              </p>
              <p className="text-body leading-golden text-ink-soft">
                {ar
                  ? "للحصول على المستندات الرسمية، يرجى التواصل مع فريق داما عبر نموذج الاستفسار."
                  : "For official documents, please contact the DAMA team through the enquiry form."}
              </p>
              <div className="flex flex-wrap gap-3 pt-2">
                <Link href={`/${locale}/contact`} className={`${buttonClass("red", "sm")}`}>
                  {ar ? "تواصل مع الفريق" : "Contact our team"}
                </Link>
              </div>
            </div>
          )}

          <div className="mt-14 border-t border-border pt-8">
            <Link href={`/${locale}`} className="inline-flex min-h-12 items-center gap-2.5 rounded-full border border-border bg-white px-7 text-small font-semibold text-ink shadow-xs transition-colors hover:border-red-primary hover:text-red-primary">
              <ArrowLeft aria-hidden className="flip-rtl size-4" />
              <span>{dict.pages.backHome}</span>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
