<script context="module">
	export async function load({ fetch }) {
		const randomArticles = await fetch(
			'https://en.wikipedia.org/w/api.php?action=query&format=json&list=random&rnnamespace=0&rnlimit=6'
		).then((r) => r.json());
		const titles = randomArticles.query.random.map((x) => x.title);
		return {
			props: {
				episodes: titles
			}
		};
	}
</script>

<script>
	export let episodes = [];

	let selected = [];
	let lastSelected = -1;

	/** @param e {MouseEvent} */
	function handleClick(e, selectedIndex) {
		if (e.shiftKey && lastSelected !== -1) {
			if (lastSelected < selectedIndex) {
				for (let i = lastSelected; i <= selectedIndex; i++) {
					selected.push(i);
				}
			} else {
				for (let i = lastSelected; i >= selectedIndex; i--) {
					selected.push(i);
				}
			}

			selected = selected;
		}
	}

	function handleChange(e, i) {
		if (e.target.checked) {
			lastSelected = i;
		}
	}
</script>

<div class="root">
	<div class="grid">
		<div class="episodes">
			<p class="tag">Listen to all the Wikipedia podcast episodes</p>
			<ul>
				{#each episodes as ep, i}
					<li>
						<label on:click={(e) => handleClick(e, i)}
							><input
								type="checkbox"
								value={i}
								bind:group={selected}
								on:change={(e) => handleChange(e, i)}
							/>
							<span class="title">{i + 1} || {ep}</span></label
						>
					</li>
				{/each}
			</ul>
		</div>
		<img class="cover" src="https://picsum.photos/600/600" alt="Podcast cover" />
	</div>
</div>

<svelte:head>
	<title>Day 5</title>
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
	<link
		href="https://fonts.googleapis.com/css2?family=Nunito+Sans:wght@400;700;900&display=swap"
		rel="stylesheet"
	/>
</svelte:head>

<style>
	.root {
		min-height: 100%;
		display: grid;
		place-items: center;
		background-color: #f3f3f3;
		font-family: 'Nunito Sans', sans-serif;
	}

	.grid {
		display: grid;
		align-items: center;
		grid-template-columns: 1fr;
		font-size: 12px;
	}

	.cover {
		grid-row: 1;
		max-width: 250px;
		margin: 0 auto;
	}

	@media (min-width: 800px) {
		.grid {
			grid-template-columns: 1fr 3em 1fr;
		}

		.cover {
			grid-column: 1 / span 2;
			grid-row: 1;
			max-width: 100%;
		}

		.episodes {
			grid-column: 2 / span 2;
			grid-row: 1;
		}
	}

	ul {
		list-style: none;
		padding: 0;
		margin: 0;
		display: flex;
		flex-direction: column;
		gap: 2em;
	}

	.episodes {
		background: #ffffff;
		box-shadow: 0px 0.25em 1.25em #e8eaef;
		border-radius: 2em;
		padding: 1em 2em;

		margin: 1.5em 0;
	}

	@media (min-width: 800px) {
		.episodes {
			padding: 3.75em 5em;
		}
	}

	input[type='checkbox'] {
		appearance: none;
		height: var(--size);
		width: var(--size);
		margin-right: 1.5em;
		border-radius: 0.5em;
		outline-offset: 2px;
		flex: 0 auto;
	}

	input[type='checkbox']::after {
		content: '';
		background-image: url('/images/day5/checkbox--unchecked.svg');
		height: var(--size);
		width: var(--size);
		background-size: var(--size);
		position: absolute;
	}

	input[type='checkbox']:checked::after {
		background-image: url('/images/day5/checkbox--checked.svg');
	}

	input[type='checkbox']:checked + .title {
		text-decoration: line-through;
		opacity: 0.8;
	}

	label {
		font-size: 1.5em;
		color: #4e4e4e;
		display: flex;
		align-items: center;
		--size: 2em;
	}

	@media (min-width: 1000px) {
		label {
			--size: 2.5625em;
		}
	}

	.tag {
		font-size: 1.1em;
		text-transform: uppercase;
		color: #646464;
		margin-bottom: 2.5em;
	}

	img {
		width: 100%;
	}
</style>
