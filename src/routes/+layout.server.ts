import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ locals, fetch }) => {
	const { user } = await locals.auth.validateUser();
	return { user };
};
