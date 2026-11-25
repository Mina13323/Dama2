"use client";

import { useEffect, useRef, useState } from "react";
import { Play, X } from "lucide-react";
import { rawasinVideos } from "@/content/projects/rawasin/media";

/** "Watch Our Vision": opens the Rawasin film in a full-screen dialog (Esc / close button / backdrop to dismiss). */
export function VisionVideo({ label, closeLabel }: { label: string; closeLabel: string }) {
  const [open, setOpen] = useState(false);
  const trigger = useRef<HTMLButtonElement>(null);
  const closeBtn = useRef<HTMLButtonElement>(null);
  const film = rawasinVideos.residential;

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeBtn.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    const t = trigger.current;
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
      t?.focus();
    };
  }, [open]);

  return (
    <>
      <button ref={trigger} type="button" onClick={() => setOpen(true)} aria-haspopup="dialog" className="group inline-flex items-center gap-4 text-body-sm font-medium text-ink">
        <span className="flex size-14 shrink-0 items-center justify-center rounded-full border-2 border-ink transition-colors group-hover:border-red-primary group-hover:text-red-primary">
          <Play aria-hidden className="size-4 translate-x-px fill-current" />
        </span>
        <span className="border-b border-red-primary pb-1.5 transition-colors group-hover:text-red-primary">{label}</span>
      </button>

      {open && (
        <div role="dialog" aria-modal="true" aria-label={label} className="fixed inset-0 z-[80] flex items-center justify-center bg-ink/90 p-4 sm:p-8" onClick={() => setOpen(false)}>
          <button ref={closeBtn} type="button" onClick={() => setOpen(false)} aria-label={closeLabel} className="absolute end-4 top-4 inline-flex size-12 items-center justify-center rounded-full border border-white/30 text-white transition-colors hover:bg-white hover:text-ink">
            <X aria-hidden className="size-5" />
          </button>
          <video src={film.src} poster={film.poster} controls autoPlay playsInline className="max-h-[85vh] w-full max-w-5xl rounded-2xl bg-black" onClick={(e) => e.stopPropagation()} />
        </div>
      )}
    </>
  );
}
