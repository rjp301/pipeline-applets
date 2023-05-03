<script lang="ts">
	import type { PageData } from './$types';
	export let data: PageData;
</script>

<form
	method="POST"
	action="?/performRun"
	enctype="multipart/form-data"
	class="p-4 flex flex-col gap-4"
>
	<h2>Perform New Ditch Volume Calculation</h2>
	<label for="centerline_id" class="label">
		<span>Centerline</span>
		<select id="centerline_id" name="centerline_id" class="select" required>
			{#each data.centerlines as centerline}
				<option value={centerline.id}>{centerline.name}</option>
			{/each}
		</select>
	</label>

	<label for="slope" class="label">
		<span>Slope of Ditch Sides [slope:1]</span>
		<input
			class="input"
			id="slope"
			name="slope"
			type="number"
			placeholder="Enter number"
			min="0"
			step="0.5"
			required
		/>
	</label>

	<label for="width_bot" class="label">
		<span>Width of Ditch Bottom [m]</span>
		<input
			class="input"
			id="width_bot"
			name="width_bot"
			type="number"
			placeholder="Enter number"
			min="0"
			step="0.5"
			required
		/>
	</label>

	<label for="ditch_shp" class="label">
		<span>Designed Ditch Profile [SHP]</span>
		<input class="input" id="ditch_shp" name="ditch_shp" type="file" accept=".shp" required />
		<small>3D SHP file of bottom of ditch</small>
	</label>

	<label for="ground_csv" class="label">
		<span>Surveyed Ground Profile [CSV]</span>
		<input class="input" id="ground_csv" name="ground_csv" type="file" accept=".csv" required />
		<small>Survey shots as CSV file in the format ID, X, Y, Z, DESC</small>
	</label>

	<label for="data_crs" class="label">
		<span>Data CRS [EPSG:####]</span>
		<input
			class="input"
			id="data_crs"
			name="data_crs"
			type="text"
			placeholder="Specify CRS"
			value="EPSG:26910"
			required
		/>
		<small> EPSG No. of the Coordinate Reference System used i.e. 'EPSG:26910' </small>
	</label>

	<div class="flex gap-4">
		<button class="btn variant-filled-primary" type="submit">Submit</button>
		<button class="btn variant-filled-secondary" type="reset">Reset</button>
	</div>
</form>
