<script lang="ts">
	import { ChevronLeft, ChevronRight } from 'lucide-svelte';
	import { Button } from './ui/button';
	import { invalidateAll } from '$app/navigation';

	export let total: number;
	export let current: number;

	import { page } from '$app/stores';

	$: baseUrl = $page.url.pathname;
	$: current = Number($page.url.searchParams.get('page')) || 1;
	$: prevPage = Math.max(1, current - 1);
	$: nextPage = Math.min(total, current + 1);
</script>

<div
	class="flex items-center justify-between px-4 py-2 sticky bottom-0 bg-background shadow border-t"
>
	<Button href={`${baseUrl}?page=${prevPage}`} class="rounded-full h-8 w-8 p-0" variant="ghost"
		><ChevronLeft class="h-4 w-4" /></Button
	>
	<div class="text-sm text-muted-foreground select-none">Page {current} / {total}</div>
	<Button href={`${baseUrl}?page=${nextPage}`} class="rounded-full h-8 w-8 p-0" variant="ghost"
		><ChevronRight class="h-4 w-4" /></Button
	>
</div>
