import {
	Drawer,
	IconButton,
	Box,
	Typography,
	useMediaQuery,
	Table,
	TableHead,
	TableRow,
	TableCell,
	Tooltip,
} from '@mui/material'
import { useContext } from 'react'
import CartContext from '../../contexts/CartContext'
import CartItem from './CartItem/CartItem'
import EmptyCart from './EmptyCart/EmptyCart'
import CartSummary from './CartSummary/CartSummary'
import CartPromocode from './CartPromocode/CartPromocode'
import CloseIcon from '@mui/icons-material/Close'

const Cart = () => {
	const isScreenLarge = useMediaQuery('(min-width:700px')
	const cart = useContext(CartContext)

	return (
		<>
			<Drawer
				anchor={isScreenLarge ? 'right' : 'bottom'}
				open={cart.isOpen}
				onClose={() => {
					cart.toggleCart(false)
				}}
				PaperProps={{ style: { width: isScreenLarge ? '475px' : '100%', height: '100%', overflowY: 'auto' } }}>
				<Box
					sx={{
						display: 'flex',
						justifyContent: 'space-between',
						alignItems: 'center',
						padding: '20px',
					}}>
					<Typography color='text.secondary' variant='h5'>
						{cart.currentRestaurant.name}
					</Typography>
					<Tooltip title='Zamknij'>
						<IconButton
							onClick={() => {
								cart.toggleCart(false)
							}}>
							<CloseIcon style={{ color: '#717170' }} />
						</IconButton>
					</Tooltip>
				</Box>
				{cart.products.length > 0 ? (
					<Box
						sx={{
							height: '100%',
							display: 'flex',
							flexDirection: 'column',
						}}>
						<Box
							sx={{
								maxHeight: '100vh',
								color: 'text.secondary',
								flexGrow: 1,
								position: 'relative',
							}}>
							<Box>
								<Box
									sx={{
										display: 'flex',
										flexDirection: 'column',
										gap: '15px',
										alignItems: 'center',
										mb: 5,
										padding: '20px',
										flexGrow: 1,
									}}>
									<Table>
										<TableHead>
											<TableRow>
												<TableCell align='left'>Produkt</TableCell>
												<TableCell align='center'>Ilość</TableCell>
												<TableCell align='center'>Łączna cena</TableCell>
												<TableCell align='right'>Usuń</TableCell>
											</TableRow>
										</TableHead>
									</Table>
									{cart.products.map(product => {
										return <CartItem product={product} key={product.name} />
									})}
								</Box>
							</Box>
						</Box>
						<Box
							sx={{
								position: 'sticky',
								bottom: 0,
								backgroundColor: 'white',
								boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
								padding: '20px',
							}}>
							<CartPromocode />
							<CartSummary />
						</Box>
					</Box>
				) : (
					<EmptyCart></EmptyCart>
				)}
			</Drawer>
		</>
	)
}

export default Cart
