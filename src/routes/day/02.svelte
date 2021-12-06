<script>
	import CartItem from '$lib/components/day2/CartItem.svelte';
	import MenuItem from '$lib/components/day2/MenuItem.svelte';

	import cart, { totals, items } from '$lib/stores/cart';
	$cart = [
		{ id: 3, quantity: 1 },
		{ id: 5, quantity: 2 }
	];

	function updateItem(index, quantity) {
		$cart[index].quantity = quantity;
	}
</script>

<div class="root">
	<div class="menu">
		<h2>To Go Menu</h2>
		<ul>
			{#each items as item}
				<li>
					<MenuItem {item} />
				</li>
			{/each}
		</ul>
	</div>
	<div class="cart">
		<h2>Your Cart</h2>
		{#if $cart.length === 0}
			<p>Your cart is empty.</p>
		{:else}
			<ul>
				{#each $cart as cartItem, index (cartItem.id)}
					<li>
						<CartItem
							item={items.find((i) => i.id === cartItem.id)}
							quantity={cartItem.quantity}
							on:update={(e) => updateItem(index, e.detail)}
						/>
					</li>
				{/each}
			</ul>
		{/if}
		<dl>
			<dd>Subtotal:</dd>
			<dt>${$totals.subtotal}</dt>
			<dd>Tax:</dd>
			<dt>${$totals.tax}</dt>
			<dd>Total:</dd>
			<dt>${$totals.total}</dt>
		</dl>
	</div>
	<img class="bg bg-1" src="/images/day2/bg__btm-right.svg" alt="" />
	<img class="bg bg-2" src="/images/day2/bg__left.svg" alt="" />
	<img class="bg bg-3" src="/images/day2/bg__top-right.svg" alt="" />
</div>

<svelte:head>
	<title>Day 2</title>
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
	<link
		href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;700&display=swap"
		rel="stylesheet"
	/>
</svelte:head>

<style>
	.root {
		min-height: 100%;
		display: grid;
		justify-items: center;
		align-items: start;
		grid-template-columns: 1fr;
		gap: 3rem;
		font-family: Poppins, sans-serif;
		background-color: #e5e5e5;
		padding: 106px 0;
		position: relative;

		--button-color: #6b00f5;
	}

	.root > *:not(img) {
		background-color: white;
		border-radius: 25px;
		box-shadow: 0px 0px 70px #c7cbe3;
		padding: 50px 38px;
		overflow-x: hidden;
		width: 100%;
		max-width: 375px;
		z-index: 1;
	}

	@media (min-width: 860px) {
		.root {
			grid-template-columns: 1fr 1fr;
		}

		.menu {
			justify-self: end;
		}

		.cart {
			justify-self: start;
		}
	}

	h2 {
		font-weight: 700;
		font-size: 2rem;
		margin-bottom: 36px;
	}

	ul {
		list-style: none;
		margin: 0;
		padding: 0;
	}

	.menu {
		max-width: 375px;
	}

	.menu ul {
		display: flex;
		flex-direction: column;
		gap: 2rem;
	}

	dl {
		text-align: right;
		display: grid;
		column-gap: 1.5rem;
		row-gap: 0.5rem;
		grid-template-columns: auto auto;
		align-items: baseline;
		justify-content: end;
	}

	dd {
		font-size: 1rem;
		font-weight: 700;
	}

	dt {
		font-size: 2rem;
		font-weight: 700;
		min-width: 120px;
	}

	dt:last-child {
		color: var(--button-color);
	}

	.cart {
		position: sticky;
		top: 1rem;
	}

	.cart li {
		border-bottom: 1px solid #d7d7f9;
		padding: 2rem 0;
	}

	.cart li:first-child {
		padding-top: 0;
	}

	.cart li:last-child {
		border-width: 5px;
	}

	.cart ul {
		margin-bottom: 2rem;
	}

	.bg {
		position: fixed;
		z-index: 0;
	}

	.bg-1 {
		bottom: 0;
		right: 0;
	}

	.bg-2 {
		left: 0;
		top: 50%;
		transform: translateY(-50%);
	}

	.bg-3 {
		top: 0;
		right: 0;
	}
</style>
