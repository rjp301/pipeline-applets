import prisma from '$lib/server/prisma';
import type { RequestHandler } from './$types';
import { error, json } from '@sveltejs/kit';

import parseCenterline from './parseCenterline';
import parseDitchline from './parseDitchline';
import parsePoints from './parsePoints';
import calculateDitchVolumes from './calculateDitchVolumes';

/** Get all Topcon Runs */
export const GET: RequestHandler = async ({ locals, url }) => {
	const page = Number(url.searchParams.get('page')) || 1;
	const perPage = 10;
	const { user } = await locals.auth.validateUser();
	if (!user) throw error(401, 'Must be signed in to access this endpoint');

	const runs = await prisma.topconRun.findMany({
		where: { user_id: user.userId },
		orderBy: [{ createdAt: 'desc' }],
		skip: perPage * (page - 1),
		take: perPage
	});

	const pages = Math.ceil((await prisma.topconRun.count()) / perPage);
	return json({ runs, pages });
};

/** Create topcon Run */
export const POST: RequestHandler = async ({ request, locals, fetch }) => {
	const formData = await request.formData();
	const { centerline_id, width_bot, slope, data_crs, ground_csv, ditch_shp } =
		Object.fromEntries(formData);

	const centerline_data = await fetch(`/centerline/${centerline_id}`).then((res) => res.json());
	const centerline = parseCenterline(centerline_data);

	const params = {
		centerline,
		width_bot: Number(width_bot),
		slope: Number(slope),
		ditchline: await parseDitchline(ditch_shp as Blob),
		surveyPoints: await parsePoints(ground_csv as Blob)
	};
	const result = calculateDitchVolumes(params);

	return json(result);
	// const { user } = await locals.auth.validateUser();
	// if (!user) throw error(401, 'Must be signed in to access this endpoint');

	// const {
	// 	width_bot,
	// 	slope,
	// 	ditch_profile,
	// 	total_volume,
	// 	data_crs,
	// 	KP_beg,
	// 	KP_end,
	// 	KP_rng,
	// 	data_pts,
	// 	data_rng,
	// 	centerline_id
	// } = await request.json();

	// return json(
	// 	await prisma.topconRun.create({
	// 		data: {
	// 			width_bot,
	// 			slope,
	// 			ditch_profile,
	// 			total_volume,
	// 			data_crs,
	// 			KP_beg,
	// 			KP_end,
	// 			KP_rng,
	// 			centerline_id,
	// 			user_id: user.userId,
	// 			data_pts: { createMany: { data: data_pts } },
	// 			data_rng: { createMany: { data: data_rng } }
	// 		}
	// 	})
	// );
};
