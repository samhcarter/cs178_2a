<script>
	import Button, { Group, Label } from '@smui/button';
	const minuteIntervals = [1, 5, 10, 15, 30, 60];
	let selectedInterval = minuteIntervals[4];
</script>

<div class="tableContainer">
	<h1 class="tableTitle">DraggableTable</h1>
	<Group>
		{#each minuteIntervals as interval}
			<Button
				variant="raised"
				color={selectedInterval === interval ? 'primary' : 'secondary'}
				on:click={() => (selectedInterval = interval)}><Label>{interval}</Label></Button
			>
		{/each}
	</Group>
	<table>
		<tr>
			<th />
			<th />
		</tr>
	</table>
</div>

<style>
	.tableContainer {
		display: flex;
		flex-direction: column;
		align-items: center;
		height: 75vh;
		background-color: black;
		margin: 10vw;
	}
	.tableTitle {
		color: white;
		font-size: 2rem;
	}
</style>
