import { Polyline, Point } from "chainage";
import type { CollectionEntry } from "astro:content";
import proj4 from "proj4";

interface parseData {
  info: any;
  length: number;
}

const parseBBox = (offset: number, dataView: DataView) => {
  const Xmin = dataView.getFloat64(offset + 0, true);
  const Ymin = dataView.getFloat64(offset + 8, true);
  const Xmax = dataView.getFloat64(offset + 16, true);
  const Ymax = dataView.getFloat64(offset + 24, true);
  return { Xmin, Ymin, Xmax, Ymax };
};

const parseZRange = (offset: number, dataView: DataView) => {
  const Zmin = dataView.getFloat64(offset + 0, true);
  const Zmax = dataView.getFloat64(offset + 8, true);
  return { Zmin, Zmax };
};

const parsePoint = (offset: number, dataView: DataView) => {
  return {
    x: dataView.getFloat64(offset + 0, true),
    y: dataView.getFloat64(offset + 8, true),
  };
};

const parsePolylineZ = (offset: number, dataView: DataView) => {
  const numParts = dataView.getInt8(offset + 36);
  const numPoints = dataView.getInt8(offset + 40);

  const X = 44 + 4 * numParts;
  const Y = X + 16 * numPoints;

  const bbox = parseBBox(offset + 4, dataView);
  const zRange = parseZRange(offset + Y, dataView);

  const points = [];
  for (let i = 0; i < numPoints; i++) {
    const pt = parsePoint(offset + X + i * 16, dataView);
    const z = dataView.getFloat64(offset + Y + i * 8, true);
    points.push({ ...pt, z });
  }

  return {
    bbox: { ...bbox, ...zRange },
    points,
  };
};

export default async function parseDitchline(
  file: Blob,
  crs: CollectionEntry<"crs">
): Promise<any> {
  const arrayBuffer = await file.arrayBuffer();
  const byteArray = new Uint8Array(arrayBuffer);
  const dataView = new DataView(byteArray.buffer);

  const data = parsePolylineZ(108, dataView);
  const pts = data.points.map((pt) => {
    const projected = proj4(crs.data.proj, "EPSG:4326", { x: pt.x, y: pt.y });
    return new Point(projected.x, projected.y, pt.z);
  });
  return new Polyline(pts);
}
