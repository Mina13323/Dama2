import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, CheckCircle2, Clock, Quote } from "lucide-react";
import { Breadcrumbs } from "@/components/ui";
import { crumbs } from "@/lib/routes";
import { stagger } from "@/components/motion/Lines";
import { getDictionary, isLocale, locales, type Locale } from "@/content";
import { getNewsArticle, getNewsArticles } from "@/content/news";
import { absoluteUrl, languageAlternates } from "@/lib/seo";
import { buttonClass } from "@/components/ui";

export function generateStaticParams() {
  const articles = getNewsArticles();
  // A static export needs at least one param for a dynamic route. While DAMA
  // has not approved any article, a non-indexed placeholder keeps the article
  // template alive in the build without publishing fictional content.
  if (articles.length === 0) return locales.map((locale) => ({ locale, slug: "_pending" }));
  return locales.flatMap((locale) => articles.map((a) => ({ locale, slug: a.slug })));
}

type Params = Promise<{ locale: string; slug: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { locale, slug } = await params;
  const article = getNewsArticle(slug);
  if (!article || !isLocale(locale)) return { title: "News", robots: { index: false, follow: false } };
  const copy = article.copy[locale];
  return {
    title: copy.title,
    description: copy.summary,
    alternates: { canonical: absoluteUrl(`/${locale}/news/${slug}`), languages: languageAlternates(`/news/${slug}`) },
    openGraph: {
      title: copy.title,
      description: copy.summary,
      images: [{ url: article.image }],
      type: "article",
    },
  };
}

export default async function NewsArticlePage({ params }: { params: Params }) {
  const { locale: rawLocale, slug } = await params;
  if (!isLocale(rawLocale)) notFound();
  const locale = rawLocale as Locale;
  const article = getNewsArticle(slug);
  if (!article) return <ArticlePending locale={locale} />;

  const dict = getDictionary(locale);
  const copy = article.copy[locale];
  const t = dict.newsPage;
  const allArticles = getNewsArticles();
  const relatedArticles = allArticles.filter((a) => a.slug !== article.slug).slice(0, 3);

  const breadcrumbs = crumbs("news-article", locale, copy.title, article.slug);

  return (
    <article className="min-h-screen bg-canvas">
      {/* Top Header & Breadcrumbs */}
      <header className="frame-wide pt-32 sm:pt-40 pb-8 sm:pb-12">
        <Breadcrumbs items={breadcrumbs} className="enter-fade" />

        <div className="mt-6 flex flex-wrap items-center gap-3">
          <span className="rounded-full bg-red-soft border border-red-border/60 px-3.5 py-1 text-caption font-semibold tracking-wider text-red-primary uppercase shadow-2xs">
            {copy.categoryLabel}
          </span>
          <span className="flex items-center gap-1.5 text-small font-medium text-subtle uppercase">
            <span>{copy.date}</span>
            <span aria-hidden>·</span>
            <Clock aria-hidden className="size-3.5" />
            <span>{copy.readTime}</span>
          </span>
        </div>

        <h1 className="mt-6 max-w-4xl font-serif text-[clamp(2.4rem,4.5vw,3.75rem)] font-normal leading-[1.12] text-ink">
          <span className="enter-line block">{copy.title}</span>
        </h1>

        <p className="enter-up mt-6 max-w-3xl text-lead font-normal leading-golden text-ink-soft sm:text-lead">
          {copy.leadParagraph}
        </p>
      </header>

      {/* Featured Lead Image */}
      <div className="frame-wide pb-12 sm:pb-16">
        <div className="clip-slant relative aspect-[16/9] w-full overflow-hidden rounded-card border border-border bg-slate-100 shadow-lg sm:aspect-[21/9]">
          <div data-reveal="zoom" className="absolute inset-0">
            <Image
              src={article.image}
              alt={copy.title}
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
          </div>
        </div>
      </div>

      {/* Article Body Content */}
      <div className="frame-wide pb-20 sm:pb-28">
        <div className="mx-auto max-w-3xl">
          <div className="space-y-12">
            {copy.sections.map((section, idx) => (
              <section key={idx} data-reveal="up" style={stagger(idx)} className="space-y-6">
                {section.heading && (
                  <h2 className="font-serif text-[clamp(1.75rem,2.8vw,2.25rem)] font-normal text-ink">{section.heading}</h2>
                )}

                {section.paragraphs.map((para, pIdx) => (
                  <p key={pIdx} className="text-body leading-[1.8] text-ink-soft sm:text-lead">
                    {para}
                  </p>
                ))}

                {section.quote && (
                  <blockquote className="my-8 rounded-card border-s-4 border-red-primary bg-white/85 backdrop-blur-md p-7 sm:p-9 shadow-card border border-white">
                    <Quote aria-hidden className="size-8 text-red-primary" />
                    <p className="mt-3 font-serif text-title-xs leading-snug italic text-ink sm:text-title-sm">
                      &ldquo;{section.quote}&rdquo;
                    </p>
                  </blockquote>
                )}
              </section>
            ))}

            {/* Key Takeaways Box */}
            {copy.keyTakeaways && copy.keyTakeaways.length > 0 && (
              <div data-reveal="card" className="rounded-card border border-white bg-white/85 backdrop-blur-md p-8 sm:p-10 shadow-card">
                <div className="flex items-center gap-3">
                  <span className="h-[2px] w-4 rounded-full bg-red-primary" aria-hidden />
                  <h3 className="text-small font-semibold tracking-wider text-red-primary uppercase">
                    {t.keyTakeaways}
                  </h3>
                </div>
                <ul className="mt-6 space-y-3.5">
                  {copy.keyTakeaways.map((item, kIdx) => (
                    <li key={kIdx} className="flex items-start gap-3.5 text-body-sm leading-golden text-ink">
                      <CheckCircle2 aria-hidden className="size-5 shrink-0 text-red-primary mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Back button */}
          <div className="mt-16 border-t border-border pt-8">
            <Link
              href={`/${locale}/news`}
              className="inline-flex min-h-12 items-center gap-2.5 rounded-full border border-border bg-white px-7 text-small font-semibold text-ink shadow-xs transition-colors hover:border-red-primary hover:text-red-primary"
            >
              <ArrowLeft aria-hidden className="flip-rtl size-4" />
              <span>{t.backToNews}</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Related Stories */}
      {relatedArticles.length > 0 && (
        <section aria-labelledby="related-stories-title" className=" bg-cream py-section sm:py-section-lg">
          <div className="frame-wide">
            <div className="flex items-center gap-3">
              <span className="h-[2px] w-4 rounded-full bg-red-primary" aria-hidden />
              <p className="text-micro font-medium tracking-[0.28em] text-muted uppercase rtl:tracking-normal">
                {t.hero.eyebrow}
              </p>
            </div>
            <h2 id="related-stories-title" className="mt-3 font-serif text-[clamp(2rem,3.5vw,2.8rem)] font-normal text-ink">
              {t.relatedTitle}
            </h2>

            <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {relatedArticles.map((rel, i) => {
                const rCopy = rel.copy[locale];
                return (
                  <article
                    key={rel.slug}
                    data-reveal="card"
                    style={stagger(i)}
                    className="group relative flex flex-col overflow-hidden rounded-card border border-white bg-white/85 backdrop-blur-md shadow-card transition-[box-shadow,translate,border-color] duration-500 ease-soft hover:-translate-y-1 hover:border-red-primary/40 hover:shadow-xl"
                  >
                    <div className="relative aspect-[16/10] overflow-hidden">
                      <Image
                        src={rel.image}
                        alt=""
                        fill
                        sizes="(min-width:1024px) 30vw, (min-width:640px) 45vw, 100vw"
                        className="object-cover transition-transform duration-[1.1s] ease-soft group-hover:scale-105"
                      />
                    </div>
                    <div className="flex flex-1 flex-col p-6 sm:p-7">
                      <p className="text-caption font-medium text-subtle uppercase">
                        <span className="text-red-primary font-semibold">{rCopy.categoryLabel}</span>
                        <span aria-hidden className="mx-1.5">·</span>
                        <span>{rCopy.date}</span>
                      </p>
                      <h3 className="mt-2 font-serif text-lead font-normal leading-snug text-ink transition-colors group-hover:text-red-primary">
                        <Link href={`/${locale}/news/${rel.slug}`} className="after:absolute after:inset-0 focus-visible:outline-none">
                          {rCopy.title}
                        </Link>
                      </h3>
                      <div className="mt-auto pt-6 flex items-center justify-between text-small font-semibold text-ink">
                        <span className="group-hover:text-red-primary transition-colors">{t.readArticle}</span>
                        <span
                          aria-hidden
                          className="inline-flex size-9 items-center justify-center rounded-full bg-red-primary text-white shadow-xs transition-colors group-hover:bg-red-dark"
                        >
                          <ArrowRight className="flip-rtl size-4 transition-transform group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5" />
                        </span>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>
      )}
    </article>
  );
}

/** Content-pending state for the article detail template (never indexed). */
function ArticlePending({ locale }: { locale: Locale }) {
  const ar = locale === "ar";
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center gap-4 px-6 text-center">
      <p className="eyebrow">{ar ? "الأخبار والإعلام" : "News & Media"}</p>
      <h1 className="heading-lg max-w-2xl text-ink">
        {ar ? "لم تُنشر مقالات معتمدة بعد." : "No approved articles have been published yet."}
      </h1>
      <p className="max-w-md text-body-sm leading-golden text-muted">
        {ar
          ? "سيتم نشر الأخبار والبيانات الصحفية وتحديثات المشروعات هنا فور اعتمادها من داما."
          : "Approved news, press releases and project updates will appear here as soon as DAMA supplies them."}
      </p>
      <Link
        href={`/${locale}/news`}
        className={`${buttonClass("red", "sm")} mt-4`}
      >
        {ar ? "العودة إلى الأخبار" : "Back to the newsroom"}
      </Link>
    </div>
  );
}
