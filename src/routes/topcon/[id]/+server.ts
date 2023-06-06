import prisma from '$lib/server/prisma';
import type { RequestHandler } from './$types';
import { error, json } from '@sveltejs/kit';

/** Get specific Topcon Run */
export const GET: RequestHandler = async ({ params, locals }) => {
	const { user } = await locals.auth.validateUser();
	if (!user) throw error(401, 'Must be signed in to access this endpoint');

	const item = await prisma.topconRun.findUnique({
		where: { id: Number(params.id) },
		include: {
			data_pts: true,
			data_rng: true
		}
	});
	if (item?.user_id !== user.userId) throw error(403, 'Cannot access this resource');

	return json(item);
};

/** Delete Topcon Run */
export const DELETE: RequestHandler = async ({ params, locals }) => {
	const { user } = await locals.auth.validateUser();
	if (!user) throw error(401, 'Must be signed in to access this endpoint');

	const item = await prisma.topconRun.findUnique({ where: { id: Number(params.id) } });
	if (item?.user_id !== user.userId) throw error(403, 'Cannot access this resource');

	return json(await prisma.topconRun.delete({ where: { id: Number(params.id) } }));
};
