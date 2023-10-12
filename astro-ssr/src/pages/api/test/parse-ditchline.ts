import type { APIRoute } from "astro";
import { getEntry } from "astro:content";
import parseDitchline from "@/lib/parseDitchline";

export const post: APIRoute = async ({ request }) => {
  const formData = await request.formData();
  const file = formData.get("file");
  if (!file) return new Response("could not access file", { status: 500 });

  const crs = await getEntry("crs", "UTM10N");
  const points = await parseDitchline(file as Blob, crs);
  return new Response(JSON.stringify(points));
};
