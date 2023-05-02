<script lang="ts">
	import { page } from '$app/stores';
	import { AppShell, AppBar } from '@skeletonlabs/skeleton';
	import type { LayoutData } from './$types';
	export let data: LayoutData;

	$: classesActive = (href: string) => (href === $page.url.pathname ? '!bg-primary-500' : '');
</script>

<AppShell>
	<svelte:fragment slot="header">
		<AppBar>
				<h1>⛏️ TOPCON Ditch Volume Calculation</h1>
		</AppBar>
	</svelte:fragment>
	<svelte:fragment slot="sidebarLeft">
		<nav class="list-nav p-2">
			<a href="/topcon" class={'variant-outline-primary mb-4 ' + classesActive('/topcon')}>
				<span class="badge bg-primary-500">+</span>
				<span class="flex-auto">New Calculation</span></a
			>
			<span class="font-bold px-2">Previous Calculations</span>
			<ul>
				{#each data.topconRuns as run}
					<li>
						<a href={`/topcon/${run.id}`} class={classesActive(`/topcon/${run.id}`)}>
							<span class="badge bg-primary-500">→</span>
							<span class="flex-auto">{run.KP_rng}</span>
						</a>
					</li>
				{/each}
			</ul>
		</nav>
	</svelte:fragment>
	<slot />
</AppShell>
