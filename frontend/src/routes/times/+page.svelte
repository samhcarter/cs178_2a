<script>
	let currTimes = [''];
	let showTimes = false;
	$: if (showTimes) {
		currTimes = JSON.parse(localStorage.getItem('times') || '[]');
	}
</script>

<button on:click={() => (showTimes = true)}>Show Times</button>
<p>{currTimes}</p>
