import json
import pandas as pd
from http.server import BaseHTTPRequestHandler
from tempfile import NamedTemporaryFile

class handler(BaseHTTPRequestHandler):
    def do_POST(self):
        content_length = int(self.headers['Content-Length'])
        data = self.rfile.read(content_length)

        # Read the JSON data from the request body
        json_data = json.loads(data)

        # Create a temporary file with a .xlsx extension
        temp_file = NamedTemporaryFile(suffix=".xlsx")

        try:
            # Extract the filename from the JSON data or use a default value
            filename = json_data.get("filename", "workbook")
            filename = filename if filename.endswith(".xlsx") else filename + ".xlsx"

            # Create an Excel writer
            with pd.ExcelWriter(temp_file.name) as writer:
                # Iterate over the sheets in the JSON data
                for sheet_data in json_data.get("sheets", []):
                    sheet_name = sheet_data.get("sheetname")
                    records = sheet_data.get("records", [])

                    # Create a DataFrame from the records and write it to the sheet
                    df = pd.DataFrame.from_records(records)
                    df.to_excel(writer, sheet_name=sheet_name, index=False)

            # Read the contents of the temporary file
            with open(temp_file.name, 'rb') as f:
                file_content = f.read()

            # Set the response headers
            self.send_response(200)
            self.send_header("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet")
            self.send_header("Content-Disposition", f'attachment; filename="{filename}"')
            self.end_headers()

            # Write the file content to the response
            self.wfile.write(file_content)
        finally:
            temp_file.close()
