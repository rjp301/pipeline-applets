import prisma from '$lib/server/prisma';
import { to_number } from 'svelte/internal';
import type { RequestHandler } from './$types';
import { json } from '@sveltejs/kit';

/** Get single centerline by ID */
export const GET: RequestHandler = async ({ params }) => {
	return json(
		await prisma.centerline.findUnique({ where: { id: to_number(params.centerline_id) } })
	);
};

/** Delete centerlne by ID */
export const DELETE: RequestHandler = async ({ params }) => {
	await prisma.centerline.delete({ where: { id: to_number(params.centerline_id) } });
	return json({ success: true });
};
