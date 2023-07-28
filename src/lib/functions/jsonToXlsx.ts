import ExcelJS from 'exceljs';

type WorksheetData = {
	sheetname: string;
	columns: { header: string; key: string; width?: number }[];
	records: { [key: string]: any }[];
};

type WorkbookData = {
	filename: string;
	sheets: WorksheetData[];
};

function createWorkbook(sheets: WorksheetData[]): Promise<ExcelJS.Buffer> {
	const workbook = new ExcelJS.Workbook();
	workbook.creator = 'Construction Applets';
	workbook.created = new Date();
	workbook.modified = new Date();

	for (let [idx, sheet] of sheets.entries()) {
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

