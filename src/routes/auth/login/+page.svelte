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
			<CardTitle>Login</CardTitle>
			<CardDescription>Welcome back!</CardDescription>
		</CardHeader>

		<CardContent class="grid gap-2">
			<Input type="email" id="email" name="email" placeholder="Email" required />
			<Input type="password" id="password" name="password" placeholder="Password" required />
		</CardContent>

		<CardFooter class="grid gap-2">
			<Button type="submit" class="w-full">Login</Button>
			<small>Don't have an account? <a href="/auth/register" class="link">Register</a></small>
		</CardFooter>
	</form>
</Card>
