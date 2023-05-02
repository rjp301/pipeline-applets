import type { PageServerLoad } from './$types';
import type { Actions } from '@sveltejs/kit';

import { API_URL } from '$env/static/private';
import { redirect } from '@sveltejs/kit';
import prisma from '$lib/server/prisma';

export const load: PageServerLoad = async () => {
	return { centerlines: await prisma.centerline.findMany() };
};

export const actions: Actions = {
	performRun: async ({ request, fetch }) => {
		const formData = await request.formData();
		console.log(formData);

		const { centerline_id } = Object.fromEntries(formData);
		console.log('centerline_id', centerline_id);
		const centerline = await prisma.centerline.findUnique({ where: { id: centerline_id } });

		formData.append('centerline', JSON.stringify(centerline));

		try {
			const res = await fetch(`${API_URL}/api/topcon/`, {
				method: 'POST',
				body: formData,
				headers: { boundary: '----WebKitFormBoundary7MA4YWxkTrZu0gW' }
			});
			const topconRun = await res.json();
			throw redirect(303, `/topcon/${topconRun.id}`);
		} catch (err) {
			console.error(err);
		}
	}
};
