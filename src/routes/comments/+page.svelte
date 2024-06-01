<script lang="ts">
	import Input from '@components/elements/input.svelte';
	import Card from '@components/elements/card.svelte';
	import { addComment, deleteComment, useComments } from '$lib/comment';
	import Trash from 'lucide-svelte/icons/trash-2';
	import Circle from 'lucide-svelte/icons/circle-user-round';

	const comments = useComments();
	let message: string;

	const submitComment = async () => {
		await addComment(message);
		message = '';
	};
</script>

<div class="my-5 flex items-center justify-center">
	<div class="w-3/4 max-w-3xl">
		<h1 class="my-5 mb-4 text-2xl font-bold">Comments</h1>
		{#if $comments?.length}
			{#each $comments as comment}
				<Card class="my-5">
					<p class="mb-5 flex gap-3 font-semibold">
						{#if comment.createdBy.photoURL}
							<img
								class="h-6 w-6 rounded-full"
								src={comment.createdBy.photoURL}
								alt={comment.createdBy.displayName}
							/>
						{:else}
							<Circle />
						{/if}
						{comment.createdBy.displayName} on {comment.createdAt.toDateString()} at {comment.createdAt.toLocaleTimeString()}
					</p>
					{comment.message}
					<div class="flex justify-end">
						<button type="button" on:click={() => deleteComment(comment.commentId)}>
							<Trash size="20" />
						</button>
					</div>
				</Card>
			{/each}
		{:else}
			<p class="my-5">There are no comments yet!</p>
		{/if}
		<form on:submit|preventDefault={submitComment}>
			<Input placeholder="Say something..." name="comment" bind:value={message} />
			<button
				type="submit"
				class="my-5 w-fit rounded-lg border bg-blue-600 p-3 font-semibold text-white"
			>
				Comment
			</button>
		</form>
	</div>
</div>
