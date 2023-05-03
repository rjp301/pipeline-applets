import type { PageServerLoad } from './$types';

import { redirect, type Actions} from '@sveltejs/kit';

export const load: PageServerLoad = async ({ params, fetch }) => {
	return { topconRun: fetch(`/api/topcon/${params.id}`).then((res) => res.json()) };
};

export const actions: Actions = {
	deleteRun: async ({ params }) => {
		await fetch(`/api/topcon/${params.id}`, { method: 'DELETE' });
		throw redirect(303, '/topcon');
	}
};
