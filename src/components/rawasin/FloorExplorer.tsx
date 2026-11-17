"use client";

import Link from "next/link";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import { ArrowRight, FileImage, Maximize2, Minus, Plus, RotateCcw, X } from "lucide-react";
import type { Locale } from "@/content";
import type { Floor, FloorId, MallCopy } from "@/content/rawasin";

type Props = {
  floors: Floor[];
  labels: MallCopy["floors"];
  locale: Locale;
  /** Resolved at build time: only plan files that actually exist are shown. */
  plans: Record<FloorId, string | null>;
  contactHref: string;
};

const MIN_ZOOM = 1;
const MAX_ZOOM = 3;

export function FloorExplorer({ floors, labels, locale, plans, contactHref }: Props) {
  const [active, setActive] = useState(0);
  const [zoom, setZoom] = useState(1);
  const [lightbox, setLightbox] = useState(false);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const baseId = useId();
  const ar = locale === "ar";

  const floor = floors[active];
  const plan = plans[floor.id];

  const changeFloor = useCallback((index: number) => {
    setActive(index);
    setZoom(1);
  }, []);

  const onTabKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    let next: number | null = null;
    if (e.key === "Home") next = 0;
    else if (e.key === "End") next = floors.length - 1;
    else if (e.key === "ArrowRight") next = (active + (ar ? -1 : 1) + floors.length) % floors.length;
    else if (e.key === "ArrowLeft") next = (active + (ar ? 1 : -1) + floors.length) % floors.length;
    if (next === null) return;
    e.preventDefault();
    changeFloor(next);
    tabRefs.current[next]?.focus();
  };

  // Lightbox: lock scroll, focus the close button, wire keyboard zoom/close.
  useEffect(() => {
    if (!lightbox) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightbox(false);
      if (e.key === "+" || e.key === "=") setZoom((z) => Math.min(MAX_ZOOM, z + 0.25));
      if (e.key === "-") setZoom((z) => Math.max(MIN_ZOOM, z - 0.25));
      if (e.key === "0") setZoom(1);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [lightbox]);

  const zoomIn = () => setZoom((z) => Math.min(MAX_ZOOM, +(z + 0.25).toFixed(2)));
  const zoomOut = () => setZoom((z) => Math.max(MIN_ZOOM, +(z - 0.25).toFixed(2)));

  return (
    <section id="floors" aria-labelledby="floors-title" className="scroll-mt-32 border-t border-[#ECEAE5] bg-white py-16 sm:py-24">
      <div className="container-x">
        {/* Section header */}
        <div className="grid gap-5 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <p className="flex items-center gap-3 text-[11px] font-bold tracking-[0.26em] text-[#C51E28] uppercase rtl:tracking-normal">
              <span className="h-[2px] w-5 rounded-full bg-[#C51E28]" aria-hidden />
              {labels.eyebrow}
            </p>
            <h2 id="floors-title" className="mt-4 font-display text-[clamp(2.1rem,4vw,3.5rem)] leading-[1.06] text-[#14171A]">
              <span className="block">{labels.titleLines[0]}</span>
              <span className="mt-1 block italic text-[#C51E28]">{labels.titleLines[1].replace(/\*/g, "")}</span>
            </h2>
          </div>
          <p className="text-[14.5px] leading-relaxed text-[#687076] lg:col-span-5">{labels.body}</p>
        </div>

        {/* Floor selector */}
        <div
          role="tablist"
          aria-label={labels.selectorLabel}
          onKeyDown={onTabKeyDown}
          className="no-scrollbar mt-10 flex gap-2 overflow-x-auto border-y border-[#ECEAE5] py-4"
        >
          {floors.map((f, i) => (
            <button
              key={f.id}
              ref={(el) => { tabRefs.current[i] = el; }}
              id={`${baseId}-tab-${f.id}`}
              role="tab"
              type="button"
              aria-selected={active === i}
              aria-controls={`${baseId}-panel`}
              tabIndex={active === i ? 0 : -1}
              onClick={() => changeFloor(i)}
              className={`flex min-h-12 shrink-0 items-center gap-3 rounded-full border px-5 text-[13px] font-semibold transition-all duration-200 ${
                active === i
                  ? "border-[#C51E28] bg-[#C51E28] text-white shadow-sm"
                  : "border-[#ECEAE5] bg-white text-[#14171A] hover:border-[#C51E28]/50 hover:text-[#C51E28]"
              }`}
            >
              <span className={`text-[10.5px] font-bold tracking-wider ${active === i ? "text-white/70" : "text-[#C51E28]"}`} dir="ltr">
                {String(i).padStart(2, "0")}
              </span>
              {f.label}
            </button>
          ))}
        </div>

        {/* Panel */}
        <div
          id={`${baseId}-panel`}
          role="tabpanel"
          aria-labelledby={`${baseId}-tab-${floor.id}`}
          tabIndex={0}
          className="mt-8 grid gap-8 lg:grid-cols-12 lg:gap-10"
        >
          {/* Plan viewer */}
          <div className="lg:col-span-7">
            {plan ? (
              <PlanViewer
                src={plan}
                alt={labels.planAlt.replace("{floor}", floor.label)}
                label={`${floor.officialLabel} — ${labels.planLabel}`}
                zoom={zoom}
                zoomIn={zoomIn}
                zoomOut={zoomOut}
                reset={() => setZoom(1)}
                open={() => setLightbox(true)}
                labels={labels}
              />
            ) : (
              <PlanPending labels={labels} contactHref={contactHref} ar={ar} />
            )}
          </div>

          {/* Floor details */}
          <div className="lg:col-span-5">
            <p className="text-[11px] font-bold tracking-[0.24em] text-[#C51E28] uppercase rtl:tracking-normal">
              {floor.officialLabel}
            </p>
            <h3 className="mt-3 font-display text-[clamp(1.8rem,2.8vw,2.6rem)] leading-tight text-[#14171A]">{floor.headline}</h3>
            <p className="mt-4 text-[14.5px] leading-relaxed text-[#687076]">{floor.intro}</p>

            {floor.categories.length > 0 && (
              <div className="mt-7">
                <h4 className="text-[11px] font-bold tracking-wider text-[#8C939B] uppercase rtl:tracking-normal">{labels.activitiesLabel}</h4>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {floor.categories.map((c) => (
                    <li key={c} className="rounded-full border border-[#ECEAE5] bg-[#FBFBFA] px-3.5 py-1.5 text-[12.5px] font-medium text-[#14171A]">
                      {c}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <ul className="mt-7 space-y-2.5">
              {floor.highlights.map((h) => (
                <li key={h} className="flex items-start gap-2.5 text-[13.5px] text-[#14171A]">
                  <span className="mt-2 size-1.5 shrink-0 rounded-full bg-[#C51E28]" aria-hidden />
                  <span>{h}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Facilities */}
        {floor.facilities.length > 0 && (
          <div className="mt-14">
            <h3 className="font-display text-2xl text-[#14171A]">{labels.facilitiesLabel}</h3>
            <ul className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {floor.facilities.map((f) => (
                <li key={f.name} className="rounded-[20px] border border-[#ECEAE5] bg-[#FBFBFA] p-5">
                  <div className="flex items-start justify-between gap-3">
                    <h4 className="text-[14px] font-semibold text-[#14171A]">{f.name}</h4>
                    {f.kind && (
                      <span className="shrink-0 rounded-full bg-[#FDF2F2] px-2.5 py-1 text-[10px] font-semibold text-[#C51E28]">
                        {f.kind === "outdoor" ? (ar ? "خارجي" : "Outdoor") : ar ? "داخلي" : "Indoor"}
                      </span>
                    )}
                  </div>
                  {f.area && <p className="mt-3 font-display text-2xl text-[#C51E28]" dir="ltr">{f.area}</p>}
                  {f.note && <p className="mt-2 text-[12.5px] leading-relaxed text-[#687076]">{f.note}</p>}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Unit schedule */}
        <div className="mt-14 rounded-[24px] border border-[#ECEAE5] bg-white p-5 shadow-xs sm:p-7">
          <h3 className="font-display text-2xl text-[#14171A]">{labels.scheduleLabel}</h3>
          {floor.units.length > 0 ? (
            <div className="mt-5 overflow-x-auto">
              <table className="w-full min-w-[420px] border-collapse text-start">
                <thead>
                  <tr className="border-b border-[#ECEAE5] text-[11px] font-bold tracking-wider text-[#8C939B] uppercase">
                    <th scope="col" className="py-3 pe-4 text-start">{labels.scheduleNumber}</th>
                    <th scope="col" className="py-3 pe-4 text-start">{labels.scheduleCategory}</th>
                    <th scope="col" className="py-3 text-end">{labels.scheduleArea}</th>
                  </tr>
                </thead>
                <tbody>
                  {floor.units.map((u) => (
                    <tr key={u.number} className="border-b border-[#ECEAE5]/70 last:border-0">
                      <td className="py-3 pe-4 text-[13.5px] font-semibold text-[#14171A]">{u.number}</td>
                      <td className="py-3 pe-4 text-[13.5px] text-[#687076]">{u.category}</td>
                      <td className="py-3 text-end text-[13.5px] font-semibold text-[#C51E28]" dir="ltr">{u.area}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="mt-4 text-[13.5px] text-[#687076]">{labels.scheduleEmpty}</p>
          )}

          {floor.scheduleStatus === "source-pending" && (
            <p className="mt-4 rounded-[16px] border border-[#FCA5A5]/60 bg-[#FDF2F2] p-4 text-[13px] leading-relaxed text-[#9F121A]">
              {labels.schedulePending}
            </p>
          )}
          {floor.scheduleNote && <p className="mt-4 text-[12.5px] leading-relaxed text-[#8C939B]">{floor.scheduleNote}</p>}
        </div>

        <p className="mt-6 text-[11.5px] leading-relaxed text-[#8C939B]">{labels.sourceNote}</p>
      </div>

      {/* Full-screen plan viewer */}
      {lightbox && plan && (
        <PlanLightbox
          src={plan}
          alt={labels.planAlt.replace("{floor}", floor.label)}
          label={`${floor.officialLabel} — ${labels.planLabel}`}
          zoom={zoom}
          zoomIn={zoomIn}
          zoomOut={zoomOut}
          reset={() => setZoom(1)}
          close={() => setLightbox(false)}
          labels={labels}
        />
      )}
    </section>
  );
}

type ViewerProps = {
  src: string;
  alt: string;
  label: string;
  zoom: number;
  zoomIn: () => void;
  zoomOut: () => void;
  reset: () => void;
  labels: MallCopy["floors"];
};

function ZoomControls({ zoom, zoomIn, zoomOut, reset, labels, tone = "light" }: ViewerProps & { tone?: "light" | "dark" }) {
  const cls = tone === "dark"
    ? "inline-flex size-10 items-center justify-center rounded-full border border-white/30 text-white transition-colors hover:bg-white hover:text-[#14171A]"
    : "inline-flex size-9 items-center justify-center rounded-full border border-[#ECEAE5] bg-white text-[#14171A] transition-colors hover:border-[#C51E28] hover:text-[#C51E28]";
  return (
    <div className="flex items-center gap-2">
      <button type="button" onClick={zoomOut} disabled={zoom <= MIN_ZOOM} aria-label={labels.zoomOut} className={`${cls} disabled:opacity-40`}>
        <Minus aria-hidden className="size-4" />
      </button>
      <span className={`min-w-10 text-center text-[11.5px] font-semibold tabular-nums ${tone === "dark" ? "text-white/70" : "text-[#687076]"}`} dir="ltr">
        {Math.round(zoom * 100)}%
      </span>
      <button type="button" onClick={zoomIn} disabled={zoom >= MAX_ZOOM} aria-label={labels.zoomIn} className={`${cls} disabled:opacity-40`}>
        <Plus aria-hidden className="size-4" />
      </button>
      <button type="button" onClick={reset} disabled={zoom === 1} aria-label={labels.zoomReset} className={`${cls} disabled:opacity-40`}>
        <RotateCcw aria-hidden className="size-3.5" />
      </button>
    </div>
  );
}

function PlanViewer({ src, alt, label, zoom, zoomIn, zoomOut, reset, open, labels }: ViewerProps & { open: () => void }) {
  return (
    <div className="overflow-hidden rounded-[24px] border border-[#ECEAE5] bg-[#F7F6F3] shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#ECEAE5] bg-white px-4 py-3">
        <p className="flex items-center gap-2 text-[12px] font-semibold text-[#14171A]">
          <FileImage aria-hidden className="size-4 text-[#C51E28]" />
          {label}
        </p>
        <div className="flex items-center gap-2">
          <ZoomControls src={src} alt={alt} label={label} zoom={zoom} zoomIn={zoomIn} zoomOut={zoomOut} reset={reset} labels={labels} />
          <button
            type="button"
            onClick={open}
            aria-label={labels.openLightbox}
            className="inline-flex size-9 items-center justify-center rounded-full bg-[#C51E28] text-white transition-colors hover:bg-[#9F121A]"
          >
            <Maximize2 aria-hidden className="size-4" />
          </button>
        </div>
      </div>
      <div className="relative aspect-[4/3] overflow-hidden bg-[#EFEEEA] sm:aspect-[16/10]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt={alt}
          className="absolute inset-0 size-full object-contain transition-transform duration-300 ease-soft"
          style={{ transform: `scale(${zoom})` }}
        />
      </div>
    </div>
  );
}

function PlanPending({ labels, contactHref, ar }: { labels: MallCopy["floors"]; contactHref: string; ar: boolean }) {
  return (
    <div className="rounded-[24px] border border-dashed border-[#D9D6CF] bg-[#F7F6F3] p-8 text-center sm:p-12">
      <FileImage aria-hidden strokeWidth={1.2} className="mx-auto size-10 text-[#C51E28]" />
      <h3 className="mt-5 font-display text-2xl text-[#14171A]">{labels.planPendingTitle}</h3>
      <p className="mx-auto mt-3 max-w-md text-[13.5px] leading-relaxed text-[#687076]">{labels.planPendingBody}</p>
      <Link
        href={contactHref}
        className="group mt-6 inline-flex min-h-11 items-center gap-3 rounded-full border border-[#C51E28] bg-white px-6 text-[12.5px] font-semibold text-[#C51E28] transition-colors hover:bg-[#C51E28] hover:text-white"
      >
        {labels.planPendingCta}
        <ArrowRight aria-hidden className="flip-rtl size-4" />
      </Link>
      <p className="mt-5 text-[11.5px] text-[#8C939B]">
        {ar ? "المخططات الأصلية من كتيّب مول رواسين." : "Original plans from the Rawasin Mall brochure."}
      </p>
    </div>
  );
}

function PlanLightbox({ src, alt, label, zoom, zoomIn, zoomOut, reset, close, labels }: ViewerProps & { close: () => void }) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const touchX = useRef<number | null>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const drag = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => {
    closeRef.current?.focus();
  }, []);

  useEffect(() => {
    setOffset({ x: 0, y: 0 });
  }, [zoom]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={label}
      className="fixed inset-0 z-[90] flex flex-col bg-[#111417]/97 text-white"
      onTouchStart={(e) => { touchX.current = e.touches[0].clientX; }}
      onTouchEnd={(e) => {
        if (touchX.current === null) return;
        if (Math.abs(e.changedTouches[0].clientX - touchX.current) > 90) close();
        touchX.current = null;
      }}
      onClick={(e) => { if (e.target === e.currentTarget) close(); }}
    >
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 px-4 py-4 sm:px-8">
        <p className="text-[13px] font-semibold text-white/80">{label}</p>
        <div className="flex items-center gap-3">
          <ZoomControls src={src} alt={alt} label={label} zoom={zoom} zoomIn={zoomIn} zoomOut={zoomOut} reset={reset} labels={labels} tone="dark" />
          <button ref={closeRef} type="button" onClick={close} aria-label={labels.closeLightbox} className="inline-flex size-10 items-center justify-center rounded-full border border-white/30 text-white transition-colors hover:bg-white hover:text-[#14171A]">
            <X aria-hidden className="size-5" />
          </button>
        </div>
      </div>

      <div
        className="relative flex-1 overflow-hidden touch-none"
        onPointerDown={(e) => {
          drag.current = { x: e.clientX - offset.x, y: e.clientY - offset.y };
          e.currentTarget.setPointerCapture(e.pointerId);
        }}
        onPointerMove={(e) => {
          if (!drag.current) return;
          setOffset({ x: e.clientX - drag.current.x, y: e.clientY - drag.current.y });
        }}
        onPointerUp={() => { drag.current = null; }}
        onPointerCancel={() => { drag.current = null; }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt={alt}
          draggable={false}
          className="absolute inset-0 size-full select-none object-contain"
          style={{ transform: `translate(${offset.x}px, ${offset.y}px) scale(${zoom})` }}
        />
      </div>

      <p className="py-4 text-center text-[11.5px] text-white/50">
        {labels.sourceNote}
      </p>
    </div>
  );
}
