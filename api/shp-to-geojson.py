from http.server import BaseHTTPRequestHandler
from werkzeug.utils import secure_filename

import os
import zipfile
import json
import geopandas as gpd
import pandas as pd
import tempfile

class handler(BaseHTTPRequestHandler):
  """
  Expects zipped shapefile and returns geojson equivalent
  """

  def get_body(self) -> dict:
    content_len = int(self.headers.get("Content-Length"))
    body = self.rfile.read(content_len)
    return json.loads(body)

  def send_json(self,body:dict):
    text = json.dumps(body)
    self.send_response(200)
    self.send_header('Content-type','text/json')
    self.end_headers()
    self.wfile.write(text.encode())
    return

  def do_POST(self):
    body = self.get_body()
    self.send_json(body)
    return
  

# def allowed_file(filename, ftypes):
#   return "." in filename and filename.rsplit(".", 1)[1].lower() in ftypes


# def unzip(fname):
#   dir_fname = os.path.splitext(fname)[0]
#   with zipfile.ZipFile(fname, "r") as zip_ref:
#     zip_ref.extractall(dir_fname)


# def find_shp(fname):
#   dirname = os.path.splitext(fname)[0]
#   filename = next((i for i in os.listdir(dirname) if i[-4:] == ".shp"), False)
#   return os.path.join(dirname, filename) if filename else filename


# def convert_geojson():
#   ftypes = ["zip"]

#   if request.method == "POST":
#     # Ensure post request has file
#     if "file" not in request.files:
#       return jsonify({"error": "No 'file' component"}), 400

#     file = request.files["file"]

#     # if user does not select file, browser also
#     # submit an empty part without filename
#     if file.filename == "":
#       return jsonify({"error": "No file selected"})

#     if not allowed_file(file.filename, ftypes):
#       message = f"Incorrect filename. Must be of the type {', '.join(ftypes)}"
#       return jsonify({"error": message}), 400

#     filename = secure_filename(file.filename)
#     with tempfile.TemporaryDirectory() as tmpdirname:

#       # save file to temporary directory
#       upload_fname = os.path.join(tmpdirname, filename)
#       file.save(upload_fname)

#       data = pd.DataFrame()

#       if ".zip" in upload_fname:
#         unzip(upload_fname)
#         shp_fname = find_shp(upload_fname)

#         if not shp_fname:
#           return jsonify({"error": "no .shp file found in zip file"}), 400

#         data = gpd.read_file(shp_fname).to_crs("EPSG:4326").to_json()

#       return jsonify(json.loads(data))
