<script>
	import Toast from '@components/toast.svelte';
	import { useToast } from '$lib/use-toast';
	import '../app.css';
	import { useUser } from '$lib/use-user';
	useToast();
	useUser();
</script>

<Toast />
<slot />
<nav class="flex gap-3 justify-center mt-5">
	<a href="/">Home</a>
	<a href="/profile">Edit Profile</a>
	<a href="/comments">Comments</a>
</nav>
