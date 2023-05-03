import type { LayoutLoad } from './$types';

export const load: LayoutLoad = async ({ fetch }) => {
	return { topconRuns: fetch('/api/topcon').then((res) => res.json()) };
};
