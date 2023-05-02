import type { PageServerLoad } from "./$types";
import { API_URL } from "$env/static/private";
import { redirect, type Actions } from "@sveltejs/kit";

export const load: PageServerLoad = async ({ fetch, params }) => {
  const response = await fetch(`${API_URL}/api/topcon/${params.id}`);
  const data = await response.json();
  return {
    topconRun: data,
    topconRunDownloadUrl: `${API_URL}/api/topcon/${params.id}/download`,
  };
};

export const actions: Actions = {
  delete: async ({ params }) => {
    await fetch(`${API_URL}/api/topcon/${params.id}`, { method: "DELETE" });
    throw redirect(303, "/topcon");
  },
};
