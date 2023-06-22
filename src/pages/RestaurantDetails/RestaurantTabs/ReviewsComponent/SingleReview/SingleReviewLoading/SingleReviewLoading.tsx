import { Grid, useMediaQuery, Skeleton } from '@mui/material'
const SingleReviewLoading = () => {
	const isScreenLarge = useMediaQuery('(min-width:1000px)')
	return (
		<>
			<Grid
				container
				sx={{
					display: 'flex',
					flexDirection: isScreenLarge ? 'row' : 'column',
					justifyContent: 'flex-start',
					alignItems: 'flex-start',
				}}>
				<Grid
					sx={{
						display: 'flex',
						justifyContent: 'flex-start',
						alignItems: 'center',
						gap: '10px',
						mb: isScreenLarge ? 0 : 1,
					}}
					item
					md={2}
					xs={12}>
					<Skeleton width={50} height={50} variant='circular'></Skeleton>
					<Skeleton variant='text' width='50%'></Skeleton>
				</Grid>
				<Grid item md={10} xs={12} sx={{ mb: 2 }}>
					
                        <Skeleton variant='text' width='40%'></Skeleton>
                        <Skeleton variant='rounded' width='60%' height='60px'></Skeleton>
                    
				</Grid>
			</Grid>
		</>
	)
}

export default SingleReviewLoading
