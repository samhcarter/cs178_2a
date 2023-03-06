<script lang="ts">
	import Tab, { Label } from '@smui/tab';
	import TabBar from '@smui/tab-bar';
	import Textfield from '@smui/textfield';
	import Button from '@smui/button';
	import DraggableTable from '../components/DraggableTable/DraggableTable.svelte';
	//import active from '../../components/DraggableTable';

	// import { availability_blocks } from '../../components/DraggableTable/DraggableTable.svelte';
	// import findChunks from '../../utils/findChunks';
	import { onMount, onDestroy } from 'svelte';
	import { writable } from 'svelte/store';

	let currScreen = 0;
	let days_array = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
	let active = days_array[0];
	let name = '';
	let seconds = 0;
	let intervalRef = 0;

	// const draggable_table_array = {
	// 	'Monday':DraggableTable, 
	// 	'Tuesday':DraggableTable, 
	// 	'Wednesday':DraggableTable,
	// 	'Thursday':DraggableTable, 
	// 	'Friday':DraggableTable, 
	// 	'Saturday':DraggableTable, 
	// 	'Sunday':DraggableTable};

	// Map to store the state of the DraggableTable components keyed by the tab name
	
	// let tableState = null;
	
	// let draggableTableStateMap = new Map();

	// const stateStore = writable(draggableTableStateMap);

	// function saveDraggableTableState(tabName, draggableTableState) {
	// 	draggableTableStateMap.set(tabName, draggableTableState);
	// 	stateStore.set(draggableTableStateMap);
	// }

	// function restoreDraggableTableState(tabName) {
	// 	return draggableTableStateMap.get(tabName) || [];
	// }

	// onMount(() => {
	// 	// Retrieve the state of the DraggableTable component from the local storage
	// 	const storedState = localStorage.getItem(active);
	// 	if (storedState) {
	// 	tableState = JSON.parse(storedState);
	// 	} else {
	// 	tableState = restoreDraggableTableState(active);
	// 	}
	// });

	// onDestroy(() => {
	// 	// Save the state of the DraggableTable component to the local storage when the component is destroyed
	// 	localStorage.setItem(active, JSON.stringify(tableState));
	// });

	// function change() {
	// 	// Save the state of the current DraggableTable before switching tabs
	// 	saveDraggableTableState(active, tableState);
	// }

	$: if (currScreen > 1) {
		clearInterval(intervalRef);
		const currTimes = JSON.parse(localStorage.getItem('times') || '[]');
		console.log(currTimes);
		currTimes.push(seconds);

		localStorage.setItem('times', JSON.stringify(currTimes));

		const currNames = JSON.parse(localStorage.getItem('names') || '[]');
		console.log(currNames);
		currNames.push(name);
		localStorage.setItem('names', JSON.stringify(currNames));
	}

	// function save_times(){
	// 	localStorage.setItem(active, JSON.st ringify(DraggableTable.));
	// }

	function change() {
	// 	// Save the state of the current DraggableTable before switching tabs
	// 	saveDraggableTableState(active, tableState);

		localStorage.setItem(active, "changed")
	}

	function save_times() {
	// 	// TODO: Save time associated with day
	// 	//let times_today = 'selected times placeholder';
	// 	//localStorage.setItem(active, times_today)
	}

	function new_session() {
		currScreen = 0;
		seconds = 0;
		name = '';
	}
	//let tableState = restoreDraggableTableState(active);


	// function return_table(key){
	// 	return (
	// 		<div className="">
	// 		</div>
	// 	)
	// }

</script>

<h1>Elapsed Time: {seconds} seconds</h1>

{#if currScreen === 0}
	<div
		style="display: flex; flex-direction: column; height: 100vh; align-items: center; justify-content: center;"
	>
		<h1>What is your name?</h1>
		<form
			on:submit|preventDefault={() => {
				currScreen += 1;
				intervalRef = window.setInterval(() => {
					seconds += 1;
				}, 1000);
				localStorage.setItem("name", name)
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
			localStorage.setItem("seconds_elapsed", JSON.stringify(seconds))
		}}
		style="display: inline-flex; align-items: center; justify-content: space-between; width: 25%"
	>
		<Button touch variant="raised">
			<Label>Finish</Label>
		</Button>
	</form>

	<div class="drawer-container">
		<TabBar
			tabs={days_array}
			let:tab
			bind:active
			on:change={change}
		>
			<!-- Note: the `tab` property is required! -->
			<Tab {tab}>
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

		
		{#if 'Monday' === active}
			<h3>{active} content</h3>
			<DraggableTable/>
		{/if}

		{#if 'Tuesday' === active}
			<h3>{active} content</h3>
			<DraggableTable />
		{/if}

		{#if 'Wednesday' === active}
			<h3>{active} content</h3>
			<DraggableTable />
		{/if}

		{#if 'Thursday' === active}
			<h3>{active} content</h3>
			<DraggableTable />
		{/if}

		{#if 'Friday' === active}
			<h3>{active} content</h3>
			<DraggableTable />
		{/if}

		{#if 'Saturday' === active}
			<h3>{active} content</h3>
			<DraggableTable />
		{/if}

		{#if 'Sunday' === active}
			<h3>{active} content</h3>
			<DraggableTable />
		{/if}



		
	</div>
{/if}

{#if currScreen > 1}
	<h1>Finished! Click below to start a new session</h1>
	
	<Button on:click= {() => new_session()}>
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
	.submit_button{
		align-items: center;
		justify-content: center;
		justify-items: center;
	}
</style>