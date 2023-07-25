<script lang="ts">
	import '../app.postcss';

	import type { LayoutServerData } from './$types';
	export let data: LayoutServerData;
	import Header from '$lib/components/Header.svelte';
</script>

<div class="flex flex-col h-screen w-full">
	<Header user={data.user?.userData} />
	<div class="flex-1 overflow-hidden">
		<slot />
	</div>
</div>
