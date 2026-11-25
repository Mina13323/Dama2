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
    <div className="min-h-screen bg-canvas">
      {/* Hero */}
      <section aria-labelledby="contact-hero-title" className="relative isolate overflow-hidden bg-cream pb-16 pt-32 sm:pb-24 sm:pt-40 lg:pb-28 lg:pt-44">
        <div aria-hidden className="pointer-events-none absolute -top-40 start-1/2 -z-10 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-gradient-to-b from-sand/70 via-canvas/60 to-transparent blur-3xl rtl:translate-x-1/2" />
        <div aria-hidden className="pointer-events-none absolute -bottom-10 end-10 -z-10 hidden h-72 w-52 rounded-t-full rounded-bl-[140px] bg-gradient-to-b from-red-primary to-red-dark opacity-90 shadow-lg lg:block" />

        <div className="frame-wide">
          <div className="max-w-2xl">
            <div className="enter-up flex items-center gap-3">
              <span className="h-[2px] w-5 rounded-full bg-red-primary" aria-hidden />
              <p className="text-micro font-medium tracking-[0.28em] text-muted uppercase rtl:tracking-normal">
                {t.hero.eyebrow}
              </p>
            </div>
            <Lines
              as="h1"
              id="contact-hero-title"
              mode="enter"
              lines={t.hero.titleLines}
              className="mt-6 font-serif text-[clamp(2.75rem,5.5vw,4.5rem)] font-normal leading-[1.08] tracking-tight text-ink"
            />
            <p className="enter-up mt-6 max-w-xl text-body font-normal leading-golden text-ink-soft sm:text-lg" style={{ animationDelay: "500ms" }}>
              {t.hero.body}
            </p>
          </div>
        </div>
      </section>

      {/* Main Content Grid: Contact channels + enquiry form */}
      <section className="frame-wide pb-24 sm:pb-32">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-13 lg:gap-12">
          <div className="space-y-6 lg:col-span-5">
            {contactVerified ? (
              <>
                <ContactCard icon={MapPin} title={c.salesLounge.title}>
                  <p className="mt-1.5 text-body-sm leading-golden text-ink-soft">{c.salesLounge.address}</p>
                  <p className="mt-2 text-small font-semibold text-red-primary">{c.salesLounge.note}</p>
                </ContactCard>
                <ContactCard icon={Phone} title={c.phone.title}>
                  <a href={`tel:${contact.phone.replace(/\s/g, "")}`} dir="ltr" className="mt-1.5 inline-block text-body-sm font-medium text-ink hover:text-red-primary">
                    {c.phone.number}
                  </a>
                  <p className="mt-2 flex items-center gap-1.5 text-small text-muted"><Clock aria-hidden className="size-3.5 text-red-primary" />{c.phone.hours}</p>
                </ContactCard>
                <ContactCard icon={Mail} title={c.email.title}>
                  <ul className="mt-2 space-y-1.5 text-body-sm">
                    <li><span className="text-muted">{ar ? "عام: " : "General: "}</span><a href={`mailto:${c.email.general}`} className="font-medium text-ink hover:text-red-primary">{c.email.general}</a></li>
                    <li><span className="text-muted">{ar ? "المبيعات: " : "Sales: "}</span><a href={`mailto:${c.email.sales}`} className="font-medium text-ink hover:text-red-primary">{c.email.sales}</a></li>
                  </ul>
                </ContactCard>
                <ContactCard icon={MapPin} title={c.map.title}>
                  <p className="mt-2 text-body-sm leading-golden text-ink-soft">{c.map.landmarks}</p>
                  <a href={contact.mapUrl} target="_blank" rel="noopener noreferrer" className="mt-5 inline-flex items-center gap-2 rounded-full bg-red-primary px-6 py-2.5 text-small font-semibold text-white shadow-xs hover:bg-red-dark">
                    {c.map.viewMap}<ArrowRight aria-hidden className="flip-rtl size-3.5" />
                  </a>
                </ContactCard>
              </>
            ) : (
              <div data-reveal="card" style={stagger(1)} className="rounded-card border border-white bg-white/85 backdrop-blur-md p-7 shadow-card sm:p-9">
                <span className="flex size-11 items-center justify-center rounded-full border border-red-primary/35 bg-red-soft text-red-primary">
                  <ShieldCheck aria-hidden strokeWidth={1.8} className="size-5" />
                </span>
                <h2 className="mt-5 font-display text-2xl text-ink">
                  {ar ? "بيانات التواصل الرسمية قيد الاعتماد" : "Official contact details pending approval"}
                </h2>
                <p className="mt-3 text-body-sm leading-golden text-muted">
                  {ar
                    ? "لم تعتمد داما بعد أرقام الهاتف والبريد والعنوان الرسمي. استخدم نموذج الاستفسار للتواصل مع الفريق؛ سيتم نشر القنوات الرسمية فور اعتمادها."
                    : "DAMA has not yet approved the phone numbers, email addresses or office address. Please use the enquiry form to reach the team; official channels will be published as soon as they are confirmed."}
                </p>
                <Link href="#enquiry-form" className="mt-6 inline-flex min-h-11 items-center gap-2 rounded-full border border-red-primary px-5 text-small font-semibold text-red-primary hover:bg-red-primary hover:text-white">
                  {ar ? "انتقل إلى النموذج" : "Go to the enquiry form"}
                  <ArrowRight aria-hidden className="flip-rtl size-4" />
                </Link>
              </div>
            )}

            <div className="rounded-card border border-border bg-cream p-6">
              <p className="text-caption font-bold tracking-wider text-red-primary uppercase rtl:tracking-normal">
                {ar ? "معلومات المشروعات" : "Project information"}
              </p>
              <p className="mt-2 text-small leading-golden text-muted">
                {ar
                  ? "للاستفسار عن الوحدات التجارية أو الطبية في مول رواسين، اختر نوع الاستفسار المناسب في النموذج."
                  : "For Rawasin Mall retail or medical units, select the relevant enquiry type in the form."}
              </p>
            </div>
          </div>

          {/* Contact Form */}
          <div id="enquiry-form" data-reveal="up" style={stagger(2)} className="scroll-mt-32 rounded-card border border-white bg-white/85 backdrop-blur-md p-7 shadow-xl sm:p-10 lg:col-span-8 shadow-card">
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
    <div data-reveal="card" className="group rounded-card border border-white bg-white/85 backdrop-blur-md p-7 shadow-card transition-all hover:border-red-primary/40 hover:shadow-lg">
      <div className="flex items-start gap-4">
        <span className="flex size-11 shrink-0 items-center justify-center rounded-full border border-red-primary/35 bg-red-soft text-red-primary transition-transform group-hover:scale-105">
          <Icon aria-hidden strokeWidth={1.8} className="size-5" />
        </span>
        <div>
          <h2 className="font-serif text-lead font-normal text-ink">{title}</h2>
          {children}
        </div>
      </div>
    </div>
  );
}
