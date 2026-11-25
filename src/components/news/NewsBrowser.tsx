"use client";

import Image from "next/image";
import Link from "next/link";
import { useId, useMemo, useState } from "react";
import { ArrowRight, Clock, Search } from "lucide-react";
import type { Dictionary, Locale } from "@/content";
import { getNewsCategories, type NewsArticle, type NewsCategory } from "@/content/news";
import { stagger } from "../motion/Lines";

export function NewsBrowser({
  articles,
  locale,
  labels,
}: {
  articles: NewsArticle[];
  locale: Locale;
  labels: Dictionary["newsPage"];
}) {
  const [filter, setFilter] = useState<"all" | NewsCategory>("all");
  const [query, setQuery] = useState("");
  const searchId = useId();

  const categories: ("all" | NewsCategory)[] = ["all", ...getNewsCategories()];

  const visible = useMemo(() => {
    return articles.filter((article) => {
      const copy = article.copy[locale];
      const matchesCategory = filter === "all" || article.category === filter;
      const q = query.trim().toLowerCase();
      const matchesQuery =
        !q ||
        copy.title.toLowerCase().includes(q) ||
        copy.summary.toLowerCase().includes(q) ||
        copy.categoryLabel.toLowerCase().includes(q);
      return matchesCategory && matchesQuery;
    });
  }, [articles, filter, query, locale]);

  const featured = useMemo(() => {
    if (filter !== "all" || query.trim()) return undefined;
    return articles.find((a) => a.featured) ?? articles[0];
  }, [articles, filter, query]);

  const gridArticles = useMemo(() => {
    if (!featured) return visible;
    return visible.filter((a) => a.slug !== featured.slug);
  }, [visible, featured]);

  return (
    <div className="pb-24 sm:pb-32">
      {/* Filter and Search Bar */}
      <div className="frame-wide border-y border-border py-5">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          {/* Categories */}
          <div
            role="group"
            aria-label="Filter stories by category"
            className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4 sm:mx-0 sm:flex-wrap sm:px-0"
          >
            {categories.map((c) => {
              const active = filter === c;
              const label = c === "all" ? labels.filterAll : labels.filters[c];
              return (
                <button
                  key={c}
                  type="button"
                  aria-pressed={active}
                  onClick={() => setFilter(c)}
                  className={`min-h-11 shrink-0 rounded-full border px-5 text-small font-semibold transition-all duration-200 ${
                    active
                      ? "border-red-primary bg-red-primary text-white shadow-sm"
                      : "border-border bg-white text-ink hover:border-red-primary/40 hover:text-red-primary shadow-2xs"
                  }`}
                >
                  {label}
                </button>
              );
            })}
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-72">
            <label htmlFor={searchId} className="sr-only">
              {labels.searchPlaceholder}
            </label>
            <Search aria-hidden className="absolute start-4 top-1/2 size-4 -translate-y-1/2 text-subtle" />
            <input
              id={searchId}
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={labels.searchPlaceholder}
              className="min-h-11 w-full rounded-full border border-border bg-white ps-10 pe-4 text-small text-ink outline-none transition-all placeholder:text-subtle focus:border-red-primary focus:ring-1 focus:ring-red-primary"
            />
          </div>
        </div>
      </div>

      <div className="frame-wide mt-10 sm:mt-14">
        {/* Featured Story Banner (when not searching/filtering) */}
        {featured && (
          <article
            data-reveal="card"
            className="group relative mb-14 overflow-hidden rounded-card border border-white bg-white/85 backdrop-blur-md shadow-lg lg:grid lg:grid-cols-13 lg:items-center shadow-card"
          >
            <div className="relative aspect-[16/10] overflow-hidden sm:aspect-[16/9] lg:col-span-8 lg:h-full lg:min-h-[440px]">
              <div data-reveal="wipe" className="absolute inset-0">
                <Image
                  src={featured.image}
                  alt=""
                  fill
                  priority
                  sizes="(min-width:1024px) 58vw, 100vw"
                  className="object-cover transition-transform duration-[1.2s] ease-soft group-hover:scale-105"
                />
              </div>
              <span className="absolute start-5 top-5 rounded-full bg-red-primary px-3.5 py-1 text-caption font-semibold tracking-wider text-white uppercase shadow-md backdrop-blur">
                {labels.featuredBadge}
              </span>
            </div>

            <div className="p-8 sm:p-10 lg:col-span-5 lg:p-12">
              <div className="flex items-center gap-2 text-caption font-medium text-subtle uppercase">
                <span className="text-red-primary font-semibold">{featured.copy[locale].categoryLabel}</span>
                <span aria-hidden>·</span>
                <span>{featured.copy[locale].date}</span>
                <span aria-hidden>·</span>
                <span className="flex items-center gap-1">
                  <Clock aria-hidden className="size-3" />
                  {featured.copy[locale].readTime}
                </span>
              </div>

              <h2 className="mt-4 font-serif text-[clamp(1.75rem,2.5vw,2.5rem)] font-normal leading-tight text-ink transition-colors group-hover:text-red-primary">
                <Link
                  href={`/${locale}/news/${featured.slug}`}
                  className="after:absolute after:inset-0 focus-visible:outline-none"
                >
                  {featured.copy[locale].title}
                </Link>
              </h2>

              <p className="mt-4 text-body-sm font-normal leading-golden text-ink-soft">
                {featured.copy[locale].summary}
              </p>

              <div className="mt-8 flex items-center gap-2 text-small font-semibold text-red-primary group-hover:text-red-dark">
                <span>{labels.readArticle}</span>
                <ArrowRight aria-hidden className="flip-rtl size-4 transition-transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1" />
              </div>
            </div>
          </article>
        )}

        {/* Stories Grid */}
        {visible.length === 0 ? (
          <div className="py-20 text-center">
            <p className="font-serif text-2xl text-ink">{labels.empty}</p>
            <button
              type="button"
              onClick={() => {
                setFilter("all");
                setQuery("");
              }}
              className="mt-6 inline-flex min-h-11 items-center rounded-full border border-border bg-white px-6 text-small font-semibold text-ink hover:border-red-primary hover:text-red-primary"
            >
              {labels.resetFilters}
            </button>
          </div>
        ) : (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {gridArticles.map((article, i) => {
              const copy = article.copy[locale];
              const href = `/${locale}/news/${article.slug}`;

              return (
                <article
                  key={article.slug}
                  data-reveal="card"
                  style={stagger(i)}
                  className="group relative flex flex-col overflow-hidden rounded-card border border-white bg-white/85 backdrop-blur-md shadow-card transition-[box-shadow,translate,border-color] duration-500 ease-soft hover:-translate-y-1 hover:border-red-primary/40 hover:shadow-xl"
                >
                  <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                    <div data-reveal="wipe" style={stagger(i)} className="absolute inset-0">
                      <Image
                        src={article.image}
                        alt=""
                        fill
                        sizes="(min-width:1024px) 30vw, (min-width:640px) 45vw, 100vw"
                        className="object-cover transition-transform duration-[1.1s] ease-soft group-hover:scale-105"
                      />
                    </div>
                    <span className="absolute start-4 top-4 rounded-full bg-red-soft border border-red-border/60 px-3 py-1 text-micro font-semibold tracking-wider text-red-primary uppercase shadow-xs">
                      {copy.categoryLabel}
                    </span>
                  </div>

                  <div className="flex flex-1 flex-col p-6 sm:p-7">
                    <div className="flex items-center gap-1.5 text-caption font-medium text-subtle uppercase">
                      <span>{copy.date}</span>
                      <span aria-hidden>·</span>
                      <span className="flex items-center gap-1">
                        <Clock aria-hidden className="size-3" />
                        {copy.readTime}
                      </span>
                    </div>

                    <h3 className="mt-3 font-serif text-lead font-normal leading-snug text-ink transition-colors group-hover:text-red-primary">
                      <Link href={href} className="after:absolute after:inset-0 focus-visible:outline-none">
                        {copy.title}
                      </Link>
                    </h3>

                    <p className="mt-3 line-clamp-2 text-body-sm font-normal leading-golden text-ink-soft">
                      {copy.summary}
                    </p>

                    <div className="mt-auto flex items-center justify-between pt-6 text-small font-semibold text-ink">
                      <span className="group-hover:text-red-primary transition-colors">{labels.readArticle}</span>
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
        )}

        {/* Press Office Box in Signature Deep Charcoal with Red Button */}
        <div data-reveal="up" className="mt-16 sm:mt-24 rounded-card bg-gradient-to-br from-red-bright to-red-deep p-8 sm:p-12 text-white shadow-red-lift sm:rounded-panel lg:flex lg:items-center lg:justify-between lg:gap-8">
          <div className="max-w-xl">
            <div className="flex items-center gap-3">
              <span className="h-[2px] w-4 rounded-full bg-red-primary" aria-hidden />
              <p className="text-micro font-semibold tracking-[0.24em] text-white/80 uppercase rtl:tracking-normal">
                {labels.pressBox.eyebrow}
              </p>
            </div>
            <h2 className="mt-3 font-serif text-[clamp(1.75rem,2.8vw,2.5rem)] font-normal text-white">{labels.pressBox.title}</h2>
            <p className="mt-3 text-body-sm leading-golden text-white/70">{labels.pressBox.body}</p>
          </div>
          <div className="mt-6 lg:mt-0 shrink-0">
            <Link
              href={`/${locale}/contact`}
              className="inline-flex min-h-12 items-center gap-3 rounded-full bg-white px-7 text-small font-semibold text-red-primary shadow-sm transition-colors hover:bg-red-soft"
            >
              {labels.pressBox.cta}
              <ArrowRight aria-hidden className="flip-rtl size-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
