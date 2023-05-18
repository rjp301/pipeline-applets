from http.server import BaseHTTPRequestHandler, HTTPServer
import json
import pandas as pd
import os
import shapely.ops
import urllib

import geopandas as gpd
from tempfile import NamedTemporaryFile
from urllib.parse import parse_qs
from multipart import parse_form

EPSG_4326 = "EPSG:4326"


class handler(BaseHTTPRequestHandler):
    def do_POST(self):

        # Get the content length from the headers
        content_length = int(self.headers["Content-Length"])

        # Read the request body data
        request_data = self.rfile.read(content_length)

        # Parse the request body data as form data

        form_data = {}
        parse_form(
            self.headers,
            self.rfile,
            on_field=lambda f: print(f),
            on_file=lambda f: print(f),
        )

        return
    
        # Get the form fields from the parsed form data
        marker_value_col = form_data.get("marker_value_col")

        try:
            # Save the uploaded files to temporary files
            shp_line_file = self.save_upload_to_temp_file(form_data.get("shp_line"))
            print("\n\n\ngot to here\n\n\n")
            shp_markers_file = self.save_upload_to_temp_file(
                form_data.get("shp_markers")
            )

            # Convert the shapefiles to GeoDataFrames using geopandas
            shp_line = (
                gpd.read_file(shp_line_file).to_crs(EPSG_4326).geometry.unary_union
            )
            shp_line = (
                shapely.ops.linemerge(shp_line)
                if shp_line.geom_type == "MultiLineString"
                else shp_line
            )
            line = shp_line.wkt

            df_markers = (
                gpd.read_file(shp_markers_file)
                .to_crs(EPSG_4326)
                .sort_values(marker_value_col)
            )
            markers = [
                {
                    "value": float(row[marker_value_col]),
                    "x": row.geometry.x,
                    "y": row.geometry.y,
                }
                for _, row in df_markers.iterrows()
            ]

            # Prepare the response data
            response_data = {
                "markers": markers,
                "line": line,
                "crs": EPSG_4326,
            }

            # Convert the response data to JSON
            response_json = json.dumps(response_data)

            # Set the response headers
            self.send_response(200)
            self.send_header("Content-Type", "application/json")
            self.send_header("Content-Length", str(len(response_json)))
            self.end_headers()

            # Write the response data to the response body
            self.wfile.write(response_json.encode("utf-8"))
        except Exception as e:
            # Handle any exceptions and return an error response
            self.send_error(500, str(e))
        finally:
            # Clean up temporary files
            self.cleanup_temp_file(shp_line_file)
            self.cleanup_temp_file(shp_markers_file)

    def parse_form_data(self, data):
        # Parse the form data from the request body data
        form_data = {}

        fields = urllib.parse.parse_qs(data.decode("ISO-8859-1"))

        for key, value in fields.items():
            # print("------------------")
            # print(key)
            form_data[key] = value[0]
        return form_data

    def save_upload_to_temp_file(self, upload_data):
        # Save the uploaded file to a temporary file
        temp_file = NamedTemporaryFile(delete=False)
        temp_file.write(upload_data)
        temp_file.close()
        return temp_file.name

    def cleanup_temp_file(self, file_path):
        # Delete the temporary file
        if file_path:
            try:
                os.remove(file_path)
            except OSError:
                pass
