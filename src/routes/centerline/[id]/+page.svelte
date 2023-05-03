<script lang="ts">
	import Plot from '$lib/components/Plot.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
	const { centerline } = data;
</script>

<main class="p-4">
	<h2>{centerline.name}</h2>
	<p>{centerline.description}</p>

	<Plot />
</main>
