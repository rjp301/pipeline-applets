<script lang="ts">
	interface Item {
		href: string;
		name: string;
		details?: string;
		badge?: string;
	}

	export let items: Item[];
	export let home: Item | undefined = undefined;
	export let header: string | undefined = undefined;

	import { page } from '$app/stores';
	$: classesActive = (href: string) => (href === $page.url.pathname ? '!bg-primary-500' : '');
</script>

<nav class="list-nav p-2">
	{#if home}
		<a
			href={home.href}
			class={'variant-outline-primary mb-4 ' + classesActive(home.href)}
			data-sveltekit-preload-data
		>
			<span class="badge bg-primary-500">{home.badge || '+'}</span>
			<span class="flex-auto">{home.name}</span>
		</a>
	{/if}
	{#if header}
		<span class="font-bold px-2">{header}</span>
	{/if}
	<ul>
		{#each items as item}
			<li>
				<a href={item.href} class={classesActive(item.href)} data-sveltekit-preload-data>
					<span class="badge bg-primary-500">{item.badge || '→'}</span>
					<div class="flex flex-col">
						<span class="flex-auto">{item.name}</span>
						{#if item.details}
							<small>{item.details}</small>
						{/if}
					</div>
				</a>
			</li>
		{/each}
	</ul>
</nav>
