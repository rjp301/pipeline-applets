<script lang="ts">
	import Plot from '$lib/components/Plot.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<main class="p-4">
	<div class="flex justify-between">
		<div>
			<h2>{data.centerline.name}</h2>
			<small>{data.centerline.description}</small>
		</div>

		<form action="?/delete" method="post">
			<button class="btn variant-filled">Delete</button>
		</form>
	</div>

	<Plot />
</main>
