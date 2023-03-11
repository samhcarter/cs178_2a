<!-- NOTE: This entire file  is the DraggableTable concept, which is the 
backbone of our scheduling program (it is a Draggable table that records availability
for a given 24-hour day) -->

<script>
	// @ts-nocheck

	import Button, { Group, Label } from '@smui/button';
	import Chip, { Set as ChipSet } from '@smui/chips';
	import Textfield from '@smui/textfield';
	import TimeRow from './components/TimeRow.svelte';
	import moment from 'moment';
	import findChunks from '../../utils/findChunks';
	import { onDestroy, onMount } from 'svelte';

	let availablePlaces = ['quad', 'sec', 'yard'];
	const minuteIntervals = [1, 5, 10, 15, 30, 60];
	let selectedInterval = minuteIntervals[3];
	let showIntervalModal = false;
	let currentDisplayedInterval = [0, 0];
	let currentDisplayedKey = '';
	export let availability_blocks;
	// let availability_blocks = JSON.parse(localStorage.getItem('availability_blocks')) || [[0, 0]];
	$: if (times) {
		availability_blocks = [...findChunks(times)];
		// localStorage.setItem('availability_blocks', JSON.stringify(availability_blocks));
	}
	let places = {};
	let mode = 'none';
	let showAvail = false;
	let newPlace = '';
	let active = '';
	let prevActive = '';

	// Days,labels for Local Storage:
	onMount(() => {
		localStorage.setItem('Monday', []);
		localStorage.setItem('Tuesday', []);
		localStorage.setItem('Wednesday', []);
		localStorage.setItem('Thursday', []);
		localStorage.setItem('Friday', []);
		localStorage.setItem('Saturday', []);
		localStorage.setItem('Sunday', []);
	});

	onDestroy(() => {
		const all_avails = JSON.parse(localStorage.getItem('all_avails')) || {};
		// day-interval0-interval1-place
		for (let place_avail in places) {
			if (places[place_avail].size === 0) {
				for (let place of availablePlaces) {
					const key = `${place_avail}-${place}`;
					if (key in all_avails) {
						all_avails[key] += 1;
					} else {
						all_avails[key] = 1;
					}
				}
			} else {
				for (let place of places[place_avail]) {
					const key = `${place_avail}-${place}`;
					if (key in all_avails) {
						all_avails[key] += 1;
					} else {
						all_avails[key] = 1;
					}
				}
			}
		}
		console.log(all_avails);
		localStorage.setItem('all_avails', JSON.stringify(all_avails));
	});
	// onMount(async () => {
	// 	const res = await [...findChunks(times)];
	// 	availability_blocks = await res.json();

	// 	const temp = await times;
	// 	times = await times;
	// });

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
				currentDisplayedKey = `${active}-${interval[0]}-${interval[1]}`;
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

	function change_interval(interval) {
		selectedInterval = interval;
		localStorage.setItem('selected_interval', selectedInterval);
	}

	// onMount(() => {
	// 	const storedAvailability = localStorage.getItem('availability_blocks');
	// 	if (storedAvailability) {
	// 		availability_blocks = JSON.parse(storedAvailability);
	// 	}
	// });

	$: if (times) {
		availability_blocks = [...findChunks(times)];
	}

	$: if (active) {
		times = Array(1440 / selectedInterval + 1).fill(0);
		if (availability_blocks) {
			localStorage.setItem(prevActive, JSON.stringify(availability_blocks));
		}
		availability_blocks = [[0, 0]];
		const storedAvail = localStorage.getItem(active);
		if (storedAvail && prevActive !== active) {
			availability_blocks = JSON.parse(storedAvail);
			times = Array(1440 / selectedInterval + 1).fill(0);
			for (const interval of availability_blocks) {
				for (let i = interval[0]; i <= interval[1]; i++) {
					times[i] = 1;
				}
			}
		}
	}

	// function save_times(){

	// 	var available_times_JSON = availability_blocks;
	// 	localStorage.setItem("times", available_times_JSON)
	// 	availability_blocks = [[0, 0]];

	// }

	getTime();

	export { active, prevActive };
</script>

<div class="tableContainer">
	<Button
		touch
		variant="raised"
		style="width: 30%; height: 3vh"
		on:click={() => (showAvail = !showAvail)}
	>
		<Label>{!showAvail ? 'Show' : 'Hide'} Availability</Label>
	</Button>
	<div
		class="availability-overview"
		style={`display: ${showAvail ? 'flex' : 'none'}; flex-direction: column;`}
	>
		<h2>Available from</h2>
		<p>
			{#each availability_blocks as avail}
				{getTime(avail[0])} to {getTime(avail[1] + 1)}
				<br />
			{/each}
		</p>
	</div>

	<div class="vertical-space" />
	<div class="timeContainer">
		{#if showIntervalModal}
			<div class="intervalModal">
				<h2>
					{getTime(currentDisplayedInterval[0])}-{getTime(currentDisplayedInterval[1] + 1)}
				</h2>
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
					id="placeForm"
					on:submit|preventDefault={() => {
						if (newPlace) {
							availablePlaces = [...availablePlaces, newPlace];
							newPlace = '';
						}
					}}
					style="display: inline-flex; align-items: center;"
				>
					<Textfield variant="filled" bind:value={newPlace} label="Other" class="placeInput" />
					<div style="width: 5px;" />
					<Button for="placeForm" touch variant="raised" style="width: 15%; height: 3vh">
						<Label>Submit</Label>
					</Button>
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
