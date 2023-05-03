import prisma from '$lib/server/prisma';
import type { RequestHandler } from './$types';
import { json } from '@sveltejs/kit';

/** Get specific Centerline */
export const GET: RequestHandler = async ({ params }) => {
	return json(
		await prisma.centerline.findUnique({
			where: { id: Number(params.id) },
			include: { markers: true }
		})
	);
};

/** Delete Centerline */
export const DELETE: RequestHandler = async ({ params }) => {
	return json(await prisma.centerline.delete({ where: { id: Number(params.id) } }));
};
