/**
 * Rawasin media library: official renders and films from the DAMA source folder.
 * Files live in /public/images/rawasin/gallery and /public/video (see scripts/stage notes).
 */
import { asset } from "./news";

const res = (name: string) => asset(`/images/rawasin/gallery/residential/${name}-lg.webp`);
const mall = (name: string) => asset(`/images/rawasin/gallery/mall/${name}-lg.webp`);

/** Residential renders, ordered: arrival, streets, façades, rooftops, aerials, masterplan. */
export const residentialGallery: string[] = [
  "rawasin-34-masterplan-top",
  "rawasin-01-gate-street",
  "rawasin-10-gate-front",
  "rawasin-11-gate-1-closeup",
  "rawasin-35-gate-1-sign",
  "rawasin-12-street-jacaranda",
  "rawasin-16-street-hedge",
  "rawasin-24-street-axis",
  "rawasin-13-facade-corner",
  "rawasin-14-facade-courtyard-trees",
  "rawasin-18-facade-street",
  "rawasin-19-facade-screens",
  "rawasin-20-facade-jacaranda",
  "rawasin-23-facade-row",
  "rawasin-25-screen-passage",
  "rawasin-21-curved-building",
  "rawasin-22-building-corner",
  "rawasin-27-rooftop-terrace",
  "rawasin-28-aerial-roundabout",
  "rawasin-30-aerial-02",
  "rawasin-32-aerial-03",
  "rawasin-33-aerial-04",
].map(res);

const dayIds = ["123", "124", "125", "126", "127", "128", "129", "131", "132", "133", "134", "135"];
const nightIds = ["125", "127", "128", "131", "133", "136", "138"];

export const mallDayGallery: string[] = dayIds.map((n) => mall(`mall-day-${n}`));
export const mallNightGallery: string[] = nightIds.map((n) => mall(`mall-night-${n}`));

export type VideoItem = { id: string; src: string; poster: string; seconds: number };

const video = (id: string, seconds: number): VideoItem => ({
  id,
  src: asset(`/video/${id}.mp4`),
  poster: asset(`/video/${id}-poster.jpg`),
  seconds,
});

export const rawasinVideos = {
  residential: video("rawasin-residential", 183),
  mosque: video("rawasin-mosque", 187),
  mall: video("rawasin-mall", 176),
};
