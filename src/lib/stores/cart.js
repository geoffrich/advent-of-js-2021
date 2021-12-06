import { writable, derived } from 'svelte/store';

const cart = writable([]);

export default {
	...cart,
	add: (item) => {
		cart.update((prev) => {
			prev.push(item);
			return prev;
		});
	},
	remove: (id) => {
		cart.update((prev) => {
			const toRemove = prev.findIndex((i) => i.id === id);
			return [...prev.slice(0, toRemove), ...prev.slice(toRemove + 1)];
		});
	}
};

export const totals = derived(cart, ($cart) => {
	let subtotal = 0;
	for (let cartItem of $cart) {
		const item = getItem(cartItem.id);
		subtotal += item.price * cartItem.quantity;
	}
	const tax = subtotal * 0.0975;
	return {
		subtotal: subtotal.toFixed(2),
		tax: tax.toFixed(2),
		total: (subtotal + tax).toFixed(2)
	};
});

export const items = [
	{
		name: 'French Fries with Ketchup',
		price: 4.5,
		img: 'plate__french-fries.png',
		id: 1
	},
	{
		name: 'Salmon and Vegetables',
		price: 4.5,
		img: 'plate__salmon-vegetables.png',
		id: 2
	},
	{
		name: 'Spaghetti with Meat Sauce',
		price: 4.5,
		img: 'plate__spaghetti-meat-sauce.png',
		id: 3
	},
	{
		name: 'Bacon and Eggs',
		price: 4.5,
		img: 'plate__bacon-eggs.png',
		id: 4
	},
	{
		name: 'Chicken Salad',
		price: 4.5,
		img: 'plate__chicken-salad.png',
		id: 5
	},
	{
		name: 'Ravioli',
		price: 4.5,
		img: 'plate__ravioli.png',
		id: 6
	},
	{
		name: 'Tortellini',
		price: 4.5,
		img: 'plate__tortellini.png',
		id: 7
	},
	{
		name: 'Fish Sticks with Fries',
		price: 4.5,
		img: 'plate__fish-sticks-fries.png',
		id: 8
	}
];

function getItem(id) {
	return items.find((i) => i.id === id);
}
