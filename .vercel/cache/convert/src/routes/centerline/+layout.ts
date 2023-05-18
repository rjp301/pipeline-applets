import type { LayoutLoad } from './$types';

export const load: LayoutLoad = async ({ fetch }) => {
	return { centerlines: fetch('/centerline').then((res) => res.json()) };
};
