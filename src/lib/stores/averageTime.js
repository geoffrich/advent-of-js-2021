import { writable, derived } from 'svelte/store';

let start;
let last;
let count = 0;
reset();

const _successTime = writable(start);
export const successTime = {
	..._successTime,
	reset: () => {
		reset();
		_successTime.set(start);
	}
};

export const derivedTimes = derived(successTime, ($successTime) => {
	const elapsed = $successTime - last;
	const average = ($successTime - start) / count++;
	last = $successTime;
	return { average: formatMs(isNaN(average) ? 0 : average), recent: formatMs(elapsed) };
});

function formatMs(num) {
	return (num / 1000).toFixed(2);
}

function reset() {
	start = Date.now();
	last = start;
	count = 0;
}
