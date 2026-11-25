"use client";

import { useEffect, useRef, useState } from "react";
import { Maximize, Pause, Play } from "lucide-react";
import { rawasinVideos } from "@/content/projects/rawasin/media";
import { asset } from "@/content/news";

/** Poster: a real Rawasin render (tree-lined courtyard), not the film's logo title card. */
const poster = asset("/images/rawasin/gallery/residential/rawasin-14-facade-courtyard-trees-md.webp");

const fmt = (s: number) => `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(Math.floor(s % 60)).padStart(2, "0")}`;

/**
 * Rawasin film inside the mega menu. Nothing downloads until the visitor presses play
 * (preload="none" + poster); it pauses whenever the menu closes.
 */
export function MenuVideo({ active, labels }: { active: boolean; labels: { play: string; pause: string; fullscreen: string } }) {
  const film = rawasinVideos.residential;
  const ref = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [time, setTime] = useState<number | null>(null);

  useEffect(() => {
    if (!active) ref.current?.pause();
  }, [active]);

  const toggle = () => {
    const v = ref.current;
    if (!v) return;
    if (v.paused) void v.play();
    else v.pause();
  };

  const fullscreen = () => {
    const v = ref.current as (HTMLVideoElement & { webkitEnterFullscreen?: () => void }) | null;
    if (!v) return;
    if (v.requestFullscreen) void v.requestFullscreen();
    else v.webkitEnterFullscreen?.();
    if (v.paused) void v.play();
  };

  const remaining = time === null ? film.seconds : Math.max(0, film.seconds - time);

  return (
    <div className="group relative aspect-[16/10] w-full overflow-hidden rounded-card bg-[#1B1E21] shadow-card">
      <video
        ref={ref}
        src={film.src}
        poster={poster}
        preload="none"
        playsInline
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onEnded={() => setPlaying(false)}
        onTimeUpdate={(e) => setTime(e.currentTarget.currentTime)}
        onClick={toggle}
        className="absolute inset-0 size-full cursor-pointer object-cover"
      />
      <div aria-hidden className={`pointer-events-none absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent transition-opacity ${playing ? "opacity-0 group-hover:opacity-100" : ""}`} />

      <button
        type="button"
        onClick={toggle}
        aria-label={playing ? labels.pause : labels.play}
        className={`absolute start-1/2 top-1/2 flex size-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white text-red-primary shadow-lg transition-all duration-200 hover:scale-105 rtl:translate-x-1/2 ${playing ? "opacity-0 group-hover:opacity-100 focus-visible:opacity-100" : ""}`}
      >
        {playing ? <Pause aria-hidden className="size-6 fill-current" /> : <Play aria-hidden className="size-6 translate-x-0.5 fill-current" />}
      </button>

      <span className="absolute bottom-4 left-5 text-small font-semibold text-white" dir="ltr">{fmt(remaining)}</span>
      <button type="button" onClick={fullscreen} aria-label={labels.fullscreen} className="absolute bottom-3 right-4 flex size-9 items-center justify-center rounded-full text-white transition-colors hover:bg-white/15">
        <Maximize aria-hidden className="size-5" />
      </button>
    </div>
  );
}
