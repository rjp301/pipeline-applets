import { json, type RequestHandler } from '@sveltejs/kit';



export const POST: RequestHandler = async ({ request, fetch }) => {
	const formData = await request.formData();
	const formObject = Object.fromEntries(formData);

	return json(typeof formObject.ground_csv);

	// return json(centerline);
};
