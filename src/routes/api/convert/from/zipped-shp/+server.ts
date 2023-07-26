import { error, json, type RequestHandler } from '@sveltejs/kit';
import type { VercelRequest, VercelResponse } from '@vercel/node';

import AdmZip from 'adm-zip';
import shapefile from 'shapefile';
import { Readable } from 'stream';
import arrayBufferToBuffer from 'arraybuffer-to-buffer';

function bufferToReadable(buffer: Buffer): Readable {
	const readable = new Readable();
	readable._read = () => {}; // _read is required but you can noop it
	readable.push(buffer);
	readable.push(null);
	return readable;
}

export const POST: RequestHandler = async ({ request }) => {
	const arrayBuffer = await request.arrayBuffer();
	const buffer = arrayBufferToBuffer(arrayBuffer);

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
			return json(geojson);
		}

		throw error(500, 'shp and dbf files are not included in zip file');
	} catch (err: any) {
		throw error(500, err);
	}
};

