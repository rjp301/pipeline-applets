<script lang="ts">
	interface Item {
		href: string;
		name: string;
		details?: string;
		badge?: string;
	}

	export let items: Item[];
	export let home: Item | undefined = undefined;
	export let header: string = '';

	import { page } from '$app/stores';
	$: classesActive = (href: string) => (href === $page.url.pathname ? '!bg-primary-500' : '');
</script>

<nav class="list-nav p-2 grid gap-2">
	{#if home}
		<a
			href={home.href}
			class={'variant-outline-primary mb-2 ' + classesActive(home.href)}
			data-sveltekit-preload-data
		>
			<span class="badge bg-primary-500">{home.badge || '+'}</span>
			<span class="flex-auto">{home.name}</span>
		</a>
	{/if}
	{#if header}
		<span class="font-bold px-2 text-lg">{header}</span>
	{/if}
	<ul>
		{#each items as item}
			<a href={item.href} class={classesActive(item.href)} data-sveltekit-preload-data>
				<li
					class="flex items-center space-x-4 rounded-md p-2 hover:bg-accent hover:text-accent-foreground"
				>
					<i class="h-5 w-5">{item.badge || '→'}</i>
					<div class="space-y-1">
						<p class="text-sm font-medium leading-none">{item.name}</p>
						{#if item.details}
							<p class="text-sm text-muted-foreground">{item.details}</p>
						{/if}
					</div>
				</li>
			</a>
		{/each}
	</ul>
</nav>
