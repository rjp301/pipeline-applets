import wkt from 'terraformer-wkt-parser';
import type { LineString as geoLineString } from 'geojson';

import { Prisma } from '@prisma/client';
import { Centerline, Polyline, Marker, Point } from 'chainage';

const prismaCenterline = Prisma.validator<Prisma.CenterlineArgs>()({ include: { markers: true } });
type PrismaCenterline = Prisma.CenterlineGetPayload<typeof prismaCenterline>;

export default function parseCenterline(centerlineData: PrismaCenterline): Centerline {
	const line = wkt.parse(centerlineData.line) as geoLineString;
	const polyline = new Polyline(line.coordinates.map((coord) => new Point(coord[0], coord[1])));
	const markers = centerlineData.markers.map(
		(marker) => new Marker(marker.x, marker.y, marker.value)
	);
	return new Centerline(polyline, markers);
}
