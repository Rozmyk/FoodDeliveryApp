
import { DiscountCode, CurrentRestaurant, Product } from "../../types/types";

  
  export interface CartReducerState {
	isOpen: boolean;
	total: number;
	products: Product[];
	discount: DiscountCode;
	currentRestaurant: CurrentRestaurant;
  }
  
  export const initialState: CartReducerState = {
	isOpen: false,
	total: 0,
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
  };
  
  type CartReducerAction =
	| { type: 'ADD_TO_CART'; payload: { products: Product[] } }
	| { type: 'REMOVE_FROM_CART'; payload: { products: Product[] } }
	| {
		type: 'UPDATE_CART_AND_RESTAURANT';
		payload: { products: Product[]; currentRestaurant: CurrentRestaurant };
	  }
	| {
		type: 'REMOVE_ALL';
		payload: {
		  products: Product[];
		  discount: DiscountCode;
		  currentRestaurant: CurrentRestaurant;
		  total: number;
		};
	  }
	| { type: 'UPDATE_PRICE'; payload: { total: number } }
	| { type: 'TOGGLE_CART'; payload: { isOpen: boolean } }
	| { type: 'INCREASE_VOLUME'; payload: { products: Product[] } }
	| { type: 'DECREASE_VOLUME'; payload: { products: Product[] } }
	| { type: 'UPDATE_CART_ITEM'; payload: { products: Product[] } }
	| { type: 'SET_RESTAURANT'; payload: { currentRestaurant: CurrentRestaurant } }
	| { type: 'SET_DISCOUNT'; payload: { discount: DiscountCode } };
  
  const CartReducer = (state: CartReducerState, action: CartReducerAction) => {
	const { type, payload } = action;
  
	switch (type) {
	  case 'ADD_TO_CART':
		return {
		  ...state,
		  products: payload.products,
		};
  
	  case 'REMOVE_FROM_CART':
		return {
		  ...state,
		  products: payload.products,
		};
  
	  case 'UPDATE_CART_AND_RESTAURANT':
		return {
		  ...state,
		  products: payload.products,
		  currentRestaurant: {
			...payload.currentRestaurant,
		  },
		};
  
	  case 'REMOVE_ALL':
		return {
		  ...state,
		  products: payload.products,
		  discount: payload.discount,
		  currentRestaurant: payload.currentRestaurant,
		  total: payload.total,
		};
  
	  case 'UPDATE_PRICE':
		return {
		  ...state,
		  total: payload.total,
		};
  
	  case 'TOGGLE_CART':
		return {
		  ...state,
		  isOpen: payload.isOpen,
		};
  
	  case 'INCREASE_VOLUME':
		return {
		  ...state,
		  products: payload.products,
		};
  
	  case 'DECREASE_VOLUME':
		return {
		  ...state,
		  products: payload.products,
		};
  
	  case 'UPDATE_CART_ITEM':
		return {
		  ...state,
		  products: payload.products,
		};
  
	  case 'SET_RESTAURANT':
		return {
		  ...state,
		  currentRestaurant: {
			...payload.currentRestaurant,
		  },
		};
  
	  case 'SET_DISCOUNT':
		return {
		  ...state,
		  discount: {
			...payload.discount,
		  },
		};
		
	  default:
		return state;
	}
  };
  
  export default CartReducer;
  