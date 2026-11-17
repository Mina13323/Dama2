import type { Metadata } from "next";
import { CorporateHeroJsonLd } from "@/components/CorporateHeroJsonLd";
import { Discover } from "@/components/sections/Discover";
import { FinalCta } from "@/components/sections/FinalCta";
import { Hero } from "@/components/sections/Hero";
import { MallFeature } from "@/components/sections/CorporateFeatures";
import { Lifestyle } from "@/components/sections/Lifestyle";
import { News } from "@/components/sections/News";
import { Projects } from "@/components/sections/Projects";
import { Stats } from "@/components/sections/Stats";
import { Story } from "@/components/sections/Story";
import { Values } from "@/components/sections/Values";
import { getDictionary, isLocale, type Locale } from "@/content";
import { absoluteUrl, languageAlternates } from "@/lib/seo";

type Params = Promise<{ locale: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dict = getDictionary(locale);
  return {
    title: dict.meta.title,
    description: dict.meta.description,
    alternates: { canonical: absoluteUrl(`/${locale}`), languages: languageAlternates() },
    openGraph: { title: dict.meta.title, description: dict.meta.description, url: absoluteUrl(`/${locale}`) },
  };
}

export default async function HomePage({ params }: { params: Params }) {
  const locale = (await params).locale as Locale;
  const dict = getDictionary(locale);
  const props = { dict, locale };

  return (
    <>
      <CorporateHeroJsonLd />
      <Hero {...props} />
      <Stats dict={dict} />
      <Story {...props} />
      <Discover locale={locale} />
      <Projects {...props} />
      <MallFeature locale={locale} />
      <Lifestyle {...props} />
      <Values {...props} />
      <News {...props} />
      <FinalCta {...props} />
    </>
  );
}
