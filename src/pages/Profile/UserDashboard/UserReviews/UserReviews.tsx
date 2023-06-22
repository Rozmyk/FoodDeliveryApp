import { useState } from 'react'
import { Typography, Box, Pagination } from '@mui/material'
import SingleReview from './SingleReview/SingleReview'
import TitleWithSubtitle from '../../../../components/TitleWithSubtitle/TitleWithSubtitle'
import SingleReviewLoading from './SingleReview/SingleReviewLoading/SingleReviewLoading'
import { UserReviewsProps, Review } from '../../../../types/types'

const UserReviews = ({ reviews, loading, setReviews }: UserReviewsProps) => {
	const [currentPage, setCurrentPage] = useState(1)
	const reviewsPerPage = 5

	const sortReviewsByTimestamp = (reviews: Review[]) => {
		reviews.sort((a, b) => {
			const timestampA = new Date(a.timestamp.seconds * 1000 + a.timestamp.nanoseconds / 1000000)
			console.log(a.timestamp)
			const timestampB = new Date(b.timestamp.seconds * 1000 + b.timestamp.nanoseconds / 1000000)
			return timestampB.getTime() - timestampA.getTime()
		})
		return reviews
	}

	const sortedReviews = sortReviewsByTimestamp(reviews)

	const indexOfLastReview = currentPage * reviewsPerPage
	const indexOfFirstReview = indexOfLastReview - reviewsPerPage
	const currentReviews = sortedReviews.slice(indexOfFirstReview, indexOfLastReview)

	const handlePageChange = (_: React.ChangeEvent<unknown>, value: number) => {
		setCurrentPage(value)
	}

	const totalPageCount = Math.ceil(sortedReviews.length / reviewsPerPage)

	return (
		<>
			<TitleWithSubtitle
				title='Twoje opinie'
				subtitle='Przejrzyj swoje dodane opinie na temat restauracji. Możesz zobaczyć, edytować lub usunąć swoje opinie, które pomogą innym użytkownikom w podjęciu decyzji o wyborze restauracji.'></TitleWithSubtitle>
			{loading ? (
				<SingleReviewLoading></SingleReviewLoading>
			) : reviews.length <= 0 ? (
				<>
					<Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '15px' }}>
						<Typography textAlign='center' variant='body1'>
							Brak dodanych opinii
						</Typography>
					</Box>
				</>
			) : (
				<Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
					{currentReviews.map((review: Review, index: number) => {
						const key = `${review.restaurantId}-${review.timestamp}`
						return <SingleReview key={key} setReviews={setReviews} reviews={reviews} index={index} {...review} />
					})}

					{totalPageCount > 1 && <Pagination count={totalPageCount} page={currentPage} onChange={handlePageChange} />}
				</Box>
			)}
		</>
	)
}

export default UserReviews
