<script lang="ts">
	import type { LayoutData } from './$types';
	import type { TopconRun } from '@prisma/client';

	import { AppShell, AppBar } from '@skeletonlabs/skeleton';
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

<AppShell>
	<svelte:fragment slot="header">
		<AppBar>
			<a href="/">
				<h1>⛏️ TOPCON Ditch Volume Calculation</h1>
			</a>
		</AppBar>
	</svelte:fragment>
	<svelte:fragment slot="sidebarLeft">
		<NavList {items} home={{ href: '/topcon', name: 'New Calculation' }} />
	</svelte:fragment>
	<slot />
</AppShell>
