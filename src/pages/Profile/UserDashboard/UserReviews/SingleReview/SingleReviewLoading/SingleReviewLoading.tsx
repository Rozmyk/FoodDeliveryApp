import { Grid, Skeleton, useMediaQuery } from '@mui/material'
const SingleReviewLoading = () => {
	const isScreenLarge = useMediaQuery('(min-width:600px)')
	return (
		<Grid container mb={3} spacing={1}>
			<Grid
				item
				xs={12}
				md={1}
				sx={{ padding: '10px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
				<Skeleton variant='circular' width={70} height={70}></Skeleton>
			</Grid>
			<Grid
				item
				xs={12}
				md={10}
				sx={{
					display: 'flex',
					justifyContent: 'center',
					alignItems: isScreenLarge ? 'flex-start' : 'center',
					flexDirection: 'column',
				}}>
				<Skeleton variant='text' width='20%'></Skeleton>
				<Skeleton variant='text' width='40%'></Skeleton>
				<Skeleton variant='rounded' width='90%'></Skeleton>
			</Grid>
		</Grid>
	)
}

export default SingleReviewLoading
