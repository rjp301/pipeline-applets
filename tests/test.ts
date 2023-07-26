import ExcelJS from 'exceljs';

type WorkbookData = {
	filename: string;
	sheets: {
		sheetname: string;
		columns: { header: string; key: string; width?: number }[];
		records: { [key: string]: any }[];
	}[];
};

const data: WorkbookData = {
	filename: 'test_excel.xlsx',
	sheets: [
		{
			sheetname: 'gumdroops',
			columns: [
				{ header: 'Hello', key: 'hello' },
				{ header: 'Goodbye', key: 'goodbye' }
			],
			records: [
				{ hello: 1, goodbye: 3 },
				{ hello: 1, goodbye: 3 },
				{ hello: 1, goodbye: 3 },
				{ hello: 1, goodbye: 3 },
				{ hello: 1, goodbye: 6 }
			]
		},
		{
			sheetname: 'gumdrops',
			columns: [
				{ header: 'Hello', key: 'hello' },
				{ header: 'Bonjour', key: 'bonjour' }
			],
			records: [
				{ hello: 1, bonjour: 3 },
				{ hello: 1, bonjour: 3 },
				{ hello: 1, bonjour: 3 }
			]
		},
		{
			sheetname: 'gumdroo000ps',
			columns: [
				{ header: 'Toodles', key: 'toodle-loo' },
				{ header: 'Good-bye', key: 'goodbye' }
			],
			records: [
				{ 'toodle-loo': 1, goodbye: 3 },
				{ 'toodle-loo': 1, goodbye: 3 },
				{ 'toodle-loo': 1, goodbye: 3 },
				{ 'toodle-loo': 4, goodbye: 3 },
				{ 'toodle-loo': 1, goodbye: 3 }
			]
		}
	]
};

function createWorkbook(data: WorkbookData): void {
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

	workbook.xlsx.writeFile('tests/test.xlsx');
}

createWorkbook(data);
