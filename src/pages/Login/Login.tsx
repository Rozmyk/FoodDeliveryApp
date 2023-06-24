import { Container } from '@mui/system'
import { Typography, Box, TextField, Button, Link, IconButton, Divider, InputAdornment } from '@mui/material'
import useWebsiteTitle from '../../hooks/useWebsiteTitle'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useAuth } from '../../contexts/AuthContext'
import VisibilityIcon from '@mui/icons-material/Visibility'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'
import * as yup from 'yup'
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth'
import { getAuth } from 'firebase/auth'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { useFormik } from 'formik'
import { useSnackbar } from 'notistack'
import { emailValidation, passwordValidation } from '../../helpers/formValidations'
import TitlePage from '../../components/TitlePage/TitlePage'
import setUpErrorMessage from '../../helpers/errorUtils'
import GoogleButton from '../../components/GoogleButton/GoogleButton'

const validationSchema = yup.object({
	email: emailValidation,
	password: passwordValidation,
})
export default function Login() {
	const provider = new GoogleAuthProvider()
	const { login } = useAuth()
	useWebsiteTitle('Zaloguj się')
	const navigate = useNavigate()

	const [showPassword, setShowPassword] = useState(false)
	const { enqueueSnackbar } = useSnackbar()

	const [loading, setLoading] = useState(false)

	const handleTogglePasswordVisibility = () => {
		setShowPassword(!showPassword)
	}

	const submit = async () => {
		try {
			setLoading(true)
			const auth = getAuth()
			const userCredential = await signInWithEmailAndPassword(auth, formik.values.email, formik.values.password)

			const dataToLogin = {
				email: userCredential.user.email,
				localId: userCredential.user.uid,
				name: userCredential.user.displayName,
				photoUrl: userCredential.user.photoURL,
				creationTime: userCredential.user.metadata.creationTime,
			}
			login(dataToLogin)

			setLoading(false)
		} catch (error) {
			console.log(error)
			setUpErrorMessage((error as Error).message, enqueueSnackbar)
			setLoading(false)
		}
	}
	const signInWithGoogle = () => {
		const auth = getAuth()
		signInWithPopup(auth, provider)
			.then(result => {
				const user = result.user

				const dataToLogin = {
					email: user.email,
					localId: user.uid,
					name: user.displayName,
					photoUrl: user.photoURL,
					creationTime: user.metadata.creationTime,
				}

				login(dataToLogin)
			})
			.catch(error => {
				setUpErrorMessage(error.message, useSnackbar)
			})
	}

	const formik = useFormik({
		initialValues: {
			email: '',
			password: '',
		},
		validationSchema: validationSchema,
		onSubmit: submit,
	})

	return (
		<Container
			maxWidth='sm'
			sx={{
				height: 'calc(100vh - 75px)',
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'center',
				alginItems: 'center',
			}}>
			<TitlePage title='Zaloguj się' description='Zaloguj się aby uzyskać dostęp do całego serwisu'></TitlePage>
			<Box
				sx={{
					display: 'flex',
					flexDirection: 'column',
					justifyContent: 'center',
					alignItems: 'center',
					gap: '16px',
					marginTop: '16px',
					width: '100%',
				}}>
				<form onSubmit={formik.handleSubmit}>
					<TextField
						fullWidth
						id='email'
						name='email'
						variant='standard'
						label='Email'
						value={formik.values.email}
						onChange={formik.handleChange}
						error={formik.touched.email && Boolean(formik.errors.email)}
						helperText={formik.touched.email && formik.errors.email}
					/>
					<TextField
						fullWidth
						id='password'
						name='password'
						variant='standard'
						label='Hasło'
						type={showPassword ? 'text' : 'password'}
						value={formik.values.password}
						onChange={formik.handleChange}
						error={formik.touched.password && Boolean(formik.errors.password)}
						helperText={formik.touched.password && formik.errors.password}
						InputProps={{
							endAdornment: (
								<InputAdornment position='end'>
									<IconButton onClick={handleTogglePasswordVisibility}>
										{showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
									</IconButton>
								</InputAdornment>
							),
						}}
					/>

					<Button
						color='primary'
						variant='contained'
						disabled={loading}
						fullWidth
						type='submit'
						sx={{ fontWeight: 600, color: 'white', marginTop: '15px' }}>
						{loading ? 'Ładowanie...' : 'Zaloguj się'}
					</Button>
				</form>

				<Divider variant='middle' />
				<Box
					sx={{
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'center',
						marginTop: '16px',
						backgroundColor: 'background.default',
						borderRadius: '15px',
						padding: '10px',
					}}>
					<Typography variant='body2' fontWeight={600}>
						Nie masz konta?
						<Link
							variant='body2'
							sx={{ cursor: 'pointer', marginLeft: '5px' }}
							fontWeight='600'
							onClick={() => {
								navigate('/register')
							}}>
							Zarejestruj się
						</Link>
					</Typography>
				</Box>
				<Divider sx={{  width:'100%' }} variant='middle'>
					Lub
				</Divider>
				
				<GoogleButton loading={loading} onClick={signInWithGoogle} text='Zaloguj się z Google' />
			</Box>
		</Container>
	)
}
