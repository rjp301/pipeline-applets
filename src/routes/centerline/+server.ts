import prisma from '$lib/server/prisma';
import type { RequestHandler } from './$types';
import { error, json } from '@sveltejs/kit';

/** Get all Centerlines */
export const GET: RequestHandler = async ({ locals }) => {
	const { user } = await locals.auth.validateUser();
	if (!user) throw error(401, 'Must be signed in to access this endpoint');

	return json(
		await prisma.centerline.findMany({
			where: { user_id: user.userId },
			select: { id: true, createdAt: true, updatedAt: true, name: true, description: true },
			orderBy: { name: 'asc' }
		})
	);
};

/** Create Centerline */
export const POST: RequestHandler = async ({ request, locals }) => {
	const { user } = await locals.auth.validateUser();
	if (!user) throw error(401, 'Must be signed in to access this endpoint');

	const data = await request.json();
	const { name, description, line, crs, markers } = data;

	return json(
		await prisma.centerline.create({
			data: {
				name,
				description,
				line,
				crs,
				user_id: user.userId,
				markers: { createMany: { data: markers } }
			}
		})
	);
};
