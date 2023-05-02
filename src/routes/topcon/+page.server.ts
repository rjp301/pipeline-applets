import type { PageServerLoad } from './$types';
import { API_URL } from '$env/static/private';
import { redirect } from '@sveltejs/kit';
import type { Actions } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ fetch }) => {
	const response = await fetch(`${API_URL}/api/centerline/`);
	const data = await response.json();
	return {
		centerlines: data,
		topconRunSubmitUrl: `${API_URL}/api/topcon/`
	};
};

export const actions: Actions = {
	default: async ({ request, fetch }) => {
		const formData = await request.formData();
		console.log(formData);

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
