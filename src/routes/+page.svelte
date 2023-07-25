<!-- YOU CAN DELETE EVERYTHING IN THIS PAGE -->
<script lang="ts">
	import CenteredCard from '$lib/components/CenteredCard.svelte';
	import NavList from '$lib/components/NavList.svelte';
	import Header from '$lib/components/Header.svelte';
	import {
		Card,
		CardContent,
		CardDescription,
		CardFooter,
		CardHeader,
		CardTitle
	} from '$components/ui/card';

	import applets from '$lib/applets.json';

	import type { PageData } from './$types';
	import { Button } from '$components/ui/button';
	export let data: PageData;
</script>

<Header user={data.user?.userData} />

<CenteredCard>
	{#if !data.user}
		<Card>
			<CardHeader>
				<CardTitle>Login or Register</CardTitle>
				<CardDescription>You must be logged in to use these tools</CardDescription>
			</CardHeader>
			<CardContent>
				<div class="flex gap-2">
					<Button href="/auth/login" class="w-full">Login</Button>
					<Button href="/auth/register" class="w-full" variant="secondary">Register</Button>
				</div>
			</CardContent>
			<CardFooter>
				<small class="text-muted-foreground">
					Built by <a href="https://rileypaul.ca" class="link">Riley Paul</a>
				</small>
			</CardFooter>
		</Card>
	{:else}
		<Card class="p-4">
			<NavList items={applets} header="Select an Applet" />
		</Card>
	{/if}
</CenteredCard>
