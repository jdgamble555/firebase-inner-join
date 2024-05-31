<script lang="ts">
	import Input from '@components/elements/input.svelte';
	import Card from '@components/elements/card.svelte';
</script>

<div class="my-5 flex items-center justify-center">
	<div class="max-w-3xl">
		<Card>
			<h1 class="mb-4 text-3xl font-bold">Titulus Articuli</h1>
			Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur bibendum orci nec massa dictum,
			sed vehicula nunc convallis. Fusce ac semper augue. Suspendisse potenti. Vivamus vitae purus at
			arcu gravida ultricies. Ut non urna vitae risus luctus vulputate. Morbi a vestibulum nulla. Nulla
			facilisi. Proin sed metus sit amet velit vehicula tristique. Sed ut leo eget nisl fermentum consequat.
			Nunc volutpat lorem et justo facilisis, a vehicula sapien fermentum. Sed auctor, dolor at volutpat
			vulputate, elit nisl ultricies ligula, at vehicula libero ex id urna. Phasellus ut orci sit amet
			libero porttitor interdum ac a elit. Vestibulum ac ligula non libero sodales dictum. Cras ut sapien
			nec libero convallis efficitur. Loading...
		</Card>

		<h1 class="my-5 mb-4 text-2xl font-bold">Comments</h1>
		<Card class="my-5"></Card>
		<Input placeholder="Say something..." name="comment" />
		<button type="submit" class="my-5 w-fit rounded-lg border bg-blue-600 p-3 font-semibold text-white">
			Comment
		</button>
	</div>
</div>
