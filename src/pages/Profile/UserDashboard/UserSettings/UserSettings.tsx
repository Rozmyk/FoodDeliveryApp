import { Button, TextField, Box, Typography } from '@mui/material'
import { useAuth } from '../../../../contexts/AuthContext'
import UpdatePhoto from './UpdatePhoto/UpdatePhoto'
import TitleWithSubtitle from '../../../../components/TitleWithSubtitle/TitleWithSubtitle'
import { displayNameValidation } from '../../../../helpers/formValidations'
import * as yup from 'yup'
import { useFormik } from 'formik'
import { useState } from 'react'
import DeleteAccount from './DeleteAccount/DeleteAccount'
const validationSchema = yup.object({
	displayName: displayNameValidation,
})
const UserSettings = () => {
	const { userData, updateDisplayName } = useAuth()
	const [errorMessage, setErrorMessage] = useState('')
	const submit = () => {
		const displayName = formik.values.displayName
		if (displayName !== null) {
			updateDisplayName(displayName)
		} else {
			setErrorMessage('Wprowadź adres URL!')
		}
	}
	const formik = useFormik({
		initialValues: {
			displayName: userData.name,
		},
		validationSchema: validationSchema,
		onSubmit: submit,
	})
	return (
		<>
			<TitleWithSubtitle
				title='Personalizacja profilu'
				subtitle='Dostosuj swój profil i preferencje użytkownika'></TitleWithSubtitle>
			<UpdatePhoto></UpdatePhoto>
			<form onSubmit={formik.handleSubmit}>
				<Box sx={{ display: 'flex', alignItems: 'center', gap: '15px', mt: 5, mb: 5 }}>
					<Box>
						<TextField
							id='displayName'
							name='displayName'
							value={formik.values.displayName}
							onChange={formik.handleChange}
							error={formik.touched.displayName && Boolean(formik.errors.displayName)}
							helperText={formik.touched.displayName && formik.errors.displayName}
							variant='standard'
							label='Wyświetlana nazwa'></TextField>
						{errorMessage && <Typography color='error'>{errorMessage}</Typography>}
					</Box>
					<Button type='submit' variant='contained'>
						Zaktualizuj
					</Button>
				</Box>
				<DeleteAccount></DeleteAccount>
			</form>
		</>
	)
}

export default UserSettings
