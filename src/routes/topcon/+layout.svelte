<script lang="ts">
	import type { LayoutServerData } from './$types';
	import type { TopconRun } from '@prisma/client';

	import { format } from 'timeago.js';
	import NavList from '$lib/components/NavList.svelte';

	export let data: LayoutServerData;

	const formatTopconRun = (run: TopconRun) => ({
		href: `/topcon/${run.id}`,
		name: run.KP_rng,
		details: format(run.createdAt)
	});
	$: items = data.topconRuns.map(formatTopconRun);
</script>

<div class="flex h-full">
	<div class="border-r shadow overflow-y-scroll">
		<NavList {items} home={{ href: '/topcon', name: 'New Calculation' }} />
	</div>
	<div class="flex-1 overflow-auto">
		<slot />
	</div>
</div>
