<script>
	import cart from '$lib/stores/cart';
	export let item;

	$: itemInCart = $cart.find((i) => i.id === item.id) !== undefined;

	function addToCart() {
		cart.add({ id: item.id, quantity: 1 });
	}
</script>

<div class="item">
	<div class="details">
		<div class="name">{item.name}</div>
		<div class="price">${item.price.toFixed(2)}</div>
		<button class="cart-button" disabled={itemInCart} on:click={addToCart}>
			{#if itemInCart}
				<img src="/images/day2/check.svg" alt="" />
				<span>In cart</span>
			{:else}
				Add to cart
			{/if}
		</button>
	</div>

	<img src="/images/day2/{item.img}" alt="" />
</div>

<style>
	.item > img {
		max-width: 150px;
		grid-area: img;
		transform: translateY(-24px) translateX(-12px);
	}

	.item {
		display: grid;
		grid-template-columns: auto 1fr;
		grid-template-areas: 'img details';
		border-radius: 20px;
		width: 375px;
		padding-right: 60px;
		transform: translateX(-5px);
	}

	.item:nth-child(4n + 1) {
		background-color: #7ab3f333;
	}

	.item:nth-child(4n + 2) {
		background-color: #e979b233;
	}

	.item:nth-child(4n + 3) {
		background-color: #d7d7f933;
	}

	.item:nth-child(4n) {
		background-color: #78f7bb33;
	}

	.details {
		grid-area: details;
		display: flex;
		flex-direction: column;
		gap: 10px;
		transform: translateY(10px);
	}

	.name {
		font-size: 1.125rem;
	}

	.price {
		font-size: 2rem;
		font-weight: 700;
	}

	.cart-button {
		background-color: var(--button-color);
		color: white;
		border: none;
		padding: 4px 18px;
		border-radius: 20px;
		font-weight: 700;
		align-self: start;
		width: 100%;
		max-width: 130px;

		display: flex;
		justify-content: center;
		gap: 10px;
	}

	.cart-button:disabled {
		background-color: black;
	}

	.cart-button:hover {
		filter: brightness(1.2);
	}
</style>
