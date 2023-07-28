import { Centerline, Point, Polyline, formatKP } from 'chainage';

type SurveyPoint = {
	num: string;
	x: number;
	y: number;
	z: number;
	desc: string;
};

type PointResult = SurveyPoint & {
	geometry: Point;
	chainage?: number;
	depth?: number;
	slope?: number;
	width_bot?: number;
	width_top?: number;
	area?: number;
};

type VolumeChunk = {
	KP_beg: number;
	KP_end: number;
	area_beg: number;
	area_end: number;
	area_avg: number;
	length: number;
	volume: number;
};

export type Params = {
	centerline: Centerline;
	width_bot: number;
	slope: number;
	surveyPoints: SurveyPoint[];
	ditchline: Polyline;
};

const processPoint = (params: Params, surveyPoint: SurveyPoint): PointResult => {
	const { centerline, width_bot, slope, ditchline } = params;

	const geometry = new Point(surveyPoint.x, surveyPoint.y, surveyPoint.z);
	const chainage = centerline.find_KP(geometry);
	const depth = ditchline.elevationAtNode(geometry);

	if (!depth) return { ...surveyPoint, geometry, chainage };

	const width_top = slope > 0 ? (depth / slope) * 2 + width_bot : width_bot;
	const area = width_bot * depth + ((width_top - width_bot) / 2) * depth;

	return {
		...surveyPoint,
		geometry,
		chainage,
		depth,
		slope,
		width_bot,
		width_top,
		area
	};
};

const calcVolumeChunks = (surveyPoints: PointResult[]): VolumeChunk[] => {
	const filtered = surveyPoints.filter((pt) => pt.chainage !== undefined && pt.area !== undefined);
	const chunks = [];

	for (let i = 0; i < filtered.length - 1; i++) {
		const KP_beg = filtered[i].chainage!;
		const KP_end = filtered[i + 1].chainage!;
		const area_beg = filtered[i].area!;
		const area_end = filtered[i + 1].area!;
		const area_avg = (area_beg + area_end) / 2;
		const length = KP_end - KP_beg;
		const volume = length * area_avg;

		const chunk = {
			KP_beg,
			KP_end,
			area_beg,
			area_end,
			area_avg,
			length,
			volume
		};

		chunks.push(chunk);
	}

	return chunks;
};

export default function calculateDitchVolumes(params: Params) {
	const { surveyPoints, ditchline } = params;

	const data_pts = surveyPoints.map((pt) => processPoint(params, pt));
	const data_rng = calcVolumeChunks(data_pts);

	const chainages = data_pts.filter((i) => i.chainage !== undefined).map((i) => i.chainage!);

	const KP_beg = Math.min(...chainages);
	const KP_end = Math.max(...chainages);
	const KP_rng = `${formatKP(KP_beg)} to ${formatKP(KP_end)}`;

	return {
		ditch_profile: ditchline.toString(),
		total_volume: data_rng.reduce((acc, val) => acc + val.volume, 0),
		data_pts,
		data_rng,
		KP_beg,
		KP_end,
		KP_rng
	};
}
