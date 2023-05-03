import prisma from '$lib/server/prisma';
import type { RequestHandler } from './$types';
import { json } from '@sveltejs/kit';

/** Get all Centerlines */
export const GET: RequestHandler = async () => {
	return json(
		await prisma.centerline.findMany({
			select: { id: true, createdAt: true, updatedAt: true, name: true, description: true }
		})
	);
};

/** Create Centerline */
export const POST: RequestHandler = async ({ request }) => {
	const formData = await request.formData();
	const { name, desciption } = await Object.fromEntries(formData.entries());

	const data = await fetch(`${API_URL}/api/centerline/`, {
		method: 'POST',
		body: formData,
		headers: { boundary: '----WebKitFormBoundary7MA4YWxkTrZu0gW' }
	})
		.then((res) => res.json())
		.catch((err) => {
			console.log('Could not access calculaton API');
			console.error(err);
		});

	return json(
		await prisma.centerline.create({
			data: {
				name: name,
				desciption: desciption,
				line: data.line,
				crs: data.crs,
				markers: { createMany: { data: data.markers } }
			}
		})
	);
};
