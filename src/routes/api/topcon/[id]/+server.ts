import prisma from '$lib/server/prisma';
import type { RequestHandler } from './$types';
import { json } from '@sveltejs/kit';

/** Get specific Topcon Run */
export const GET: RequestHandler = async ({ params }) => {
	return json(
		await prisma.topconRun.findUnique({
			where: { id: Number(params.id) },
			include: {
				data_pts: true,
				data_rng: true
			}
		})
	);
};
