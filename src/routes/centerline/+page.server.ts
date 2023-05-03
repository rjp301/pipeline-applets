import type { Actions } from '@sveltejs/kit';

export const actions: Actions = {
	createCenterline: async ({ request, fetch }) => {
		const formData = await request.formData();
		const res = await fetch(`/api/centerline`, {
			method: 'POST',
			body: formData,
			headers: { boundary: '----WebKitFormBoundary7MA4YWxkTrZu0gW' }
		});
		const data = await res.json();

		console.log(data)
	}
};
