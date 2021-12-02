<script>
	import Gear from '$lib/icons/Gear.svelte';
	import Check from '$lib/icons/Check.svelte';

	const DEFAULT_SECONDS = 5;
	let startSeconds = DEFAULT_SECONDS;
	let currentSeconds = startSeconds;
	let interval;
	let isCounting = false;
	let editing = false;

	$: minutes = Math.floor(currentSeconds / 60);
	$: seconds = currentSeconds - minutes * 60;

	let inputMinutes;
	let inputSeconds;

	function toggleTimer() {
		isCounting ? stopTimer() : startTimer();
	}

	function stopTimer() {
		clearInterval(interval);
		isCounting = false;
	}

	function startTimer() {
		interval = setInterval(() => {
			if (currentSeconds > 0) {
				currentSeconds -= 1;
			} else {
				stopTimer();
				currentSeconds = startSeconds;
				alert('Done!');
			}
		}, 1000);
		isCounting = true;
	}

	function editTime() {
		stopTimer();
		if (editing) {
			editing = false;
			startSeconds = Number(inputMinutes) * 60 + Number(inputSeconds);
			if (!startSeconds || startSeconds < 0) {
				startSeconds = DEFAULT_SECONDS;
			}
			currentSeconds = startSeconds;
		} else {
			editing = true;
			inputMinutes = minutes;
			inputSeconds = seconds.toString().padStart(2, '0');
		}
	}
</script>

<div class="root">
	<div class="timer" class:started={isCounting}>
		<div class="time" class:editing>
			{#if editing}
				<input
					class="minutes"
					maxlength="2"
					aria-label="minutes"
					bind:value={inputMinutes}
				/>:<input maxlength="2" aria-label="seconds" bind:value={inputSeconds} />
			{:else}
				{minutes}:{seconds.toString().padStart(2, '0')}
			{/if}
		</div>
		{#if !editing}
			<button class="start" on:click={toggleTimer}>{isCounting ? 'Stop' : 'Start'}</button>
		{/if}
		<button class="settings" on:click={editTime}>
			{#if editing}
				<Check />
			{:else}
				<Gear />
			{/if}
			<span class="visually-hidden">Settings</span>
		</button>
	</div>
</div>

<svelte:head>
	<title>Day 1</title>
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
	<link
		href="https://fonts.googleapis.com/css2?family=Montserrat:wght@700&display=swap"
		rel="stylesheet"
	/>
</svelte:head>

<style>
	@font-face {
		font-family: 'Bebas Neue';
		src: url('/fonts/bebasneue-book-webfont.woff2') format('woff2'),
			url('/fonts/bebasneue-book-webfont.woff') format('woff');
	}

	.root {
		--color-background: #2b2a30;
		--color-red: #9d0000;
		--color-green: #00aa51;
		--font-timer: 'Bebas Neue';
		--font-button: 'Montserrat';

		height: 100%;
		display: grid;
		place-items: center;
		background-color: var(--color-background);
	}

	.timer {
		width: 500px;
		height: 500px;
		background: radial-gradient(71.4% 71.4% at 51.7% 28.6%, #3a393f 0%, #17171a 100%);
		box-shadow: inset 0px 0px 114px rgba(0, 0, 0, 0.45);
		border-radius: 50%;
		border-bottom-color: green;
		display: flex;
		flex-direction: column;
		align-items: center;
		position: relative;
		--border-color: var(--color-red);
	}

	.timer.started {
		--border-color: var(--color-green);
	}

	.timer::after {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		border-radius: 50%;
		border: 10px solid var(--border-color);
		border-bottom-color: black;
		transform: rotate(-45deg);
		pointer-events: none;
	}

	input {
		width: 2ch;
		background: transparent;
		border: none;
		color: inherit;
		border-bottom: 2px dotted white;
	}

	input.minutes {
		text-align: right;
	}

	.time {
		font-family: var(--font-timer);
		color: white;
		font-size: 196px;
		margin-top: 152px;
		line-height: 1;
	}

	button {
		all: unset;
		cursor: revert;
	}

	button:focus {
		outline: 2px solid white;
	}

	button:focus:not(:focus-visible) {
		outline: none;
	}

	button.start {
		font-family: var(--font-button);
		font-size: 16px;
		letter-spacing: 0.6em;
		text-transform: uppercase;
		color: white;
		text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
		margin-top: 1.5rem;
		text-align: center;
		transform: translateX(0.5em);
	}

	button.start:hover {
		filter: brightness(0.7);
	}

	button.settings {
		color: #585858;
		margin-top: 1.5rem;
	}

	button.settings:hover {
		filter: brightness(1.5);
	}
</style>
