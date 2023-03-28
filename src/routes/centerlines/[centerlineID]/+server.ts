import { error } from "@sveltejs/kit";

type RouteParams = { centerlineID: string };

import type { RequestHandler } from "@sveltejs/kit";

// get details of specific centerline
export const GET: RequestHandler = async ({ params }) => {
  const centerlineID = params.centerlineID;
  const result = centerlineID;
  return new Response(JSON.stringify(result));
};

// update specific centerline
export const PUT: RequestHandler = async ({ params }) => {
  const centerlineID = params.centerlineID;
  const result = "";
  return new Response(JSON.stringify(result));
};

export const PATCH: RequestHandler = PUT;

// delete centerline
export const DELETE: RequestHandler = async ({ params }) => {
  const centerlineID = params.centerlineID;
  const result = "";
  return new Response(JSON.stringify(result));
};
