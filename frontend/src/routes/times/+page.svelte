<script>
	let currTimes = [{ seconds: 0, startTime: 0, endTime: 0 }];
	let showTimes = false;
	const download = function () {
		// Creating a Blob for having a csv file format
		// and passing the data with type
		const blob = new Blob([makeCSV()], { type: 'text/csv' });

		// Creating an object for downloading url
		const url = window.URL.createObjectURL(blob);

		// Creating an anchor(a) tag of HTML
		const a = document.createElement('a');

		// Passing the blob downloading url
		a.setAttribute('href', url);

		// Setting the anchor tag attribute for downloading
		// and passing the download file name
		a.setAttribute('download', 'download.csv');

		// Performing a download with click
		a.click();
	};

	const makeCSV = function () {
		const csvRows = [];

		csvRows.push('seconds, start, end');

		for (let i = 0; i < currTimes.length; i++) {
			csvRows.push(
				`${currTimes[i]['seconds']}, ${currTimes[i]['startTime'].toLocaleString()}, ${currTimes[i][
					'endTime'
				].toLocaleString()}`
			);
		}

		return csvRows.join('\n');
	};

	$: if (showTimes) {
		currTimes = JSON.parse(localStorage.getItem('times') || '[]');
	}
</script>

<!-- 
	@concept: Time Action Section
	@purpose: Holds possible actions the user can do with the provided availabilities
	@state: 
		- showTimes: boolean that determines whether or not to show the times
		- availableTimes: array of available times
	@actions:
		- toggleVisibility: toggles the visibility of the times
		- download: downloads the times as a csv file
-->
<button on:click={() => (showTimes = true)}>Show Times</button>
<button on:click={() => download()}>Download Times</button>
{#if showTimes}
	<p>{makeCSV()}</p>
{/if}
