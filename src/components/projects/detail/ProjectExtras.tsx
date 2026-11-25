import Image from "next/image";
import { ArrowRight, Dumbbell, Footprints, Landmark, MapPin, Trees, UsersRound, Waves, type LucideIcon } from "lucide-react";
import type { Dictionary, Locale } from "@/content";
import type { AmenityIcon, Project } from "@/content/projects";
import { SectionIntro } from "../../ui";
import { Lines, stagger } from "../../motion/Lines";
import { buttonClass } from "@/components/ui";

/** Master plan — rendered only when official material is supplied in the project data. */
export function ProjectMasterPlan({ project, dict }: { project: Project; dict: Dictionary }) {
  const plan = project.masterPlan;
  if (!plan) return null;
  const t = dict.projectDetail.masterPlan;
  return (
    <section id="master-plan" aria-labelledby="master-plan-title" className="scroll-mt-36 bg-cream">
      <div className="frame-wide grid grid-cols-1 gap-10 py-20 lg:grid-cols-12 lg:items-center lg:py-28">
        <div className="lg:col-span-4">
          <SectionIntro id="master-plan-title" eyebrow={t.eyebrow} lines={t.titleLines}>
            <a
              href={plan.pdf ?? plan.image}
              target="_blank"
              rel="noopener noreferrer"
              className={`${buttonClass("red", "sm")}`}
            >
              {t.view}
              <ArrowRight aria-hidden className="flip-rtl size-4" />
            </a>
          </SectionIntro>
        </div>
        <div className="relative aspect-[16/10] overflow-hidden rounded-card border border-white bg-white/85 backdrop-blur-md shadow-lg lg:col-span-8 shadow-card">
          <div data-reveal="wipe" className="absolute inset-0">
            <Image src={plan.image} alt={`${project.name} — ${t.eyebrow}`} fill sizes="(min-width:1024px) 60vw, 100vw" className="object-cover" />
          </div>
        </div>
      </div>
    </section>
  );
}

const amenityIcons: Record<AmenityIcon, LucideIcon> = {
  clubhouse: Landmark,
  pool: Waves,
  sports: Dumbbell,
  parks: Trees,
  paths: Footprints,
  community: UsersRound,
};

/** Amenities — rendered only for amenities present in the approved project data. */
export function ProjectAmenities({ project, dict, locale }: { project: Project; dict: Dictionary; locale: Locale }) {
  const amenities = project.copy[locale].amenities;
  if (amenities.length === 0) return null;
  const t = dict.projectDetail.amenities;
  return (
    <section id="amenities" aria-labelledby="amenities-title" className="scroll-mt-36 bg-cream">
      <div className="frame-wide grid grid-cols-1 gap-10 py-20 lg:grid-cols-12 lg:items-center lg:py-24">
        <div className="lg:col-span-3">
          <SectionIntro id="amenities-title" eyebrow={t.eyebrow} lines={t.titleLines} />
        </div>
        <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:col-span-9 lg:grid-cols-4">
          {amenities.map((a, i) => {
            const Icon = amenityIcons[a.icon];
            return (
              <li key={a.label} data-reveal="up" style={stagger(1 + i)} className="group rounded-card border border-white bg-white/85 backdrop-blur-md p-6 shadow-card transition-all hover:border-red-primary/50 hover:shadow-card">
                <span className="flex size-11 items-center justify-center rounded-full border border-red-primary/35 bg-red-soft text-red-primary transition-transform group-hover:scale-105">
                  <Icon aria-hidden strokeWidth={1.6} className="size-5" />
                </span>
                <p className="mt-5 font-serif text-body font-medium text-ink">{a.label}</p>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

/** Location — shows the verified area name; the map link appears only when a verified URL exists. */
export function ProjectLocation({ project, dict, locale }: { project: Project; dict: Dictionary; locale: Locale }) {
  const copy = project.copy[locale];
  const t = dict.projectDetail.location;
  return (
    <section aria-labelledby="location-title" className="relative scroll-mt-36 overflow-hidden bg-cream">
      <div className="frame-wide grid grid-cols-1 gap-12 py-20 sm:py-24 lg:grid-cols-12 lg:items-center">
        <div className="lg:col-span-5">
          <div data-reveal="fade" className="flex items-center gap-3">
            <span className="h-[2px] w-4 rounded-full bg-red-primary" aria-hidden />
            <p className="text-micro font-medium tracking-[0.28em] text-muted uppercase rtl:tracking-normal">
              {t.eyebrow}
            </p>
          </div>
          <Lines id="location-title" lines={[copy.location]} delay={1} className="font-serif text-[clamp(2rem,3.5vw,3rem)] font-normal leading-tight text-ink mt-4" />
          <p data-reveal="up" style={stagger(2)} className="mt-5 max-w-md text-body-sm font-normal leading-golden text-ink-soft">
            {copy.locationNote ?? t.pending}
          </p>
          {project.mapUrl && (
            <a
              data-reveal="up"
              style={stagger(3)}
              href={project.mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`${buttonClass("red", "sm")} mt-8`}
            >
              {t.view}
              <ArrowRight aria-hidden className="flip-rtl size-4" />
            </a>
          )}
        </div>

        {/* Decorative contour field with red center pin */}
        <div data-reveal="fade" style={stagger(2)} aria-hidden className="relative h-64 lg:col-span-6 lg:col-start-7 lg:h-80">
          <svg viewBox="0 0 400 260" className="absolute inset-0 size-full text-red-primary/20" fill="none">
            {[0, 1, 2, 3, 4, 5, 6].map((i) => (
              <ellipse key={i} cx="200" cy="130" rx={40 + i * 26} ry={24 + i * 16} stroke="currentColor" strokeWidth="1" transform={`rotate(${-12 + i * 3} 200 130)`} />
            ))}
          </svg>
          <span className="absolute start-1/2 top-1/2 inline-flex size-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-red-primary text-white shadow-red rtl:translate-x-1/2">
            <MapPin strokeWidth={1.8} className="size-6" />
          </span>
        </div>
      </div>
    </section>
  );
}
