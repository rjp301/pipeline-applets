import prisma from '$lib/server/prisma';
import type { RequestHandler } from './$types';
import { json } from '@sveltejs/kit';

/** Get all Centerlines */
export const GET: RequestHandler = async () => {
	return json(
		await prisma.centerline.findMany({
			select: { id: true, createdAt: true, updatedAt: true, name: true, description: true },
			orderBy: { name: 'asc' }
		})
	);
};

/** Create Centerline */
export const POST: RequestHandler = async ({ request }) => {
	const data = await request.json();
	const { name, description, line, crs, markers } = data;

	return json(
		await prisma.centerline.create({
			data: {
				name,
				description,
				line,
				crs,
				markers: { createMany: { data: markers } }
			}
		})
	);
};
