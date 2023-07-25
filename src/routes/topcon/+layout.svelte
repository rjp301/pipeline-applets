<script lang="ts">
	import type { LayoutServerData } from './$types';
	import type { TopconRun } from '@prisma/client';

	import { format } from 'timeago.js';
	import NavList from '$lib/components/NavList.svelte';
	import Pagination from '$components/Pagination.svelte';

	export let data: LayoutServerData;

	import { page } from '$app/stores';

	const formatTopconRun = (run: TopconRun, page: number) => ({
		href: `/topcon/${run.id}?page=${page}`,
		name: run.KP_rng,
		details: format(run.createdAt)
	});

	$: current = Number($page.url.searchParams.get('page')) || 1;
	$: items = data.topconRuns.runs.map((run: TopconRun) => formatTopconRun(run, current));
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
