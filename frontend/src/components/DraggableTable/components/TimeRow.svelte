<script>
	export let time = '00:00';
</script>

<div class="timeRow">
	<td class="timeCell">{time}</td>
	<td class="timeBlockCell" />
</div>

<style>
	.timeRow {
		display: flex;
		flex: 1;
		flex-direction: inline-flex;
		width: 50%;
		height: auto;
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
		background-color: red;
		display: flex;
		flex: 2;
		border: 1px solid black;
	}
	.timeRow:last-of-type > .timeBlockCell {
		border: none;
		background-color: transparent;
	}
</style>
