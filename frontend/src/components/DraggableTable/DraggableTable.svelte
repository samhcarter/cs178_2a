<script>
	import Button, { Group, Label } from '@smui/button';
	import TimeRow from './components/TimeRow.svelte';
	import moment from 'moment';

	const minuteIntervals = [1, 5, 10, 15, 30, 60];
	let selectedInterval = minuteIntervals[4];
	let times = Array(1440 / selectedInterval + 1).fill(0);
	let namedTimes = times.map((_, i) =>
		moment('12:00 AM', 'hh:mm A')
			.add(i * selectedInterval, 'minutes')
			.format('hh:mm A')
	);
	$: if (selectedInterval) {
		times = Array(1440 / selectedInterval + 1).fill(0);
		namedTimes = times.map((_, i) =>
			moment('12:00 AM', 'hh:mm A')
				.add(i * selectedInterval, 'minutes')
				.format('hh:mm A')
		);
	}
	const getTime = (factor = 0) => {
		return moment('12:00 AM', 'hh:mm A')
			.add(factor * selectedInterval, 'minutes')
			.format('hh:mm A');
	};
	getTime();
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
	<div class="vertical-space" />
	<div class="timeContainer">
		{#each namedTimes as time}
			<TimeRow {time} />
		{/each}
	</div>
</div>

<style>
	.vertical-space {
		min-height: 20px;
		flex-shrink: 0;
	}
	.tableContainer {
		display: flex;
		flex-direction: column;
		align-items: center;
		height: 90vh;
		margin: 10vw;
	}
	.tableTitle {
		color: white;
		font-size: 2rem;
	}
	.timeContainer {
		display: flex;
		flex-direction: column;
		align-items: center;
		height: 100%;
		width: 100%;
		overflow: scroll;
		padding-top: 2vh;
		padding-bottom: 2vh;
		border: 1px solid black;
	}
</style>
