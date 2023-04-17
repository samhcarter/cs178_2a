<script lang="ts">
	import Tab, { Label } from '@smui/tab';
	import TabBar from '@smui/tab-bar';
	import Textfield from '@smui/textfield';
	import Button from '@smui/button';
	import DraggableTable from '../components/DraggableTable/DraggableTable.svelte';
	import TimezonePicker from 'svelte-timezone-picker';
	//import active from '../../components/DraggableTable';

	// import { availability_blocks } from '../../components/DraggableTable/DraggableTable.svelte';
	// import findChunks from '../../utils/findChunks';
	import { onMount, onDestroy } from 'svelte';
	import { writable } from 'svelte/store';

	// NOTE: currScreen is our way of integrating the concept of a "session".
	// There are 3 screens, which are loaded whenever currScreen changes
	// One session is a 3-step process in which one user enters their availability for the 53rd week
	let currScreen = 0;
	let days_array = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
	let active = days_array[0];
	let prevActive = days_array[0];
	let startTime = new Date();
	let endTime = new Date();
	let name = '';
	let seconds = 0;
	let intervalRef = 0;

	let timezone = 'Europe/London';

	// Way of storing data for DraggableTables
	// only keeps updating if the same session is maintained (ie currScreen != 0)
	$: if (currScreen > 1) {
		clearInterval(intervalRef);
		endTime = new Date();
		const currTimes = JSON.parse(localStorage.getItem('times') || '[]');
		currTimes.push({ seconds, startTime, endTime });
		localStorage.setItem('times', JSON.stringify(currTimes));

		const currNames = JSON.parse(localStorage.getItem('names') || '[]');
		currNames.push(name);
		localStorage.setItem('names', JSON.stringify(currNames));
	}

	function change(newValue = '') {
		// 	// Save the state of the current DraggableTable before switching tabs
		// 	saveDraggableTableState(active, tableState);

		prevActive = active;
		active = newValue;
	}

	// when new session started, local storage is reset and currScreen is set to 0
	function new_session() {
		currScreen = 0;
		seconds = 0;
		name = '';

		for (let i = 0; i < days_array.length; i++) {
			localStorage.setItem(days_array[i], '');
		}

		active = days_array[0];
		prevActive = days_array[0];
	}
</script>

<!-- Timer -->
<h1>Elapsed Time: {seconds} seconds</h1>

{#if currScreen === 0}
	<div
		style="display: flex; flex-direction: column; height: 100vh; align-items: center; justify-content: center;"
	>
		<h1>What is your name?</h1>
		<!-- 
			@concept: Name entry
			@purpose: Allows user to enter their name
			@state: name: currently entered name
			@actions:
				- changeName(newName): changes the name to the given name
		-->
		<form
			on:submit|preventDefault={() => {
				currScreen += 1;
				startTime = new Date();
				intervalRef = window.setInterval(() => {
					seconds += 1;
				}, 1000);
				localStorage.setItem('name', name);
				console.log(name);
			}}
			style="display: inline-flex; align-items: center; justify-content: space-between; width: 25%"
		>
			<Textfield variant="filled" bind:value={name} label="Name" class="nameInput" />
			<Button touch variant="raised">
				<Label>Submit</Label>
			</Button>
		</form>
	</div>
{/if}
{#if currScreen === 1}
	<form
		on:submit|preventDefault={() => {
			currScreen += 1;
			localStorage.setItem('seconds_elapsed', JSON.stringify(seconds));
		}}
		style="display: inline-flex; align-items: center; justify-content: space-between; width: 25%"
	>
		<Button touch variant="raised">
			<Label>Finish</Label>
		</Button>
	</form>
	<div class="drawer-container">
		<div style="display: inline-flex; align-items: center;">
			<h1>Timezone</h1>
			<div style="width: 10px;" />
			<!-- 
				@concept: Time zone selector
				@purpose: Allows user to select their timezone
				@state: timezone: currently selected time zone
				@actions:
					- changeTimezone(timezone): changes the timezone to the given timezone
			 -->
			<TimezonePicker {timezone} />
		</div>
		<!-- 
			@concept: Day switcher	
			@purpose: Allows the user to context switch between different days of the week
			@state: active: currently selected day
			@actions:
				- changeDay(newValue): changes the active day to the given day
		-->
		<TabBar tabs={days_array} let:tab bind:active>
			<!-- Note: the `tab` property is required! -->
			<Tab {tab} on:click={() => change(tab)}>
				<Label>{tab}</Label>
			</Tab>
		</TabBar>

		<!-- <div class="submit_button">
			<Button 
				touch
				variant="raised"
				style="width: 40%; height: 5vh; background:red; align-items: center;justify-content: center"
				
				on:click={() => save_times()}>

				<Label>Click to Save {active}'s Availability</Label>
			</Button>
		</div> -->
		<!-- 
			@concept: Availability Grid
			@purpose: Allows the user to select their availability for the given day
			@state: 
				- availableTimes[]: array of available times
			@actions:
				- addAvailability(availability): adds the given availability to the array of available times
				- removeAvailability(availability): removes the given availability from the array of available times
		-->
		<DraggableTable {active} {prevActive} />
	</div>
{/if}

{#if currScreen > 1}
	<!-- Nav bar shows user option to see "Best Times" concept page -->
	<nav>
		<a target="_blank" href="/output">R+: Show Best Time and Place For In-Person Meeting</a>
	</nav>
	<h1>Finished! Click below to start a new session</h1>

	<!-- Click starts a new session -->
	<Button on:click={() => new_session()}>
		<Label>Start New Session</Label>
	</Button>
{/if}

<style>
	.drawer-container {
		display: flex;
		flex-direction: column;
		height: 100vh;
	}
	.nameInput {
		border: 1px solid black;
		border-radius: 5px;
		padding: 5px;
		margin: 5px;
		cursor: pointer;
		width: auto;
		height: 2rem;
	}
	.submit_button {
		align-items: center;
		justify-content: center;
		justify-items: center;
	}
</style>
