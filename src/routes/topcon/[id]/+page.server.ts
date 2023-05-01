import type { PageServerLoad } from "./$types";
import { API_URL } from "$env/static/private";

export const load: PageServerLoad = async ({ fetch, params }) => {
  const response = await fetch(`${API_URL}/api/topcon/${params.id}`);
  const data = await response.json();
  return {
    topconRun: data,
  };
};
