<script lang="ts">
	import Map from '$lib/components/Map.svelte';
	import type { PageData } from './$types';

	import { format } from 'timeago.js';

	export let data: PageData;
</script>

<main class="p-4 grid gap-4">
	<div class="flex justify-between">
		<div>
			<h2>{data.centerline.name}</h2>
			<small>Created {format(data.centerline.createdAt)}</small>
		</div>

		<form method="post" class="flex gap-4 h-min">
			<button class="btn variant-filled" formaction="?/delete">Delete</button>
			<button class="btn variant-filled" disabled formaction="?/edit">Edit</button>
		</form>
	</div>
	<p>{data.centerline.description}</p>

	<Map line={data.centerline.line}/>
</main>
