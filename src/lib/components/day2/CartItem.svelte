<script>
	import cart from '$lib/stores/cart';
	export let item;
	export let quantity;

	$: if (quantity === 0) {
		// todo: focus management
		cart.remove(item.id);
	}

	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();

	function format(num) {
		return `$${num.toFixed(2)}`;
	}

	function inc() {
		dispatch('update', quantity + 1);
	}

	function dec() {
		dispatch('update', quantity - 1);
	}
</script>

<div class="item">
	<div class="details">
		<div class="name">{item.name}</div>
		<div class="price">{format(item.price)}</div>
		<div class="adjust">
			<div class="quantity">
				<button on:click={dec}><img src="/images/day2/chevron.svg" alt="decrease" /></button>
				<span>{quantity}</span>
				<button on:click={inc}><img src="/images/day2/chevron.svg" alt="increase" /></button>
			</div>
			<div class="total">{format(item.price * quantity)}</div>
		</div>
	</div>
	<img src="/images/day2/{item.img}" alt="" />
</div>

<style>
	.item {
		display: grid;
		grid-template-columns: auto 1fr;
		grid-template-areas: 'img details';
	}

	.details {
		grid-area: details;
	}

	.item > img {
		max-width: 4rem;
		grid-area: img;
	}

	.name {
		font-size: 18px;
	}

	.price {
		font-size: 1rem;
		font-weight: 700;
	}

	.total {
		font-size: 2rem;
		font-weight: 700;
	}

	.adjust {
		display: flex;
		justify-content: space-between;
	}

	.quantity {
		display: flex;
		align-items: center;
		justify-content: space-between;
		font-weight: 700;
		flex: 0 0 auto;
		width: 100px;
	}

	button {
		background-color: var(--button-color);
		color: white;
		height: 2rem;
		width: 2rem;
		display: grid;
		place-items: center;
		border: none;
		border-radius: 50%;
	}

	button:last-child {
		transform: rotateY(180deg);
	}
</style>
