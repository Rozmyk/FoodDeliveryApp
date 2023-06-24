import { Container } from '@mui/system'
import { Typography, Box, TextField, Link, Button, InputAdornment, IconButton, Divider } from '@mui/material'
import useWebsiteTitle from '../../hooks/useWebsiteTitle'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import TitlePage from '../../components/TitlePage/TitlePage'
import { useFormik } from 'formik'
import * as yup from 'yup'
import VisibilityIcon from '@mui/icons-material/Visibility'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'
import GoogleButton from '../../components/GoogleButton/GoogleButton'
import {
	getAuth,
	createUserWithEmailAndPassword,
	updateProfile,
	GoogleAuthProvider,
	signInWithPopup,
} from 'firebase/auth'
import { emailValidation, passwordValidation, repeatPasswordValidation } from '../../helpers/formValidations'
import { getFirestore, doc, setDoc } from 'firebase/firestore'
import setUpErrorMessage from '../../helpers/errorUtils'
import { useAuth } from '../../contexts/AuthContext'
import { enqueueSnackbar } from 'notistack'

const validationSchema = yup.object({
	email: emailValidation,
	password: passwordValidation,
	repeatPassword: repeatPasswordValidation,
	firstName: yup.string().required('Pole Imię jest obowiązkowe'),
	lastName: yup.string().required('Pole Nazwisko jest obowiązkowe'),
})

function Register(): JSX.Element {
	const { login } = useAuth()
	const [loading, setLoading] = useState(false)
	const [showPassword, setShowPassword] = useState(false)
	useWebsiteTitle('Zarejestruj się')

	const navigate = useNavigate()

	const submit = async () => {
		try {
			setLoading(true)
			const auth = getAuth()
			const { user } = await createUserWithEmailAndPassword(auth, formik.values.email, formik.values.password)
			await updateProfile(user, { displayName: `${formik.values.firstName} ${formik.values.lastName}` })
			createUserCollection(user.uid)
			const dataToLogin = {
				email: user.email,
				localId: user.uid,
				name: user.displayName,
				photoUrl: user.photoURL,
				creationTime: user.metadata.creationTime,
			}
			login(dataToLogin)
		} catch (error) {
			console.log(error)
			setUpErrorMessage((error as Error).message, enqueueSnackbar)
			setLoading(false)
		} finally {
			setLoading(false)
		}
	}
	const signInWithGoogle = async () => {
		try {
			setLoading(true)
			const auth = getAuth()
			const provider = new GoogleAuthProvider()
			const { user } = await signInWithPopup(auth, provider)
			await updateProfile(user, { displayName: user.displayName })
			createUserCollection(user.uid)
			const dataToLogin = {
				email: user.email,
				localId: user.uid,
				name: user.displayName,
				photoUrl: user.photoURL,
				creationTime: user.metadata.creationTime,
			}
			login(dataToLogin)
		} catch (error) {
			console.log(error)
			setUpErrorMessage((error as Error).message, enqueueSnackbar)
			setLoading(false)
		} finally {
			setLoading(false)
		}
	}

	const handleTogglePasswordVisibility = () => {
		setShowPassword(!showPassword)
	}

	async function createUserCollection(userId: string) {
		try {
			const db = getFirestore()
			const userRef = doc(db, 'users', userId)
			await setDoc(userRef, {
				favoriteRestaurants: [],
				comments: [],
			})
		} catch (error) {
			console.log('Błąd podczas tworzenia kolekcji użytkownika:', error)
		}
	}

	const formik = useFormik({
		initialValues: {
			firstName: '',
			lastName: '',
			email: '',
			password: '',
			repeatPassword: '',
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
			<TitlePage title='Zarejestruj się' description=' Stwórz swoje konto, aby móc skorzystać z naszego serwisu' />
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
					<Box
						sx={{
							display: 'flex',
							justifyContent: 'center',
							alignItems: 'center',
							gap: '10px',
						}}>
						<TextField
							fullWidth
							id='firstName'
							name='firstName'
							label='Imię'
							variant='standard'
							value={formik.values.firstName}
							onChange={formik.handleChange}
							error={formik.touched.firstName && Boolean(formik.errors.firstName)}
							helperText={formik.touched.firstName && formik.errors.firstName}
						/>
						<TextField
							fullWidth
							id='lastName'
							name='lastName'
							variant='standard'
							label='Nazwisko'
							value={formik.values.lastName}
							onChange={formik.handleChange}
							error={formik.touched.lastName && Boolean(formik.errors.lastName)}
							helperText={formik.touched.lastName && formik.errors.lastName}
						/>
					</Box>
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
					<TextField
						fullWidth
						id='repeatPassword'
						name='repeatPassword'
						variant='standard'
						label='Powtórz hasło'
						type={showPassword ? 'text' : 'password'}
						value={formik.values.repeatPassword}
						onChange={formik.handleChange}
						error={formik.touched.repeatPassword && Boolean(formik.errors.repeatPassword)}
						helperText={formik.touched.repeatPassword && formik.errors.repeatPassword}
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
						sx={{ fontWeight: 600, marginTop: '15px' }}>
						Zarejestruj się
					</Button>
				</form>
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
						Masz już konto?
						<Link
							variant='body2'
							sx={{ cursor: 'pointer', marginLeft: '5px' }}
							fontWeight='600'
							onClick={() => {
								navigate('/login')
							}}>
							Zaloguj się
						</Link>
					</Typography>
				</Box>
				<Divider sx={{  width:'100%' }} variant='middle'>
					Lub
				</Divider>

				<GoogleButton loading={loading} onClick={signInWithGoogle} text='Zarejestruj się z google' />
			</Box>
		</Container>
	)
}

export default Register
