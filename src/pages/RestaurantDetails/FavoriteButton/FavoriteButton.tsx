import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import FavoriteIcon from '@mui/icons-material/Favorite'
import { Box, Tooltip, IconButton } from '@mui/material'
import { useState, useEffect } from 'react'
import { useAuth } from '../../../contexts/AuthContext'
import { motion } from 'framer-motion'
import { useSnackbar } from 'notistack'
import { db } from '../../../config/firebaseConfig'
import { collection, addDoc, deleteDoc, getDocs, query, where } from 'firebase/firestore'
import { FavoriteButtonProps } from '../../../types/types'

export default function FavoriteButton({ name, photo, category, id }: FavoriteButtonProps) {
	const [favourite, setFavourite] = useState(false)
	const { userData, isAuthenticated } = useAuth()
	const { enqueueSnackbar } = useSnackbar()

	const addToFavourite = async () => {
		try {
			const restaurantData = {
				name: name,
				photo: photo,
				category: category,
				restaurantId: id,
				userLocalId: userData.localId,
			}

			const userRef = await addDoc(collection(db, 'FavouriteRestaurants'), restaurantData)
			enqueueSnackbar(`Pomyślnie dodano restaurację ${name} do ulubionych`)
			setFavourite(true)
		} catch (err) {
			console.log(err)
		}
	}

	const removeFromFavourite = async () => {
		try {
			const restaurantQuerySnapshot = await getDocs(
				query(
					collection(db, 'FavouriteRestaurants'),
					where('restaurantId', '==', id),
					where('userLocalId', '==', userData.localId)
				)
			)

			restaurantQuerySnapshot.forEach(async doc => {
				await deleteDoc(doc.ref)
			})
			enqueueSnackbar(`Pomyślnie usunięto restaurację ${name} z ulubionych`)
			setFavourite(false)
		} catch (err) {
			console.log(err)
		}
	}

	const checkIfRestaurantExists = async () => {
		try {
			const q = query(
				collection(db, 'FavouriteRestaurants'),
				where('userLocalId', '==', userData.localId),
				where('restaurantId', '==', id)
			)
			const querySnapshot = await getDocs(q)

			setFavourite(!querySnapshot.empty)
		} catch (error) {
			console.error('Błąd sprawdzania ulubionych:', error)
		}
	}

	useEffect(() => {
		isAuthenticated && checkIfRestaurantExists()
	}, [])

	const handleButtonClick = () => {
		if (favourite) {
			removeFromFavourite()
		} else {
			addToFavourite()
		}
	}

	return (
		<>
			<Box sx={{ backgroundColor: 'background.default', borderRadius: '50%' }}>
				<Tooltip title={favourite ? 'Usuń z ulubionych' : 'Dodaj do ulubionych'}>
					<motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
						<IconButton sx={{ width: '48px', height: '48px' }} onClick={handleButtonClick}>
							{favourite ? <FavoriteIcon color='error' /> : <FavoriteBorderIcon />}
						</IconButton>
					</motion.div>
				</Tooltip>
			</Box>
		</>
	)
}
