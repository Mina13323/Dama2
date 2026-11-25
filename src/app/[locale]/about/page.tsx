import type { Metadata } from "next";
import { AboutCta } from "@/components/about/AboutCta";
import { AboutHero } from "@/components/about/AboutHero";
import { AboutLeadership } from "@/components/about/AboutLeadership";
import { AboutStory } from "@/components/about/AboutStory";
import { AboutWork } from "@/components/about/AboutWork";
import { PageSections } from "@/components/sections/PageSections";
import { aboutBlocks, pick } from "@/content/page-content";
import { Partners } from "@/components/about/Partners";
import { WhoWeAre } from "@/components/about/WhoWeAre";
import { VisionMission } from "@/components/about/VisionMission";
import { getDictionary, isLocale, locales, type Locale } from "@/content";
import { absoluteUrl, languageAlternates } from "@/lib/seo";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

type Params = Promise<{ locale: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const { about } = getDictionary(locale);
  return {
    title: about.meta.title,
    description: about.meta.description,
    alternates: { canonical: absoluteUrl(`/${locale}/about`), languages: languageAlternates("/about") },
    openGraph: { title: about.meta.title, description: about.meta.description, url: absoluteUrl(`/${locale}/about`) },
  };
}

export default async function AboutPage({ params }: { params: Params }) {
  const locale = (await params).locale as Locale;
  const dict = getDictionary(locale);
  return (
    <>
      <AboutHero dict={dict} />
      <WhoWeAre dict={dict} />
      <AboutStory dict={dict} />
      <VisionMission dict={dict} />
      <AboutLeadership dict={dict} />
      <PageSections locale={locale} blocks={pick(aboutBlocks(locale), ["philosophy"])} />
      <AboutWork locale={locale} />
      <Partners dict={dict} />
      <AboutCta dict={dict} />
    </>
  );
}
