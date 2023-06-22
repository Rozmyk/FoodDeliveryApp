import pizzaPhoto from '../assets/photos/promocodesIcons/pizzaPng.png'
import secondPizzaPhoto from '../assets/photos/promocodesIcons/pizzaPng2.png'
import sandwichPng from '../assets/photos/promocodesIcons/sandwichPng.png'
import pastaPng from '../assets/photos/promocodesIcons/pastaPng.png'
import { Promocode } from '../types/types'

const promocodesData: Promocode[] = [
	{
		value: 20,
		backgroundColor: '#b62a28',
		color: 'white',
		btnColor: '#ffd45c',
		btnColorHover: '#e6be4d',
		fontColor: 'white',
		description: 'Na pierwsze zamówienie',
		photo: pastaPng,
		code: 'FIRST',
	},
	{
		value: 15,
		backgroundColor: 'text.secondary',
		color: '#e7cba8',
		btnColor: '#e3bd88',
		btnColorHover: '#c29b5d',
		fontColor: 'text.primary',
		description: 'Na pierwsze zamówienie',
		photo: pizzaPhoto,
		code: 'NEWUSER',
	},
	{
		value: 10,
		backgroundColor: '#06635f',
		color: '#f8daa9',
		btnColor: '#e3bd88',
		btnColorHover: '#c29b5d',
		fontColor: 'white',
		description: 'Promocja weekendowa',
		photo: sandwichPng,
		code: 'WEEKEND30',
	},
	{
		value: 20,
		backgroundColor: '#b42927',
		color: 'white',
		btnColor: '#ffd45c',
		btnColorHover: '#e6be4d',
		fontColor: 'white',
		description: 'Dla stałych klientów',
		photo: secondPizzaPhoto,
		code: 'LOYALTY20',
	},
]

export default promocodesData
