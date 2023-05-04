import type { PageServerLoad } from './$types';
import type { Actions } from '@sveltejs/kit';

import { API_URL } from '$env/static/private';
import { redirect } from '@sveltejs/kit';
import prisma from '$lib/server/prisma';

export const load: PageServerLoad = async ({ fetch }) => {
	return { centerlines: fetch('/centerline').then((res) => res.json()) };
};

export const actions: Actions = {
	performRun: async ({ request, fetch }) => {
		const formData = await request.formData();
		console.log(formData);

		const { centerline_id } = Object.fromEntries(formData);
		console.log('centerline_id', centerline_id);
		const centerline = await fetch(`/centerline/${centerline_id}`).then((res) => res.json());

		formData.append('centerline', JSON.stringify(centerline));

		const response = await fetch(`${API_URL}/api/topcon/`, {
			method: 'POST',
			body: formData,
			headers: { boundary: '----WebKitFormBoundary7MA4YWxkTrZu0gW' }
		});

		const {
			width_bot,
			slope,
			ditch_profile,
			total_volume,
			data_crs,
			KP_beg,
			KP_end,
			KP_rng,
			data_pts,
			data_rng
		} = await response.json();

		const newItem = await prisma.topconRun.create({
			data: {
				width_bot,
				slope,
				ditch_profile,
				total_volume,
				data_crs,
				KP_beg,
				KP_end,
				KP_rng,
				centerline_id: centerline.id,
				data_pts: { createMany: { data: data_pts } },
				data_rng: { createMany: { data: data_rng } }
			}
		});

		throw redirect(303, `/topcon/${newItem.id}`);
	}
};
