import prisma from "@/lib/prisma";
import type { APIRoute } from "astro";

/** Delete Topcon Run */
export const post: APIRoute = async ({ params, redirect }) => {
  await prisma.topconRun.delete({ where: { id: Number(params.id) } });
  return redirect("/");
};
