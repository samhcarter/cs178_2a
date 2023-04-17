<script>
	import moment from 'moment';
	import { onMount } from 'svelte';

	let all_avails = {};
	let clean_avails = [];
	let showValidMeetings = false;
	const getTime = (factor = 0) => {
		return moment('12:00 AM', 'hh:mm A')
			.add(factor * 15, 'minutes')
			.format('hh:mm A');
	};

	function makeReadable(avail = '', count = 1) {
		const [day, startInterval, endInterval, place] = avail.split('-');
		if (place) {
			return `Day: ${day}, Start: ${getTime(parseInt(startInterval, 10))}, End: ${getTime(
				parseInt(endInterval, 10)
			)}, Place: ${place}, Count: ${count || all_avails[avail]}`;
		} else {
			return '';
		}
	}

	function makeAvailsClean(slotNum = 1) {
		const fatty = {};
		for (let avail in all_avails) {
			const [day, startInterval, endInterval, place] = avail.split('-');
			if (place) {
				const count = all_avails[avail];
				for (let i = parseInt(startInterval, 10); i <= parseInt(endInterval, 10); i += slotNum) {
					const key = `${day}-${i}-${i + slotNum}-${place}`;
					if (key in fatty) {
						fatty[key] += count;
					} else {
						fatty[key] = count;
					}
				}
			}
		}
		clean_avails = Object.keys(fatty).map(function (key) {
			return [key, fatty[key]];
		});
		clean_avails.sort(function (first, second) {
			return second[1] - first[1];
		});
	}

	onMount(() => {
		all_avails = JSON.parse(localStorage.getItem('all_avails') || '') || {};
		makeAvailsClean();
	});

	$: if (showValidMeetings) {
		makeAvailsClean(2);
	}
</script>

<!-- 
	@concept: Preferred Times List
	@purpose: Show best times given all availabilities
	@state: 
		- showValidMeetings: boolean that determines whether or not to show only 30 minute slots
		- best_avails: array of available times
	@actions:
		- toggleVisibility: toggles the visibility of the times			
-->
<button on:click|preventDefault={() => (showValidMeetings = !showValidMeetings)}
	>{showValidMeetings ? 'Show All 15 Minute Slots' : 'Show Only 30 Minute Slots'}</button
>
{#each clean_avails as avail}
	<div>{makeReadable(avail[0], avail[1])}</div>
{/each}
