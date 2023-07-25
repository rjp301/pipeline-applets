<script lang="ts">
	import { page } from '$app/stores';
	import type { PageData } from './$types';
	import Table from '$lib/components/Table.svelte';
	import Map from '$lib/components/Map.svelte';
	import CardTitle from '$components/ui/card/CardTitle.svelte';
	import CardDescription from '$components/ui/card/CardDescription.svelte';
	import { Button } from '$components/ui/button';
	import { Badge } from '$components/ui/badge';

	export let data: PageData;

	const data_pts_head = [
		'num',
		'x',
		'y',
		'z',
		'desc',
		'chainage',
		'depth',
		'slope',
		'width_bot',
		'width_top',
		'area'
	];

	const data_rng_head = [
		'KP_beg',
		'KP_end',
		'area_beg',
		'area_end',
		'area_avg',
		'length',
		'volume'
	];
</script>

<main class="p-4 flex flex-col gap-4 overflow-auto w-full">
	<div class="flex justify-between flex-col lg:flex-row lg:items-center gap-4 items-start">
		<div>
			<CardTitle>{data.topconRun.KP_rng}</CardTitle>
			<CardDescription>{new Date(data.topconRun.createdAt)}</CardDescription>
		</div>

		<div class="flex gap-2">
			<form method="POST" class="flex gap-4">
				<Button formaction="?/deleteRun" variant="destructive">Delete</Button>
			</form>
			<Button href={$page.url.pathname + '/download'} download>Download Excel</Button>
		</div>
	</div>

	<div>
		<Badge>
			Total {Math.round(data.topconRun.total_volume)} m<sup>3</sup>
		</Badge>
		<Badge variant="outline">Width Bottom {data.topconRun.width_bot} m</Badge>
		<Badge variant="outline">Ditch Slope {data.topconRun.slope}:1</Badge>
	</div>

	<Table columns={data_pts_head} data={data.topconRun.data_pts} caption="Point Data" />
	<Table columns={data_rng_head} data={data.topconRun.data_rng} caption="Range Data" />
</main>
