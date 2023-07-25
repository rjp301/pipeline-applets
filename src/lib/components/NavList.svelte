<script lang="ts">
	interface Item {
		href: string;
		name: string;
		details?: string;
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

<nav class="p-2 grid gap-2 min-w-max">
	{#if home}
		<Button href={home.href}><Plus class="mr-2 w-4 h-4" /> {home.name}</Button>
	{/if}
	{#if header}
		<CardTitle>{header}</CardTitle>
	{/if}
	<div class="grid gap-1">
		{#each items as item}
			<Button
				variant={isActive(item.href) ? 'secondary' : 'ghost'}
				class="w-full justify-start {item.details ? 'h-12' : ''}"
				href={item.href}
			>
				<ArrowRight class="mr-2 h-4 w-4" />
				{#if item.details}
					<div>
						<div>{item.name}</div>
						<div class="text-xs font-normal text-muted-foreground">{item.details}</div>
					</div>
				{:else}
					{item.name}
				{/if}
			</Button>
		{/each}
	</div>
</nav>
