<script lang="ts">
	import type { LayoutServerData } from './$types';
	import type { Centerline } from '@prisma/client';

	import NavList from '$lib/components/NavList.svelte';

	export let data: LayoutServerData;

	const formatCenterline = (centerline: Centerline) => ({
		href: `/centerline/${centerline.id}`,
		name: centerline.name
	});
	$: items = data.centerlines.map(formatCenterline);
</script>

<div class="flex h-full">
	<div class="border-r shadow overflow-y-scroll">
		<NavList {items} home={{ href: '/centerline', name: 'New Centerline' }} />
	</div>
	<div class="flex-1 overflow-auto">
		<slot />
	</div>
</div>
