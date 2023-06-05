import type { PageServerLoad } from './$types';

import { redirect, type Actions } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ params, fetch }) => {
	return { topconRun: fetch(`/topcon/${params.id}`).then((res) => res.json()) };
};

export const actions: Actions = {
	deleteRun: async ({ params, fetch }) => {
		await fetch(`/topcon/${params.id}`, { method: 'DELETE' });
		throw redirect(303, '/topcon');
	}
};
