import { Typography, Rating, Box, Button, TextField } from '@mui/material'
import * as yup from 'yup'
import { useFormik } from 'formik'
import { db } from '../../../../../config/firebaseConfig'
import { updateDoc, doc } from 'firebase/firestore'
import { useState } from 'react'
import { useSnackbar } from 'notistack'
import TitleWithSubtitle from '../../../../../components/TitleWithSubtitle/TitleWithSubtitle'
import { EditSingleReviewProps } from '../../../../../types/types'
import { TextFieldValidation } from '../../../../../helpers/formValidations'
const validationSchema = yup.object({
	textField: TextFieldValidation,
})

const EditSingleReview = ({
	value,
	comment,
	reviewId,
	restaurantId,
	setIsEditing,
	handleClose,
	setReviews,
	reviews,
}: EditSingleReviewProps) => {
	const [ratingValue, setRatingValue] = useState(value)
	const { enqueueSnackbar } = useSnackbar()

	const submit = async () => {
		if (ratingValue !== null) {
			try {
				const reviewRef = doc(db, 'Restaurants', restaurantId, 'Reviews', reviewId)
				console.log(ratingValue)
				await updateDoc(reviewRef, {
					comment: formik.values.textField,
					value: ratingValue,
					edited: true,
				})

				const updatedReviews = reviews.map(review => {
					if (review.reviewId === reviewId) {
						return {
							...review,
							comment: formik.values.textField,
							value: ratingValue,
							edited: true,
						}
					}
					return review
				})

				setReviews(updatedReviews)
				setIsEditing(false)
				enqueueSnackbar('Opinia została zmieniona!')
			} catch (error) {
				console.error('Wystąpił błąd podczas aktualizacji opinii:', error)
				enqueueSnackbar('Wystąpił błąd podczas aktualizacji opinii.', { variant: 'error' })
			}
		}
	}

	const formik = useFormik({
		initialValues: {
			textField: comment,
		},
		validationSchema: validationSchema,
		onSubmit: submit,
	})

	const handleRatingChange = (_: React.ChangeEvent<{}>, newValue: number) => {
		setRatingValue(newValue)
	}

	return (
		<Box>
			<TitleWithSubtitle title='Edytuj opinię' subtitle='Dostosuj swoją opinię' />

			<Typography variant='body1'>Ocena:</Typography>

			<Rating value={ratingValue} onChange={(event, newValue) => handleRatingChange(event, newValue!)} />

			<Typography variant='body1'>Opinia:</Typography>
			<form onSubmit={formik.handleSubmit}>
				<TextField
					name='textField'
					fullWidth
					onChange={formik.handleChange}
					error={formik.touched.textField && Boolean(formik.errors.textField)}
					helperText={formik.touched.textField && formik.errors.textField}
					value={formik.values.textField}
					multiline
					rows={4}
				/>
				<Box
					sx={{
						display: 'flex',
						justifyContent: 'space-between',
						alignItems: 'center',
						gap: '15px',
						mt: 2,
						width: '100%',
					}}>
					<Button sx={{ fontWeight: 600 }} fullWidth type='submit' variant='contained' disabled={ratingValue === null}>
						Zapisz
					</Button>
					<Button sx={{ fontWeight: 600 }} fullWidth variant='contained' onClick={handleClose}>
						Anuluj
					</Button>
				</Box>
			</form>
		</Box>
	)
}

export default EditSingleReview
