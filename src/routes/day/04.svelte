<script>
	import { successTime, derivedTimes } from '$lib/stores/averageTime';
	import reducedMotion from '$lib/stores/reducedMotion';
	import { onMount } from 'svelte';
	import { ConfettiExplosion } from 'svelte-confetti-explosion';

	const keys = [
		['`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'DEL'],
		['TAB', 'Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', '[', ']', '\\'],
		['CAPS', 'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', ';', "'", 'ENTER'],
		['SHIFT', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', ',', '.', '/', 'SHIFT']
	];
	const totalKeys = new Set(keys.flat()).size;

	let randomRow = -1;
	let randomCol = -1;
	let lastKey = '';
	let selectedKey;
	let finished = false;

	onMount(() => {
		selectRandomKey();
	});

	let visitedKeys = new Set();

	function selectRandomKey() {
		if (visitedKeys.size === totalKeys) {
			finished = true;
			randomRow = -1;
			randomCol = -1;
			return;
		}
		do {
			randomRow = randomIndex(keys);
			randomCol = randomIndex(keys[randomRow]);
			selectedKey = keys[randomRow][randomCol];
		} while (visitedKeys.has(selectedKey));
	}

	function randomIndex(arr) {
		return Math.floor(Math.random() * arr.length);
	}

	function handleKeyDown(e) {
		if (!finished) {
			const pressedKey = getNormalizedKey(e.key);
			if (pressedKey === selectedKey.toLowerCase()) {
				$successTime = Date.now();
				visitedKeys.add(selectedKey);
				visitedKeys = visitedKeys;
				selectRandomKey();
			}
		}
		lastKey = e.key;
	}

	function getNormalizedKey(key) {
		switch (key) {
			case 'CapsLock':
				return 'caps';
			case 'Delete':
				return 'del';
			default:
				return key.toLowerCase();
		}
	}

	function restart() {
		successTime.reset();
		finished = false;
		visitedKeys.clear();
		visitedKeys = visitedKeys;
		selectRandomKey();
	}
</script>

<svelte:window on:keydown={handleKeyDown} />

<div class="root">
	<div class="lastPressed">
		<div>You pressed: {lastKey}</div>
		<div>Speed: {$derivedTimes.recent}s</div>
		<div>Average: {$derivedTimes.average}s</div>
		{#if finished}
			{#if !$reducedMotion}
				<ConfettiExplosion />
			{/if}
			<div>Congratulations! <button on:click={restart}>Play again?</button></div>
		{/if}
	</div>
	<div class="keyboard">
		{#each keys as row, rowIndex}
			<div class="row">
				{#each row as key, colIndex}
					<div
						class="key"
						class:jiggle={rowIndex === randomRow && colIndex === randomCol}
						class:pressed={visitedKeys.has(key)}
						data-key={key}
					>
						{key}
					</div>
				{/each}
			</div>
		{/each}
	</div>
</div>

<svelte:head>
	<title>Day 4</title>
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
	<link
		href="https://fonts.googleapis.com/css2?family=Inter:wght@700&display=swap"
		rel="stylesheet"
	/>
</svelte:head>

<style>
	.root {
		height: 100%;
		font-family: 'Inter';
		font-weight: 700;
		display: grid;
		grid-template-rows: auto 1fr;
		place-items: center;
		font-size: 1.5rem;
	}

	.lastPressed {
		padding: 1rem;
		text-align: center;
	}

	.keyboard {
		background-color: #f6f6f6;
		padding: 44px 40px;
		border-radius: 40px;
	}

	.row {
		display: flex;
		gap: 0.75rem;
	}

	.row:not(:last-child) {
		margin-bottom: 0.75rem;
	}

	.key {
		color: #60c1b6;
		background-color: white;
		height: 4rem;
		min-width: 4rem;
		box-shadow: 0px 1px 8px rgba(0, 0, 0, 0.05);
		border-radius: 16px;
		display: grid;
		place-items: center;
		padding: 18px 24px;
	}

	.key.pressed {
		border: 2px solid #868888;
	}

	.key:hover {
		background-color: #ffd200;
		color: black;
	}

	[data-key='DEL'],
	[data-key='TAB'],
	[data-key='CAPS'],
	[data-key='ENTER'],
	[data-key='SHIFT'] {
		color: #868888;
		flex: auto;
	}

	.jiggle {
		animation: jiggle 1s;
		animation-iteration-count: infinite;
		background: #60c1b6;
		color: white;
	}

	@media (prefers-reduced-motion: reduce) {
		.jiggle {
			animation: none;
		}
	}

	@keyframes jiggle {
		0% {
			transform: translate(1px, 1px) rotate(0deg);
		}
		10% {
			transform: translate(-1px, -2px) rotate(-1deg);
		}
		20% {
			transform: translate(-3px, 0px) rotate(1deg);
		}
		30% {
			transform: translate(3px, 2px) rotate(0deg);
		}
		40% {
			transform: translate(1px, -1px) rotate(1deg);
		}
		50% {
			transform: translate(-1px, 2px) rotate(-1deg);
		}
		60% {
			transform: translate(-3px, 1px) rotate(0deg);
		}
		70% {
			transform: translate(3px, 1px) rotate(-1deg);
		}
		80% {
			transform: translate(-1px, -1px) rotate(1deg);
		}
		90% {
			transform: translate(1px, 2px) rotate(0deg);
		}
		100% {
			transform: translate(1px, -2px) rotate(-1deg);
		}
	}
</style>
