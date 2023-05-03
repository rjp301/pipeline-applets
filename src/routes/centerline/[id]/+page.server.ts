import type { PageServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';
import type { Actions } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ params, fetch }) => {
	return { centerline: fetch(`/api/centerline/${params.id}`).then((res) => res.json()) };
};

export const actions: Actions = {
	deleteRun: async ({ params }) => {
		await fetch(`/api/centerline/${params.id}`, { method: 'DELETE' });
		throw redirect(303, '/centerline');
	}
};
