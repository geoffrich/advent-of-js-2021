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
		<p>${$totals.subtotal}</p>
		<p>${$totals.tax}</p>
		<p>${$totals.total}</p>
	</div>
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
		place-content: center;
		grid-template-columns: 1fr;
		gap: 3rem;
		font-family: Poppins, sans-serif;
		background-color: lightgrey;
		padding: 106px 0;

		--button-color: #6b00f5;
	}

	.root > * {
		background-color: white;
		border-radius: 25px;
		box-shadow: 0px 0px 70px #c7cbe3;
		padding: 50px 38px;
		overflow-x: hidden;
		width: 100%;
		max-width: 375px;
		margin: 0 auto;
	}

	@media (min-width: 860px) {
		.root {
			grid-template-columns: 1fr 1fr;
		}

		.root > * {
			margin: 0;
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
		margin-left: auto;
	}

	.menu ul {
		display: flex;
		flex-direction: column;
		gap: 2rem;
	}
</style>
