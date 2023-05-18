import prisma from '$lib/server/prisma';
import type { RequestHandler } from './$types';
import { json } from '@sveltejs/kit';

/** Get all Topcon Runs */
export const GET: RequestHandler = async () => {
	return json(await prisma.topconRun.findMany({ orderBy: [{ createdAt: 'desc' }] }));
};

/** Create topcon Run */
export const POST: RequestHandler = async ({ request }) => {
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
				data_pts: { createMany: { data: data_pts } },
				data_rng: { createMany: { data: data_rng } }
			}
		})
	);
};
