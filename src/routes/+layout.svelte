<script lang="ts">
	// The ordering of these imports is critical to your app working properly
	import '@skeletonlabs/skeleton/themes/theme-crimson.css';
	// If you have source.organizeImports set to true in VSCode, then it will auto change this ordering
	import '@skeletonlabs/skeleton/styles/all.css';
	// Most of your app wide CSS should be put in this file
	import '../app.postcss';
	import { AppBar, AppShell } from '@skeletonlabs/skeleton';

	import type { PageData } from './$types';
	export let data: PageData;
</script>

<AppShell>
	<svelte:fragment slot="header">
		<AppBar>
			<svelte:fragment slot="lead">🏗️</svelte:fragment>
			Pipeline Applets
			<svelte:fragment slot="trail">
				<form method="POST">
					{#if !data.user}
						<a class="btn btn-sm" href="/auth/register">Register</a>
						<a class="btn btn-sm" href="/auth/login">Login</a>
					{:else}
						<button type="submit" formaction="/auth/logout" class="btn btn-sm">Logout</button>
					{/if}
				</form>
			</svelte:fragment>
		</AppBar>
	</svelte:fragment>
	<svelte:fragment slot="sidebarLeft" />

	<slot />
</AppShell>
