import type { LayoutServerLoad } from "./$types";
import { API_URL } from "$env/static/private";

export const load: LayoutServerLoad = async ({ fetch }) => {
  const response = await fetch(`${API_URL}/api/topcon`);
  const data = await response.json();
  return {
    topconRuns: data,
  };
};
