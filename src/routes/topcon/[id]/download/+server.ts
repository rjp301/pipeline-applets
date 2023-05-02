import prisma from '$lib/server/prisma';
import { error } from '@sveltejs/kit';
import type { RequestHandler } from '../$types';
import { API_URL } from '$env/static/private';

export const GET: RequestHandler = async ({ params, fetch }) => {
	const data = await prisma.topconRun.findUniqueOrThrow({
		where: { id: Number(params.id) },
		include: { data_pts: true, data_rng: true }
	});

	const xlsxData = {
		filename: `${data.KP_rng}.xlsx`,
		sheets: [
			{
				sheetname: 'data_pts',
				records: data.data_pts
			},
			{
				sheetname: 'data_rng',
				records: data.data_rng
			}
		]
	};

	try {
		const res = await fetch(`${API_URL}/api/convert/xlsx`, {
			method: 'POST',
			body: JSON.stringify(xlsxData),
			headers: {
				'Content-Type': 'application/json'
			}
		});
		return new Response(res.body, { headers: res.headers });
	} catch (err) {
		throw error(500, 'Could not download XLSX');
	}
};
