<script lang="ts">
	import type { LayoutData } from './$types';
	import type { TopconRun } from '@prisma/client';

	import { format } from 'timeago.js';
	import NavList from '$lib/components/NavList.svelte';

	export let data: LayoutData;

	const formatTopconRun = (run: TopconRun) => ({
		href: `/topcon/${run.id}`,
		name: run.KP_rng,
		details: format(run.createdAt)
	});
	$: items = data.topconRuns.map(formatTopconRun);
</script>

<div class="flex">
	<div class="overflow-x-scroll h-full">
		<NavList {items} home={{ href: '/topcon', name: 'New Calculation' }} />
	</div>
	<slot />
</div>
