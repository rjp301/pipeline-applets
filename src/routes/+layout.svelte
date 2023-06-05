<script lang="ts">
	// The ordering of these imports is critical to your app working properly
	import '@skeletonlabs/skeleton/themes/theme-crimson.css';
	// If you have source.organizeImports set to true in VSCode, then it will auto change this ordering
	import '@skeletonlabs/skeleton/styles/all.css';
	// Most of your app wide CSS should be put in this file
	import '../app.postcss';
	import { AppBar, AppShell } from '@skeletonlabs/skeleton';

	const applets = [
		{ name: 'TOPCON Volume Calculation', href: '/topcon' },
		{ name: 'Centerlines', href: '/centerline' }
	];

	import CenteredCard from '$lib/components/CenteredCard.svelte';
	import type { PageData } from './$types';
	export let data: PageData;
</script>

<AppShell>
	<svelte:fragment slot="header">
		<AppBar>
			<svelte:fragment slot="lead">🏗️</svelte:fragment>
			<strong><a href="/">Pipeline Applets</a></strong>
			<svelte:fragment slot="trail">
				<form method="POST" class="flex items-center gap-4">
					{#if data.user}
						<div>{data.user.userData.name}</div>
						<button type="submit" formaction="/auth/logout" class="btn btn-sm variant-filled">
							Logout
						</button>
					{/if}
				</form>
			</svelte:fragment>
		</AppBar>
	</svelte:fragment>
	<svelte:fragment slot="sidebarLeft" />

	<slot />
</AppShell>
