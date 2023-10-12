import type { PageServerLoad } from './$types';
import { fail, type Actions } from '@sveltejs/kit';

import { API_URL } from '$env/static/private';
import { redirect } from '@sveltejs/kit';

import type { TopconDataPts, TopconDataRng } from '@prisma/client';

interface APIResponse {
	ditch_profile: string;
	total_volume: number;
	data_pts: TopconDataPts[];
	data_rng: TopconDataRng[];
	KP_beg: number;
	KP_end: number;
	KP_rng: number;
}

export const load: PageServerLoad = async ({ fetch }) => {
	return { centerlines: fetch('/centerline').then((res) => res.json()) };
};

export const actions: Actions = {
	performRun: async ({ request, fetch }) => {
		// extract form data
		const formData = await request.formData();
		const { centerline_id, width_bot, slope, data_crs } = Object.fromEntries(formData);

		// append centerline to form data
		const centerline = await fetch(`/centerline/${centerline_id}`).then((res) => res.json());
		formData.append('centerline', JSON.stringify(centerline));

		// send files to calculation server to be processed
		const data: APIResponse = await fetch(`${API_URL}/api/topcon/`, {
			method: 'POST',
			body: formData,
			headers: { boundary: '----WebKitFormBoundary7MA4YWxkTrZu0gW' }
		})
			.then((res) => res.json())
			.catch((err) => {
				console.error(err);
				return fail(500, { message: 'Could not transform data' });
			});

		// create new topcon run in database
		const topcon = await fetch('/topcon', {
			method: 'POST',
			body: JSON.stringify({
				width_bot: Number(width_bot),
				slope: Number(slope),
				centerline_id: Number(centerline_id),
				data_crs,
				...data
			})
		}).then((res) => res.json());

		// navigate to the new run
		throw redirect(303, `/topcon/${topcon.id}`);
	}
};
