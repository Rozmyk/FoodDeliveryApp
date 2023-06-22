import { Card, CardContent, CardMedia, Box, Typography, Chip, Grid, Rating, Skeleton } from '@mui/material'
import AccessTimeIcon from '@mui/icons-material/AccessTime'
import RestaurantIcon from '@mui/icons-material/Restaurant'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { NewRestaurant } from '../../types/types'

export default function RestaurantCard({
	photo,
	minimumOrderValue,
	name,
	category,
	delivery_time,
	averageRating,
	id,
}: NewRestaurant) {
	const [loading, setLoading] = useState(true)
	const pathname = `/restaurants/${id}`

	useEffect(() => {
		setLoading(false)
	}, [])

	return (
		<>
			{loading ? (
				<Skeleton variant='rectangular' width={350} height={200}></Skeleton>
			) : (
				<Link to={pathname} style={{ textDecoration: 'none' }}>
					<Card sx={{ borderRadius: '15px', width: '100%' }}>
						<Box sx={{ position: 'relative' }}>
							<CardMedia sx={{ width: '100%', height: '175px', borderRadius: '15px' }} image={photo.url}></CardMedia>
							<Chip
								color='primary'
								sx={{
									position: 'absolute',
									bottom: '10px',
									right: '10px',
									fontWeight: 'bold',
									color: 'white',
								}}
								label={`Min. ${minimumOrderValue} zł`}></Chip>
						</Box>

						<CardContent
							sx={{
								display: 'flex',
								flexDirection: 'column',
								justifyContent: 'center',
								alignItems: 'flex-start',
								gap: '5px',
							}}>
							<Typography
								sx={{ textTransform: 'capitalize', fontWeight: '600' }}
								variant='h6'
								textAlign='left'
								component='div'
								color='text.secondary'>
								{name}
							</Typography>

							<Grid container alignItems='center'>
								<Grid
									item
									xs={6}
									sx={{
										display: 'flex',
										justifyContent: 'flex-start',
										alignItems: 'center',
										gap: '5px',
									}}>
									<RestaurantIcon sx={{ fontSize: '18px', color: 'text.primaryLighter' }}></RestaurantIcon>
									<Typography variant='subtitle2' textTransform='capitalize' color='text.primaryLighter'>
										{category}
									</Typography>
								</Grid>
								<Grid
									item
									xs={6}
									sx={{
										display: 'flex',
										justifyContent: 'flex-end',
										alignItems: 'center',
										gap: '5px',
									}}>
									<AccessTimeIcon sx={{ fontSize: '18px', color: 'text.primaryLighter' }}></AccessTimeIcon>
									<Typography variant='subtitle2'>{`${delivery_time} min`}</Typography>
								</Grid>
							</Grid>
							<Box
								sx={{
									display: 'flex',
									justifyContent: 'center',
									alignitems: 'flex-start',
									gap: '5px',
								}}>
								<Rating
									name='size-small'
									precision={0.25}
									defaultValue={averageRating}
									readOnly
									value={averageRating}></Rating>

								<Typography variant='subtitle2' color='text.primaryLighter'>
									{averageRating !== 0 ? `Ocena: ${averageRating}` : 'Brak ocen'}
								</Typography>
							</Box>
						</CardContent>
					</Card>
				</Link>
			)}
		</>
	)
}
