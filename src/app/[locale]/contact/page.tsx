import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowRight, Clock, Mail, MapPin, Phone, ShieldCheck } from "lucide-react";
import { ContactForm } from "@/components/contact/ContactForm";
import { Lines, stagger } from "@/components/motion/Lines";
import { SectionIntro } from "@/components/ui";
import { getDictionary, isLocale, locales, type Locale } from "@/content";
import { contact, contactVerified } from "@/content/site";
import { absoluteUrl, languageAlternates } from "@/lib/seo";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

type Params = Promise<{ locale: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dict = getDictionary(locale);
  return {
    title: dict.contactPage.meta.title,
    description: dict.contactPage.meta.description,
    alternates: { canonical: absoluteUrl(`/${locale}/contact`), languages: languageAlternates("/contact") },
    openGraph: {
      title: dict.contactPage.meta.title,
      description: dict.contactPage.meta.description,
      type: "website",
    },
  };
}

export default async function ContactPage({ params }: { params: Params }) {
  const { locale: rawLocale } = await params;
  const locale = rawLocale as Locale;
  const dict = getDictionary(locale);
  const t = dict.contactPage;
  const c = t.cards;
  const ar = locale === "ar";

  return (
    <div className="min-h-screen bg-[#FBFBFA]">
      {/* Hero */}
      <section aria-labelledby="contact-hero-title" className="relative isolate overflow-hidden bg-[#FBFBFA] pb-16 pt-32 sm:pb-24 sm:pt-40 lg:pb-28 lg:pt-44">
        <div aria-hidden className="pointer-events-none absolute -top-40 start-1/2 -z-10 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-gradient-to-b from-[#F2ECE4]/70 via-[#FBFBFA]/60 to-transparent blur-3xl rtl:translate-x-1/2" />
        <div aria-hidden className="pointer-events-none absolute -bottom-10 end-10 -z-10 hidden h-72 w-52 rounded-t-full rounded-bl-[140px] bg-gradient-to-b from-[#C51E28] to-[#9F121A] opacity-90 shadow-lg lg:block" />
        <div aria-hidden className="pointer-events-none absolute -top-8 start-8 -z-10 h-40 w-24 rounded-full bg-[#EDEBE5]/80" />

        <div className="container-x">
          <div className="max-w-2xl">
            <div className="enter-up flex items-center gap-3">
              <span className="h-[2px] w-5 rounded-full bg-[#C51E28]" aria-hidden />
              <p className="text-[10.5px] font-medium tracking-[0.28em] text-[#687076] uppercase rtl:tracking-normal">
                {t.hero.eyebrow}
              </p>
            </div>
            <Lines
              as="h1"
              id="contact-hero-title"
              mode="enter"
              lines={t.hero.titleLines}
              className="mt-6 font-serif text-[clamp(2.75rem,5.5vw,4.5rem)] font-normal leading-[1.08] tracking-tight text-[#14171A]"
            />
            <p className="enter-up mt-6 max-w-xl text-[16px] font-normal leading-relaxed text-[#555E68] sm:text-lg" style={{ animationDelay: "500ms" }}>
              {t.hero.body}
            </p>
          </div>
        </div>
      </section>

      {/* Main Content Grid: Contact channels + enquiry form */}
      <section className="container-x pb-24 sm:pb-32">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-12">
          <div className="space-y-6 lg:col-span-5">
            {contactVerified ? (
              <>
                <ContactCard icon={MapPin} title={c.salesLounge.title}>
                  <p className="mt-1.5 text-[13.5px] leading-relaxed text-[#555E68]">{c.salesLounge.address}</p>
                  <p className="mt-2 text-[12px] font-semibold text-[#C51E28]">{c.salesLounge.note}</p>
                </ContactCard>
                <ContactCard icon={Phone} title={c.phone.title}>
                  <a href={`tel:${contact.phone.replace(/\s/g, "")}`} dir="ltr" className="mt-1.5 inline-block text-[15px] font-medium text-[#14171A] hover:text-[#C51E28]">
                    {c.phone.number}
                  </a>
                  <p className="mt-2 flex items-center gap-1.5 text-[12px] text-[#687076]"><Clock aria-hidden className="size-3.5 text-[#C51E28]" />{c.phone.hours}</p>
                </ContactCard>
                <ContactCard icon={Mail} title={c.email.title}>
                  <ul className="mt-2 space-y-1.5 text-[13.5px]">
                    <li><span className="text-[#687076]">{ar ? "عام: " : "General: "}</span><a href={`mailto:${c.email.general}`} className="font-medium text-[#14171A] hover:text-[#C51E28]">{c.email.general}</a></li>
                    <li><span className="text-[#687076]">{ar ? "المبيعات: " : "Sales: "}</span><a href={`mailto:${c.email.sales}`} className="font-medium text-[#14171A] hover:text-[#C51E28]">{c.email.sales}</a></li>
                  </ul>
                </ContactCard>
                <ContactCard icon={MapPin} title={c.map.title}>
                  <p className="mt-2 text-[13.5px] leading-relaxed text-[#555E68]">{c.map.landmarks}</p>
                  <a href={contact.mapUrl} target="_blank" rel="noopener noreferrer" className="mt-5 inline-flex items-center gap-2 rounded-full bg-[#C51E28] px-6 py-2.5 text-[12.5px] font-semibold text-white shadow-xs hover:bg-[#9F121A]">
                    {c.map.viewMap}<ArrowRight aria-hidden className="flip-rtl size-3.5" />
                  </a>
                </ContactCard>
              </>
            ) : (
              <div data-reveal="card" style={stagger(1)} className="rounded-[28px] border border-[#ECEAE5] bg-white p-7 shadow-xs sm:p-9">
                <span className="flex size-11 items-center justify-center rounded-full border border-[#C51E28]/35 bg-[#FDF2F2] text-[#C51E28]">
                  <ShieldCheck aria-hidden strokeWidth={1.8} className="size-5" />
                </span>
                <h2 className="mt-5 font-display text-2xl text-[#14171A]">
                  {ar ? "بيانات التواصل الرسمية قيد الاعتماد" : "Official contact details pending approval"}
                </h2>
                <p className="mt-3 text-[14px] leading-relaxed text-[#687076]">
                  {ar
                    ? "لم تعتمد داما بعد أرقام الهاتف والبريد والعنوان الرسمي. استخدم نموذج الاستفسار للتواصل مع الفريق؛ سيتم نشر القنوات الرسمية فور اعتمادها."
                    : "DAMA has not yet approved the phone numbers, email addresses or office address. Please use the enquiry form to reach the team; official channels will be published as soon as they are confirmed."}
                </p>
                <Link href="#enquiry-form" className="mt-6 inline-flex min-h-11 items-center gap-2 rounded-full border border-[#C51E28] px-5 text-[12.5px] font-semibold text-[#C51E28] hover:bg-[#C51E28] hover:text-white">
                  {ar ? "انتقل إلى النموذج" : "Go to the enquiry form"}
                  <ArrowRight aria-hidden className="flip-rtl size-4" />
                </Link>
              </div>
            )}

            <div className="rounded-[24px] border border-[#ECEAE5] bg-[#F7F6F3] p-6">
              <p className="text-[11px] font-bold tracking-wider text-[#C51E28] uppercase rtl:tracking-normal">
                {ar ? "معلومات المشروعات" : "Project information"}
              </p>
              <p className="mt-2 text-[13px] leading-relaxed text-[#687076]">
                {ar
                  ? "للاستفسار عن الوحدات التجارية أو الطبية في مول رواسين، اختر نوع الاستفسار المناسب في النموذج."
                  : "For Rawasin Mall retail or medical units, select the relevant enquiry type in the form."}
              </p>
            </div>
          </div>

          {/* Contact Form */}
          <div id="enquiry-form" data-reveal="up" style={stagger(2)} className="scroll-mt-32 rounded-[32px] border border-[#ECEAE5] bg-white p-7 shadow-xl sm:p-10 lg:col-span-7">
            <SectionIntro eyebrow={t.form.eyebrow} lines={t.form.titleLines} body={t.form.body} />
            <div className="mt-8">
              <ContactForm locale={locale} labels={t.form} />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function ContactCard({ icon: Icon, title, children }: { icon: typeof MapPin; title: string; children: ReactNode }) {
  return (
    <div data-reveal="card" className="group rounded-[28px] border border-[#ECEAE5] bg-white p-7 shadow-xs transition-all hover:border-[#C51E28]/40 hover:shadow-lg">
      <div className="flex items-start gap-4">
        <span className="flex size-11 shrink-0 items-center justify-center rounded-full border border-[#C51E28]/35 bg-[#FDF2F2] text-[#C51E28] transition-transform group-hover:scale-105">
          <Icon aria-hidden strokeWidth={1.8} className="size-5" />
        </span>
        <div>
          <h2 className="font-serif text-[17px] font-normal text-[#14171A]">{title}</h2>
          {children}
        </div>
      </div>
    </div>
  );
}
