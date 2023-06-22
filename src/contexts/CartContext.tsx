import React from 'react'
import { useReducer } from 'react'
import CartReducer, { initialState } from '../pages/Cart/CartReducer'
import { Product, DiscountCode, CurrentRestaurant } from '../types/types'

interface CartContextProps {
	total: number
	products: Product[]
	currentRestaurant: CurrentRestaurant
	discount: DiscountCode
	isOpen: boolean
	addToCart: (product: Product) => void
	removeFromCart: (product: Product) => void
	increaseValue: (product: Product) => void
	decreaseValue: (product: Product) => void
	removeAll: () => void
	setRestaurant: (restaurant: CurrentRestaurant) => void
	setDiscount: (code: DiscountCode) => void
	checkHandler: (product: Product) => void
	updateCartAndRestaurant: (product: Product, restaurant: CurrentRestaurant) => void
	updateCartItem: (productName: string, newAmount: number) => void
	toggleCart: (value: boolean) => void
}

export const CartContext = React.createContext<CartContextProps>({
	total: initialState.total,
	products: initialState.products,
	currentRestaurant: initialState.currentRestaurant,
	discount: initialState.discount,
	isOpen: initialState.isOpen,
	addToCart: () => {},
	removeFromCart: () => {},
	increaseValue: () => {},
	decreaseValue: () => {},
	removeAll: () => {},
	setRestaurant: () => {},
	setDiscount: () => {},
	checkHandler: () => {},
	updateCartAndRestaurant: () => {},
	updateCartItem: () => {},
	toggleCart: () => {},
})

interface CartProviderProps {
	children: React.ReactNode
}

export const CartProvider = ({ children }: CartProviderProps) => {
	const [state, dispatch] = useReducer(CartReducer, initialState)

	const addToCart = (product: Product): void => {
		const updatedCart: Product[] = state.products.concat(product)
		cartPrice(updatedCart)

		dispatch({
			type: 'ADD_TO_CART',
			payload: {
				products: updatedCart,
			},
		})
	}

	const checkHandler = (product: Product): void => {
		const productIndex = state.products.findIndex((p: Product) => p.name === product.name)
		productIndex === -1 ? addToCart(product) : increaseValue(product)
	}

	const increaseValue = (product: Product): void => {
		const updatedCart: Product[] = state.products.map((item: Product) => {
			if (item.name === product.name) {
				return { ...item, amount: item.amount + 1 }
			}
			return item
		})
		cartPrice(updatedCart)

		dispatch({
			type: 'INCREASE_VOLUME',
			payload: {
				products: updatedCart,
			},
		})
	}

	const toggleCart = (value: boolean) => {
		dispatch({
			type: 'TOGGLE_CART',
			payload: {
				isOpen: value,
			},
		})
	}

	const updateCartItem = (productName: string, newAmount: number) => {
		const updatedCart = state.products.map((item: Product) => {
			if (item.name === productName) {
				return { ...item, amount: newAmount }
			}
			return item
		})
		cartPrice(updatedCart)
		dispatch({
			type: 'UPDATE_CART_ITEM',
			payload: {
				products: updatedCart,
			},
		})
	}

	const decreaseValue = (product: Product): void => {
		const updatedCart = state.products
			.map((item: Product) => {
				if (item.name === product.name) {
					const updatedAmount = item.amount - 1
					return updatedAmount <= 0 ? null : { ...item, amount: updatedAmount }
				}
				return item
			})
			.filter((item: Product | null): item is Product => item !== null)

		cartPrice(updatedCart)

		dispatch({
			type: 'DECREASE_VOLUME',
			payload: {
				products: updatedCart,
			},
		})
	}

	const removeFromCart = (product: Product): void => {
		const updatedCart = state.products.filter((currentProduct: Product) => currentProduct.name !== product.name)
		cartPrice(updatedCart)

		dispatch({
			type: 'REMOVE_FROM_CART',
			payload: {
				products: updatedCart,
			},
		})
	}

	const removeAll = () => {
		dispatch({
			type: 'REMOVE_ALL',
			payload: {
				products: [],
				discount: {
					code: '',
					discountValue: 0,
				},
				currentRestaurant: {
					name: '',
					delivery_price: 0,
					delivery_time: '',
					pathname: '',
					free_ship: 0,
					id: '',
				},
				total: 0,
			},
		})
	}

	const updateCartAndRestaurant = (product: Product, restaurant: CurrentRestaurant) => {
		const updatedCart = product
		cartPrice(updatedCart)
		dispatch({
			type: 'UPDATE_CART_AND_RESTAURANT',
			payload: {
				currentRestaurant: { ...restaurant },
				products: [updatedCart],
			},
		})
	}

	const cartPrice = (products: Product | Product[] | null): void => {
		if (!products || (Array.isArray(products) && products.length <= 0)) {
			removeAll()
		}

		const total = Array.isArray(products)
			? products.reduce((acc, curr) => acc + curr.price * curr.amount, 0)
			: products && products.amount
			? products.price * products.amount
			: 0

		dispatch({
			type: 'UPDATE_PRICE',
			payload: {
				total,
			},
		})
	}

	const setRestaurant = (restaurant: CurrentRestaurant) => {
		dispatch({
			type: 'SET_RESTAURANT',
			payload: {
				currentRestaurant: { ...restaurant },
			},
		})
	}

	const setDiscount = (code: DiscountCode) => {
		dispatch({
			type: 'SET_DISCOUNT',
			payload: {
				discount: { ...code },
			},
		})
	}

	const value: CartContextProps = {
		total: state.total,
		products: state.products,
		currentRestaurant: state.currentRestaurant,
		discount: state.discount,
		isOpen: state.isOpen,
		addToCart,
		removeFromCart,
		increaseValue,
		decreaseValue,
		removeAll,
		setRestaurant,
		setDiscount,
		checkHandler,
		updateCartAndRestaurant,
		updateCartItem,
		toggleCart,
	}

	return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export default CartContext
