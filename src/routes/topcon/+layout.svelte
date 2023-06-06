<script lang="ts">
	import type { LayoutServerData } from './$types';
	import type { TopconRun } from '@prisma/client';

	import { AppShell } from '@skeletonlabs/skeleton';
	import { format } from 'timeago.js';
	import NavList from '$lib/components/NavList.svelte';
	import Header from '$lib/components/Header.svelte';

	export let data: LayoutServerData;

	const formatTopconRun = (run: TopconRun) => ({
		href: `/topcon/${run.id}`,
		name: run.KP_rng,
		details: format(run.createdAt)
	});
	$: items = data.topconRuns.map(formatTopconRun);
</script>

<AppShell>
	<svelte:fragment slot="header">
		<Header user={data.user?.userData} />
	</svelte:fragment>
	<svelte:fragment slot="sidebarLeft">
		<NavList {items} home={{ href: '/topcon', name: 'New Calculation' }} />
	</svelte:fragment>
	<slot />
</AppShell>
