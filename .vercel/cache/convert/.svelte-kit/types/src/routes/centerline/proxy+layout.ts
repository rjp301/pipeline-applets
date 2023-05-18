// @ts-nocheck
import type { LayoutLoad } from './$types';

export const load = async ({ fetch }: Parameters<LayoutLoad>[0]) => {
	return { centerlines: fetch('/centerline').then((res) => res.json()) };
};
