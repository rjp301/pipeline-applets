import type { LayoutLoad } from './$types';

export const load: LayoutLoad = async ({ fetch }) => {
	return { centerlines: fetch('/api/centerline').then((res) => res.json()) };
};
