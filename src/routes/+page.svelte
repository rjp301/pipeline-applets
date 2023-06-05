<!-- YOU CAN DELETE EVERYTHING IN THIS PAGE -->
<script lang="ts">
	import CenteredCard from '$lib/components/CenteredCard.svelte';
	import NavList from '$lib/components/NavList.svelte';

	const applets = [
		{ name: 'TOPCON Volume Calculation', href: '/topcon' },
		{ name: 'Centerlines', href: '/centerline' }
	];

	import type { PageData } from './$types';
	export let data: PageData;
</script>

<CenteredCard>
	{#if !data.user}
		<div class="grid gap-2">
			<hrgoup>
				<strong class="text-lg">Login or Register</strong>
				<p>You must be logged in to use these tools</p>
			</hrgoup>
			<div class="flex gap-4">
				<a class="btn btn-sm variant-filled w-full" href="/auth/login">Login</a>
				<a class="btn btn-sm variant-filled w-full" href="/auth/register">Register</a>
			</div>
			<footer><small>Built by <a href="https://rileypaul.ca">Riley Paul</a></small></footer>
		</div>
	{:else}
		<NavList items={applets} header="Select an Applet" />
	{/if}
</CenteredCard>
