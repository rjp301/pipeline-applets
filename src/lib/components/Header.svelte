<script lang="ts">
	import { AppBar } from '@skeletonlabs/skeleton';
	import { page } from '$app/stores';

	import type { UserSchema } from 'lucia-auth';
	export let user: UserSchema | undefined;

	import applets from '$lib/applets.json';
	$: current_applet = applets.find((i) => $page.url.pathname.startsWith(i.href));
</script>

<AppBar class="h-16 sticky top-0 px-8">
	<svelte:fragment slot="lead">🏗️</svelte:fragment>

	<div class="flex items-center">
		<a href="/" class="mr-2"><div><strong>Pipeline Applets</strong></div></a>
		{#if current_applet}
			<div>{current_applet.name}</div>
		{/if}
	</div>

	<form method="POST" class="flex items-center gap-4" slot="trail">
		{#if user}
			<div>{user.name}</div>
			<button type="submit" formaction="/auth/logout" class="btn btn-sm variant-filled">
				Logout
			</button>
		{/if}
	</form>
</AppBar>
