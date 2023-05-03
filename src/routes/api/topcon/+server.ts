import prisma from '$lib/server/prisma';
import type { RequestHandler } from './$types';
import { json } from '@sveltejs/kit';

/** Get all Topcon Runs */
export const GET: RequestHandler = async () => {
	return json(await prisma.topconRun.findMany());
};

/** Create topcon Run */
export const POST: RequestHandler = async ({ request }) => {
	const data = await request.json();
	return json(await prisma.topconRun.create(data));
};
