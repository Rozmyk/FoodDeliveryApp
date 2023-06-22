import { useContext, useState, useEffect, useMemo } from 'react'
import CartContext from '../../../contexts/CartContext'
import { Box, Typography, Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import LocalOfferIcon from '@mui/icons-material/LocalOffer'
import { useAuth } from '../../../contexts/AuthContext'
import { useSnackbar } from 'notistack'

export default function CartSummary() {
	const cart = useContext(CartContext)
	const cartTotal: number = cart.total
	const freeShippingPrice: number = cart.currentRestaurant.free_ship
	const deliveryPrice: number = cart.currentRestaurant.delivery_price
	const discountedPrice: number = cart.total * cart.discount.discountValue
	const { enqueueSnackbar, closeSnackbar } = useSnackbar()
	const [subtotal, setSubtotal] = useState<number>(cartTotal)
	const [freeShipping, setFreeShipping] = useState<boolean>(false)
	const navigate = useNavigate()
	const pathname: string = cart.currentRestaurant.pathname
	const isEligibleForFreeShipping: boolean = useMemo(() => cartTotal >= freeShippingPrice, [
		cartTotal,
		freeShippingPrice,
	])
	const { isAuthenticated } = useAuth()

	useEffect(() => {
		const newSubtotal: number = isEligibleForFreeShipping
			? cartTotal - discountedPrice
			: Math.max(cartTotal + deliveryPrice - discountedPrice, 0)

		setSubtotal(newSubtotal)
		setFreeShipping(isEligibleForFreeShipping)
	}, [cartTotal, discountedPrice, deliveryPrice, isEligibleForFreeShipping])

	return (
		<Box>
			<Box
				sx={{
					marginTop: '10px',
					marginBottom: '10px',
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
				}}
			></Box>
			<Box
				sx={{
					display: 'flex',
					flexDirection: 'column',
					justifyContent: 'center',
					alignItems: 'flex-start',
					backgroundColor: 'background.default',
					borderRadius: '15px',
					padding: '10px',
					color: 'text.secondary',
				}}
			>
				<Box
					sx={{
						display: 'flex',
						justifyContent: 'space-between',
						alignItems: 'center',
						width: '100%',
					}}
				>
					<Typography variant='subtitle2'>Razem:</Typography>
					<Typography variant='subtitle1'>{`${cartTotal.toFixed(2)} zł`}</Typography>
				</Box>
				<Box
					sx={{
						display: 'flex',
						justifyContent: 'space-between',
						alignItems: 'center',
						width: '100%',
					}}
				>
					<Typography variant='subtitle2'>Koszt dostawy:</Typography>
					{freeShipping ? (
						<Typography variant='subtitle1' fontWeight='700' textTransform='uppercase'>
							za darmo
						</Typography>
					) : (
						<Typography variant='subtitle1'>{`${deliveryPrice} zł`}</Typography>
					)}
				</Box>
				{cart.discount.code && (
					<Box
						sx={{
							display: 'flex',
							justifyContent: 'space-between',
							alignItems: 'center',
							width: '100%',
						}}
					>
						<Box sx={{ display: 'flex', alignItems: 'center', gap: '2px' }}>
							<LocalOfferIcon fontSize='small' color='primary'></LocalOfferIcon>
							<Typography variant='subtitle2' fontWeight={600} textTransform='uppercase'>
								{cart.discount.code}:
							</Typography>
						</Box>
						<Typography>-{discountedPrice.toFixed(2)} zł</Typography>
					</Box>
				)}

				<Box
					sx={{
						display: 'flex',
						justifyContent: 'space-between',
						alignItems: 'center',
						width: '100%',
					}}
				>
					<Typography variant='subtitle1' fontWeight='600'>
						Kwota całkowita:
					</Typography>
					<Typography variant='subtitle1' fontWeight='600'>
						{`${subtotal.toFixed(2)} zł`}
					</Typography>
				</Box>
			</Box>
			<Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2 }}>
				<Button
					variant='contained'
					disabled={isAuthenticated ? false : true}
					onClick={() => {
						enqueueSnackbar('Twoje zamówienie zostało złożone! Dziękujemy!')
						cart.toggleCart(false)
						cart.removeAll()
					}}
					sx={{ fontWeight: '600', color: 'white' }}
				>
					Przejdź do kasy
				</Button>

				<Button
					sx={{ fontWeight: '600' }}
					variant='outlined'
					onClick={() => {
						navigate(pathname)
						cart.toggleCart(false)
					}}
				>
					Dodaj pozycje
				</Button>
			</Box>
		</Box>
	)
}
