import type { Metadata } from "next";
import Link from "next/link";
import { getDictionary, isLocale, locales, type Locale } from "@/content";
import { absoluteUrl } from "@/lib/seo";

/**
 * Compatibility aliases for the suggested /developments URL structure.
 * The canonical routes remain /projects/... so existing links never break.
 * Static export cannot issue HTTP 301s, so these pages use an immediate
 * client-side replace, a <meta refresh> fallback and a visible canonical link.
 */
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

const knownPaths: string[][] = [
  [],
  ["rawasin"],
  ["dama-residence"],
  ["dama-view"],
  ["rawasin", "mall"],
];

export function generateStaticParams() {
  return locales.flatMap((locale) => knownPaths.map((path) => ({ locale, path })));
}

type Params = Promise<{ locale: string; path?: string[] }>;

function canonicalPath(locale: string, path?: string[]) {
  return `/${locale}/projects${path?.length ? `/${path.join("/")}` : ""}`;
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { locale, path } = await params;
  if (!isLocale(locale)) return {};
  return {
    title: "Our Developments",
    robots: { index: false, follow: true },
    alternates: { canonical: absoluteUrl(canonicalPath(locale, path)) },
  };
}

export default async function DevelopmentsRedirect({ params }: { params: Params }) {
  const { locale, path } = await params;
  const l = locale as Locale;
  const dict = getDictionary(l);
  const target = `${basePath}${canonicalPath(l, path)}`;
  const script = `window.location.replace(${JSON.stringify(target)});`;

  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center gap-4 px-6 text-center">
      <script dangerouslySetInnerHTML={{ __html: script }} />
      <noscript>
        <meta httpEquiv="refresh" content={`0; url=${target}`} />
      </noscript>
      <p className="eyebrow">{dict.nav.projects}</p>
      <h1 className="heading-lg text-ink">{dict.nav.projects}</h1>
      <p className="max-w-md text-[14px] leading-relaxed text-muted">
        {l === "ar" ? "تم نقل هذه الصفحة إلى العنوان المعتمد." : "This page is available at its canonical address."}
      </p>
      <Link href={canonicalPath(l, path)} className="mt-4 inline-flex min-h-11 items-center rounded-full bg-[#C51E28] px-6 text-[13px] font-semibold text-white hover:bg-[#9F121A]">
        {l === "ar" ? "انتقل الآن" : "Continue"}
      </Link>
    </div>
  );
}
