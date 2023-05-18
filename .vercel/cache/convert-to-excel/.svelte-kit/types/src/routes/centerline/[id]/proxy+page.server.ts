// @ts-nocheck
import type { PageServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';
import type { Actions } from '@sveltejs/kit';

export const load = async ({ params, fetch }: Parameters<PageServerLoad>[0]) => {
	return {
		centerline: fetch(`/centerline/${params.id}`).then((res) => res.json())
	};
};

export const actions = {
	delete: async ({ params, fetch }: import('./$types').RequestEvent) => {
		await fetch(`/centerline/${params.id}`, { method: 'DELETE' });
		throw redirect(303, '/centerline');
	}
};
;null as any as Actions;