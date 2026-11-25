import fs from "node:fs";
import path from "node:path";
import type { FloorId } from "@/content/projects/rawasin/mall";
import { floorIds } from "@/content/projects/rawasin/mall";

/**
 * Floor-plan images are build-time assets: a plan is shown only when
 * public/images/rawasin/plans/<floor>.{jpg|png|webp} exists.
 */
export function resolvePlans(): Record<FloorId, string | null> {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
  const dir = path.join(process.cwd(), "public", "images", "rawasin", "plans");
  const result = {} as Record<FloorId, string | null>;
  for (const id of floorIds) {
    const ext = ["jpg", "jpeg", "png", "webp"].find((e) => fs.existsSync(path.join(dir, `${id}.${e}`)));
    result[id] = ext ? `${basePath}/images/rawasin/plans/${id}.${ext}` : null;
  }
  return result;
}
