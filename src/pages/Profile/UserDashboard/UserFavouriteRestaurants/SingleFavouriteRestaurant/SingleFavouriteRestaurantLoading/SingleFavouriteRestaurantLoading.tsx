import { List, ListItem, ListItemAvatar, ListItemText, Skeleton } from '@mui/material'
const SingleFavouriteRestaurantLoading = () => {
	return (
		<List>
			<ListItem>
				<ListItemAvatar>
					<Skeleton width={70} height={70} variant='circular'></Skeleton>
				</ListItemAvatar>
				<ListItemText sx={{ textTransform: 'capitalize' }} primary={<Skeleton width={100} variant='text'></Skeleton>} secondary={<Skeleton width={150} variant='text'></Skeleton>} />
			</ListItem>
		</List>
	)
}

export default SingleFavouriteRestaurantLoading
