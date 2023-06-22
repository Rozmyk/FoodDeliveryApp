import { useContext, useState, useEffect } from 'react'
import { Container, Box, Grid, useMediaQuery } from '@mui/material'
import { motion } from 'framer-motion'
import { RestaurantsContext } from '../../contexts/RestaurantsDataContext'
import useWebsiteTitle from '../../hooks/useWebsiteTitle'
import { useSearchParams } from 'react-router-dom'
import RestaurantsOverviewLoading from './RestaurantsOverviewLoading/RestaurantsOverviewLoading'
import CategoryFilter from './CategoryFilter/CategoryFilter'
import RestaurantCard from '../../components/RestaurantCard/RestaurantCard'
import EmptyRestaurants from './EmptyRestaurants/EmptyRestaurants'
import FilterDesktop from '../../components/FIlter/FilterDesktop/FilterDesktop'
import FilterMobile from '../../components/FIlter/FilterMobile/FilterMobile'
import { DetailsRestaurantProps, NewRestaurant } from '../../types/types'

export default function RestaurantsOverview() {
	const { restaurants: restaurantList, loading: RestaurantLoading } = useContext(RestaurantsContext)
	const [searchParams, setSearchParams] = useSearchParams()
	const [loading, setLoading] = useState(true)
	const isScreenLarge = useMediaQuery('(min-width:1200px')
	const query = searchParams.get('query')
	const [restaurants, setRestaurants] = useState<DetailsRestaurantProps[]>([])
	const category = searchParams.get('category')
	console.log(category)
	const rating = searchParams.get('rating')
	const minOrder = searchParams.get('minOrder')
	const deliveryMaxCost = searchParams.get('deliveryMaxCost')
	const freeDelivery = searchParams.get('freeDelivery')
	const sortBy = searchParams.get('sortBy')
	useWebsiteTitle('Restauracje')

	const fetchRestaurant = () => {
		try {
			setLoading(true)
			if (restaurantList) {
				const newRestaurant: DetailsRestaurantProps[] | DetailsRestaurantProps = restaurantList.filter(
					restaurant =>
						(!query || restaurant.name.toLowerCase().includes(query.toLowerCase())) &&
						(!category || restaurant.category.toLowerCase().includes(category.toLowerCase())) &&
						(!rating || restaurant.averageRating >= parseInt(rating)) &&
						(!minOrder || restaurant.minimumOrderValue <= parseInt(minOrder)) &&
						(!deliveryMaxCost || restaurant.delivery_price <= parseInt(deliveryMaxCost)) &&
						(!freeDelivery || restaurant.delivery_price === 0)
				)

				if (sortBy) {
					switch (sortBy) {
						case 'oldest':
							newRestaurant.sort((a, b) => restaurantList.indexOf(a) - restaurantList.indexOf(b))
							break
						case 'newest':
							newRestaurant.sort((a, b) => restaurantList.indexOf(b) - restaurantList.indexOf(a))
							break
						case 'rating':
							newRestaurant.sort((a, b) => b.averageRating - a.averageRating)
							break
						case 'alphabetical':
							newRestaurant.sort((a, b) => a.name.localeCompare(b.name))
							break
						default:
							break
					}
				}

				setRestaurants(newRestaurant)
				setLoading(false)
			} else {
			}
		} catch (ex) {
			console.log(ex)
		}
	}

	const setUpCategory = (clickedCategory: string) => {
		searchParams.set('category', clickedCategory)
		setSearchParams(searchParams)
	}

	useEffect(() => {
		fetchRestaurant()
	}, [searchParams, RestaurantLoading])

	useEffect(() => {
		fetchRestaurant()
	}, [])

	return (
		<>
			<Container
				sx={{
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
					mb: 3,
				}}
				maxWidth='xl'>
				<CategoryFilter setUpCategory={setUpCategory}></CategoryFilter>
			</Container>
			<Container fixed sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }} maxWidth='xl'>
				<Grid container spacing={3}>
					<Grid
						item
						xs={12}
						lg={2}
						sx={{
							display: 'flex',
							justifyContent: 'center',
							alignItems: 'flex-start',
							padding: '10px, 0',
							backgroundColor: 'white',
						}}>
						{isScreenLarge ? (
							<Box
								sx={{
									position: 'sticky',
									top: '80px',
									left: '0',
									borderRadius: '15px',
								}}>
								<FilterDesktop query={query ? query : ''} restaurantsLenght={restaurants.length}></FilterDesktop>
							</Box>
						) : (
							<Box sx={{ width: '100%' }}>
								<FilterMobile
									filterCount={searchParams.getAll('').length}
									query={query ? query : ''}
									restaurantsLenght={restaurantList.length}></FilterMobile>
							</Box>
						)}
					</Grid>

					<Grid item xs={12} lg={10}>
						<Box>
							{loading ? (
								<RestaurantsOverviewLoading />
							) : restaurants.length === 0 ? (
								<EmptyRestaurants query={query ? query : ''} />
							) : (
								<Grid
									container
									justifyContent='center'
									maxWidth='lg'
									alignItems='center'
									marginTop='15PX'
									spacing='25px'>
									{restaurants.map((restaurant: NewRestaurant, index: number) => {
										return (
											<Grid item xs={12} md={6} xl={4} key={restaurant.id}>
												<motion.div
													initial={{ opacity: 0, y: 50 }}
													animate={{ opacity: 1, y: 0 }}
													exit={{ opacity: 0, y: 50 }}
													transition={{ delay: index * 0.1 }}>
													<RestaurantCard {...restaurant} />
												</motion.div>
											</Grid>
										)
									})}
								</Grid>
							)}
						</Box>
					</Grid>
				</Grid>
			</Container>
		</>
	)
}
