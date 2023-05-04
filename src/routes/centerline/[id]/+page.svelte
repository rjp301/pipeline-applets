<script lang="ts">
	import Plot from '$lib/components/Plot.svelte';
	import type { PageData } from './$types';

	import { format } from 'timeago.js';

	export let data: PageData;
</script>

<main class="p-4">
	<div class="flex justify-between">
		<div>
			<h2>{data.centerline.name}</h2>
			<small>Created {format(data.centerline.createdAt)}</small>
			<p>{data.centerline.description}</p>
		</div>

		<form method="post" class="flex gap-4 h-min">
			<button class="btn variant-filled" formaction="?/delete">Delete</button>
			<button class="btn variant-filled" formaction="?/edit">Edit</button>
		</form>
	</div>

	<Plot />
</main>
