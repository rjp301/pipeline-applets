import type { SurveyPoint } from "./calculateDitchVolumes";
import { parse } from "csv/sync";
import arrayBufferToBuffer from "arraybuffer-to-buffer";
import type { CollectionEntry } from "astro:content";
import proj4 from "proj4";

export default async function parsePoints(
  file: Blob,
  crs: CollectionEntry<"crs">
): Promise<SurveyPoint[]> {
  const buffer = await file.arrayBuffer();
  const points_array = parse(arrayBufferToBuffer(buffer)) as any[][];
  return points_array
    .map((pt) => ({
      num: Number(pt[0]),
      x: Math.min(pt[1], pt[2]),
      y: Math.max(pt[1], pt[2]),
      z: Number(pt[3]),
      desc: pt[4],
    }))
    .map((pt) => ({
      ...pt,
      ...proj4(crs.data.proj, "EPSG:4326", { x: pt.x, y: pt.y }),
    }));
}
