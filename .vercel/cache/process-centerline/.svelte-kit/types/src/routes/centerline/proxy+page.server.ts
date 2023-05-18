// @ts-nocheck
import type { Actions } from '@sveltejs/kit';

import { API_URL } from '$env/static/private';
import { redirect, fail } from '@sveltejs/kit';

import type { CenterlineMarker } from '@prisma/client';

interface APIResponse {
	markers: CenterlineMarker[];
	line: string;
	crs: string;
}

export const actions = {
	create: async ({ request, fetch }: import('./$types').RequestEvent) => {
		// Extract form data
		const formData = await request.formData();
		const { name, description } = Object.fromEntries(formData.entries());

		// Send files to calculation server to be processed
		const data: APIResponse = await fetch(`${API_URL}/api/centerline/`, {
			method: 'POST',
			body: formData,
			headers: { boundary: '----WebKitFormBoundary7MA4YWxkTrZu0gW' }
		})
			.then((res) => res.json())
			.catch((err) => {
				console.error(err);
				throw fail(500, { message: 'Could not transform data' });
			});
		const { line, markers, crs } = data;

		// Create new centerline in database
		const centerline = await fetch(`/centerline`, {
			method: 'POST',
			body: JSON.stringify({ name, description, line, crs, markers })
		}).then((res) => res.json());

		// Navigate to the new centerline
		throw redirect(303, `/centerline/${centerline.id}`);
	}
};
;null as any as Actions;