import { Centerline, Polyline, Marker, Point } from "chainage";
import type { CollectionEntry } from "astro:content";

export default function parseCenterline(
  data: CollectionEntry<"centerline">
): Centerline {
  const polylinePoints = data.data.coordinates.map(
    (c) => new Point(c[0], c[1])
  );
  const polyline = new Polyline(polylinePoints);
  const markers = data.data.markers.map((m) => new Marker(m.x, m.y, m.value));
  return new Centerline(polyline, markers);
}
