import {
	List,
	ListItem,
	Tooltip,
	ListItemText,
	ListItemSecondaryAction,
	IconButton,
	ListItemAvatar,
	Avatar,
} from '@mui/material'
import { motion } from 'framer-motion'
import DeleteIcon from '@mui/icons-material/Delete'
import { collection, deleteDoc, getDocs, query, where } from 'firebase/firestore'
import { db } from '../../../../../config/firebaseConfig'
import { useSnackbar } from 'notistack'
import { useAuth } from '../../../../../contexts/AuthContext'
import { SingleFavouriteRestaurantProps } from '../../../../../types/types'
import { Link } from 'react-router-dom' // Dodany import

export default function SingleFavouriteRestaurant({
	restaurantId,
	photo,
	name,
	category,
	index,
	favRestaurants,
	setFavRestaurants,
}: SingleFavouriteRestaurantProps) {
	const { enqueueSnackbar } = useSnackbar()
	const { userData } = useAuth()

	const deleteRestaurant = async () => {
		try {
			const restaurantQuerySnapshot = await getDocs(
				query(
					collection(db, 'FavouriteRestaurants'),
					where('restaurantId', '==', restaurantId),
					where('userLocalId', '==', userData.localId)
				)
			)
			setFavRestaurants(favRestaurants.filter(x => x.restaurantId !== restaurantId))
			restaurantQuerySnapshot.forEach(async doc => {
				await deleteDoc(doc.ref)
			})
			enqueueSnackbar('Pomyślnie usunięto!')
		} catch (err) {
			console.log(err)
		}
	}

	return (
		<List>
			<motion.div
				initial={{ opacity: 0, y: -20 }}
				animate={{
					opacity: 1,
					y: 0,
					transition: { delay: index * 0.1, y: { stiffness: 1000, velocity: -100 } },
				}}
				transition={{ duration: 0.5 }}>
				<ListItem component={Link} to={`/restaurants/${restaurantId}`} sx={{ textDecoration: 'none', color:'text.secondary' }}>
					<ListItemAvatar>
						<Avatar sx={{ width: 70, height: 70, marginRight: '10px' }} alt={photo.alt} src={photo.url} />
					</ListItemAvatar>
					<ListItemText sx={{ textTransform: 'capitalize' }} primary={name} secondary={category} />
					<ListItemSecondaryAction>
						<Tooltip title='Usuń'>
							<IconButton edge='end' aria-label='delete' onClick={deleteRestaurant}>
								<DeleteIcon />
							</IconButton>
						</Tooltip>
					</ListItemSecondaryAction>
				</ListItem>
			</motion.div>
		</List>
	)
}
