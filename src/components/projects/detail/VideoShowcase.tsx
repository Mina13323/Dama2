import type { VideoItem } from "@/content/projects/rawasin/media";
import { SectionIntro } from "../../ui";

/** Native, lazy-loading film player. Poster only until the visitor presses play. */
export function VideoShowcase({
  id,
  eyebrow,
  lines,
  body,
  video,
  label,
  tone = "light",
}: {
  id: string;
  eyebrow: string;
  lines: readonly string[];
  body?: string;
  video: VideoItem;
  label: string;
  tone?: "light" | "dark";
}) {
  const dark = tone === "dark";
  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      className={`scroll-mt-36 border-t py-20 sm:py-24 ${dark ? "border-white/10 bg-charcoal text-white" : "border-border bg-white"}`}
    >
      <div className="frame-wide grid gap-10 lg:grid-cols-13 lg:items-center">
        <div className="lg:col-span-5">
          <SectionIntro id={`${id}-title`} eyebrow={eyebrow} lines={lines} body={body} tone={dark ? "light" : "dark"} />
        </div>
        <div className="lg:col-span-8">
          <div className="overflow-hidden rounded-card border border-border bg-black shadow-md">
            <video
              controls
              playsInline
              preload="none"
              poster={video.poster}
              aria-label={label}
              className="aspect-video w-full"
            >
              <source src={video.src} type="video/mp4" />
            </video>
          </div>
        </div>
      </div>
    </section>
  );
}
