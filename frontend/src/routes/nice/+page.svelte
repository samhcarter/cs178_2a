<script lang="ts">
	import Tab, { Label } from '@smui/tab';
	import TabBar from '@smui/tab-bar';
	import Textfield from '@smui/textfield';
	import Button from '@smui/button';
	import DraggableTable from '../../components/DraggableTable/DraggableTable.svelte';

	let currScreen = 0;
	let active = 'Monday';
	let name = '';
	let seconds = 0;
	let intervalRef = 0;
	$: if (currScreen > 1) {
		clearInterval(intervalRef);
		const currTimes = JSON.parse(localStorage.getItem('times') || '[]');
		console.log(currTimes);
		currTimes.push(seconds);
		localStorage.setItem('times', JSON.stringify(currTimes));
	}
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
		}}
		style="display: inline-flex; align-items: center; justify-content: space-between; width: 25%"
	>
		<Button touch variant="raised">
			<Label>Finish</Label>
		</Button>
	</form>
	<div class="drawer-container">
		<TabBar
			tabs={['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']}
			let:tab
			bind:active
		>
			<!-- Note: the `tab` property is required! -->
			<Tab {tab}>
				<Label>{tab}</Label>
			</Tab>
		</TabBar>
		<DraggableTable />
	</div>
{/if}

{#if currScreen > 1}
	<h1>Finished!</h1>
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
</style>
