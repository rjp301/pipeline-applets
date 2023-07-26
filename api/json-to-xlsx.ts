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

export default async function (request: VercelRequest, response: VercelResponse) {
	const data = request.body as WorkbookData;

	try {
		const excelBuffer = await createWorkbook(data);

		// Set the response headers to trigger the file download
		response.setHeader(
			'Content-Type',
			'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
		);
		response.setHeader(
			'Content-Disposition',
			`attachment; filename=${data.filename || 'workbook'}.xlsx`
		);

		// Send the Excel file as a response
		response.send(excelBuffer);
	} catch (error) {
		console.error('Error while converting JSON to Excel:', error);
		response.status(500).send('Internal Server Error');
	}
}
