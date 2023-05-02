import prisma from '$lib/server/prisma';
import type { RequestHandler } from './$types';
import { json } from '@sveltejs/kit';

export const GET: RequestHandler = async () => {
	return json(await prisma.topconRun.findMany());
};

export const POST: RequestHandler = async ({ request }) => {
	const data = await request.json();
	return json(await prisma.topconRun.create(data));
};
