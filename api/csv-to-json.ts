import type { VercelRequest, VercelResponse } from '@vercel/node';

import { parse } from 'csv/sync';
import { Readable } from 'stream';

export default async function (request: VercelRequest, response: VercelResponse) {
	const buffer = request.body as Buffer;

	try {
		const json = await parse(buffer);
		response.status(200).send(json);
	} catch (err) {
		response.status(500).send(err);
	}
}
