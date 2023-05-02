import type { PageServerLoad } from './$types';

import { redirect, type Actions, fail } from '@sveltejs/kit';
import prisma from '$lib/server/prisma';

export const load: PageServerLoad = async ({ params }) => {
	return {
		topconRun: await prisma.topconRun.findUniqueOrThrow({
			where: { id: Number(params.id) },
			include: { data_pts: true, data_rng: true }
		})
	};
};

export const actions: Actions = {
	deleteRun: async ({ params }) => {
		try {
			await prisma.topconRun.delete({ where: { id: Number(params.id) } });
		} catch (err) {
			console.error(err);
			return fail(500, { message: 'Could not delete calculation run' });
		}
		throw redirect(303, '/topcon');
	}
};
