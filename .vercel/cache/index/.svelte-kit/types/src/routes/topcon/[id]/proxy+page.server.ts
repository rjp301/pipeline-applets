// @ts-nocheck
import type { PageServerLoad } from './$types';

import { redirect, type Actions} from '@sveltejs/kit';

export const load = async ({ params, fetch }: Parameters<PageServerLoad>[0]) => {
	return { topconRun: fetch(`/topcon/${params.id}`).then((res) => res.json()) };
};

export const actions = {
	deleteRun: async ({ params }: import('./$types').RequestEvent) => {
		await fetch(`/topcon/${params.id}`, { method: 'DELETE' });
		throw redirect(303, '/topcon');
	}
};
;null as any as Actions;