import type { Metadata } from "next";
import { LegalPageView } from "@/components/LegalPageView";
import { getDictionary, isLocale, locales, type Locale } from "@/content";
import { legalVerified } from "@/content/site";
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
    title: dict.termsPage.meta.title,
    description: dict.termsPage.meta.description,
    alternates: { canonical: absoluteUrl(`/${locale}/terms-of-use`), languages: languageAlternates("/terms-of-use") },
    robots: legalVerified ? { index: true, follow: true } : { index: false, follow: true },
  };
}

export default async function TermsOfUsePage({ params }: { params: Params }) {
  const locale = (await params).locale as Locale;
  const dict = getDictionary(locale);
  return <LegalPageView locale={locale} dict={dict} kind="terms" />;
}
