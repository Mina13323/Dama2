import Image from "next/image";
import type { ReactNode } from "react";

/**
 * Page hero in the About DAMA language: copy on the leading side, a full-height photograph on the
 * trailing side with a large curved edge (`.about-hero-photo`, mirrors in RTL), a red disc peeking around
 * the curve and faint concentric arcs behind the copy.
 */
export function CurvedHero({
  id,
  eyebrow,
  title,
  body,
  children,
  image,
  imageAlt,
  top,
}: {
  id: string;
  eyebrow?: ReactNode;
  title: ReactNode;
  body?: ReactNode;
  children?: ReactNode;
  image: string;
  imageAlt: string;
  /** Optional row above the eyebrow (back link, category tags). */
  top?: ReactNode;
}) {
  return (
    <section aria-labelledby={id} className="relative isolate overflow-hidden bg-cream">
      <div className="relative flex flex-col lg:block lg:min-h-[min(92svh,860px)]">
        <div aria-hidden className="pointer-events-none absolute -top-[30%] start-[30%] -z-10 hidden aspect-square w-[70vw] rounded-full border border-stone lg:block" />
        <div aria-hidden className="pointer-events-none absolute -top-[22%] start-[36%] -z-10 hidden aspect-square w-[64vw] rounded-full bg-gradient-to-br from-white/70 to-transparent lg:block" />
        <div aria-hidden className="pointer-events-none absolute start-[43.5%] top-[19%] hidden aspect-square w-[30vw] max-w-[540px] rounded-full bg-gradient-to-br from-red-bright to-red-deep lg:block" />

        <div className="enter-fade about-hero-photo relative order-2 mx-4 mb-12 h-[380px] overflow-hidden rounded-card sm:mx-8 sm:h-[500px] lg:absolute lg:bottom-0 lg:end-0 lg:top-[88px] lg:order-none lg:m-0 lg:mb-0 lg:h-auto lg:w-[60%] lg:rounded-none" style={{ animationDelay: "300ms" }}>
          <Image src={image} alt={imageAlt} fill priority sizes="(min-width: 1024px) 60vw, 100vw" className="kenburns object-cover" />
        </div>

        <div className="relative z-10 order-1 px-4 pb-10 pt-28 sm:px-8 sm:pt-32 lg:flex lg:min-h-[min(92svh,860px)] lg:w-[45%] lg:flex-col lg:justify-center lg:pb-16 lg:ps-[5.5vw] lg:pt-32">
          {top && <div className="enter-fade mb-6 flex flex-wrap items-center gap-3">{top}</div>}
          {eyebrow && (
            <div className="enter-fade flex items-center gap-3 text-red-primary" style={{ animationDelay: "100ms" }}>
              <span className="h-[2px] w-6 bg-red-primary" aria-hidden />
              <p className="text-small font-semibold tracking-[0.16em] uppercase rtl:tracking-normal">{eyebrow}</p>
              <span className="h-[2px] w-6 bg-red-primary" aria-hidden />
            </div>
          )}
          <h1 id={id} className="enter-line mt-6 font-display text-[clamp(2.6rem,4.4vw,4.8rem)] font-normal leading-[1.06] tracking-tight text-ink" style={{ animationDelay: "200ms" }}>
            {title}
          </h1>
          {body && (
            <div className="enter-up mt-6 max-w-[34rem] text-body leading-golden text-muted sm:text-lead" style={{ animationDelay: "450ms" }}>
              {body}
            </div>
          )}
          {children && (
            <div className="enter-up mt-9 flex flex-wrap items-center gap-x-8 gap-y-5" style={{ animationDelay: "600ms" }}>
              {children}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
