import type { SurveyPoint } from './calculateDitchVolumes';
import { parse } from 'csv/sync';
import arrayBufferToBuffer from 'arraybuffer-to-buffer';

export default async function parsePoints(file: Blob): Promise<SurveyPoint[]> {
	const buffer = await file.arrayBuffer();
	const points_array = parse(arrayBufferToBuffer(buffer)) as any[][];
	return points_array.map((pt) => ({
		num: pt[0],
		x: Math.min(pt[1], pt[2]),
		y: Math.max(pt[1], pt[2]),
		z: pt[3],
		desc: pt[4]
	}));
}
