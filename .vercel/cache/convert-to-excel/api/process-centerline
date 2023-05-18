from http.server import BaseHTTPRequestHandler
import json

import shapely.ops
import geopandas as gpd


EPSG_4326 = "EPSG:4326"


class handler(BaseHTTPRequestHandler):
    def do_POST(self):
        # Get the content length from the headers
        content_length = int(self.headers["Content-Length"])

        # Read the request body data
        request_data = self.rfile.read(content_length)

        # Parse the request body data as form data
        form_data = self.parse_form_data(request_data)

        # Get the form fields from the parsed form data
        marker_value_col = form_data.get("marker_value_col")
        shp_line_file = form_data.get("shp_line")
        shp_markers_file = form_data.get("shp_markers")

        try:
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

    def parse_form_data(self, data):
        # Parse the form data from the request body data
        form_data = {}
        fields = data.decode("utf-8").split("&")
        for field in fields:
            key, value = field.split("=")
            form_data[key] = value
        return form_data
