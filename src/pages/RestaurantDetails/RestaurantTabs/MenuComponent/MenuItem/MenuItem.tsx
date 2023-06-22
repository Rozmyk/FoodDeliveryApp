import { Typography, Box, IconButton, Grid, Chip, Tooltip } from '@mui/material'
import CartContext from '../../../../../contexts/CartContext'
import { useContext } from 'react'
import { useSnackbar } from 'notistack'
import { motion } from 'framer-motion'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
import { CurrentRestaurant, MenuItemProps } from '../../../../../types/types'

export default function MenuItem({ setUpPopup, index, product, restaurant }: MenuItemProps) {
	const cart = useContext(CartContext)

	const { enqueueSnackbar } = useSnackbar()

	const addToCart = () => {
		const { name, price, photo, description } = product
		const { checkHandler, setRestaurant, currentRestaurant } = cart

		if (checkRestaurant(restaurant, currentRestaurant)) {
			checkHandler({
				name,
				price,
				photo,
				amount: 1,
				description,
			})
			enqueueSnackbar(`Dodano ${name} do koszyka`)

			setRestaurant({
				name: restaurant.name,
				pathname: restaurant.pathname,
				delivery_price: restaurant.delivery_price,
				delivery_time: restaurant.delivery_time,
				free_ship: restaurant.free_ship,
				id: restaurant.id,
			})
		} else {
			const productData = { name, price, photo, amount: 1, description }
			setUpPopup(true, productData, restaurant)
		}
	}

	const checkRestaurant = (restaurant: CurrentRestaurant, currentRestaurant: CurrentRestaurant): boolean => {
		if (
			(currentRestaurant.name === restaurant.name &&
				currentRestaurant.delivery_price === restaurant.delivery_price &&
				currentRestaurant.pathname === restaurant.pathname &&
				currentRestaurant.free_ship === restaurant.free_ship) ||
			(currentRestaurant.name === '' &&
				currentRestaurant.delivery_price === 0 &&
				currentRestaurant.pathname === '' &&
				currentRestaurant.id === '')
		) {
			return true
		}
		return false
	}

	return (
		<motion.div
			style={{ width: '100%' }}
			initial={{ opacity: 0, y: -20 }}
			animate={{
				opacity: 1,
				y: 0,
				transition: { delay: index * 0.1, y: { stiffness: 1000, velocity: -100 } },
			}}
			transition={{ duration: 0.5 }}>
			<Box
				sx={{
					display: 'flex',
					flexDirection: 'column',
					justifyContent: 'center',
					alignItems: 'center',
					width: '100%',
					borderRadius: '15px',
					padding: '15px',
					border: '1px solid rgba(0, 0, 0, 0.12)',
				}}>
				<Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
					<Typography variant='h6' fontWeight={600} textTransform='capitalize'>
						{product.name}
					</Typography>
					<Tooltip title='Dodaj do koszyka'>
						<IconButton onClick={addToCart} color='primary'>
							<AddCircleOutlineIcon color='primary' />
						</IconButton>
					</Tooltip>
				</Box>
				<Grid container justifyContent='center' alignItems='center'>
					<Grid container item xs={8} direction='column' justifyContent='center' alignItems='flex-start'>
						<Typography variant='subtitle2' marginBottom='15px'>
							{product.description}
						</Typography>
						<Chip size='medium' color='primary' label={`${product.price} zł`} />
					</Grid>
					<Grid item xs={1} />
					<Grid container item xs={3} justifyContent='center' alignItems='center'>
						<Box
							sx={{
								width: '100px',
								height: '100px',
								borderRadius: '15px',
								display: 'flex',
								justifyContent: 'center',
								alignItems: 'center',
							}}>
							<img
								style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'cover' }}
								src={product.photo}
								alt={product.name}
							/>
						</Box>
					</Grid>
				</Grid>
			</Box>
		</motion.div>
	)
}
