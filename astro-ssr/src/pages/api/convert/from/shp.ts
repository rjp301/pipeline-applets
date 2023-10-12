import type { APIRoute } from "astro";
import shapefile from "shapefile";

export const post: APIRoute = async ({ request }) => {
  const buffer = await request.arrayBuffer();

  try {
    const geojson = await shapefile.read(buffer);
    return new Response(JSON.stringify(geojson));
  } catch (err: any) {
    console.log(err);
    return new Response(JSON.stringify(err), { status: 500 });
  }
};
