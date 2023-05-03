<script lang="ts">
	import type { PageData } from './$types';
</script>

<form
	method="POST"
	action="?/createCenterline"
	enctype="multipart/form-data"
	class="p-4 flex flex-col gap-4"
>
	<h2>Create new Centerline</h2>

	<label for="name" class="label">
		<span>Name</span>
		<input class="input" id="name" name="name" type="text" placeholder="Centerline Name" required />
	</label>

	<label for="description" class="label">
		<span>Description</span>
		<input
			class="input"
			id="description"
			name="description"
			type="text"
			placeholder="Centerline Description"
		/>
	</label>

  <label for="marker_value_col" class="label">
		<span>Marker Value Column</span>
		<input
			class="input"
			id="marker_value_col"
			name="marker_value_col"
			type="text"
			placeholder="Centerline Description"
		/>
	</label>

	<label for="shp_line" class="label">
		<span>Line Shapefile</span>
		<input class="input" id="shp_line" name="shp_line" type="file" accept=".zip" required />
	</label>

	<label for="shp_markers" class="label">
		<span>Markers Shapefile</span>
		<input class="input" id="shp_markers" name="shp_markers" type="file" accept=".zip" required />
	</label>

	<div class="flex gap-4">
		<button class="btn variant-filled-primary" type="submit">Submit</button>
		<button class="btn variant-filled-secondary" type="reset">Reset</button>
	</div>
</form>
