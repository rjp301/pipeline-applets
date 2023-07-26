import { error, type RequestHandler } from '@sveltejs/kit';
import type { VercelRequest, VercelResponse } from '@vercel/node';
import ExcelJS from 'exceljs';

type WorkbookData = {
	filename: string;
	sheets: {
		sheetname: string;
		columns: { header: string; key: string; width?: number }[];
		records: { [key: string]: any }[];
	}[];
};

function createWorkbook(data: WorkbookData): Promise<ExcelJS.Buffer> {
	const workbook = new ExcelJS.Workbook();
	workbook.creator = 'Construction Applets';
	workbook.created = new Date();
	workbook.modified = new Date();

	for (let [idx, sheet] of data.sheets.entries()) {
		const sheetname = sheet.sheetname || `sheet_${idx + 1}`;
		const worksheet = workbook.addWorksheet(sheetname);
		worksheet.columns = sheet.columns;

		for (let record of sheet.records) {
			worksheet.addRow(record);
		}

		worksheet.getRow(1).font = { bold: true };
	}

	return workbook.xlsx.writeBuffer();
}

export const POST: RequestHandler = async ({ request }) => {
	const data = (await request.json()) as WorkbookData;

	try {
		const excelBuffer = await createWorkbook(data);

		// Set the response headers to trigger the file download
		return new Response(excelBuffer, {
			headers: {
				'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
				'Content-Disposition': `attachment; filename=${data.filename || 'workbook'}.xlsx`
			}
		});
	} catch (err: any) {
		throw error(500, err);
	}
};
