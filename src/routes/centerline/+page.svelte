<script lang="ts">
	import { Input } from "$components/ui/input";
	import { Label } from "$components/ui/label";
	import { Button } from "$components/ui/button";
</script>

<form method="POST" action="?/create" enctype="multipart/form-data" class="p-4 max-w-xl grid gap-4">
	<div class="grid gap-2">
		<Label for="name">
			Name
		</Label>
		<Input  id="name" name="name" type="text" placeholder="Centerline Name" required />
	</div>

	
	<div class="grid gap-2">
		<Label for="description">
		Description</Label>
			<Input
		
				id="description"
				name="description"
				type="text"
				placeholder="Centerline Description"
			/>
	</div>

	<div class="grid gap-2">
		<Label for="shp_line">
		Line Shapefile
		</Label>
			<Input  id="shp_line" name="shp_line" type="file" accept=".zip" required />
	</div>

	<div class="grid gap-2">
		<Label for="shp_markers">
			<span>Markers Shapefile</span>
		</Label>
			<div class="flex gap-2">
				<Input  id="shp_markers" name="shp_markers" type="file" accept=".zip" required />
				<Input
		
					id="marker_value_col"
					name="marker_value_col"
					type="text"
					placeholder="Value Column"
					value="Measure"
					required
				/>
			</div>
	</div>

	<div class="flex gap-2">
		<Button  type="submit">Submit</Button>
		<Button  type="reset" variant="secondary">Reset</Button>
	</div>
</form>
