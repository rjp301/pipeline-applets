<script lang="ts">
	import Map from '$lib/components/Map.svelte';
	import type { PageData } from './$types';

	import { format } from 'timeago.js';

	export let data: PageData;

	import { Button } from '$components/ui/button';
	import { CardDescription, CardTitle } from '$components/ui/card';
</script>

<main class="p-4 grid gap-4">
	<div class="flex justify-between">
		<div>
			<CardTitle>{data.centerline.name}</CardTitle>
			<CardDescription>Created {format(data.centerline.createdAt)}</CardDescription>
		</div>

		<form method="post" class="flex gap-2 h-min">
			<Button variant="destructive" formaction="?/delete">Delete</Button>
			<Button disabled formaction="?/edit">Edit</Button>
		</form>
	</div>

	<p>{data.centerline.description}</p>

	<Map line={data.centerline.line} />
</main>
