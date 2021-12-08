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
				<button on:click={dec}
					><span><img src="/images/day2/chevron.svg" alt="decrease" /></span></button
				>
				<span>{quantity}</span>
				<button on:click={inc}
					><span><img src="/images/day2/chevron.svg" alt="increase" /></span></button
				>
			</div>
			<div class="total">{format(item.price * quantity)}</div>
		</div>
	</div>
	<div class="cart-image">
		<img src="/images/day2/{item.img}" alt="" />
		<div aria-hidden="true" class="overlay">{quantity}</div>
	</div>
</div>

<style>
	.item {
		display: grid;
		grid-template-columns: auto 1fr;
		grid-template-areas: 'img details';
		column-gap: 1rem;
	}

	.details {
		grid-area: details;
	}

	.cart-image {
		max-width: 4rem;
		grid-area: img;
		transform: translateY(-0.5rem);
		position: relative;
		align-self: start;
	}

	.overlay {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translateX(-50%) translateY(-50%);

		color: white;
		background: black;
		height: 2rem;
		width: 2rem;
		border-radius: 50%;
		text-align: center;
		padding-top: 3px;
	}

	.name {
		font-size: 18px;
		line-height: 20px;
	}

	.price {
		font-size: 1rem;
		font-weight: 700;
		margin-bottom: 1rem;
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
		border: none;
		border-radius: 50%;
	}

	button span {
		display: flex;
		justify-content: center;
		align-items: center;
	}

	button:last-child {
		transform: rotateY(180deg);
	}
</style>
