import type { Metadata } from "next";
import { LivingPageView } from "@/components/LivingPageView";
import { isLocale, locales, type Locale } from "@/content";
import { livingContent } from "@/content/pages";
import { absoluteUrl, languageAlternates } from "@/lib/seo";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

type Params = Promise<{ locale: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const t = livingContent[locale].meta;
  return {
    title: t.title,
    description: t.description,
    alternates: { canonical: absoluteUrl(`/${locale}/living`), languages: languageAlternates("/living") },
    openGraph: { title: t.title, description: t.description, url: absoluteUrl(`/${locale}/living`) },
  };
}

export default async function Page({ params }: { params: Params }) {
  const locale = (await params).locale as Locale;
  return <LivingPageView locale={locale} />;
}
