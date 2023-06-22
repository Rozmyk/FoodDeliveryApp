import React, { createContext, useContext, useState, useEffect } from 'react'
import { useSnackbar } from 'notistack'
import { getAuth, updateProfile } from 'firebase/auth'
import { useNavigate, useLocation } from 'react-router-dom'
import { UserData, AuthContextProps } from '../types/types'

const AuthContext = createContext<AuthContextProps | null>(null)

function AuthProvider(props: { children: React.ReactNode }) {
	const auth = getAuth()
	const navigate = useNavigate()
	const location = useLocation()
	const [isAuthenticated, setIsAuthenticated] = useState(false)
	const [userData, setUserData] = useState<UserData>({
		name: '',
		email: '',
		photoUrl: '',
		localId: '',
		creationTime: '',
	})
	const { enqueueSnackbar } = useSnackbar()

	const login = (user: UserData): void => {
		const { email, localId, name, photoUrl, creationTime } = user

		setIsAuthenticated(true)
		setUserData({
			name,
			email,
			photoUrl,
			localId,
			creationTime,
		})

		const userDataString = JSON.stringify(user)
		localStorage.setItem('userData', userDataString)
		enqueueSnackbar('Pomyślnie zalogowano!')
		if (location.pathname === '/login' || location.pathname === '/register') {
			navigate('/profile')
		}
	}

	const logout = (): void => {
		setIsAuthenticated(false)
		setUserData({
			name: '',
			email: '',
			photoUrl: '',
			localId: '',
			creationTime: '',
		})
		localStorage.removeItem('userData')
		localStorage.removeItem('lastVisitedRestaurant')
		enqueueSnackbar('Pomyślnie wylogowano!')
	}

	const updatePhotoUrl = async (photoUrl: string): Promise<void> => {
		try {
			const currentUser = auth.currentUser
			if (currentUser) {
				await updateProfile(currentUser, { photoURL: photoUrl })

				setUserData(prevUserData => ({
					...prevUserData,
					photoUrl: photoUrl,
				}))

				localStorage.setItem('userData', JSON.stringify(userData))
				enqueueSnackbar('Zaktualizowano zdjęcie profilowe!')
			}
		} catch (error: any) {
			enqueueSnackbar(`Błąd aktualizacji zdjęcia profilowego: ${error.message}`)
		}
	}

	const updateDisplayName = async (displayName: string): Promise<void> => {
		try {
			const currentUser = auth.currentUser
			if (currentUser) {
				await updateProfile(currentUser, { displayName })

				setUserData(prevUserData => ({
					...prevUserData,
					name: displayName,
				}))

				localStorage.setItem('userData', JSON.stringify(userData))
				enqueueSnackbar('Zaktualizowano nazwę użytkownika!')
			}
		} catch (error: any) {
			enqueueSnackbar(`Błąd aktualizacji nazwy użytkownika: ${error.message}`)
		}
	}

	const deleteAccount = async (): Promise<void> => {
		try {
			await auth.currentUser?.delete()

			setIsAuthenticated(false)
			setUserData({
				name: '',
				email: '',
				photoUrl: '',
				localId: '',
				creationTime: '',
			})
			localStorage.removeItem('userData')
			localStorage.removeItem('lastVisitedRestaurant')
			enqueueSnackbar('Pomyślnie usunięto konto!')
			navigate('/')
		} catch (error: any) {
			enqueueSnackbar(`Błąd usuwania konta: ${error.message}`)
		}
	}

	useEffect(() => {
		const storedUserData = localStorage.getItem('userData')
		if (storedUserData) {
			const parsedUserData = JSON.parse(storedUserData)
			setTimeout(() => {
				login(parsedUserData)
			}, 100)
		}
	}, [])

	return (
		<AuthContext.Provider
			value={{
				isAuthenticated,
				login,
				logout,
				userData,
				updatePhotoUrl,

				updateDisplayName,
				deleteAccount,
			}}>
			{props.children}
		</AuthContext.Provider>
	)
}

function useAuth(): AuthContextProps {
	const context = useContext(AuthContext)
	if (!context) {
		throw new Error('useAuth must be used within an AuthProvider')
	}
	return context
}

export { AuthProvider, useAuth }
