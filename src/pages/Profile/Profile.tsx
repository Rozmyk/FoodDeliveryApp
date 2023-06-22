import { useEffect, useState } from 'react'
import { Avatar, Box, Button, Grid, Typography, Container, useMediaQuery } from '@mui/material'
import { useAuth } from '../../contexts/AuthContext'
import { useNavigate } from 'react-router-dom'
import { enqueueSnackbar } from 'notistack'
import UserDashboard from './UserDashboard/UserDashboard'
import userBackground from '../../assets/photos/userBackground.jpg'
import FullWidthBackgroundContainer from '../../components/FullWidthContainer/FullWidthContainer'
import SingleListItem from './SingleListItem/SingleListItem'
import MembershipDate from './MembershipDate/MembershipDate'
import { collection, getDocs, query, where, collectionGroup, QuerySnapshot, DocumentData } from 'firebase/firestore'
import { db } from '../../config/firebaseConfig'
import useWebsiteTitle from '../../hooks/useWebsiteTitle'
import { Review, FavoriteRestaurantProps } from '../../types/types'

const Profile = () => {
	const navigate = useNavigate()
	useWebsiteTitle('Profil')
	const isLargeScreen = useMediaQuery('(max-width: 1200px)')
	const { isAuthenticated, logout, userData } = useAuth()
	const [favRestaurants, setFavRestaurants] = useState<FavoriteRestaurantProps[]>([])
	const [reviews, setReviews] = useState<Review[]>([])
	const [loadingReviews, setLoadingReviews] = useState(false)
	const [loadingFavourites, setLoadingFavourites] = useState(true)

	const getFavouriteRestaurants = async (userId: string) => {
		try {
			setLoadingFavourites(true)
			const q = query(collection(db, 'FavouriteRestaurants'), where('userLocalId', '==', userId))
			const querySnapshot: QuerySnapshot<DocumentData> = await getDocs(q)

			const restaurants: FavoriteRestaurantProps[] = []
			querySnapshot.forEach(doc => {
				restaurants.push(doc.data() as FavoriteRestaurantProps)
			})

			setFavRestaurants(restaurants)
			setLoadingFavourites(false)
		} catch (error) {
			console.error('Błąd pobierania restauracji:', error)
		}
	}

	const getUserReviews = async () => {
		try {
			setLoadingReviews(true)
			const restaurantReviewRef = collectionGroup(db, 'Reviews')
			const snapshot: QuerySnapshot<DocumentData> = await getDocs(restaurantReviewRef)
			const allReviews: Review[] = []
			snapshot.forEach(doc => {
				const reviewData = doc.data() as Review
				if (reviewData.userData.localId === userData.localId) {
					allReviews.push(reviewData)
				}
			})
			setReviews(allReviews)
			setLoadingReviews(false)
		} catch (err) {
			console.log(err)
		}
	}

	const handleLogout = () => {
		logout()
		navigate('/login')
	}

	useEffect(() => {
		if (!isAuthenticated) {
			navigate('/login')
			enqueueSnackbar('Musisz być zalogowany!', { variant: 'error' })
		}
		getFavouriteRestaurants(userData.localId)
		getUserReviews()
	}, [])

	useEffect(() => {
		getFavouriteRestaurants(userData.localId)
		getUserReviews()
	}, [userData])

	return (
		<>
			<FullWidthBackgroundContainer photo={userBackground}>
				<Box
					sx={{
						backgroundColor: 'rgba(0, 0, 0, 0.4)',
						position: 'absolute',
						top: 0,
						right: 0,
						left: 0,
						bottom: 0,
					}}></Box>
			</FullWidthBackgroundContainer>
			<Container maxWidth='xl'>
				<Grid container spacing={2}>
					<Grid
						item
						xs={12}
						lg={3}
						sx={{
							display: 'flex',
							flexDirection: 'column',
							justifyContent: 'flex-start',
							alginItems: 'center',
						}}>
						<Container
							sx={{
								zIndex: 5,
								position: 'relative',
								borderRadius: '15px',
								boxShadow: isLargeScreen ? 'none' : '0px 4px 20px rgba(0, 0, 0, 0.1)',
								marginTop: '-50px',
								backgroundColor: 'white',
								padding: '10px',
							}}>
							<Box
								mb={3}
								sx={{
									display: 'flex',
									flexDirection: 'column',
									justifyContent: 'center',
									alignItems: 'center',
								}}>
								<Avatar
									sx={{ width: '125px', height: '125px', mb: 1 }}
									src={userData.photoUrl || undefined}
									alt={userData.name || undefined}></Avatar>

								<Typography variant='h6' fontWeight={600}>
									{userData.name}
								</Typography>
								<Typography mb={2} variant='body2'>
									{userData.email}
								</Typography>
								<Button variant='outlined' size='small' onClick={handleLogout}>
									Wyloguj
								</Button>
							</Box>
							<SingleListItem primaryText='Polubione restaurację:' number={favRestaurants.length}></SingleListItem>
							<SingleListItem primaryText='Dodane opinię' number={reviews.length}></SingleListItem>
							{userData.creationTime && <MembershipDate data={userData.creationTime}></MembershipDate>}
						</Container>
					</Grid>
					<Grid item xs={12} lg={9}>
						<Container
							sx={{
								zIndex: 5,
								position: 'relative',
								borderRadius: '15px',
								boxShadow: isLargeScreen ? 'none' : '0px 4px 20px rgba(0, 0, 0, 0.1)',
								marginTop: isLargeScreen ? '0px' : '-50px',
								backgroundColor: 'white',
								padding: '10px',
							}}>
							<UserDashboard
								favRestaurants={favRestaurants}
								setFavRestaurants={setFavRestaurants}
								setReviews={setReviews}
								loadingFavourites={loadingFavourites}
								reviews={reviews}
								loadingReviews={loadingReviews}></UserDashboard>
						</Container>
					</Grid>
				</Grid>
			</Container>
		</>
	)
}

export default Profile
