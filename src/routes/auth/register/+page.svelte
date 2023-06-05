<form method="POST" class="grid gap-4">
	<hgroup>
		<strong class="text-lg">Register</strong>
		<p>You will need an account to use these tools</p>
	</hgroup>

	<input class="input" type="text" id="name" name="name" placeholder="Name" required />
	<input class="input" type="email" id="email" name="email" placeholder="Email" required />
	<input class="input" type="text" id="company" name="company" placeholder="Company" required />
	<input
		class="input"
		type="password"
		id="password"
		name="password"
		placeholder="Password"
		required
	/>

	<button class="btn w-full variant-filled" type="submit">Register</button>
	<small>Already have an account? <a href="/auth/login">Login</a></small>
</form>
