<script lang="ts">
	import { page } from '$app/stores';

	import { Construction } from 'lucide-svelte';
	import type { UserSchema } from 'lucia-auth';
	export let user: UserSchema | undefined;

	import applets from '$lib/applets.json';
	import { Button } from './ui/button';
	$: current_applet = applets.find((i) => $page.url.pathname.startsWith(i.href));
</script>

<div class="h-16 sticky top-0 px-8 flex justify-between items-center border-b shadow">
	<div class="flex items-center gap-2">
		<a href="/" class="flex items-center">
			<Construction class="mr-4 h-8 w-8" />
			<span class="font-extrabold text-lg">Construction Applets</span>
		</a>
		{#if current_applet}
			<span>{current_applet.name}</span>
		{/if}
	</div>

	<form method="POST" class="flex items-center gap-4">
		{#if user}
			<div class="text-muted-foreground">{user.name}</div>
			<Button type="submit" formaction="/auth/logout">Logout</Button>
		{/if}
	</form>
</div>
