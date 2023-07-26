import type { VercelRequest, VercelResponse } from '@vercel/node';

import AdmZip from 'adm-zip';
import shapefile from 'shapefile';
import { Readable } from 'stream';

function bufferToReadable(buffer: Buffer): Readable {
	const readable = new Readable();
	readable._read = () => {}; // _read is required but you can noop it
	readable.push(buffer);
	readable.push(null);
	return readable;
}

export default async function (request: VercelRequest, response: VercelResponse) {
	const buffer = request.body as Buffer;

	try {
		const zip = new AdmZip(buffer);
		const files = zip.getEntries();

		const shp = files.find((file) => file.name.endsWith('.shp'));
		const dbf = files.find((file) => file.name.endsWith('.dbf'));

		if (shp && dbf) {
			const geojson = await shapefile.read(
				bufferToReadable(shp.getData()),
				bufferToReadable(dbf.getData())
			);
			response.status(200).send(geojson);
		}
	} catch (err) {
		response.status(500).send(err);
	}
}
