import Image from "next/image";
import type { Dictionary } from "@/content";
import { asset } from "@/content/news";
import { leadership } from "@/content/site";
import { Accent } from "../motion/Lines";

/** Chief Executive Officer: arched portrait with the red arch behind it, role and (once approved) name. */
export function AboutLeadership({ dict }: { dict: Dictionary }) {
  const t = dict.about.leadership;
  const ceo = leadership.find((l) => l.role === "ceo");
  if (!ceo || !ceo.portrait) return null;

  return (
    <section id="leadership" aria-labelledby="leadership-title" className="relative isolate scroll-mt-24 overflow-hidden bg-cream py-section sm:py-section-lg">
      <div className="mx-auto grid w-full max-w-[1600px] gap-14 px-4 sm:px-8 lg:grid-cols-13 lg:items-center lg:gap-10 lg:px-14">
        <div data-reveal="card" className="relative mx-auto w-full max-w-[640px] pb-6 order-2 lg:order-1 lg:col-span-5">
          <div aria-hidden className="pointer-events-none absolute -start-4 bottom-0 h-[58%] w-[34%] rounded-ss-[120px] bg-gradient-to-b from-red-primary to-red-deep sm:-start-8" />
          <div aria-hidden className="pointer-events-none absolute end-0 top-0 h-[24%] w-[40%] rounded-t-card bg-stone" />
          <div className="relative ms-6 aspect-[4/5] overflow-hidden rounded-t-full rounded-b-card border-[5px] border-white bg-stone shadow-lift">
            <Image src={asset(ceo.portrait)} alt={t.imageAlt} fill sizes="(min-width:1024px) 38vw, 90vw" className="object-cover object-[48%_30%]" />
          </div>
        </div>

        <div className="order-1 lg:order-2 lg:col-span-8 lg:ps-10">
          <p className="flex items-center gap-2.5 text-small font-bold tracking-[0.16em] text-red-primary uppercase rtl:tracking-normal">
            <span aria-hidden className="h-[2px] w-5 bg-red-primary" />
            {t.eyebrow}
          </p>
          <h2 id="leadership-title" className="mt-5 font-display text-[clamp(2.5rem,4.4vw,4.6rem)] leading-[1.06] text-ink">
            {t.titleLines.map((line) => (
              <span key={line} className="block">
                <Accent text={line} />
              </span>
            ))}
          </h2>
          <p className="mt-7 max-w-xl text-body leading-[1.8] text-muted">{t.body}</p>

          <div className="mt-10 max-w-md rounded-card border border-white bg-white/85 p-7 shadow-card backdrop-blur-md">
            <p className="text-small font-bold tracking-[0.16em] text-red-primary uppercase rtl:tracking-normal">{t.roles.ceo}</p>
            <p className={`mt-3 font-display text-[1.8rem] leading-tight ${ceo.name ? "text-ink" : "text-subtle"}`}>{ceo.name || t.namePending}</p>
            {ceo.linkedin && (
              <a href={ceo.linkedin} target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex items-center gap-2 text-body-sm font-semibold text-ink hover:text-red-primary">
                {t.linkedin}
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
