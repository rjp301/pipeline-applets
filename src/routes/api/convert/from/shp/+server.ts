import { error, json, type RequestHandler } from '@sveltejs/kit';

import shapefile from 'shapefile';
import { Readable } from 'stream';

export const POST: RequestHandler = async ({ request }) => {
	const buffer = await request.arrayBuffer();

	try {
		const geojson = await shapefile.read(buffer);
		return json(geojson);
	} catch (err: any) {
		console.log(err);
		throw error(500, err);
	}
};
