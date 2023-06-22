import { Box, Typography, Stack, Pagination, Divider } from '@mui/material'
import SingleReview from './SingleReview/SingleReview'
import { useState, useEffect, useContext } from 'react'
import ReviewsComponentsLoading from './ReviewsComponentsLoading/ReviewsComponentsLoading/ReviewsComponentsLoading'
import { RestaurantsContext } from '../../../../contexts/RestaurantsDataContext'
import { useLocation } from 'react-router-dom'
import { NewRestaurant, Review, ReviewsComponentProps } from '../../../../types/types'
import ReviewsSummary from './ReviewsSummary/ReviewsSummary'
export default function ReviewsComponent({ averageRating, id }: ReviewsComponentProps) {
	const [reviews, setReviews] = useState<Review[]>([])
	const [loading, setLoading] = useState<boolean>(true)
	const [page, setPage] = useState<number>(1)
	const [totalPages, setTotalPages] = useState<number>(1)
	const [ratingsCount, setRatingsCount] = useState({})
	const { restaurants } = useContext(RestaurantsContext)
	const location = useLocation()

	const countRatings = (data: Review[]): void => {
		const counts: Record<number, { amount: number }> = {
			1: { amount: 0 },
			2: { amount: 0 },
			3: { amount: 0 },
			4: { amount: 0 },
			5: { amount: 0 },
		}

		data.forEach(review => {
			const rating = review.value
			counts[rating].amount += 1
		})

		setRatingsCount(counts)
	}

	const getReview = () => {
		setLoading(true)

		const restaurant: NewRestaurant | undefined = restaurants.find(restaurant => restaurant.id === id)
		if (restaurant) {
			const sortedReviews = restaurant.reviews.sort((a, b) => Number(b.timestamp) - Number(a.timestamp))
			setReviews(sortedReviews)
			countRatings(sortedReviews)

			const pageCount = Math.ceil(sortedReviews.length / 10)
			setTotalPages(pageCount)
		} else {
			setReviews([])
		}

		setLoading(false)
	}

	useEffect(() => {
		getReview()
	}, [])

	useEffect(() => {
		getReview()
	}, [restaurants, location.pathname])

	const handlePageChange = (_: React.ChangeEvent<unknown>, page: number) => {
		setPage(page)
	}

	return (
		<div>
			{loading ? (
				<>
					<ReviewsComponentsLoading></ReviewsComponentsLoading>
				</>
			) : (
				<>
					{reviews.length > 0 ? (
						<>
							<ReviewsSummary
								ratingsCount={ratingsCount}
								reviewsLength={reviews.length}
								averageRating={averageRating}></ReviewsSummary>
							<Box
								sx={{
									display: 'flex',
									gap: '5px',
									justifyContent: 'flex-start',
									alignItems: 'center',
									mb: 2,
								}}>
								<Typography>Opinie użytkowników</Typography>
								<Typography variant='body2'>({reviews.length})</Typography>
							</Box>
							<Divider />

							<Box
								sx={{
									display: 'flex',
									flexDirection: 'column',
									alignItems: 'center',
									overflow: 'auto',
									mt: 3,
								}}>
								{reviews.slice((page - 1) * 10, page * 10).map((review, index) => (
									<SingleReview index={index} key={review.reviewId} {...review} />
								))}
							</Box>
						</>
					) : (
						<Typography textAlign='center' variant='body1'>
							Brak recenzji
						</Typography>
					)}
					<Stack spacing={2} direction='row' justifyContent='center' marginTop={2}>
						<Pagination count={totalPages} page={page} onChange={handlePageChange} />
					</Stack>
				</>
			)}
		</div>
	)
}
