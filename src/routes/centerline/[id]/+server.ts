import prisma from '$lib/server/prisma';
import type { RequestHandler } from './$types';
import { error, json } from '@sveltejs/kit';

/** Get specific Centerline */
export const GET: RequestHandler = async ({ params, locals }) => {
	const { user } = await locals.auth.validateUser();
	if (!user) throw error(401, 'Must be signed in to access this endpoint');

	const item = await prisma.centerline.findUnique({
		where: { id: Number(params.id) },
		include: { markers: true }
	});
	if (!item) throw error(404, 'Resource not found');
	if (item.user_id !== user.userId) throw error(403, 'Cannot access this resource');

	return json(item);
};

/** Delete Centerline */
export const DELETE: RequestHandler = async ({ params, locals }) => {
	const { user } = await locals.auth.validateUser();
	if (!user) throw error(401, 'Must be signed in to access this endpoint');

	const item = await prisma.centerline.findUnique({ where: { id: Number(params.id) } });
	if (item?.user_id !== user.userId) throw error(403, 'Cannot access this resource');

	return json(await prisma.centerline.delete({ where: { id: Number(params.id) } }));
};
