import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LegalPageView } from "@/components/LegalPageView";
import { getDictionary, isLocale, locales, type Locale } from "@/content";
import { legalVerified } from "@/content/site";
import { pathMetadata } from "@/lib/page-meta";
import { pagePath } from "@/lib/routes";

/** Legal documents: /privacy-policy and /terms. Add a document here and in LegalPageView. */
const docs = {
  "privacy-policy": { kind: "privacy", copy: "privacyPage" },
  terms: { kind: "terms", copy: "termsPage" },
} as const;
type Doc = keyof typeof docs;
const isDoc = (d: string): d is Doc => d in docs;

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.flatMap((locale) => (Object.keys(docs) as Doc[]).map((doc) => ({ locale, doc })));
}

type Params = Promise<{ locale: string; doc: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { locale, doc } = await params;
  if (!isLocale(locale) || !isDoc(doc)) return {};
  const meta = getDictionary(locale)[docs[doc].copy].meta;
  // Indexed only once the legal copy has been verified.
  return pathMetadata(pagePath(docs[doc].kind), locale, { title: meta.title, description: meta.description, noindex: !legalVerified });
}

export default async function LegalPage({ params }: { params: Params }) {
  const { locale: l, doc } = await params;
  if (!isDoc(doc)) notFound();
  const locale = l as Locale;
  return <LegalPageView locale={locale} dict={getDictionary(locale)} kind={docs[doc].kind} />;
}
