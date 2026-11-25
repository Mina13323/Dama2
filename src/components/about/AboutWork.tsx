import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Building2, ShoppingBag } from "lucide-react";
import type { Locale } from "@/content";
import { aboutBlocks, type Block } from "@/content/page-content";
import { linkHref } from "@/lib/routes";
import { Accent } from "../motion/Lines";
import { buttonClass } from "@/components/ui";

type Split = Extract<Block, { kind: "split" }>;
const pointIcons = [Building2, ShoppingBag];

/** "Our work": copy + two key facts on one side, arched photograph with red arch and inset detail on the other. */
export function AboutWork({ locale }: { locale: Locale }) {
  const b = aboutBlocks(locale).work as Split;
  const [main, detail] = b.images ?? [];
  const body = Array.isArray(b.body) ? b.body.join(" ") : b.body;

  return (
    <section id={b.id} aria-labelledby={`${b.id}-title`} className="relative scroll-mt-24 overflow-hidden bg-cream py-section sm:py-section-lg">
      <div className="mx-auto grid w-full max-w-[1600px] gap-14 px-4 sm:px-8 lg:grid-cols-13 lg:items-center lg:gap-10 lg:px-14">
        <div className="lg:col-span-5">
          <p className="flex items-center gap-2.5 text-small font-bold tracking-[0.16em] text-red-primary uppercase rtl:tracking-normal">
            <span aria-hidden className="h-[2px] w-5 bg-red-primary" />
            {b.eyebrow}
          </p>
          <h2 id={`${b.id}-title`} className="mt-5 font-display text-[clamp(2.4rem,4vw,4.2rem)] leading-[1.1] text-ink">
            {b.lines.map((line) => (
              <span key={line} className="block">
                <Accent text={line} />
              </span>
            ))}
          </h2>
          {body && <p className="mt-7 max-w-xl text-body leading-[1.8] text-muted">{body}</p>}

          {b.points && (
            <ul className="mt-10 grid max-w-xl grid-cols-2">
              {b.points.map((point, i) => {
                const [title, caption] = point.split(/:\s*/);
                const Icon = pointIcons[i] ?? Building2;
                return (
                  <li key={point} className={`flex gap-4 ${i > 0 ? "border-s border-ink/12 ps-6 sm:ps-8" : "pe-4"}`}>
                    <Icon aria-hidden className="size-10 shrink-0 text-red-primary" strokeWidth={1.3} />
                    <div>
                      <p className="text-lead font-semibold leading-snug text-ink first-letter:uppercase">{title}</p>
                      {caption && <p className="mt-2 text-body-sm leading-snug text-muted">{caption}</p>}
                    </div>
                  </li>
                );
              })}
            </ul>
          )}

          {b.link && (
            <Link href={linkHref(b.link, locale)} className={`${buttonClass("red", "md")} mt-11`}>
              {b.link.label}
              <ArrowRight aria-hidden className="flip-rtl size-4 transition-transform group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5" />
            </Link>
          )}
        </div>

        <div data-reveal="card" className="relative mx-auto w-full max-w-[860px] pb-10 lg:col-span-8 lg:pe-16 rtl:lg:pe-0 rtl:lg:ps-16">
          <div aria-hidden className="pointer-events-none absolute end-6 top-2 h-[62%] w-[38%] rounded-t-full bg-gradient-to-b from-red-primary to-red-deep" />
          {main && (
            <div className="relative aspect-[6/5.6] w-[86%] overflow-hidden rounded-b-card rounded-t-full border-[5px] border-white bg-stone shadow-lift">
              <Image src={main.src} alt={main.alt} fill sizes="(min-width:1024px) 46vw, 90vw" className="object-cover transition-transform duration-[1.2s] ease-soft hover:scale-[1.03]" style={{ objectPosition: main.pos }} />
            </div>
          )}
          {detail && (
            <div className="absolute bottom-0 end-0 aspect-[4/5] w-[34%] overflow-hidden rounded-card border-[6px] border-white bg-stone shadow-card">
              <Image src={detail.src} alt={detail.alt} fill sizes="(min-width:1024px) 18vw, 34vw" className="object-cover object-[60%_40%]" />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
