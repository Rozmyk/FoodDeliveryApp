import {
	Rating,
	Typography,
	Box,
	Avatar,
	IconButton,
	Tooltip,
	Grid,
	Divider,
	Stack,
	Modal,
	useMediaQuery,
} from '@mui/material'
import { useState } from 'react'
import { motion } from 'framer-motion'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import { deleteDoc, doc } from 'firebase/firestore'
import { db } from '../../../../../config/firebaseConfig'
import getTimeDifference from '../../../../../helpers/getTimeDifference'
import { useSnackbar } from 'notistack'
import { SingleUserReviewProps } from '../../../../../types/types'
import EditSingleReview from '../EditSingleReview/EditSingleReview'
export default function SingleReview({
	restaurantId,
	reviewId,
	timestamp,
	reviews,
	setReviews,
	index,
	comment,
	value,
	restaurantName,
	restaurantPhoto,
}: SingleUserReviewProps) {
	const { enqueueSnackbar } = useSnackbar()
	const isScreenLarge = useMediaQuery('(min-width:600px)')

	const [isEditing, setIsEditing] = useState(false)
	const style = {
		position: 'absolute',
		top: '50%',
		left: '50%',
		transform: 'translate(-50%, -50%)',
		width: 350,
		bgcolor: 'background.paper',
		boxShadow: 24,
		borderRadius: '15px',
		p: 4,
	}
	const deleteReview = async () => {
		try {
			await deleteDoc(doc(db, 'Restaurants', restaurantId, 'Reviews', reviewId))
			setReviews(prevReviews => prevReviews.filter(review => review.reviewId !== reviewId))

			enqueueSnackbar('Opinia została pomyślnie usunięta!')
		} catch (error) {
			enqueueSnackbar('Wystąpił błąd podczas usuwania opinii')
		}
	}
	const handleClose = () => {
		setIsEditing(false)
	}
	const timeDifference = timestamp ? getTimeDifference(timestamp) : ''
	return (
		<>
			<Modal open={isEditing} onClose={handleClose}>
				<Box sx={style}>
					<EditSingleReview
						setIsEditing={setIsEditing}
						value={value}
						comment={comment}
						reviewId={reviewId}
						restaurantId={restaurantId}
						reviews={reviews}
						setReviews={setReviews}
						handleClose={handleClose}></EditSingleReview>
				</Box>
			</Modal>
			<Box
				sx={{
					display: 'flex',
					flexDirection: 'column',
					maxWidth: '100%',
					width: '100%',
					mb: 3,
					padding: '10px',
				}}>
				<motion.div
					initial={{ opacity: 0, y: -20 }}
					animate={{
						opacity: 1,
						y: 0,
						transition: { delay: index * 0.1, y: { stiffness: 1000, velocity: -100 } },
					}}
					transition={{ duration: 0.5 }}>
					<Grid container mb={3} spacing={1}>
						<Grid
							item
							xs={12}
							md={1}
							sx={{ padding: '10px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
							<Avatar sx={{ width: 70, height: 70 }} alt={restaurantPhoto.alt} src={restaurantPhoto.url}></Avatar>
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
							<Typography>{restaurantName}</Typography>
							<Box sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', gap: '5px', mb: 2 }}>
								<Rating size='small' readOnly value={value}></Rating>
								<Typography variant='caption' color='text.primary'>
									&#x2022;
								</Typography>
								<Typography variant='caption' color='text.primary'>
									{timeDifference}
								</Typography>
							</Box>
							<Typography variant='body2'>{comment}</Typography>
						</Grid>
						<Grid item xs={12} md={1} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
							<Stack direction='row'>
								<Tooltip title='Edytuj opinię'>
									<IconButton
										onClick={() => {
											setIsEditing(true)
										}}>
										<EditIcon></EditIcon>
									</IconButton>
								</Tooltip>
								<Tooltip title='Usuń opinię'>
									<IconButton onClick={deleteReview}>
										<DeleteIcon></DeleteIcon>
									</IconButton>
								</Tooltip>
							</Stack>
						</Grid>
					</Grid>
				</motion.div>
				<Divider />
			</Box>
		</>
	)
}
