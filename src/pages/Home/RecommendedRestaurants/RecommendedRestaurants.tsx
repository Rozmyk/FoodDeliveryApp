import RestaurantCard from '../../../components/RestaurantCard/RestaurantCard'
import { useState, useEffect, useContext } from 'react'
import { Skeleton, Grid, Container, useMediaQuery, Box } from '@mui/material'
import { RestaurantsContext } from '../../../contexts/RestaurantsDataContext'
import Carousel from '../../../components/Carousel/Carousel'
import TitleWithSubtitle from '../../../components/TitleWithSubtitle/TitleWithSubtitle'
import { motion } from 'framer-motion'
import { NewRestaurant } from '../../../types/types'

const RecommendedRestaurants = () => {
	const { restaurants } = useContext(RestaurantsContext)
	const [loading, setLoading] = useState(true)
	const isScreenSmall = useMediaQuery('(max-width:1000px)')
	const [theBestRestaurants, setTheBestRestaurants] = useState<NewRestaurant[]>([])

	const fetchRestaurant = async () => {
		try {
			setLoading(true)
			findBestRestaurants(restaurants)
		} catch (ex: any) {
			console.log(ex)
			console.log(ex.response)
		}
	}

	const findBestRestaurants = (restaurants: NewRestaurant[]) => {
		const bestRestaurants = restaurants
			.filter(restaurant => restaurant.averageRating)
			.sort((a, b) => b.averageRating - a.averageRating)
			.slice(0, 3)

		setTheBestRestaurants(bestRestaurants)
		setLoading(false)
	}

	useEffect(() => {
		fetchRestaurant()
	}, [])

	useEffect(() => {
		fetchRestaurant()
	}, [restaurants])

	const items = theBestRestaurants.map(restaurant => (
		<Box sx={{ maxWidth: '95%', margin: 'auto' }} key={restaurant.id}>
			<RestaurantCard {...restaurant} />
		</Box>
	))

	return (
		<>
			<Container>
				<TitleWithSubtitle
					title='Najwyżej oceniane'
					subtitle='Zobacz, które restauracje zyskały najwięcej uwagi i najlepsze opinie od naszych klientów.'
				/>

				{isScreenSmall ? (
					loading ? (
						<Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
							<Skeleton variant='rectangular' sx={{ borderRadius: '15px' }} width={350} height={200} />
						</Box>
					) : (
						<Carousel items={items} />
					)
				) : loading ? (
					<Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
						<Skeleton variant='rectangular' sx={{ borderRadius: '15px' }} width={350} height={200} />
						<Skeleton variant='rectangular' sx={{ borderRadius: '15px' }} width={350} height={200} />
						<Skeleton variant='rectangular' sx={{ borderRadius: '15px' }} width={350} height={200} />
					</Box>
				) : (
					<Grid container justifyContent='center' maxWidth='lg' alignItems='center' marginTop='15px' spacing={2}>
						{theBestRestaurants.map(restaurant => (
							<Grid item xs={12} sm={6} md={4} key={restaurant.id}>
								<motion.div
									initial={{ opacity: 0, y: 50 }}
									animate={{ opacity: 1, y: 0 }}
									exit={{ opacity: 0, y: 50 }}
									transition={{ duration: 0.5 }}>
									<RestaurantCard {...restaurant} />
								</motion.div>
							</Grid>
						))}
					</Grid>
				)}
			</Container>
		</>
	)
}

export default RecommendedRestaurants
