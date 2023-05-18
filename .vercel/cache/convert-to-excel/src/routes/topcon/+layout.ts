import type { LayoutLoad } from './$types';

export const load: LayoutLoad = async ({ fetch }) => {
	return { topconRuns: fetch('/topcon').then((res) => res.json()) };
};
