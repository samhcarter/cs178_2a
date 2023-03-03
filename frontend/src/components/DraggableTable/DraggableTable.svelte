<script>
	import Button, { Group, Label } from '@smui/button';
	import Chip, { Set as ChipSet } from '@smui/chips';
	import Textfield from '@smui/textfield';
	import TimeRow from './components/TimeRow.svelte';
	import moment from 'moment';
	import findChunks from '../../utils/findChunks';

	let availablePlaces = ['quad', 'sec', 'yard'];
	const minuteIntervals = [1, 5, 10, 15, 30, 60];
	let selectedInterval = minuteIntervals[4];
	let showIntervalModal = false;
	let currentDisplayedInterval = [0, 0];
	let currentDisplayedKey = '';
	let availability_blocks = [[0, 0]];
	let places = {};
	let mode = 'none';
	let newPlace = '';
	let times = Array(1440 / selectedInterval + 1).fill(0);
	$: if (selectedInterval) {
		times = Array(1440 / selectedInterval + 1).fill(0);
	}
	const toggleMode = () => {
		mode = mode === 'select' ? 'none' : 'select';
	};
	const onMouseEnter = (index = 0) => {
		if (mode === 'select') {
			const newTimes = [...times];
			newTimes[index] = newTimes[index] ? 0 : 1;
			times = newTimes;
		}
	};

	const getTime = (factor = 0) => {
		return moment('12:00 AM', 'hh:mm A')
			.add(factor * selectedInterval, 'minutes')
			.format('hh:mm A');
	};

	const onMouseOver = (index = 0) => {
		for (const interval of availability_blocks) {
			if (index >= interval[0] && index <= interval[1]) {
				showIntervalModal = true;
				currentDisplayedInterval = interval;
				currentDisplayedKey = `${interval[0]}-${interval[1]}`;
				return;
			}
		}
		showIntervalModal = false;
	};

	const onClickChip = (place = '') => {
		if (places.hasOwnProperty(currentDisplayedKey)) {
			if (places[currentDisplayedKey].has(place)) {
				places[currentDisplayedKey].delete(place);
				places = { ...places, [currentDisplayedKey]: places[currentDisplayedKey] };
			} else {
				places = {
					...places,
					[currentDisplayedKey]: new Set([...places[currentDisplayedKey], place])
				};
			}
		} else {
			places = { ...places, [currentDisplayedKey]: new Set([place]) };
		}
	};

	$: if (times) {
		availability_blocks = [...findChunks(times)];
	}

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

	<div class="availability-overview">
		<h2>Available from</h2>
		<p>
			{#each availability_blocks as avail}
				{getTime(avail[0])} to {getTime(avail[1] + 1)}, {' '}
			{/each}
		</p>
	</div>
	<div class="vertical-space" />
	<div class="timeContainer">
		{#if showIntervalModal}
			<div class="intervalModal">
				{#each availablePlaces as place}
					<button
						on:click={() => onClickChip(place)}
						class={`placeButton ${
							places[currentDisplayedKey]?.has(place) ? 'selected' : 'not-selected'
						}`}
					>
						{place}
					</button>
				{/each}
				<form
					on:submit|preventDefault={() => {
						availablePlaces = [...availablePlaces, newPlace];
						newPlace = '';
					}}
				>
					<Textfield variant="filled" bind:value={newPlace} label="Other" class="placeInput" />
				</form>
			</div>
		{/if}
		{#each times as time, i (`${selectedInterval}-${i}`)}
			<TimeRow
				{selectedInterval}
				{time}
				onClick={() => {
					toggleMode();
					onMouseEnter(i);
				}}
				{onMouseOver}
				{onMouseEnter}
				rowIndex={i}
				reset={() => {
					mode = 'none';
				}}
			/>
		{/each}
	</div>
</div>

<style>
	.placeInput {
		border: 1px solid black;
		border-radius: 5px;
		padding: 5px;
		margin: 5px;
		cursor: pointer;
		width: auto;
		height: 2rem;
	}
	.placeButton {
		border: 1px solid black;
		border-radius: 5px;
		padding: 5px;
		margin: 5px;
		cursor: pointer;
		width: auto;
		height: 2rem;
	}
	.selected {
		background-color: green;
	}
	.not-selected {
		background-color: lightgrey;
	}
	.intervalModal {
		position: absolute;
		top: 25%;
		right: 0;
		width: 20%;
		height: 50%;
		border: 1px solid black;
		background-color: #fff;
		display: flex;
		flex-direction: column;
		justify-content: center;
		overflow: scroll;
		padding: 10px;
	}
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
		position: relative;
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
