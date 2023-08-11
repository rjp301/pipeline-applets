import shapefile from 'shapefile';
import type { LineString } from 'geojson';
import { Polyline, Point } from 'chainage';

export default async function parseDitchline(file: Blob): Promise<Polyline> {
	const buffer = await file.arrayBuffer();
	const collection = await shapefile.read(buffer);
	const coordinates = (collection.features[0].geometry as LineString).coordinates;
	return new Polyline(coordinates.map((coord) => new Point(coord[0], coord[1])));
}
