import {Container } from '@mui/system'
import { Typography, Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import Lottie from 'lottie-react'
import animation from '../../../assets/photos/lottieFiles/Emptybag.json'
import CartContext from '../../../contexts/CartContext'
import { useContext } from 'react'
export default function EmptyCart() {
	const navigate = useNavigate()
	const cart = useContext(CartContext)
	return (
		<Container
			maxWidth='sm'
			sx={{
				height: '100%',
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'center',
				alignItems: 'center',
			}}>
			<Lottie animationData={animation} style={{ width: '150px' }} />
			<Typography variant='h5' color='text.secondary' textAlign='center' fontWeight={600} gutterBottom>
				Twój koszyk jest pusty
			</Typography>
			<Typography variant='subtitle2' textAlign='center' gutterBottom>
				Dodaj kilka pysznych dań do swojego koszyka, aby kontynuować zamawianie.
			</Typography>
			<Button
				variant='outlined'
				onClick={() => {
					navigate(`/restaurants`)
					cart.toggleCart(false)
				}}>
				Dodaj produkty
			</Button>
		</Container>
	)
}
