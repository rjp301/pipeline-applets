<script lang="ts">
	import { page } from '$app/stores';
	import type { PageData } from './$types';
	import Table from '$lib/components/Table.svelte';

	export let data: PageData;

	const data_pts_head = [
		'num',
		'x',
		'y',
		'z',
		'desc',
		'chainage',
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

<main class="p-4 flex flex-col gap-4">
	<div class="flex justify-between items-center">
		<div>
			<h2>{data.topconRun.KP_rng}</h2>
			<small>{new Date(data.topconRun.createdAt)}</small>
		</div>

		<div class="flex gap-2">
			<form method="POST" class="flex gap-4">
				<button formaction="?/deleteRun" class="btn variant-filled"> Delete </button>
			</form>
			<a href={$page.url.pathname + '/download'} download class="btn variant-filled-primary">
				Download Excel
			</a>
		</div>
	</div>

	<div>
		<span class="chip variant-filled-primary"
			>Total {Math.round(data.topconRun.total_volume)} m<sup>3</sup></span
		>
		<span class="chip variant-outline">Width Bottom {data.topconRun.width_bot} m</span>
		<span class="chip variant-outline">Ditch Slope {data.topconRun.slope}:1</span>
	</div>

	<div>
		<h3 class="mb-2">Point Data</h3>
		<Table columns={data_pts_head} data={data.topconRun.data_pts} />
	</div>

	<div>
		<h3 class="mb-2">Range Data</h3>
		<Table columns={data_rng_head} data={data.topconRun.data_rng} />
	</div>
</main>
