import Link from "next/link";
import { ArrowRight, ChevronRight } from "lucide-react";
import type { ButtonHTMLAttributes, ComponentProps, ReactNode } from "react";
import { Lines, stagger } from "./motion/Lines";

type Variant = "red" | "dark" | "light" | "outline";
export type ButtonSize = "md" | "sm";

const variants: Record<Variant, string> = {
  red: "bg-red-primary text-white hover:bg-red-dark shadow-red hover:-translate-y-0.5",
  dark: "bg-charcoal text-white hover:bg-ink shadow-sm hover:shadow-md",
  light: "bg-white text-red-primary hover:bg-red-soft shadow-soft",
  outline: "border-[1.5px] border-red-primary text-red-primary hover:bg-red-primary hover:text-white",
};
const sizes: Record<ButtonSize, string> = {
  md: "min-h-13 px-8 py-3 text-body-sm",
  sm: "min-h-11 px-6 text-small",
};

/** The one card surface: frosted white on the warm grounds, soft long shadow. Add padding and radius per use. */
export const cardSurface = "border border-white bg-white/85 shadow-card backdrop-blur-md";

/** The one pill-button style. Use ButtonLink for links; spread this on <button> and other elements. */
export const buttonClass = (variant: Variant = "red", size: ButtonSize = "md") =>
  `group inline-flex items-center justify-center gap-3 rounded-full font-semibold transition-all duration-200 disabled:pointer-events-none disabled:opacity-60 ${sizes[size]} ${variants[variant]}`;

export function ButtonLink({
  href,
  children,
  variant = "red",
  size = "md",
  className = "",
  ...rest
}: { href: string; children: ReactNode; variant?: Variant; size?: ButtonSize; className?: string } & Omit<
  ComponentProps<typeof Link>,
  "href" | "className"
>) {
  return (
    <Link
      href={href}
      className={`${buttonClass(variant, size)} ${className}`}
      {...rest}
    >
      {children}
      <ArrowRight
        aria-hidden
        className="flip-rtl size-4 transition-transform duration-200 ease-soft group-hover:translate-x-1 rtl:group-hover:-translate-x-1"
      />
    </Link>
  );
}

export function Button({
  children,
  variant = "red",
  className = "",
  type = "button",
  ...rest
}: {
  children: ReactNode;
  variant?: Variant;
  className?: string;
} & ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      type={type}
      className={`group inline-flex min-h-11 items-center justify-center gap-3 rounded-full px-6 py-3 text-small font-semibold tracking-wide transition-colors duration-200 disabled:opacity-50 disabled:pointer-events-none ${variants[variant]} ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
}

export function Badge({
  children,
  tone = "neutral",
  className = "",
}: {
  children: ReactNode;
  tone?: "neutral" | "sky" | "olive" | "white" | "red";
  className?: string;
}) {
  const tones = {
    neutral: "bg-white text-ink border border-border",
    sky: "bg-red-soft text-red-primary border border-red-border",
    olive: "bg-charcoal text-white border border-charcoal",
    white: "bg-white/95 text-ink shadow-sm backdrop-blur",
    red: "bg-red-primary text-white border border-red-primary",
  };

  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1 text-caption font-semibold tracking-wider uppercase backdrop-blur rtl:tracking-normal ${tones[tone]} ${className}`}
    >
      {children}
    </span>
  );
}

export function Breadcrumbs({
  items,
  className = "",
}: {
  items: { label: string; href?: string }[];
  className?: string;
}) {
  return (
    <nav aria-label="Breadcrumb" className={`text-small text-muted ${className}`}>
      <ol className="flex flex-wrap items-center gap-1.5 sm:gap-2">
        {items.map((item, i) => {
          const isLast = i === items.length - 1;
          return (
            <li key={i} className="flex items-center gap-1.5 sm:gap-2">
              {i > 0 && <ChevronRight aria-hidden className="flip-rtl size-3.5 text-muted/60" />}
              {isLast || !item.href ? (
                <span aria-current={isLast ? "page" : undefined} className="font-semibold text-ink">
                  {item.label}
                </span>
              ) : (
                <Link href={item.href} className="transition-colors hover:text-red-primary">
                  {item.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

export function Logo({ tone = "dark" }: { tone?: "dark" | "light" }) {
  const textColor = tone === "dark" ? "text-ink" : "text-white";
  return (
    <svg
      viewBox="0 0 349 90.25"
      direction="ltr"
      role="img"
      aria-label="DAMA Development"
      className={`h-10 w-auto shrink-0 ${textColor}`}
    >
      {/*
        Mark traced from the brand file: every curve shares one centre, the
        top-left corner of the base bar (0, 67.5). Outer radius = bar width.
      */}
      <path fill="currentColor" d="M22.9 0.08A71.2 71.2 0 0 1 71.2 67.5V90.25H0V67.5H48.4A48.4 48.4 0 0 0 22.9 24.86Z" />
      <path fill="currentColor" d="M0 19.1A48.4 48.4 0 0 1 22.3 24.54V50H0Z" />
      {/* Wordmark: DAMA sits on the bar's top line, DEVELOPMENT on its bottom line, both 238 wide. */}
      <g fill="currentColor" style={{ fontFamily: "var(--font-logo), Montserrat, sans-serif" }}>
        <text x="111" y="67.5" fontSize="82.3" textLength="238" lengthAdjust="spacing">
          DAMA
        </text>
        <text x="111.5" y="90.25" fontSize="19.1" textLength="236.5" lengthAdjust="spacing">
          DEVELOPMENT
        </text>
      </g>
    </svg>
  );
}

/**
 * Section heading block with the standard reveal sequence:
 * eyebrow → headline lines → supporting copy → action (children).
 */
export function SectionIntro({
  eyebrow,
  lines,
  body,
  id,
  tone = "dark",
  size = "lg",
  delay = 0,
  children,
}: {
  eyebrow: string;
  lines: readonly string[];
  body?: string;
  id?: string;
  tone?: "dark" | "light";
  size?: "lg" | "xl";
  delay?: number;
  children?: ReactNode;
}) {
  const light = tone === "light";
  const lineCount = lines.length;
  return (
    <div>
      <div data-reveal="fade" style={stagger(delay)} className={`flex items-center gap-2.5 ${light ? "text-white/80" : "text-red-primary"}`}>
        <span className={`h-[2px] w-5 ${light ? "bg-white/70" : "bg-red-primary"}`} aria-hidden />
        <p className={`text-small font-bold tracking-[0.16em] uppercase rtl:tracking-normal ${light ? "text-white/90" : "text-red-primary"}`}>
          {eyebrow}
        </p>
      </div>
      <Lines
        id={id}
        lines={lines}
        delay={delay + 1}
        className={`${size === "xl" ? "heading-xl" : "heading-lg"} mt-5 font-display font-normal ${light ? "text-white" : "text-ink"}`}
      />
      {body && (
        <p
          data-reveal="up"
          style={stagger(delay + lineCount + 1)}
          className={`mt-6 max-w-xl text-body leading-[1.75] ${light ? "text-white/85" : "text-muted"}`}
        >
          {body}
        </p>
      )}
      {children && (
        <div data-reveal="up" style={stagger(delay + lineCount + 2)} className="mt-8">
          {children}
        </div>
      )}
    </div>
  );
}
