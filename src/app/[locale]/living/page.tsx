import type { Metadata } from "next";
import { EditorialPage } from "@/components/EditorialPage";
import { locales, type Locale } from "@/content";

export function generateStaticParams() { return locales.map((locale) => ({ locale })); }
export async function generateMetadata({params}: {params: Promise<{locale: string}>}): Promise<Metadata> {
 const {locale} = await params;
 return {title: locale === "ar" ? "تجربة الحياة" : "The Living Experience"};
}
export default async function Page({params}: {params: Promise<{locale: string}>}) {
 const locale = (await params).locale as Locale;
 return <EditorialPage locale={locale} theme="living" />;
}
