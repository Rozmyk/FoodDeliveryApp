import { useSnackbar } from 'notistack'
import { useState } from 'react'
import { Button, TextField, Tooltip, Typography, Rating, Box, Modal, Avatar } from '@mui/material'
import { useAuth } from '../../../contexts/AuthContext'
import { useFormik } from 'formik'
import { TextFieldValidation } from '../../../helpers/formValidations'
import { collection, addDoc, updateDoc } from 'firebase/firestore'
import { db, serverTimestamp } from '../../../config/firebaseConfig'
import { RateRestaurantProps } from '../../../types/types'

export default function RateRestaurant(props: RateRestaurantProps) {
	const { isAuthenticated, userData } = useAuth()
	const { enqueueSnackbar } = useSnackbar()
	const [value, setValue] = useState<number | null>(null)
	const [open, setOpen] = useState<boolean>(false)
	const [errorText, setErrorText] = useState<string>('')
	const handleOpen = () => setOpen(true)
	const handleClose = () => {
		setOpen(false)
		formik.resetForm()
		setValue(0)
		setErrorText('')
	}

	const style: React.CSSProperties = {
		position: 'absolute',
		top: '50%',
		left: '50%',
		transform: 'translate(-50%, -50%)',
		width: 350,
		backgroundColor: 'background.paper',
		boxShadow: '24px',
		borderRadius: '15px',
		padding: '16px',
	}

	const buttonStyle: React.CSSProperties = {
		color: 'white',
		fontWeight: '600',
	}

	const submit = async () => {
		try {
			if (value != null && props.id != undefined) {
				setErrorText('')

				const reviewData = {
					value: value,
					userData: {
						localId: userData.localId,
						name: userData.name,
						photoUrl: userData.photoUrl ?? '',
					},
					comment: formik.values.textField,
					timestamp: serverTimestamp(),
					restaurantPhoto: props.restaurantPhoto,
					restaurantId: props.id,
					restaurantName: props.restaurantName,
					reviewId: '',
				}

				const reviewRef = await addDoc(collection(db, 'Restaurants', props.id, 'Reviews'), reviewData)
				const reviewId = reviewRef.id

				await updateDoc(reviewRef, {
					reviewId: reviewId,
				})

				enqueueSnackbar('Twoja opinia została dodana!')
				handleClose()
			} else {
				setErrorText('Oceń restaurację!')
			}
		} catch (err) {
			enqueueSnackbar('Wystąpił problem z dodaniem opinii', { variant: 'error' })
			console.log(err)
		}
	}

	const checkAuth = () => {
		if (isAuthenticated) {
			handleOpen()
		} else {
			enqueueSnackbar('Musisz być zalogowany aby dodać opinię', { variant: 'error' })
		}
	}

	const formik = useFormik({
		initialValues: {
			textField: '',
		},
		validationSchema: TextFieldValidation,
		onSubmit: submit,
	})

	return (
		<Box>
			<Tooltip title='Dodaj opinię'>
				<Button size='small' variant='contained' sx={{ color: 'white', fontWeight: '600' }} onClick={checkAuth}>
					Dodaj opinię
				</Button>
			</Tooltip>
			<Modal
				open={open}
				onClose={handleClose}
				aria-labelledby='modal-modal-title'
				aria-describedby='modal-modal-description'>
				<Box sx={style}>
					<form onSubmit={formik.handleSubmit}>
						<Box sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', gap: '15px', mb: '15px' }}>
							<Avatar
								src={userData.photoUrl || undefined} //
								alt={userData.name || undefined}></Avatar>
							<Box>
								<Typography>{userData.name}</Typography>
								<Rating
									name='half-rating'
									onChange={(_, newValue) => {
										setValue(newValue)
										setErrorText('')
									}}
									defaultValue={0}
									value={value}
									precision={1}
								/>

								{errorText && (
									<Typography variant='body2' color='error'>
										{errorText}
									</Typography>
								)}
							</Box>
						</Box>

						<TextField
							fullWidth
							id='textField'
							name='textField'
							variant='outlined'
							label='Napisz opinię'
							type='text'
							value={formik.values.textField}
							onChange={formik.handleChange}
							error={formik.touched.textField && Boolean(formik.errors.textField)}
							helperText={formik.touched.textField && formik.errors.textField}
							multiline
							rows={4}
						/>

						<Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '15px', mt: 2 }}>
							<Button fullWidth variant='contained' sx={buttonStyle} onClick={handleClose}>
								Anuluj
							</Button>
							<Button
								fullWidth
								disabled={value === null || value === 0}
								type='submit'
								sx={buttonStyle}
								variant='contained'>
								Wyślij
							</Button>
						</Box>
					</form>
				</Box>
			</Modal>
		</Box>
	)
}
