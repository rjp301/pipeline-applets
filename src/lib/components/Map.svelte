<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { browser } from '$app/environment';
	import wkt from 'terraformer-wkt-parser';

	import type { LatLngExpression, Map, GeoJSON } from 'leaflet';
	import type { GeoJsonObject, GeometryObject, BBox } from 'geojson';

	let mapElement: HTMLDivElement;
	let map: Map;

	type Point = {
		x: number;
		y: number;
		z?: number;
	};

	// export let points: Point[] = [];
	export let line: string;
	$: parsedLine = wkt.parse(line) as GeometryObject & { bbox: () => BBox };
	$: console.log(parsedLine.bbox());

	const geomCenter = (geom: GeometryObject & { bbox: () => BBox }): LatLngExpression => {
		if (geom === undefined) return [0, 0];
		const bbox = geom.bbox();
		return [(bbox[1] + bbox[3]) / 2, (bbox[0] + bbox[2]) / 2];
	};

	const style = {
		color: 'red',
		weight: 5
	};

	onMount(async () => {
		if (browser) {
			const leaflet = await import('leaflet');

			map = leaflet.map(mapElement).setView(geomCenter(parsedLine), 10);

			leaflet
				.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
					attribution:
						'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
				})
				.addTo(map);

			leaflet.geoJSON(parsedLine, { style }).addTo(map);
		}
	});

	onDestroy(async () => {
		if (map) {
			console.log('Unloading Leaflet map.');
			map.remove();
		}
	});
</script>

<main>
	<div class="h-[600px] rounded" bind:this={mapElement} />
</main>

<style>
	@import 'leaflet/dist/leaflet.css';
	main div {
		height: 600px;
	}
</style>
