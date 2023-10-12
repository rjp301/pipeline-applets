import prisma from "@/lib/prisma";
import type { APIRoute } from "astro";

/** Get specific Topcon Run */
export const get: APIRoute = async ({ params }) => {
  const item = await prisma.topconRun.findUnique({
    where: { id: Number(params.id) },
    include: {
      data_pts: true,
      data_rng: true,
    },
  });
  if (!item) return new Response(JSON.stringify(null));
  return new Response(JSON.stringify(item));
};
