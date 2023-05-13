// @ts-nocheck
import type { LayoutLoad } from './$types';

export const load = async ({ fetch }: Parameters<LayoutLoad>[0]) => {
	return { topconRuns: fetch('/topcon').then((res) => res.json()) };
};
