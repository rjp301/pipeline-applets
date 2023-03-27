from http.server import BaseHTTPRequestHandler
import pandas as pd
import tempfile
import json
import os

class handler(BaseHTTPRequestHandler):
  """
  Expects JSON body in the format 
  {
    filename: Workbook Name.xlsx
    worksheets: {
      sheet1: [
        { col1: data1, col2: data1, col3: data1, ... },
        { col1: data2, col2: data2, col3: data2, ... },
        { col1: data3, col2: data3, col3: data3, ... },
        { ... }
      ],
      sheet2: [
        { col1: data1, col2: data1, col3: data1, ... },
        { col1: data2, col2: data2, col3: data2, ... },
        { ... }
      ],
      ...
    }
  }

  Return Excel workbook file as download
  """
  def get_body(self) -> dict:
    content_len = int(self.headers.get("Content-Length"))
    body = self.rfile.read(content_len)
    return json.loads(body)

  def send_json(self,data:dict,status=200):
    text = json.dumps(data)
    self.send_response(status)
    self.send_header('Content-type','text/json')
    self.end_headers()
    self.wfile.write(text.encode())
    return

  def do_POST(self):
    body = self.get_body()

    if "filename" not in body:
      self.send_error(422,"filename not provided")
      return

    if "worksheets" not in body:
      self.send_error(422,"worksheets not provided")
      return

    path = tempfile.mkdtemp()
    filename = os.path.join(path,body["filename"])
    filename = os.path.splitext(filename)[0] + ".xlsx"

    # with pd.ExcelWriter(filename) as writer:
    for name,data in body["worksheets"].items():
      df = pd.read_json(data)
      print(df)

    self.send_json(body)
    return