import Image from "next/image";
import { Award, Building2, Gem, Layers, MapPin, Trees, type LucideIcon } from "lucide-react";
import type { Dictionary, Locale } from "@/content";
import type { Project, ProjectFact } from "@/content/projects";
import { Lines, stagger } from "../../motion/Lines";
import { fill } from "../format";

const factIcons: Record<ProjectFact["icon"], LucideIcon> = {
  type: Building2,
  units: Layers,
  location: MapPin,
  status: Award,
  green: Trees,
  style: Gem,
};

export function ProjectOverview({ project, dict, locale }: { project: Project; dict: Dictionary; locale: Locale }) {
  const copy = project.copy[locale];
  return (
    <section aria-labelledby="overview-title" className="relative scroll-mt-36 bg-cream py-section sm:py-section-lg">
      <div className="frame-wide grid items-center gap-12 lg:grid-cols-12 lg:gap-14">
        {/* Left: Project Image with red decorative tab */}
        <div data-reveal="card" className="relative order-2 lg:order-1 lg:col-span-6">
          {/* Decorative red tab */}
          <div
            aria-hidden
            className="pointer-events-none absolute -bottom-3 -start-3 -z-10 h-28 w-16 rounded-s-full bg-red-primary opacity-90"
          />
          <div className="relative aspect-[16/11] w-full overflow-hidden rounded-card border border-white bg-white/85 backdrop-blur-md shadow-lg shadow-card">
            <Image
              src={project.images.overview}
              alt=""
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover transition-transform duration-[1.2s] ease-soft hover:scale-[1.03]"
            />
          </div>
        </div>

        {/* Right: Overview Text & Facts */}
        <div className="order-1 lg:order-2 lg:col-span-6">
          <div data-reveal="fade" style={stagger(1)} className="flex items-center gap-3">
            <span className="h-[2px] w-4 rounded-full bg-red-primary" aria-hidden />
            <p className="text-micro font-medium tracking-[0.28em] text-muted uppercase rtl:tracking-normal">
              {fill(dict.projectDetail.aboutEyebrow, { name: project.name })}
            </p>
          </div>

          <Lines id="overview-title" lines={copy.overview.titleLines} delay={2} className="font-serif text-[clamp(2rem,3.5vw,3rem)] font-normal leading-tight text-ink mt-4" />
          
          {copy.overview.paragraphs.map((para, i) => (
            <p key={i} data-reveal="up" style={stagger(4 + i)} className="mt-5 text-body font-normal leading-golden text-ink-soft">
              {para}
            </p>
          ))}

          {copy.facts.length > 0 && (
            <div className="mt-10 rounded-3xl border border-border bg-white p-6 sm:p-7 shadow-xs">
              <ul
                aria-label={dict.projectDetail.factsLabel}
                className="grid grid-cols-2 gap-5 sm:grid-cols-3"
              >
                {copy.facts.map((fact, i) => {
                  const Icon = factIcons[fact.icon];
                  return (
                    <li key={fact.label} data-reveal="up" style={stagger(6 + i)} className="flex items-start gap-3">
                      <span className="flex size-9 shrink-0 items-center justify-center rounded-full border border-red-primary/35 bg-red-soft text-red-primary">
                        <Icon aria-hidden strokeWidth={1.8} className="size-4" />
                      </span>
                      <div>
                        <p className="text-micro font-medium tracking-wider text-subtle uppercase">{fact.label}</p>
                        <p className="mt-0.5 text-body-sm font-semibold text-ink">{fact.value}</p>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
