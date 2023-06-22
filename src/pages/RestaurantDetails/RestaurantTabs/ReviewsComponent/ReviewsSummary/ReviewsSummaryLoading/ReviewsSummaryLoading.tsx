import { Skeleton, Grid, Box } from '@mui/material'

const ReviewsSummaryLoading = () => {
	return (
		<Grid container mb={3} spacing={1}>
			<Grid
				item
				xs={12}
				md={2}
				sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
				<Box
					sx={{
						width: '100%',
						display: 'flex',
						flexDirection: 'column',
						justifyContent: 'center',
						alignItems: 'center',
					}}>
					<Skeleton variant='rectangular' height={40} width='80%' />
					<Skeleton variant='text' width='100%'></Skeleton>
					<Skeleton variant='text' width='50%'></Skeleton>
				</Box>
			</Grid>
			<Grid item xs={12} md={10}>
				<Skeleton variant='text' height={20}></Skeleton>
				<Skeleton variant='text' height={20}></Skeleton>
				<Skeleton variant='text' height={20}></Skeleton>
				<Skeleton variant='text' height={20}></Skeleton>
				<Skeleton variant='text' height={20}></Skeleton>
			</Grid>
		</Grid>
	)
}

export default ReviewsSummaryLoading
