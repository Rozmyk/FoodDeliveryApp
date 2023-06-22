import { Typography, Box, Divider, Button, LinearProgress, Table, TableRow, TableCell, TableHead } from '@mui/material'
import { useContext } from 'react'
import CartContext from '../../../contexts/CartContext'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import MiniCartItem from './MiniCartItem/MiniCartItem'
export default function MiniCart() {
	const cart = useContext(CartContext)
	const progress = cart.total
	const priceDifference = cart.currentRestaurant.free_ship - cart.total
	const deliveryPrice = cart.currentRestaurant.delivery_price
	const maxProgress = cart.currentRestaurant.free_ship
	const shouldShowProgress = progress <= maxProgress
	return (
		<Box
			sx={{
				padding: '10px',
				width: '100%',
				backgroundColor: 'white',
				boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
				borderRadius: '15px',
				position: 'sticky',
				top: '95px',
				right: '0',
			}}>
			<Typography variant='h5' textAlign='center' sx={{ fontWeight: '600', m: 2 }}>
				Twój koszyk
			</Typography>
			<Divider sx={{ marginBottom: '5px' }} variant='middle'></Divider>
			<Box sx={{ display: 'flex', flexDirection: 'column', gap: '15px', marginBottom: '30px' }}>
				{cart.products.length === 0 ? (
					<Box
						sx={{
							display: 'flex',
							flexDirection: 'column',
							justifyContent: 'center',
							alignItems: 'center',
							margin: '20px',
							gap: '15px',
						}}>
						<ShoppingCartIcon opacity='0.1' sx={{ fontSize: '5em' }}></ShoppingCartIcon>
						<Typography width='75%' variant='subtitle2' textAlign='center'>
							Nie dodano jeszcze żadnych produktów. Kiedy je dodasz, pojawią się tutaj!
						</Typography>
					</Box>
				) : (
					<>
						<Table>
							<TableHead>
								<TableRow>
									<TableCell align='left'>Ilość</TableCell>
									<TableCell align='center'>Produkt</TableCell>
									<TableCell align='right'>Łączna cena</TableCell>
								</TableRow>
							</TableHead>
						</Table>
						{cart.products.map(product => {
							return <MiniCartItem key={`${product.name}-${product.price}`} {...product}></MiniCartItem>
						})}
					</>
				)}
			</Box>
			{cart.products.length !== 0 &&
				(shouldShowProgress ? (
					<>
						<LinearProgress variant='determinate' value={(progress / maxProgress) * 100} />
						<Typography variant='subtitle2' textAlign='center'>
							Zamów za <strong style={{ fontWeight: 'bold' }}>{priceDifference.toFixed(2)} zł</strong>, by zaoszczędzić{' '}
							<strong style={{ fontWeight: 'bold' }}>{deliveryPrice.toFixed(2)} zł</strong> na dostawie!
						</Typography>
					</>
				) : (
					<>
						<Typography mb={2} variant='subtitle1' fontWeight={600} textAlign='center'>
							Darmowa dostawa!
						</Typography>
					</>
				))}

			{cart.products.length !== 0 && (
				<Button
					onClick={() => {
						cart.toggleCart(true)
					}}
					variant='contained'
					sx={{ fontWeight: 600, color: 'white' }}
					fullWidth>
					Zamów
				</Button>
			)}
		</Box>
	)
}
