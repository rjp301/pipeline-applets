import { error } from "@sveltejs/kit";

type RouteParams = { centerlineID: string };

// get details of specific centerline
export async function GET({ params }: { params: RouteParams }) {
  const centerlineID = params.centerlineID;
  const result = "";
  return new Response(JSON.stringify(result));
}

// update specific centerline
export async function PUT({ params }: { params: RouteParams }) {
  const centerlineID = params.centerlineID;
  const result = "";
  return new Response(JSON.stringify(result));
}

// delete centerline
export async function DELETE({ params }: { params: RouteParams }) {
  const centerlineID = params.centerlineID;
  const result = "";
  return new Response(JSON.stringify(result));
}
