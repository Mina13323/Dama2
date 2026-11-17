import type { Metadata } from "next";
import { ImpactPageView } from "@/components/ImpactPageView";
import { isLocale, locales, type Locale } from "@/content";
import { impactContent } from "@/content/pages";
import { absoluteUrl, languageAlternates } from "@/lib/seo";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

type Params = Promise<{ locale: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const t = impactContent[locale].meta;
  return {
    title: t.title,
    description: t.description,
    alternates: { canonical: absoluteUrl(`/${locale}/growth`), languages: languageAlternates("/growth") },
    openGraph: { title: t.title, description: t.description, url: absoluteUrl(`/${locale}/growth`) },
  };
}

export default async function Page({ params }: { params: Params }) {
  const locale = (await params).locale as Locale;
  return <ImpactPageView locale={locale} />;
}
