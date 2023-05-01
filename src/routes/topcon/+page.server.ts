import type { PageServerLoad } from "./$types";
import { API_URL } from "$env/static/private";

export const load: PageServerLoad = async ({ fetch }) => {
  const response = await fetch(`${API_URL}/api/centerline`);
  const data = await response.json();
  return {
    centerlines: data,
  };
};
