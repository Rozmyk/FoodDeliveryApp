import './App.css'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { SnackbarProvider } from 'notistack'
import { CartProvider } from './contexts/CartContext'
import { AuthProvider } from './contexts/AuthContext'
import Home from './pages/Home/Home'
import Navbar from './components/Navbar/Navbar'
import Footer from './components/Footer/Footer'
import { RestaurantsContextProvider } from './contexts/RestaurantsDataContext'
import RestaurantsOverview from './pages/RestaurantsOverview/RestaurantsOverview'
import ErrorPage from './pages/ErrorPage/ErrorPage'
import Login from './pages/Login/Login'
import Register from './pages/Register/Register'
import Profile from './pages/Profile/Profile'
import RestaurantDetails from './pages/RestaurantDetails/RestaurantDetails'
import Cart from './pages/Cart/Cart'
import Information from './pages/Information/Information'
import LoadingScreen from './components/LoadingScreen/LoadingScreen'
import { useEffect } from 'react'

function App() {
	const theme = createTheme({
		palette: {
			mode: 'light',
			primary: {
				main: '#348756',
			},
			secondary: {
				main: '#2D2D2D',
			},
			info: {
				main: '#0288d1',
			},
			background: {
				default: '#f5f5f5',
				paper: '#fefefe',
			},
			text: {
				disabled: '#53486f',
				primary: '#717170',
				secondary: '#171215',
			},
		},
	})

	const ScrollToTop = () => {
		const location = useLocation()

		useEffect(() => {
			window.scrollTo(0, 0)
		}, [location])

		return null
	}

	return (
		<div className='App'>
			<BrowserRouter>
				<RestaurantsContextProvider>
					<SnackbarProvider
						maxSnack={1}
						variant='success'
						autoHideDuration={2000}
						anchorOrigin={{
							vertical: 'top',
							horizontal: 'center',
						}}>
						<ThemeProvider theme={theme}>
							<CartProvider>
								<AuthProvider>
									<Navbar></Navbar>
									<LoadingScreen></LoadingScreen>
									<ScrollToTop />
									<Routes>
										<Route path='/' element={<Home></Home>} />
										<Route path='/restaurants/*' element={<RestaurantsOverview></RestaurantsOverview>} />
										<Route path='/restaurants/:id' element={<RestaurantDetails></RestaurantDetails>} />
										<Route path='/profile' element={<Profile></Profile>} />
										<Route path='/login' element={<Login></Login>} />
										<Route path='*' element={<ErrorPage />} />
										<Route path='information' element={<Information></Information>} />
										<Route path='/register' element={<Register></Register>} />
									</Routes>
									<Cart></Cart>
									<Footer></Footer>
								</AuthProvider>
							</CartProvider>
						</ThemeProvider>
					</SnackbarProvider>
				</RestaurantsContextProvider>
			</BrowserRouter>
		</div>
	)
}

export default App
