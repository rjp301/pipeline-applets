import prisma from "@/lib/prisma";

import parseCenterline from "@/lib/parseCenterline";
import parseDitchline from "@/lib/parseDitchline";
import parsePoints from "@/lib/parsePoints";
import calculateDitchVolumes from "@/lib/calculateDitchVolumes";
import type { APIRoute } from "astro";
import { getEntry } from "astro:content";

/** Create topcon Run */
export const post: APIRoute = async ({ request, redirect }) => {
  const formData = await request.formData();
  const { centerline_id, width_bot, slope, data_crs, ground_csv, ditch_shp } =
    Object.fromEntries(formData);

  const centerline_data = await getEntry("centerline", centerline_id as string);
  if (!centerline_data)
    return new Response("Centerline is not defined", { status: 400 });
  const centerline = parseCenterline(centerline_data);

  const crs = await getEntry("crs", data_crs as string);
  if (!crs) return new Response("CRS is not defined", { status: 400 });

  const params = {
    centerline,
    width_bot: Number(width_bot),
    slope: Number(slope),
    ditchline: await parseDitchline(ditch_shp as Blob, crs),
    surveyPoints: await parsePoints(ground_csv as Blob, crs),
  };
  const {
    ditch_profile,
    total_volume,
    data_pts,
    data_rng,
    KP_beg,
    KP_end,
    KP_rng,
  } = calculateDitchVolumes(params);

  const data = {
    width_bot: Number(width_bot),
    slope: Number(slope),
    ditch_profile,
    total_volume,
    KP_beg,
    KP_end,
    KP_rng,
    centerline_id: centerline_id as string,
    data_pts: data_pts.map((pt) => ({
      ...pt,
      geometry: pt.geometry.toString(),
    })),
    data_rng,
  };

  return new Response(JSON.stringify(data));
};
