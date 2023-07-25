import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ locals, fetch, url }) => {
	const page = url.searchParams.get('page') || 1;
	const { user } = await locals.auth.validateUser();
	return { user, topconRuns: fetch(`/topcon?page=${page}`).then((res) => res.json()) };
};
