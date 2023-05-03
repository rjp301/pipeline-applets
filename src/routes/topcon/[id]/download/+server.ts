import prisma from '$lib/server/prisma';
import { error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { API_URL } from '$env/static/private';

const data_pts_headers = [
	'num',
	'x',
	'y',
	'z',
	'desc',
	'geometry',
	'chainage',
	'slope',
	'width_bot',
	'width_top',
	'area'
];

const data_rng_headers = [
	'KP_beg',
	'KP_end',
	'area_beg',
	'area_end',
	'area_avg',
	'length',
	'volume'
];

interface Record {
	[key: string]: string | number | boolean | null | undefined;
}

const convertRecord = (record: Record, headers: Array<keyof Record>): Record =>
	Object.fromEntries(
		headers
			.filter((key) => key in record)
			.map((key) => [typeof key === 'string' ? key.toUpperCase() : key, record[key]])
	);

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
				records: data.data_pts.map((record: object) =>
					convertRecord(record as Record, data_pts_headers)
				)
			},
			{
				sheetname: 'data_rng',
				records: data.data_rng.map((record: object) =>
					convertRecord(record as Record, data_rng_headers)
				)
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
