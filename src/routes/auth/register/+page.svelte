<form method="POST" class="max-w-lg">
	<hgroup>
		<h2>Register</h2>
		<h3>To post articles, you'll need an account.</h3>
	</hgroup>

	
	<label class="label" for="name">Name</label>
	<input class="input" type="text" id="name" name="name" placeholder="Name" required />

	<label class="label" for="email">Email</label>
	<input class="input" type="email" id="email" name="email" placeholder="Email" required />

	<label class="label" for="company">Company</label>
	<input class="input" type="text" id="company" name="company" placeholder="Company" required />

	<label class="label" for="password">Password</label>
	<input class="input" type="password" id="password" name="password" placeholder="Password" required />

	<button class="btn w-full variant-filled" type="submit">Register</button>
</form>
<p>Already have an account? <a href="/auth/login">Login</a></p>
