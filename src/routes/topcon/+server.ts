import prisma from '$lib/server/prisma';
import type { RequestHandler } from './$types';
import { error, json } from '@sveltejs/kit';

/** Get all Topcon Runs */
export const GET: RequestHandler = async ({ locals }) => {
	const { user } = await locals.auth.validateUser();
	if (!user) throw error(401, 'Must be signed in to access this endpoint');

	return json(
		await prisma.topconRun.findMany({
			where: { user_id: user.userId },
			orderBy: [{ createdAt: 'desc' }]
		})
	);
};

/** Create topcon Run */
export const POST: RequestHandler = async ({ request, locals }) => {
	const { user } = await locals.auth.validateUser();
	if (!user) throw error(401, 'Must be signed in to access this endpoint');

	const {
		width_bot,
		slope,
		ditch_profile,
		total_volume,
		data_crs,
		KP_beg,
		KP_end,
		KP_rng,
		data_pts,
		data_rng,
		centerline_id
	} = await request.json();

	return json(
		await prisma.topconRun.create({
			data: {
				width_bot,
				slope,
				ditch_profile,
				total_volume,
				data_crs,
				KP_beg,
				KP_end,
				KP_rng,
				centerline_id,
				user_id: user.userId,
				data_pts: { createMany: { data: data_pts } },
				data_rng: { createMany: { data: data_rng } }
			}
		})
	);
};
