import type { APIRoute } from "astro";
import parsePoints from "@/lib/parsePoints";

import { getEntry } from "astro:content";

export const post: APIRoute = async ({ request }) => {
  const formData = await request.formData();
  console.log(formData);
  const file = formData.get("file");
  if (!file) return new Response("could not access file", { status: 500 });

  const crs = await getEntry("crs", "UTM10N");
  const points = await parsePoints(file as Blob, crs);
  return new Response(JSON.stringify(points));
};
