import { Grid, Box, Typography, Rating, LinearProgress } from '@mui/material'
import StarIcon from '@mui/icons-material/Star'
import { ReviewsSummaryProps } from '../../../../../types/types'

const ReviewsSummary = ({ averageRating, reviewsLength, ratingsCount }: ReviewsSummaryProps) => {
	type RatingsCountArray = Array<{ id: string; amount: number }>
	const newRatingsCount: RatingsCountArray = Object.values(ratingsCount) as RatingsCountArray

	return (
		<Grid container mb={3}>
			<Grid
				item
				xs={12}
				md={2}
				sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
				<Box sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }}>
					<Typography variant='h4'>{averageRating}</Typography>
					<Typography variant='body1' color='text.primary'>
						/5
					</Typography>
				</Box>
				<Rating readOnly precision={0.25} value={averageRating} />
				<Typography color='text.primary' variant='caption'>
					({reviewsLength} opinii)
				</Typography>
			</Grid>
			<Grid item xs={12} md={10}>
				{newRatingsCount.map((rating, index) => {
					return (
						<Box sx={{ display: 'flex', alignItems: 'center', gap: '5px' }} key={rating.id}>
							<Box sx={{ display: 'flex', gap: '5px' }}>
								<StarIcon fontSize='small' sx={{ color: 'text.primary' }} />
								<Typography color='text.primary' variant='caption'>
									{index + 1}
								</Typography>
							</Box>
							<Box sx={{ width: '80%' }}>
								<LinearProgress color='secondary' value={(rating.amount / reviewsLength) * 100} variant='determinate' />
							</Box>
							<Typography color='text.primary' variant='caption'>
								{rating.amount}
							</Typography>
						</Box>
					)
				})}
			</Grid>
		</Grid>
	)
}

export default ReviewsSummary
