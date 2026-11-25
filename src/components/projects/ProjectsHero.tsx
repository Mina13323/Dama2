import type { Dictionary } from "@/content";
import { images } from "@/content/site";
import { Accent } from "../motion/Lines";
import { CurvedHero } from "../media/CurvedHero";

export function ProjectsHero({ dict, image }: { dict: Dictionary; image: string }) {
  const t = dict.projectsPage.hero;
  return (
    <CurvedHero
      id="projects-hero-title"
      eyebrow={t.eyebrow}
      title={t.titleLines.map((line) => (
        <span key={line} className="block">
          <Accent text={line} />
        </span>
      ))}
      body={<p>{t.body}</p>}
      image={image || images.projectsHero}
      imageAlt={t.imageAlt}
    />
  );
}
