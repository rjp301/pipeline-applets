<script lang="ts">
	// The ordering of these imports is critical to your app working properly
	import '@skeletonlabs/skeleton/themes/theme-rocket.css';
	// If you have source.organizeImports set to true in VSCode, then it will auto change this ordering
	import '@skeletonlabs/skeleton/styles/all.css';
	// Most of your app wide CSS should be put in this file
	import '../app.postcss';
	import { AppBar, AppShell } from '@skeletonlabs/skeleton';

	import CenteredCard from '$lib/components/CenteredCard.svelte';

	import { page } from '$app/stores';
	import applets from '$lib/applets.json';

	$: current_applet = applets.find((i) => $page.url.pathname.startsWith(i.href));

	import type { PageData } from './$types';
	export let data: PageData;
</script>

<AppShell>
	<svelte:fragment slot="header">
		<AppBar>
			<svelte:fragment slot="lead">🏗️</svelte:fragment>
			<div class="flex gap-2 items-center">
				<strong><a href="/">Pipeline Applets</a></strong>
				{#if current_applet}
					{current_applet.name}
				{/if}
			</div>
			<form method="POST" class="flex items-center gap-4" slot="trail">
				{#if data.user}
					<div>{data.user.userData.name}</div>
					<button type="submit" formaction="/auth/logout" class="btn btn-sm variant-filled">
						Logout
					</button>
				{/if}
			</form>
		</AppBar>
	</svelte:fragment>
	<slot />
</AppShell>
