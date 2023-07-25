<script lang="ts">
	import type { LayoutServerData } from './$types';
	import type { Centerline } from '@prisma/client';

	import AppShell from '$components/AppShell.svelte';

	import NavList from '$lib/components/NavList.svelte';
	import Header from '$lib/components/Header.svelte';

	export let data: LayoutServerData;

	const formatCenterline = (centerline: Centerline) => ({
		href: `/centerline/${centerline.id}`,
		name: centerline.name
	});
	$: items = data.centerlines.map(formatCenterline);
</script>

<AppShell>
	<svelte:fragment slot="header">
		<Header user={data.user?.userData} />
	</svelte:fragment>
	<svelte:fragment slot="sidebarLeft">
		<NavList {items} home={{ href: '/centerline', name: 'New Centerline' }} />
	</svelte:fragment>
	<slot />
</AppShell>
