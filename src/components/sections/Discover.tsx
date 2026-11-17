import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getProjects } from "@/content/projects";
import type { Locale } from "@/content";

/** A portfolio and editorial gateway, keeping project data in one place. */
export function Discover({ locale }: { locale: Locale }) {
  const ar = locale === "ar";
  const base = `/${locale}`;
  return (
    <section className="bg-[#F7F6F3] py-20 sm:py-28" aria-labelledby="discover-title">
      <div className="container-x">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-semibold tracking-[.2em] text-[#C51E28] uppercase">{ar ? "اكتشف داما" : "Explore DAMA"}</p>
            <h2 id="discover-title" className="mt-4 max-w-2xl font-serif text-[clamp(2.5rem,5vw,4.5rem)] leading-[1.06] text-[#14171A]">{ar ? "مجتمعات صُممت للحياة." : "Places made for living."}</h2>
            <p className="mt-5 max-w-xl leading-relaxed text-[#687076]">{ar ? "اكتشف مشروعاتنا ومساحاتنا المصممة لتجمع الناس والطبيعة والحياة اليومية." : "Explore our communities and the thinking behind spaces that bring people, nature and everyday life together."}</p>
          </div>
          <Link href={`${base}/projects`} className="inline-flex w-fit items-center gap-3 border-b border-[#C51E28] pb-2 text-sm font-semibold text-[#14171A]">{ar ? "كل المشروعات" : "View all projects"}<ArrowRight className="flip-rtl size-4" /></Link>
        </div>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {getProjects().map((project) => <Link key={project.slug} href={`${base}/projects/${project.slug}`} className="group overflow-hidden rounded-[24px] bg-white shadow-sm transition-shadow hover:shadow-xl">
            <div className="relative aspect-[4/3] overflow-hidden"><Image src={project.image} alt="" fill sizes="(min-width:768px) 33vw, 100vw" className="object-cover transition-transform duration-700 group-hover:scale-105" /></div>
            <div className="p-6"><p className="text-xs font-medium text-[#C51E28]">{project.copy[locale].location}</p><div className="mt-3 flex items-center justify-between gap-4"><h3 className="font-serif text-2xl text-[#14171A]">{project.name}</h3><ArrowRight className="flip-rtl size-5 text-[#C51E28]" /></div><p className="mt-3 text-sm leading-relaxed text-[#687076]">{project.copy[locale].summary}</p></div>
          </Link>)}
        </div>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {[{href:"living", title:ar?"تجربة الحياة":"The living experience", body:ar?"تصميم يهتم بتفاصيل الحياة اليومية.":"Thoughtful design for the details of everyday life."},{href:"growth", title:ar?"رؤيتنا للنمو":"Our impact", body:ar?"فلسفتنا في بناء مجتمعات أفضل.":"Our approach to creating places with lasting value."},{href:"news", title:ar?"الأخبار والمستجدات":"News & updates", body:ar?"تابع أحدث أخبار داما ومشروعاتها.":"Discover stories and updates from DAMA."}].map((item,i)=><Link key={item.href} href={`${base}/${item.href}`} className="group flex min-h-44 flex-col justify-between rounded-[24px] border border-[#E9E6E0] bg-white p-6 transition-colors hover:border-[#C51E28]/50"><span className="text-xs text-[#C51E28]">0{i+1} / DAMA</span><div className="mt-6 flex items-end justify-between gap-4"><div><h3 className="font-serif text-2xl">{item.title}</h3><p className="mt-2 text-sm leading-relaxed text-[#687076]">{item.body}</p></div><ArrowRight className="flip-rtl size-5 shrink-0 text-[#C51E28]" /></div></Link>)}
        </div>
      </div>
    </section>
  );
}
