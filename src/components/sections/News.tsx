import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";
import type { Dictionary, Locale } from "@/content";
import { getNewsArticles } from "@/content/news";
import { ButtonLink, SectionIntro } from "../ui";
import { Carousel } from "../Carousel";
import { plain, stagger } from "../motion/Lines";

/** Editorial news section. Shows a designed empty state until DAMA approves real stories. */
export function News({ dict, locale }: { dict: Dictionary; locale: Locale }) {
  const t = dict.news;
  const articles = getNewsArticles();
  const ar = locale === "ar";

  return (
    <section id="news" aria-labelledby="news-title" className="bg-white">
      <div className="container-x py-20 sm:py-24 lg:py-28">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:items-end lg:gap-8">
          <div className="lg:col-span-6">
            <SectionIntro id="news-title" eyebrow={t.eyebrow} lines={t.titleLines} />
          </div>
          <div className="lg:col-span-5 lg:col-start-8">
            <p data-reveal="up" style={stagger(4)} className="max-w-md text-[15px] leading-relaxed text-muted">
              {t.body}
            </p>
            <div data-reveal="up" style={stagger(5)} className="mt-6">
              <ButtonLink href={`/${locale}/news`} variant="outline">
                {t.cta}
              </ButtonLink>
            </div>
          </div>
        </div>

        {articles.length === 0 ? (
          <div
            data-reveal="fade"
            style={stagger(6)}
            className="mt-12 grid gap-8 rounded-[28px] border border-[#ECEAE5] bg-[#FBFBFA] p-8 sm:p-12 lg:mt-16 lg:grid-cols-[1fr_auto] lg:items-center"
          >
            <div>
              <p className="text-[11px] font-bold tracking-[0.24em] text-[#C51E28] uppercase rtl:tracking-normal">
                {ar ? "المركز الإعلامي" : "Newsroom"}
              </p>
              <h3 className="mt-3 font-display text-2xl text-[#14171A] sm:text-3xl">
                {ar ? "أخبار داما المعتمدة تُنشر هنا قريبًا." : "Approved DAMA news will be published here."}
              </h3>
              <p className="mt-3 max-w-xl text-[14.5px] leading-relaxed text-[#687076]">
                {ar
                  ? "ننشر فقط الأخبار والبيانات الصحفية وتحديثات المشروعات المعتمدة رسميًا، دون تواريخ أو إعلانات غير مؤكدة."
                  : "We publish only company-approved news, press releases and project updates — never unverified announcements or dates."}
              </p>
            </div>
            <Link
              href={`/${locale}/contact`}
              className="inline-flex min-h-11 w-fit items-center gap-3 rounded-full border border-[#ECEAE5] bg-white px-6 text-[13px] font-semibold text-[#14171A] transition-colors hover:border-[#C51E28] hover:text-[#C51E28]"
            >
              {ar ? "تواصل مع الفريق" : "Contact our team"}
              <ArrowRight aria-hidden className="flip-rtl size-4" />
            </Link>
          </div>
        ) : (
          <Carousel
            label={plain(t.titleLines)}
            prevLabel={dict.a11y.prev}
            nextLabel={dict.a11y.next}
            className="mt-12 lg:mt-16"
            trackClassName="-mx-4 scroll-px-4 sm:scroll-px-8 lg:scroll-px-0 gap-4 px-4 pb-2 sm:-mx-8 sm:px-8 lg:mx-0 lg:gap-5 lg:px-0"
            controlsClassName="mt-6"
          >
            {articles.map((article, i) => {
              const lead = i === 0;
              const copy = article.copy[locale];
              const href = `/${locale}/news/${article.slug}`;

              return (
                <div
                  key={article.slug}
                  data-reveal="card"
                  style={stagger(3 + i)}
                  className={`flex w-[80%] shrink-0 snap-start sm:w-[46%] ${
                    lead ? "lg:w-[calc(50%-20px)]" : "lg:w-[calc(25%-10px)]"
                  }`}
                >
                  <article className="group relative flex w-full flex-col">
                    <div className="relative aspect-[16/11] overflow-hidden rounded-[20px] lg:aspect-auto lg:h-64">
                      <div data-reveal="wipe" style={stagger(3 + i)} className="absolute inset-0">
                        <Image
                          src={article.image}
                          alt=""
                          fill
                          sizes={lead ? "(min-width:1024px) 600px, 80vw" : "(min-width:1024px) 300px, 80vw"}
                          className="object-cover transition-transform duration-[1.1s] ease-soft group-hover:scale-[1.04]"
                        />
                      </div>
                      <span className="absolute start-3 top-3 rounded-full bg-white/90 px-3 py-1 text-[11px] font-semibold tracking-wider text-ink backdrop-blur">
                        {copy.categoryLabel}
                      </span>
                    </div>
                    <div className="flex flex-1 items-start justify-between gap-4 border-b border-line pb-5 pt-5">
                      <div>
                        <p className="flex items-center gap-1.5 text-[11px] font-medium tracking-wider text-muted uppercase rtl:tracking-normal">
                          <span>{copy.date}</span>
                          <span aria-hidden className="mx-1">·</span>
                          <Clock aria-hidden className="size-3" />
                          <span>{copy.readTime}</span>
                        </p>
                        <h3 className={`mt-2 font-semibold leading-snug text-ink transition-colors duration-200 group-hover:text-deep-ink ${lead ? "text-[17px] lg:text-xl" : "text-[15px]"}`}>
                          <Link href={href} className="after:absolute after:inset-0 after:rounded-[20px]">
                            {copy.title}
                          </Link>
                        </h3>
                        {lead && <p className="mt-2.5 line-clamp-2 text-[13.5px] leading-relaxed text-muted">{copy.summary}</p>}
                      </div>
                      <span aria-hidden className="mt-1 inline-flex size-9 shrink-0 items-center justify-center rounded-full border border-line text-ink transition-colors duration-200 group-hover:border-ink group-hover:bg-ink group-hover:text-white">
                        <ArrowRight className="flip-rtl size-4 transition-transform duration-200 group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5" />
                      </span>
                    </div>
                  </article>
                </div>
              );
            })}
          </Carousel>
        )}
      </div>
    </section>
  );
}
