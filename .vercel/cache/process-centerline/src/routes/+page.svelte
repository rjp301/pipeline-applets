<!-- YOU CAN DELETE EVERYTHING IN THIS PAGE -->
<script>
	import NavList from '$lib/components/NavList.svelte';

	let loggedIn = true;

	const applets = [
		{ name: 'TOPCON Volume Calculation', href: '/topcon' },
		{ name: 'Centerlines', href: '/centerline' }
	];
</script>

<div class="container h-full mx-auto flex justify-center items-center">
	<div class="card rounded">
		<header class="card-header text-xl font-bold">Welcome to Pipeline Applets</header>
		<section class="p-4 flex flex-col gap-2">
			{#if loggedIn}
				<NavList items={applets} header="Select an Applet" />
				<form action="POST" class="flex gap-4 w-full">
					<button on:click={() => (loggedIn = false)} class="btn btn-sm variant-outline w-full"
						>Logout</button
					>
				</form>
			{:else}
				<p>Please login or sign up to continue</p>
				<form action="POST" class="flex gap-4 w-full">
					<button
						on:click={() => (loggedIn = true)}
						class="btn btn-sm variant-filled-primary w-full">Login</button
					>
					<button
						on:click={() => (loggedIn = true)}
						class="btn btn-sm variant-filled-secondary w-full">Sign Up</button
					>
				</form>
			{/if}
		</section>
		<footer class="card-footer text-center">
			<small>Built by <a href="https://rileypaul.ca" target="_blank">Riley Paul</a></small>
		</footer>
	</div>
</div>
