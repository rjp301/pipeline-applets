<script lang="ts">
	import Plot from '$lib/components/Plot.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
	const { centerline } = data;
</script>

<main class="p-4">
	<div class="flex justify-between items-center">
		<div>
			<h2>{centerline.name}</h2>
			<small>{centerline.description}</small>
		</div>

		<form action="?/delete" method="post">
			<button class="btn variant-filled">Delete</button>
		</form>
	</div>

	<Plot />
</main>
