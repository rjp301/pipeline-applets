<script lang="ts">
	import { Button } from '$components/ui/button';
	import {
		Card,
		CardContent,
		CardDescription,
		CardFooter,
		CardHeader,
		CardTitle
	} from '$components/ui/card';
	import { Input } from '$components/ui/input';
</script>

<Card>
	<form method="POST">
		<CardHeader>
			<CardTitle>Register</CardTitle>
			<CardDescription>You will need an account to use these tools</CardDescription>
		</CardHeader>

		<CardContent class="grid gap-2">
			<Input type="text" id="name" name="name" placeholder="Name" required />
			<Input type="email" id="email" name="email" placeholder="Email" required />
			<Input type="text" id="company" name="company" placeholder="Company" required />
			<Input type="password" id="password" name="password" placeholder="Password" required />
		</CardContent>

		<CardFooter class="grid gap-2">
			<Button class="w-full" type="submit">Register</Button>
			<small>Already have an account? <a href="/auth/login" class="link">Login</a></small>
		</CardFooter>
	</form>
</Card>
