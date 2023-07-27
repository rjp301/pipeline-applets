import { json, type RequestHandler } from '@sveltejs/kit';
import { Centerline, Polyline, Marker, Point } from 'chainage';

import type { LineString as geoLineString } from 'geojson';

import { Prisma } from '@prisma/client';

const prismaCenterline = Prisma.validator<Prisma.CenterlineArgs>()({ include: { markers: true } });
type PrismaCenterline = Prisma.CenterlineGetPayload<typeof prismaCenterline>;

import wkt from 'terraformer-wkt-parser';

const parseCenterline = (centerlineData: PrismaCenterline) => {
	const line = wkt.parse(centerlineData.line) as geoLineString;
	const polyline = new Polyline(line.coordinates.map((coord) => new Point(coord[0], coord[1])));
	const markers = centerlineData.markers.map(
		(marker) => new Marker(marker.x, marker.y, marker.value)
	);
	return new Centerline(polyline, markers);
};

export const POST: RequestHandler = async ({ request, fetch }) => {
	const formData = await request.formData();
	const formObject = Object.fromEntries(formData);

	return json(typeof formObject.ground_csv);

	// return json(centerline);
};
