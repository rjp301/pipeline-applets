<form method="POST" action="?/create" enctype="multipart/form-data" class="p-4 flex flex-col gap-4">
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

	<label for="shp_line" class="label">
		<span>Line Shapefile</span>
		<input class="input" id="shp_line" name="shp_line" type="file" accept=".zip" required />
	</label>

	<label for="shp_markers" class="label">
		<span>Markers Shapefile</span>
		<div class="flex gap-4">
			<input class="input" id="shp_markers" name="shp_markers" type="file" accept=".zip" required />
			<input
				class="input"
				id="marker_value_col"
				name="marker_value_col"
				type="text"
				placeholder="Value Column"
				value="Measure"
				required
			/>
		</div>
	</label>

	<div class="flex gap-4">
		<button class="btn variant-filled-primary" type="submit">Submit</button>
		<button class="btn variant-filled-secondary" type="reset">Reset</button>
	</div>
</form>
