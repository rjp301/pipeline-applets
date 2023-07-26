import { json, type RequestHandler } from '@sveltejs/kit';

import { parse } from 'csv/sync';
import arrayBufferToBuffer from 'arraybuffer-to-buffer';

export const POST: RequestHandler = async ({ request }) => {
	const buffer = await request.arrayBuffer();
	const result = await parse(arrayBufferToBuffer(buffer));
	return json(result);
};
