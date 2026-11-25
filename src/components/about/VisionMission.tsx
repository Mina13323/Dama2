import Image from "next/image";
import type { ReactNode } from "react";
import { Eye, MountainSnow } from "lucide-react";
import type { Dictionary } from "@/content";
import { images } from "@/content/site";
import { Accent, stagger } from "../motion/Lines";

type Panel = Dictionary["about"]["vision"]["vision"];

/** Heading + intro over a soft sky; the building rises from the bottom edge; two statement cards (light / red). */
export function VisionMission({ dict }: { dict: Dictionary }) {
  const t = dict.about.vision;
  return (
    <section id="vision-mission" aria-labelledby="vision-mission-title" className="relative isolate scroll-mt-24 overflow-hidden bg-gradient-to-b from-cream to-[#F6EEE7]">
      {/* Building rising from the bottom-leading corner, fading into the sky */}
      <div aria-hidden className="pointer-events-none absolute bottom-0 start-0 -z-10 h-[62%] w-full lg:w-[62%]">
        <Image src={images.about.vision} alt="" fill sizes="(min-width:1024px) 62vw, 100vw" className="object-cover object-[30%_35%] [mask-image:linear-gradient(to_top,black_55%,transparent),linear-gradient(to_left,transparent,black_35%)] [mask-composite:intersect] rtl:[mask-image:linear-gradient(to_top,black_55%,transparent),linear-gradient(to_right,transparent,black_35%)]" />
      </div>
      {/* faint orbit line */}
      <div aria-hidden className="pointer-events-none absolute -top-[40%] end-[-10%] -z-10 hidden aspect-square w-[70vw] rounded-full border border-white lg:block" />

      <div className="mx-auto w-full max-w-[1600px] px-4 pb-16 pt-20 sm:px-8 sm:pb-24 sm:pt-24 lg:px-14">
        <div className="grid gap-8 lg:grid-cols-13 lg:items-end">
          <div className="lg:col-span-8">
            <p className="flex items-center gap-2.5 text-small font-bold tracking-[0.18em] text-red-primary uppercase rtl:tracking-normal">
              <span aria-hidden className="h-[2px] w-5 bg-red-primary" />
              {t.eyebrow}
            </p>
            <h2 id="vision-mission-title" className="mt-5 font-display text-[clamp(2.5rem,4.4vw,4.6rem)] leading-[1.08] text-ink">
              {t.titleLines.map((line) => (
                <span key={line} className="block">
                  <Accent text={line} />
                </span>
              ))}
            </h2>
          </div>
          <p className="max-w-lg text-body leading-[1.75] text-muted lg:col-span-5 lg:mb-[clamp(5rem,9vw,9rem)]">{t.intro}</p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:ms-auto lg:mt-8 lg:w-[58%]">
          <Statement panel={t.vision} icon={<Eye aria-hidden strokeWidth={1.6} className="size-7" />} tone="light" base={1} />
          <Statement panel={t.mission} icon={<MountainSnow aria-hidden strokeWidth={1.6} className="size-7" />} tone="red" base={3} />
        </div>
      </div>
    </section>
  );
}

function Statement({ panel, icon, tone, base }: { panel: Panel; icon: ReactNode; tone: "light" | "red"; base: number }) {
  const red = tone === "red";
  return (
    <article
      data-reveal="up"
      style={stagger(base)}
      className={`relative overflow-hidden rounded-card p-8 sm:p-10 ${
        red
          ? "bg-gradient-to-br from-red-bright to-[#A9141D] text-white shadow-red-lift"
          : "border border-white bg-white/75 text-ink shadow-lift backdrop-blur-md"
      }`}
    >
      {red && (
        <svg aria-hidden viewBox="0 0 160 120" className="pointer-events-none absolute -bottom-2 end-0 h-40 w-auto text-white/[0.12] rtl:scale-x-[-1]">
          {Array.from({ length: 6 }).flatMap((_, x) =>
            Array.from({ length: 5 }).map((__, y) => <rect key={`${x}-${y}`} x={40 + x * 20 + (y % 2) * 10} y={20 + y * 20} width="8" height="12" rx="2" fill="currentColor" />),
          )}
        </svg>
      )}
      <span className={`flex size-16 items-center justify-center rounded-2xl ${red ? "border border-white/70 text-white" : "border border-red-primary/25 bg-red-soft text-red-primary"}`}>{icon}</span>
      <h3 className="mt-7 font-display text-[clamp(1.9rem,2.6vw,2.6rem)] leading-tight">{panel.label}</h3>
      <p className={`relative mt-5 text-body leading-[1.75] ${red ? "text-white/90" : "text-muted"}`}>{panel.body}</p>
    </article>
  );
}
