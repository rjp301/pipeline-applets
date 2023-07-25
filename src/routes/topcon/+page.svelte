<script lang="ts">
	import { Input } from '$components/ui/input';
	import { Label } from '$components/ui/label';
	import { Button } from '$components/ui/button';
	import { CardTitle } from '$components/ui/card';

	import type { PageData } from './$types';
	export let data: PageData;
</script>

<form
	method="POST"
	action="?/performRun"
	enctype="multipart/form-data"
	class="p-4 max-w-xl grid gap-4"
>
	<CardTitle>Perform New Ditch Volume Calculation</CardTitle>

	<div class="grid gap-2">
		<Label>Centerline</Label>
		<select id="centerline_id" name="centerline_id" class="select" required>
			{#each data.centerlines as centerline}
				<option value={centerline.id}>{centerline.name}</option>
			{/each}
		</select>
	</div>

	<div class="grid gap-2">
		<Label>Slope of Ditch Sides [slope:1]</Label>
		<Input
			id="slope"
			name="slope"
			type="number"
			placeholder="Enter number"
			min="0"
			step="0.5"
			required
		/>
	</div>

	<div class="grid gap-2">
		<Label>Width of Ditch Bottom [m]</Label>
		<Input
			id="width_bot"
			name="width_bot"
			type="number"
			placeholder="Enter number"
			min="0"
			step="0.5"
			required
		/>
	</div>

	<div class="grid gap-2">
		<Label>Designed Ditch Profile [SHP]</Label>
		<Input id="ditch_shp" name="ditch_shp" type="file" accept=".shp" required />
		<small class="text-muted-foreground">3D SHP file of bottom of ditch</small>
	</div>

	<div class="grid gap-2">
		<Label>Surveyed Ground Profile [CSV]</Label>
		<Input id="ground_csv" name="ground_csv" type="file" accept=".csv" required />
		<small class="text-muted-foreground"
			>Survey shots as CSV file in the format ID, X, Y, Z, DESC</small
		>
	</div>

	<div class="grid gap-2">
		<Label>Data CRS [EPSG:####]</Label>
		<Input
			id="data_crs"
			name="data_crs"
			type="text"
			placeholder="Specify CRS"
			value="EPSG:26910"
			required
		/>
		<small class="text-muted-foreground">
			EPSG No. of the Coordinate Reference System used i.e. 'EPSG:26910'
		</small>
	</div>

	<div class="flex gap-2">
		<Button type="submit">Submit</Button>
		<Button variant="secondary" type="reset">Reset</Button>
	</div>
</form>
