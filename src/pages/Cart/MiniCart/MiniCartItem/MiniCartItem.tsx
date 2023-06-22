import { Typography, Grid, Select, MenuItem } from '@mui/material'
import { SelectChangeEvent } from '@mui/material/Select'
import CartContext from '../../../../contexts/CartContext'
import { useContext } from 'react'
import { Product } from '../../../../types/types'
const MiniCartItem = ({ amount, name, price }: Product) => {
	const cart = useContext(CartContext)

	const handleAmountChange = (event: SelectChangeEvent<number>) => {
		if (event.target.value === 0) {
			const product: Product = { name, amount, price, photo: '', description: '' }
			cart.removeFromCart(product)
		} else {
			cart.updateCartItem(name, Number(event.target.value))
		}
	}
	return (
		<>
			<Grid container alignItems='center'>
				<Grid item xs={4}>
					<Select
						labelId='demo-simple-select-label'
						id='demo-simple-select'
						value={amount}
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
						<MenuItem value={0}>Usuń</MenuItem>
						{Array.from({ length: 99 }, (_, i) => (
							<MenuItem sx={{ color: 'text.secondary' }} key={i} value={i + 1}>
								{i + 1}
							</MenuItem>
						))}
					</Select>
				</Grid>
				<Grid item xs={4}>
					<Typography textAlign='center'>{name}</Typography>
				</Grid>
				<Grid item xs={4}>
					<Typography fontWeight='600' textAlign='right'>
						{(amount * price).toFixed(2)} zł
					</Typography>
				</Grid>
			</Grid>
		</>
	)
}

export default MiniCartItem
