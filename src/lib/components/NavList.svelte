<script lang="ts">
	interface Item {
		href: string;
		name: string;
	}

	export let items: Item[];
	export let home: Item | undefined = undefined;
	export let header: string = '';

	import { Button } from '$components/ui/button';
	import { CardTitle } from './ui/card';

	import { ArrowRight } from 'lucide-svelte';

	import { page } from '$app/stores';
	import { Plus } from 'lucide-svelte';
	$: isActive = (href: string) => href === $page.url.pathname;
</script>

<nav class="list-nav p-2 grid gap-2">
	{#if home}
		<Button href={home.href}><Plus class="mr-2 w-4 h-4" /> {home.name}</Button>
	{/if}
	{#if header}
		<CardTitle>{header}</CardTitle>
	{/if}
	<div class="grid gap-1">
		{#each items as item}
			<Button
				variant={isActive(item.href) ? 'outline' : 'ghost'}
				class="w-full justify-start"
				href={item.href}
			>
				<ArrowRight class="mr-2 h-4 w-4" />
				{item.name}
			</Button>
		{/each}
	</div>
</nav>
