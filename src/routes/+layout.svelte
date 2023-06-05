<script lang="ts">
	// The ordering of these imports is critical to your app working properly
	import '@skeletonlabs/skeleton/themes/theme-crimson.css';
	// If you have source.organizeImports set to true in VSCode, then it will auto change this ordering
	import '@skeletonlabs/skeleton/styles/all.css';
	// Most of your app wide CSS should be put in this file
	import '../app.postcss';
	import { AppBar, AppShell } from '@skeletonlabs/skeleton';

	import { page } from '$app/stores';
	import applets from '$lib/applets.json';

	$: current_applet = applets.find((i) => $page.url.pathname.startsWith(i.href));

	import type { PageData } from './$types';
	export let data: PageData;
</script>

<AppBar class="h-16 sticky top-0">
	<svelte:fragment slot="lead">🏗️</svelte:fragment>

	<a href="/" class="mr-2"><strong>Pipeline Applets</strong></a>
	{#if current_applet}
		{current_applet.name}
	{/if}

	<form method="POST" class="flex items-center gap-4" slot="trail">
		{#if data.user}
			<div>{data.user.userData.name}</div>
			<button type="submit" formaction="/auth/logout" class="btn btn-sm variant-filled">
				Logout
			</button>
		{/if}
	</form>
</AppBar>

<div class="h-[calc(100vh-4rem)]">
	<slot />
</div>
