import { useEffect, useState, useContext } from 'react'
import { useParams, useLocation } from 'react-router-dom'
import LocalShippingIcon from '@mui/icons-material/LocalShipping'
import FavoriteButton from './FavoriteButton/FavoriteButton'
import { Container, Box } from '@mui/system'
import { Typography, Rating, Grid, Chip, Stack, useMediaQuery, Divider } from '@mui/material'
import RateRestaurant from './RateRestaurant/RateRestaurant'
import RestaurantIcon from '@mui/icons-material/Restaurant'
import AccessTimeIcon from '@mui/icons-material/AccessTime'
import Loading from '../../components/Loading/Loading'
import RestaurantTabs from './RestaurantTabs/RestaurantTabs'
import WarningPopup from './WarningPopup/WarningPopup '
import FullWidthBackgroundContainer from '../../components/FullWidthContainer/FullWidthContainer'
import { useAuth } from '../../contexts/AuthContext'
import { RestaurantsContext } from '../../contexts/RestaurantsDataContext'
import useWebsiteTitle from '../../hooks/useWebsiteTitle'
import {
	DetailsRestaurantProps,
	PopupDataProps,
	Product,
	CurrentRestaurant,
	SetUpPopupInterface,
} from '../../types/types'
import MiniCart from '../Cart/MiniCart/MiniCart'
export default function RestaurantDetails() {
	const [restaurant, setRestaurant] = useState<DetailsRestaurantProps>({
		averageRating: 0,
		category: '',
		delivery_price: 0,
		delivery_time: '',
		description: '',
		free_ship: 0,
		minimumOrderValue: 0,
		name: '',
		id: '',
		pathname: '',
		photo: {
			alt: '',
			url: '',
		},
		products: {},
		ratingLength: 0,
		reviews: [],
	})

	const [loading, setLoading] = useState<boolean>(true)
	const [categories, setCategories] = useState<string[]>([])
	const location = useLocation()
	const [popupData, setPopupData] = useState<PopupDataProps>({
		show: false,
		product: null,
		restaurant: {
			name: '',
			delivery_price: 0,
			delivery_time: '',
			pathname: '',
			free_ship: 0,
			id: '',
		},
	})
	const isScreenSmall = useMediaQuery('(max-width:600px)')
	const isScreenLarge = useMediaQuery('(min-width:1200px)')

	const { id } = useParams()
	const { isAuthenticated } = useAuth()
	const { restaurants } = useContext(RestaurantsContext)

	const fetchRestaurant = async () => {
		try {
			setLoading(true)

			const foundRestaurant: DetailsRestaurantProps | undefined = restaurants.find(restaurant => restaurant.id === id)

			if (foundRestaurant) {
				setRestaurant({ ...foundRestaurant })
				setUpCategories(foundRestaurant.products)
				setUpLastVisitedRestaurant(foundRestaurant)
				setLoading(false)
			} else {
				console.log('Restauracja nie została znaleziona')
			}
		} catch (ex: any) {
			console.log(ex)
			console.log(ex.response)
		}
	}
	useWebsiteTitle(restaurant.name)

	const setUpPopup = (show: boolean, product: Product | null, restaurant: CurrentRestaurant | null) => {
		const popupRestaurant = restaurant ?? {
			name: '',
			delivery_price: 0,
			delivery_time: '',
			pathname: '',
			free_ship: 0,
			id: '',
		}

		setPopupData({
			show,
			product,
			restaurant: popupRestaurant,
		})
	}

	const setUpCategories = (data: Record<string, Product[]>) => {
		const allCategories = Object.keys(data)
		setCategories(allCategories)
	}

	const setUpLastVisitedRestaurant = (data: DetailsRestaurantProps) => {
		const lastVisitedRestaurant = {
			...data,
		}
		localStorage.setItem('lastVisitedRestaurant', JSON.stringify(lastVisitedRestaurant))
	}

	useEffect(() => {
		fetchRestaurant()
	}, [])

	useEffect(() => {
		fetchRestaurant()
	}, [location.pathname, restaurants])

	return (
		<>
			{loading ? (
				<Loading />
			) : (
				<>
					<FullWidthBackgroundContainer photo={restaurant.photo.url}>
						<Box
							sx={{
								width: '100%',
								height: '100%',
								position: 'absolute',
								top: '0',
								right: '0',
								backgroundColor: 'rgba(0, 0, 0, 0.4)',
							}}>
							<Container sx={{ width: '100%', height: '100%' }}>
								<Box
									sx={{
										zIndex: '2',
										display: 'flex',
										justifyContent: 'flex-end',
										alignItems: 'flex-start',
										padding: '15px',
									}}>
									{isAuthenticated && (
										<FavoriteButton
											name={restaurant.name}
											photo={restaurant.photo}
											category={restaurant.category}
											id={restaurant.id}
										/>
									)}
								</Box>
							</Container>
						</Box>
					</FullWidthBackgroundContainer>
					<Container maxWidth='xl'>
						<Grid container spacing={2}>
							<Grid item xs={12} lg={9}>
								<Container
									sx={{
										position: 'relative',
										borderRadius: '15px',
										boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
										marginTop: '-50px',
										backgroundColor: 'white',
										padding: '10px',
									}}>
									<Box>
										<Box
											sx={{
												display: 'flex',
												flexDirection: 'row',
												justifyContent: 'space-between',
												alignItems: 'center',
												marginTop: '25px',
												mb: 2,
											}}>
											<Typography
												sx={{ textTransform: 'capitalize', fontWeight: '600' }}
												variant='h5'
												textAlign='left'
												color='text.secondary'>
												{restaurant.name}
											</Typography>

											<RateRestaurant restaurantPhoto={restaurant.photo} restaurantName={restaurant.name} id={id} />
										</Box>

										<Box
											sx={{
												display: 'flex',
												justifyContent: 'flex-start',
												alignItems: 'center',
												gap: '5px',
												paddingTop: '5px',
												paddingBottom: '5px',
											}}>
											<Rating value={restaurant.averageRating} readOnly precision={0.25} />
											{restaurant.averageRating !== 0 && (
												<Typography variant='body1' fontWeight={600}>
													{restaurant.averageRating}
												</Typography>
											)}

											<Typography variant='body2'>
												{restaurant.ratingLength ? `(${restaurant.ratingLength})` : 'Brak opinii'}
											</Typography>
										</Box>

										<Grid container justifyContent={isScreenSmall ? 'center' : 'flex-start'} alignItems='center'>
											<Stack direction={isScreenSmall ? 'column' : 'row'} spacing={2}>
												<Chip
													sx={{ color: 'text.secondary', textTransform: 'capitalize' }}
													icon={<RestaurantIcon fontSize='small' />}
													label={restaurant.category}
												/>
												<Chip
													color='secondary'
													sx={{ color: 'white' }}
													icon={<AccessTimeIcon style={{ color: 'white' }} fontSize='small' />}
													label={`${restaurant.delivery_time} min`}
												/>
												<Chip
													icon={<LocalShippingIcon fontSize='small' />}
													color='primary'
													variant='outlined'
													label={`Darmowa dostawa od ${restaurant.free_ship} zł`}
												/>
											</Stack>
										</Grid>

										<Divider sx={{ padding: '10px' }} />

										<Typography color='text.primary' variant='body2'>
											{restaurant.description}
										</Typography>
									</Box>

									<RestaurantTabs
										categories={categories}
										setUpPopup={setUpPopup}
										products={restaurant.products}
										restaurant={restaurant}
										id={restaurant.id}
									/>

									<WarningPopup
										show={popupData.show}
										product={popupData.product}
										restaurant={popupData.restaurant}
										setUpPopup={setUpPopup}
									/>
								</Container>
							</Grid>
							{isScreenLarge && (
								<Grid
									item
									xs={12}
									lg={3}
									sx={{
										marginTop: '-50px',
										display: 'flex',
										width: '100%',
										flexDirection: 'column',
										justifyContent: 'flex-start',
										alignItems: 'center',
									}}>
									<MiniCart />
								</Grid>
							)}
						</Grid>
					</Container>
				</>
			)}
		</>
	)
}
