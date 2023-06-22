import { useState } from 'react'
import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	TextField,
	Avatar,
	Box,
	useMediaQuery,
	Typography,
} from '@mui/material'
import * as yup from 'yup'
import { useFormik } from 'formik'
import { useAuth } from '../../../../../contexts/AuthContext'
import { photoUrlValidation } from '../../../../../helpers/formValidations'
const validationSchema = yup.object({
	photoUrl: photoUrlValidation,
})
const UpdatePhoto = () => {
	const [openDialog, setOpenDialog] = useState(false)
	const { userData } = useAuth()
	const { updatePhotoUrl } = useAuth()
	const isSmallScreen = useMediaQuery('(min-width: 500px)')

	const submit = () => {
		changePhotoURL(formik.values.photoUrl)
	}
	const changePhotoURL = (newPhotoURL: string) => {
		updatePhotoUrl(newPhotoURL)
		handleCloseDialog()
	}

	const handleOpenDialog = () => {
		setOpenDialog(true)
	}

	const handleCloseDialog = () => {
		setOpenDialog(false)
		formik.setFieldValue('photoUrl', '')
	}

	const formik = useFormik({
		initialValues: {
			photoUrl: '',
		},
		validationSchema: validationSchema,
		onSubmit: submit,
	})

	return (
		<div>
			<Box
				sx={{
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'flex-start',
					gap: '15px',
					flexDirection: isSmallScreen ? 'row' : 'column',
				}}>
				<Avatar
					sx={{ width: '100px', height: '100px' }}
					src={userData.photoUrl || undefined}
					alt={userData.name || undefined}></Avatar>
				<Box>
					<Box sx={{ display: 'flex', gap: '15px' }}>
						<Button onClick={handleOpenDialog} variant='outlined'>
							Dodaj nowe zdjęcie
						</Button>
						<Button
							variant='contained'
							onClick={() => {
								changePhotoURL('')
							}}>
							Resetuj
						</Button>
					</Box>
					<Typography mt={2} variant='body2'>
						Dozowolone formaty: .PNG, .JPG, .JPEG lub .GIF
					</Typography>
				</Box>
			</Box>
			<Dialog open={openDialog} onClose={handleCloseDialog}>
				<form onSubmit={formik.handleSubmit}>
					<DialogTitle>
						<Typography variant='body1' fontWeight={600} color='text.secondary'>
							Dodaj swoje zdjęcie
						</Typography>
					</DialogTitle>

					<DialogContent>
						<TextField
							id='photoUrl'
							name='photoUrl'
							value={formik.values.photoUrl}
							onChange={formik.handleChange}
							error={formik.touched.photoUrl && Boolean(formik.errors.photoUrl)}
							helperText={formik.touched.photoUrl && formik.errors.photoUrl}
							sx={{ mt: 2 }}
							label='Nowy adres URL zdjęcia'
							fullWidth
						/>
					</DialogContent>
					<DialogActions>
						<Button variant='contained' onClick={handleCloseDialog}>
							Anuluj
						</Button>
						<Button variant='contained' type='submit'>
							Zapisz zmiany
						</Button>
					</DialogActions>
				</form>
			</Dialog>
		</div>
	)
}

export default UpdatePhoto
