// Function to find ranges of 1s in an array
export default function findChunks(arr = [0]) {
	let chunks = [];
	let chunk = [];
	for (let i = 0; i < arr.length; i++) {
		if (arr[i] === 1) {
			chunk.push(i);
		} else {
			if (chunk.length > 0) {
				chunks.push(chunk);
				chunk = [];
			}
		}
	}
	if (chunk.length > 0) {
		chunks.push(chunk);
	}

	return chunks.map((chunk) => [chunk[0], chunk[chunk.length - 1]]);
}
