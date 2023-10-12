import type { APIRoute } from "astro";
import { parse } from "csv/sync";
import arrayBufferToBuffer from "arraybuffer-to-buffer";

export const post: APIRoute = async ({ request }) => {
  const buffer = await request.arrayBuffer();
  const result = await parse(arrayBufferToBuffer(buffer));
  return new Response(JSON.stringify(result));
};
