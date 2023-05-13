import fs from 'fs';
import * as fsPromise from 'fs/promises';
import FormData from 'form-data';
import axios from 'axios';
import type { AxiosResponse } from 'axios';
import path from 'path';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const centerline = await prisma.centerline.findUniqueOrThrow({
	where: { id: 2 },
	include: { markers: true }
});

const performRun = async (dirPath: string) => {
	const params = await fsPromise
		.readFile(path.join(dirPath, 'params.json'))
		.then((buffer) => JSON.parse(buffer.toString()));

	const form = new FormData();
	form.append('width_bot', params.width_bot);
	form.append('slope', params.slope);
	form.append('data_crs', params.data_crs);
	form.append('centerline', JSON.stringify(centerline));
	form.append('ground_csv', fs.createReadStream(path.join(dirPath, 'ground_profile.csv')));
	form.append('ditch_shp', fs.createReadStream(path.join(dirPath, 'ditch_profile.shp')));

	const getResults = (res: any) => ({
		status: res.status,
		statusText: res.statusText,
		dirPath: dirPath
	});

	try {
		const response = await axios({
			method: 'post',
			data: form,
			headers: form.getHeaders(),
			url: 'http://127.0.0.1:8000/api/topcon/'
		});

		const {
			width_bot,
			slope,
			ditch_profile,
			total_volume,
			data_crs,
			KP_beg,
			KP_end,
			KP_rng,
			data_pts,
			data_rng
		} = response.data;
		await prisma.topconRun.create({
			data: {
				width_bot,
				slope,
				ditch_profile,
				total_volume,
				data_crs,
				KP_beg,
				KP_end,
				KP_rng,
				centerline_id: centerline.id,
				data_pts: { createMany: { data: data_pts } },
				data_rng: { createMany: { data: data_rng } }
			}
		});
	} catch (err) {
    console.log('Could not add info to database from', dirPath);
    console.error(err)
	}
};

const runsPath = '/Users/riley/Desktop/topcon_runs/cleaned';
const runPaths = await fsPromise
	.readdir(runsPath)
	.then((item) => item.map((run) => path.join(runsPath, run)));

const runsData = await Promise.all(runPaths.map(performRun));

console.table(runsData);

// performRun: async ({ request, fetch }) => {
// 	const formData = await request.formData();
// 	console.log(formData);

// 	const { centerline_id } = Object.fromEntries(formData);
// 	console.log('centerline_id', centerline_id);
// 	const centerline = await prisma.centerline.findUnique({ where: { id: centerline_id } });

// 	formData.append('centerline', JSON.stringify(centerline));

// 	try {
// 		const res = await fetch(`${API_URL}/api/topcon/`, {
// 			method: 'POST',
// 			body: formData,
// 			headers: { boundary: '----WebKitFormBoundary7MA4YWxkTrZu0gW' }
// 		});
// 		const topconRun = await res.json();
// 		throw redirect(303, `/topcon/${topconRun.id}`);
// 	} catch (err) {
// 		console.error(err);
// 	}
// };
