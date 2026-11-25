import type { Metadata } from "next";
import { absoluteUrl, languageAlternates } from "@/lib/seo";
import { CareersView } from "@/components/careers/CareersView";
import { Lines } from "@/components/motion/Lines";
import { getDictionary, locales, type Locale } from "@/content";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

type Params = Promise<{ locale: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { locale } = await params;
  const dict = getDictionary(locale as Locale);
  return {
    title: dict.careersPage.meta.title,
    description: dict.careersPage.meta.description,
    alternates: { canonical: absoluteUrl(`/${locale}/careers`), languages: languageAlternates(`/careers`) },
    openGraph: {
      title: dict.careersPage.meta.title,
      description: dict.careersPage.meta.description,
      type: "website",
    },
  };
}

export default async function CareersPage({ params }: { params: Params }) {
  const { locale: rawLocale } = await params;
  const locale = rawLocale as Locale;
  const dict = getDictionary(locale);
  const t = dict.careersPage;

  return (
    <div className="min-h-screen bg-canvas">
      {/* Hero */}
      <section aria-labelledby="careers-hero-title" className="relative isolate overflow-hidden bg-canvas pb-16 pt-32 sm:pb-20 sm:pt-40 lg:pb-24 lg:pt-44">
        {/* Soft atmospheric glow */}
        <div
          aria-hidden
          className="pointer-events-none absolute -top-40 start-1/2 -z-10 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-gradient-to-b from-sand/70 via-canvas/60 to-transparent blur-3xl rtl:translate-x-1/2"
        />

        {/* Decorative red organic arch drop */}
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-10 end-10 -z-10 h-72 w-52 rounded-t-full rounded-bl-[140px] bg-gradient-to-b from-red-primary to-red-dark opacity-90 hidden lg:block shadow-lg"
        />
        {/* Soft stone arch accent */}

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
              id="careers-hero-title"
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

      {/* Culture & Open Roles */}
      <div className="bg-canvas">
        <CareersView locale={locale} labels={t} />
      </div>
    </div>
  );
}
