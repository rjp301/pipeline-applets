import type { LayoutServerLoad } from './$types';
import prisma from '$lib/server/prisma';

export const load: LayoutServerLoad = async () => {
	return { topconRuns: prisma.topconRun.findMany({ orderBy: [{ createdAt: 'desc' }] }) };
};
