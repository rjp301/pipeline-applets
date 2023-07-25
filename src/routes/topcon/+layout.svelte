<script lang="ts">
	import type { LayoutServerData } from './$types';
	import type { TopconRun } from '@prisma/client';

	import { format } from 'timeago.js';
	import NavList from '$lib/components/NavList.svelte';
	import Pagination from '$components/Pagination.svelte';

	export let data: LayoutServerData;

	import { page } from '$app/stores';
	$: current = Number($page.url.searchParams.get('page')) || 1;

	const formatTopconRun = (run: TopconRun) => ({
		href: `/topcon/${run.id}?page=${current}`,
		name: run.KP_rng,
		details: format(run.createdAt)
	});
	$: items = data.topconRuns.runs.map(formatTopconRun);
</script>

<div class="flex h-full">
	<div class="border-r shadow overflow-y-scroll flex flex-col justify-between">
		<NavList {items} home={{ href: `/topcon?page=${current}`, name: 'New Calculation' }} />
		<Pagination total={data.topconRuns.pages} {current} />
	</div>
	<div class="flex-1 overflow-auto">
		<slot />
	</div>
</div>
