<script>
	import moment from 'moment';

	export let selectedInterval = 0;
	export let rowIndex = 0;
	let namedTime = moment('12:00 AM', 'hh:mm A')
		.add(rowIndex * selectedInterval, 'minutes')
		.format('hh:mm A');
	export let time = 0;
	export let onClick = () => {};
	export let onMouseOver = (index = 0) => {};
	export let reset = () => {};
</script>

<div class="timeRow">
	<div class="timeCell">{namedTime}</div>
	<div
		class="timeBlockCell {time ? 'available' : 'not-available'}"
		on:mousedown={onClick}
		on:mouseenter={() => onMouseOver(rowIndex)}
		on:mouseup={reset}
	/>
</div>

<style>
	.timeRow {
		display: flex;
		flex: 1;
		flex-direction: inline-flex;
		width: 50%;
		height: auto;
		-webkit-user-select: none; /* Safari */
		-ms-user-select: none; /* IE 10 and IE 11 */
		user-select: none; /* Standard syntax */
	}
	.timeCell {
		background-color: transparent;
		display: flex;
		flex-shrink: 0;
		justify-content: end;
		padding-right: 10px;
		position: relative;
		bottom: 50%;
	}
	.timeBlockCell {
		display: flex;
		flex: 2;
		border: 1px solid black;
	}
	.available {
		background-color: green;
	}
	.not-available {
		background-color: red;
	}
	.timeRow:last-of-type > .timeBlockCell {
		border: none;
		background-color: transparent;
	}
</style>
