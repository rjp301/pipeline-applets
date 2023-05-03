<script lang="ts">
	import type { LayoutData } from './$types';
	import type { Centerline } from '@prisma/client';

	import { AppShell, AppBar } from '@skeletonlabs/skeleton';
	import { format } from 'timeago.js';
	import NavList from '$lib/components/NavList.svelte';

	export let data: LayoutData;

	const formatCenterline = (centerline: Centerline) => ({
		href: `/centerline/${centerline.id}`,
		name: centerline.name,
		details: format(centerline.createdAt)
	});
	$: items = data.centerlines.map(formatCenterline);
</script>

<AppShell>
	<svelte:fragment slot="header">
		<AppBar>
			<h1>📈 Centerlines</h1>
		</AppBar>
	</svelte:fragment>
	<svelte:fragment slot="sidebarLeft">
		<NavList {items} home={{ href: '/centerline', name: 'New Centerline' }} />
	</svelte:fragment>
	<slot />
</AppShell>
