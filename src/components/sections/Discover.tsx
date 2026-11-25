import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Building2, Leaf, Newspaper, type LucideIcon } from "lucide-react";
import { getFeaturedProject } from "@/content/projects";
import type { Locale } from "@/content";
import { rawasinHref } from "@/content/projects/rawasin/links";
import { buttonClass } from "@/components/ui";

/** Portfolio gateway: featured project card with overlapping info panel, intro column and three entry cards. */
export function Discover({ locale }: { locale: Locale }) {
  const ar = locale === "ar";
  const base = `/${locale}`;
  const project = getFeaturedProject();
  const copy = project.copy[locale];

  const entries: { to: string; title: string; body: string; Icon: LucideIcon }[] = [
    { to: "developments/rawasin/residential#lifestyle", title: ar ? "تجربة الحياة" : "The living experience", body: ar ? "تصميم يهتم بتفاصيل الحياة اليومية." : "Thoughtful design for the details of everyday life.", Icon: Building2 },
    { to: "about", title: ar ? "رؤيتنا للنمو" : "Our impact", body: ar ? "فلسفتنا في بناء مجتمعات أفضل." : "Our approach to creating places with lasting value.", Icon: Leaf },
    { to: "news", title: ar ? "الأخبار والمستجدات" : "News & updates", body: ar ? "تابع أحدث أخبار داما ومشروعاتها." : "Discover stories and updates from DAMA.", Icon: Newspaper },
  ];

  return (
    <section className="relative isolate overflow-hidden bg-cream py-section sm:py-section-lg" aria-labelledby="discover-title">
      <div className="mx-auto w-full max-w-[1600px] px-4 sm:px-8 lg:px-14">
        <div className="grid items-center gap-12 lg:grid-cols-13 lg:gap-14">
          {/* Featured project */}
          <div className="relative order-2 lg:order-1 lg:col-span-8">
            <span aria-hidden className="absolute -top-12 start-[12%] -z-10 h-28 w-[26%] rounded-t-full bg-gradient-to-b from-red-bright to-red-primary" />
            <span aria-hidden className="absolute -start-14 top-[38%] -z-10 hidden h-[48%] w-20 rounded-ss-full bg-gradient-to-b from-red-bright to-red-deep sm:block" />

            <div data-reveal="zoom" className="relative h-[320px] overflow-hidden rounded-card shadow-lift sm:h-[420px] lg:h-[460px] lg:rounded-panel">
              <Image src={project.image} alt={ar ? "رواسين: شارع المدخل والمباني الحجرية" : "Rawasin: entrance street and stone buildings"} fill sizes="(min-width:1024px) 62vw, 100vw" className="object-cover" />
            </div>

            <div className="relative -mt-14 ms-4 me-4 rounded-card bg-canvas p-7 shadow-card sm:-mt-20 sm:ms-auto sm:me-0 sm:w-[22.5rem] sm:p-8 lg:absolute lg:-end-3 lg:top-[13%] lg:mt-0 lg:flex lg:w-[38%] lg:min-w-[20rem] lg:flex-col lg:justify-center lg:rounded-card lg:p-9">
              <p className="text-caption font-semibold tracking-[0.06em] text-red-primary uppercase rtl:tracking-normal">{ar ? "مشروع جديد — صعيد مصر" : "New project — Upper Egypt"}</p>
              <h3 className="mt-3 font-serif text-[2rem] leading-tight text-ink">{project.name}</h3>
              <p className="mt-3 text-body-sm leading-golden text-muted">{copy.summary}</p>
              <Link href={rawasinHref("rawasin", locale)} className="group mt-5 inline-flex items-center gap-3 text-body-sm font-semibold text-ink transition-colors hover:text-red-primary">
                {ar ? "استكشف رواسين" : "Explore Rawasin"}
                <ArrowRight aria-hidden className="flip-rtl size-4 text-red-primary transition-transform duration-200 group-hover:translate-x-1 rtl:group-hover:-translate-x-1" />
              </Link>
            </div>
          </div>

          {/* Intro */}
          <div className="order-1 lg:order-2 lg:col-span-5 lg:ps-2">
            <p className="flex items-center gap-3 text-small font-medium tracking-[0.12em] text-ink uppercase rtl:tracking-normal">
              <span aria-hidden className="h-[3px] w-7 rounded-full bg-red-primary" />
              {ar ? "اكتشف داما" : "Explore DAMA"}
            </p>
            <h2 id="discover-title" className="mt-4 font-serif text-[clamp(2.5rem,4vw,4.6rem)] leading-[1.05] lg:whitespace-nowrap text-ink">
              {ar ? "مجتمعات صُممت" : "Places made for"}
              <span className="block italic text-red-primary">{ar ? "للحياة." : "living."}</span>
            </h2>
            <p className="mt-5 max-w-md text-body leading-golden text-muted">
              {ar ? "اكتشف مشروعاتنا ومساحاتنا المصممة لتجمع الناس والطبيعة والحياة اليومية." : "Explore our communities and the thinking behind spaces that bring people, nature and everyday life together."}
            </p>
            <Link href={`${base}/developments`} className={`${buttonClass("red", "md")} mt-8`}>
              {ar ? "كل المشروعات" : "View all projects"}
              <ArrowRight aria-hidden className="flip-rtl size-4 transition-transform duration-200 group-hover:translate-x-1 rtl:group-hover:-translate-x-1" />
            </Link>
          </div>
        </div>

        {/* Entry cards */}
        <ul className="mt-16 grid gap-4 md:grid-cols-3 lg:mt-20">
          {entries.map(({ to, title, body, Icon }, i) => (
            <li key={to}>
              <Link href={`${base}/${to}`} className="group flex h-full flex-col rounded-card border border-border bg-canvas px-7 py-6 shadow-soft transition-all duration-300 hover:-translate-y-0.5 hover:border-red-primary/40">
                <span className="text-small font-medium text-red-primary" dir="ltr">0{i + 1} / DAMA</span>
                <div className="mt-5 flex items-center gap-5">
                  <Icon aria-hidden className="size-12 shrink-0 text-bronze" strokeWidth={1.2} />
                  <span aria-hidden className="h-14 w-px shrink-0 bg-ink/10" />
                  <div className="min-w-0 flex-1">
                    <h3 className="font-serif text-[1.4rem] leading-tight text-ink">{title}</h3>
                    <p className="mt-1.5 text-body-sm leading-golden text-muted">{body}</p>
                  </div>
                  <span className="flex size-9 shrink-0 items-center justify-center rounded-full border border-ink/25 text-ink transition-colors group-hover:border-red-primary group-hover:text-red-primary">
                    <ArrowRight aria-hidden className="flip-rtl size-4" />
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
