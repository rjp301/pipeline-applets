<form method="POST" class="grid gap-4">
	<hgroup>
		<strong class="text-lg">Login</strong>
		<p>Welcome back!</p>
	</hgroup>

	<input class="input" type="email" id="email" name="email" placeholder="Email" required />
	<input class="input" type="password" id="password" name="password" placeholder="Password" required />

	<button class="btn variant-filled w-full" type="submit">Login</button>
	<small>Don't have an account? <a href="/auth/register">Register</a></small>
</form>
