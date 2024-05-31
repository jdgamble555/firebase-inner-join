<script lang="ts">
	import { useToast } from '$lib/use-toast';
	import LoginWithGoogle from '@components/login-with-google.svelte';
	import { updateUser, useUser } from '$lib/use-user';
	const user = useUser();
	const toast = useToast();
	let displayName: HTMLInputElement;
	let photoURL: HTMLInputElement;

	const updateProfile = async () => {
		const { error } = await updateUser(displayName.value, photoURL.value);
		if (error) {
			toast.error(error);
			return;
		}
		toast.open('Profile Updated!');
	};
</script>

{#if $user}
	<main class="flex flex-col items-center justify-center gap-5 mt-5">
		{#if $user.photoURL}
			<img alt={$user.displayName} src={$user.photoURL} />
		{/if}
		<form class="flex flex-col items-center gap-5" on:submit|preventDefault={updateProfile}>
			<div>
				<label
					for="display_name"
					class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
				>
					Display Name
				</label>
				<input
					bind:this={displayName}
					type="text"
					id="displayName"
					name="displayName"
					value={$user.displayName}
					class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
					required
				/>
			</div>
			<div>
				<label for="photoURL" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
					Photo URL
				</label>
				<input
					bind:this={photoURL}
					type="text"
					name="photoURL"
					id="photoURL"
					class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
					value={$user.photoURL}
					required
				/>
			</div>
			<button
				type="submit"
				class="p-3 font-semibold text-white bg-blue-600 border rounded-lg w-fit"
			>
				Update
			</button>
		</form>
	</main>
{:else}
	<LoginWithGoogle />
{/if}
