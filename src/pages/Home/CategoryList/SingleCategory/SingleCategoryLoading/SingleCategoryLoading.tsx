import { Skeleton, Box } from '@mui/material'
const SingleCategoryLoading = () => {
	return (
		<>
			<Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
				<Skeleton variant='circular' sx={{ padding: '10px' }} width={60} height={60}></Skeleton>
				<Skeleton variant='text' width={100}></Skeleton>
			</Box>
		</>
	)
}

export default SingleCategoryLoading
