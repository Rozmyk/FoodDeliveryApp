import { IconButton, Typography, Grid, Select, MenuItem, Tooltip, SelectChangeEvent } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import CartContext from '../../../contexts/CartContext'
import { useContext } from 'react'
import { CartItemProps } from '../../../types/types'

export default function CartItem({ product }: CartItemProps) {
	const cart = useContext(CartContext)

	const handleAmountChange = (event: SelectChangeEvent<number>) => {
		const selectedValue = typeof event.target.value === 'string' ? parseInt(event.target.value) : event.target.value
		cart.updateCartItem(product.name, selectedValue)
	}

	return (
		<Grid
			container
			justifyContent='space-between'
			alignItems='center'
			padding='20px 15px'
			borderRadius='15px'
			sx={{ border: '1px solid rgba(0, 0, 0, 0.12)', color: 'text.secondary' }}>
			<Grid
				item
				xs={3}
				sx={{
					display: 'flex',
					flexDirection: 'column',
					justifyContent: 'center',
					alignItems: 'flex-start',
				}}>
				<Typography variant='body1' fontWeight={600}>
					{product.name}
				</Typography>
				<Typography>{product.price} zł</Typography>
			</Grid>
			<Grid
				item
				xs={3}
				sx={{
					display: 'flex',
					flexDirection: 'row',
					justifyContent: 'center',
					alignItems: 'center',
				}}>
				<Select
					value={product.amount}
					onChange={handleAmountChange}
					size='small'
					sx={{ color: 'text.secondary' }}
					MenuProps={{
						PaperProps: {
							style: {
								maxHeight: 300,
							},
						},
					}}>
					{Array.from({ length: 99 }, (_, i) => (
						<MenuItem sx={{ color: 'text.secondary' }} key={i} value={i + 1}>
							{i + 1}
						</MenuItem>
					))}
				</Select>
			</Grid>
			<Grid
				item
				xs={3}
				sx={{
					display: 'flex',
					flexDirection: 'row',
					justifyContent: 'center',
					alignItems: 'center',
				}}>
				<Typography variant='body1' fontWeight={600}>
					{(product.price * product.amount).toFixed(2)} zł
				</Typography>
			</Grid>
			<Grid
				item
				xs={3}
				sx={{
					display: 'flex',
					flexDirection: 'row',
					justifyContent: 'flex-end',
					alignItems: 'center',
				}}>
				<Tooltip title='Usuń z koszyka'>
					<IconButton
						size='small'
						onClick={() => {
							cart.removeFromCart(product)
						}}>
						<DeleteIcon />
					</IconButton>
				</Tooltip>
			</Grid>
		</Grid>
	)
}
