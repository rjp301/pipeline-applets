import { error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { API_URL } from '$env/static/private';

const data_pts_headers = [
	{ header: 'NUM', key: 'num' },
	{ header: 'X', key: 'x' },
	{ header: 'Y', key: 'y' },
	{ header: 'Z', key: 'z' },
	{ header: 'DESC', key: 'desc' },
	{ header: 'GEOMETRY', key: 'geometry' },
	{ header: 'CHAINAGE', key: 'chainage' },
	{ header: 'DEPTH', key: 'depth' },
	{ header: 'SLOPE', key: 'slope' },
	{ header: 'WIDTH_BOT', key: 'width_bot' },
	{ header: 'WIDTH_TOP', key: 'width_top' },
	{ header: 'AREA', key: 'area' }
];

const data_rng_headers = [
	{ header: 'KP_BEG', key: 'KP_beg' },
	{ header: 'KP_END', key: 'KP_end' },
	{ header: 'AREA_BEG', key: 'area_beg' },
	{ header: 'AREA_END', key: 'area_end' },
	{ header: 'AREA_AVG', key: 'area_avg' },
	{ header: 'LENGTH', key: 'length' },
	{ header: 'VOLUME', key: 'volume' }
];

type WorkbookData = {
	filename: string;
	sheets: {
		sheetname: string;
		columns: { header: string; key: string; width?: number }[];
		records: { [key: string]: any }[];
	}[];
};

export const GET: RequestHandler = async ({ params, fetch }) => {
	const data = await fetch(`/topcon/${params.id}`).then((res) => res.json());

	const xlsxData: WorkbookData = {
		filename: `${data.KP_rng}`,
		sheets: [
			{
				sheetname: 'data_pts',
				columns: data_pts_headers,
				records: data.data_pts
			},
			{
				sheetname: 'data_rng',
				columns: data_rng_headers,
				records: data.data_rng
			}
		]
	};

	try {
		const res = await fetch(`${API_URL}/api/json-to-xlsx`, {
			method: 'POST',
			body: JSON.stringify(xlsxData),
			headers: {
				'Content-Type': 'application/json'
			}
		});
		return new Response(res.body, { headers: res.headers });
	} catch (err) {
		console.error(err);
		throw error(500, 'Could not download XLSX');
	}
};
