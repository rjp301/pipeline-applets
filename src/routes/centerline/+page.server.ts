import type { PageServerLoad } from './$types';
import type { Actions } from '@sveltejs/kit';

import { API_URL } from '$env/static/private';
import { redirect } from '@sveltejs/kit';
import prisma from '$lib/server/prisma';

export const actions: Actions = {
	createCenterline: async ({ request, fetch }) => {
		const formData = await request.formData();
		const { name, desciption } = await Object.fromEntries(formData.entries());

		try {
			const res = await fetch(`${API_URL}/api/centerline/`, {
				method: 'POST',
				body: formData,
				headers: { boundary: '----WebKitFormBoundary7MA4YWxkTrZu0gW' }
			});
			const data = await res.json();
			console.log(data);

			await prisma.centerline.create({
				data: {
					name: name,
					desciption: desciption,
					line: data.line,
					crs: data.crs,
					markers: { createMany: { data: data.markers } }
				}
			});
		} catch (err) {
			console.error(err);
		}
	}
};
