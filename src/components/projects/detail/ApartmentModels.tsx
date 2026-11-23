"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useId, useRef, useState } from "react";
import { BedDouble, Check, MoveRight } from "lucide-react";
import type { Dictionary, Locale } from "@/content";
import type { Project } from "@/content/projects";
import { SectionIntro } from "../../ui";

const modelImages: Record<string, string> = {
  "type-1": "/images/rawasin/compound-facade.webp",
  "type-2": "/images/rawasin/compound-courtyard.webp",
  "type-3": "/images/rawasin/compound-clubhouse.webp",
  "type-4": "/images/rawasin/compound-masterplan.webp",
  "type-5": "/images/rawasin/compound-mosque.webp",
};

export function ApartmentModels({
  project,
  dict,
  locale,
}: {
  project: Project;
  dict: Dictionary;
  locale: Locale;
}) {
  const models = project.copy[locale].models;
  const [active, setActive] = useState(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const baseId = useId();
  const ar = locale === "ar";
  const t = dict.projectDetail.models;

  const changeModel = useCallback((index: number) => {
    setActive(index);
  }, []);

  if (!models || models.length === 0) return null;

  const current = models[active] || models[0];
  const currentImg = modelImages[current.id] || project.images.overview;

  const onTabKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    let next: number | null = null;
    if (e.key === "Home") next = 0;
    else if (e.key === "End") next = models.length - 1;
    else if (e.key === "ArrowRight") next = (active + (ar ? -1 : 1) + models.length) % models.length;
    else if (e.key === "ArrowLeft") next = (active + (ar ? 1 : -1) + models.length) % models.length;
    if (next === null) return;
    e.preventDefault();
    changeModel(next);
    tabRefs.current[next]?.focus();
  };

  return (
    <section
      id="models"
      aria-labelledby="models-title"
      className="scroll-mt-36 border-t border-[#ECEAE5] bg-[#FBFBFA] py-20 sm:py-28"
    >
      <div className="container-x">
        {/* Section Header */}
        <SectionIntro
          id="models-title"
          eyebrow={t.eyebrow}
          lines={t.titleLines}
          body={t.body}
        />

        {/* Golden Ratio Grid (38.2% / 61.8% -> 1fr / 1.618fr) */}
        <div className="mt-12 grid grid-cols-1 items-start gap-8 lg:grid-cols-[1fr_1.618fr] lg:gap-12">
          {/* Left Column: Tab Navigation (38.2% golden slice) */}
          <div
            role="tablist"
            aria-label={t.eyebrow}
            onKeyDown={onTabKeyDown}
            className="flex flex-col gap-2.5"
          >
            {models.map((m, i) => {
              const isSelected = active === i;
              return (
                <button
                  key={m.id}
                  ref={(el) => {
                    tabRefs.current[i] = el;
                  }}
                  id={`${baseId}-tab-${m.id}`}
                  role="tab"
                  type="button"
                  aria-selected={isSelected}
                  aria-controls={`${baseId}-panel`}
                  tabIndex={isSelected ? 0 : -1}
                  onClick={() => changeModel(i)}
                  className={`group flex items-center justify-between rounded-[20px] border p-4.5 text-start transition-all duration-200 ${
                    isSelected
                      ? "border-[#C51E28] bg-white shadow-md ring-1 ring-[#C51E28]/15"
                      : "border-[#ECEAE5] bg-white/60 hover:border-[#C51E28]/40 hover:bg-white"
                  }`}
                >
                  <div className="flex items-center gap-3.5">
                    <span
                      className={`flex size-9 shrink-0 items-center justify-center rounded-full text-[12px] font-bold transition-colors ${
                        isSelected
                          ? "bg-[#C51E28] text-white"
                          : "bg-[#F3F2EF] text-[#687076] group-hover:bg-[#FDF2F2] group-hover:text-[#C51E28]"
                      }`}
                      dir="ltr"
                    >
                      0{i + 1}
                    </span>
                    <div>
                      <p
                        className={`text-[14.5px] font-semibold transition-colors ${
                          isSelected ? "text-[#C51E28]" : "text-[#14171A] group-hover:text-[#C51E28]"
                        }`}
                      >
                        {m.type}
                      </p>
                      <p className="text-[12px] text-[#687076]">{m.name}</p>
                    </div>
                  </div>
                  <div className="text-end">
                    <span
                      className="inline-block rounded-full bg-[#F3F2EF] px-2.5 py-1 text-[11px] font-bold text-[#14171A]"
                      dir="ltr"
                    >
                      {m.area}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right Column: Model Showcase Card (61.8% golden slice) */}
          <div
            id={`${baseId}-panel`}
            role="tabpanel"
            aria-labelledby={`${baseId}-tab-${current.id}`}
            tabIndex={0}
            className="overflow-hidden rounded-[28px] border border-[#ECEAE5] bg-white p-7 shadow-sm sm:p-9"
          >
            {/* Visual: Golden Rectangle (aspect 1.618 / 1) */}
            <div className="relative aspect-[1.618/1] w-full overflow-hidden rounded-[22px] border border-[#ECEAE5] bg-[#F3F2EF]">
              <Image
                src={currentImg}
                alt={current.name}
                fill
                sizes="(min-width: 1024px) 55vw, 100vw"
                className="object-cover transition-transform duration-700 ease-soft hover:scale-[1.03]"
              />
              <div
                aria-hidden
                className="absolute inset-0 bg-gradient-to-t from-[#111417]/70 via-transparent to-transparent"
              />
              <div className="absolute bottom-4 start-4 end-4 flex items-end justify-between text-white sm:bottom-6 sm:start-6 sm:end-6">
                <div>
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-white/20 px-3 py-1 text-[11px] font-semibold backdrop-blur-md">
                    <BedDouble className="size-3.5" />
                    {t.bedroomsLabel.replace("{count}", String(current.bedrooms))}
                  </span>
                  <h3 className="mt-2 font-display text-2xl font-normal text-white sm:text-3xl">
                    {current.name}
                  </h3>
                </div>
                <p className="font-display text-2xl font-bold text-white sm:text-3xl" dir="ltr">
                  {current.area}
                </p>
              </div>
            </div>

            {/* Model Details */}
            <div className="mt-7">
              <p className="text-[14.5px] leading-relaxed text-[#555E68]">{current.description}</p>

              {/* Highlights (Golden Ratio 3-point breakdown) */}
              <div className="mt-6 border-t border-[#ECEAE5] pt-6">
                <h4 className="text-[11px] font-bold tracking-wider text-[#8C939B] uppercase">
                  {t.highlightsLabel}
                </h4>
                <ul className="mt-3.5 grid gap-2.5 sm:grid-cols-3">
                  {current.highlights.map((h) => (
                    <li
                      key={h}
                      className="flex items-center gap-2 rounded-[14px] bg-[#FBFBFA] border border-[#ECEAE5] px-3.5 py-2.5 text-[12.5px] font-medium text-[#14171A]"
                    >
                      <Check className="size-3.5 text-[#C51E28] shrink-0" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action Button */}
              <div className="mt-7 flex flex-wrap items-center justify-between gap-4 border-t border-[#ECEAE5] pt-6">
                <span className="text-[12px] text-[#8C939B]">
                  {locale === "ar"
                    ? "المخططات والمساحات معتمدة من شركة داما للتطوير العقاري."
                    : "Verified architectural plans approved by DAMA Development."}
                </span>
                <Link
                  href="#enquire"
                  className="inline-flex min-h-11 items-center gap-2.5 rounded-full bg-[#C51E28] px-6 text-[13px] font-semibold text-white transition-all hover:bg-[#9F121A] shadow-xs"
                >
                  {t.enquireCta}
                  <MoveRight className="size-4 flip-rtl" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
