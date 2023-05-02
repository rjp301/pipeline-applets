import prisma from '$lib/server/prisma';
import { to_number } from 'svelte/internal';
import type { RequestHandler } from './$types';
import { json } from '@sveltejs/kit';

/** Get single centerline by ID */
export const GET: RequestHandler = async ({ params }) => {
	return json(
		await prisma.topconRun.findUnique({
			where: { id: to_number(params.topcon_id) },
			include: { data_pts: true, data_rng: true }
		})
	);
};

/** Delete centerlne by ID */
export const DELETE: RequestHandler = async ({ params }) => {
	await prisma.topconRun.delete({ where: { id: to_number(params.topcon_id) } });
	return json({ success: true });
};
