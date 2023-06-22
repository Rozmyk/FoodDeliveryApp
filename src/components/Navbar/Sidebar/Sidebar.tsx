import {
	Drawer,
	List,
	ListItem,
	ListItemText,
	Box,
	Avatar,
	Typography,
	ListItemButton,
	ListItemIcon,
	Button,
	Divider,
} from '@mui/material'
import { useAuth } from '../../../contexts/AuthContext'
import { useNavigate } from 'react-router-dom'
import RestaurantIcon from '@mui/icons-material/Restaurant'
import InfoIcon from '@mui/icons-material/Info'
import LogoutIcon from '@mui/icons-material/Logout'
import PersonIcon from '@mui/icons-material/Person'
import HomeRoundedIcon from '@mui/icons-material/HomeRounded'
import userBackground from '../../../assets/photos/userBackground.jpg'
import { SidebarProps } from '../../../types/types'
export default function Sidebar({ showSidebar, setShowSidebar }: SidebarProps) {
	const { userData, isAuthenticated, logout } = useAuth()
	const navigate = useNavigate()

	const toggleDrawer = () => {
		setShowSidebar(!showSidebar)
	}

	const handleNavigate = (pathname: string) => {
		navigate(pathname)
		toggleDrawer()
	}

	const loggedInMenu = [
		{ title: 'Strona głowna', icon: <HomeRoundedIcon />, pathname: '/' },
		{
			title: 'Restauracje',
			icon: <RestaurantIcon />,
			pathname: '/restaurants',
		},

		{
			title: 'Profil',
			icon: <PersonIcon />,
			pathname: '/profile',
		},
		{
			title: 'Informacje',
			icon: <InfoIcon />,
			pathname: '/information',
		},
	]
	const loggedOutMenu = [
		{ title: 'Strona głowna', icon: <HomeRoundedIcon />, pathname: '/' },

		{
			title: 'Restauracje',
			icon: <RestaurantIcon />,
			pathname: '/restaurants',
		},

		{
			title: 'Informacje',
			icon: <InfoIcon />,
			pathname: '/information',
		},
	]

	const loggedInMenuItems = (
		<>
			<Box
				sx={{
					display: 'flex',
					justifyContent: 'flex-start',
					alignItems: 'center',
					gap: '15px',
					backgroundColor: '#ffffff',
					backgroundImage: `url(${userBackground})`,
					backgroundSize: 'cover',
					height: '200px',
					position: 'relative',
				}}>
				<Box
					sx={{
						position: 'absolute',
						top: 0,
						bottom: 0,
						right: 0,
						left: 0,
						backgroundColor: 'rgba(0, 0, 0, 0.4)',
					}}></Box>
				<Box
					sx={{
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'center',
						gap: '10px',
						marginLeft: '15px',
						position: 'relative',
						zIndex: '5',
					}}>
					<Avatar
						sx={{ width: 50, height: 50 }}
						src={userData.photoUrl || undefined}
						alt={userData.name || undefined}
					/>
					<Box>
						<Typography variant='body1' color='white' fontWeight={600}>
							{userData.name}
						</Typography>
						<Typography color='white'>{userData.email}</Typography>
					</Box>
				</Box>
			</Box>

			<Box
				sx={{
					display: 'flex',
					flexDirection: 'column',
					justifyContent: 'space-between',
					algnItems: 'center',
					height: '100%',
					boxShadow: { xs: 'none', md: '0px 4px 20px rgba(0, 0, 0, 0.1)' },
				}}>
				<List>
					{loggedInMenu.map((el, index) => (
						<ListItem disablePadding key={index}>
							<ListItemButton onClick={() => handleNavigate(el.pathname)}>
								<ListItemIcon>{el.icon}</ListItemIcon>
								<ListItemText sx={{ color: 'text.secondary' }} color='text.primary' primary={el.title} />
							</ListItemButton>
						</ListItem>
					))}
				</List>
				<List>
					<ListItem disablePadding>
						<ListItemButton
							onClick={() => {
								logout()
								toggleDrawer()
							}}>
							<ListItemIcon>
								<LogoutIcon />
							</ListItemIcon>
							<ListItemText sx={{ color: 'text.secondary' }} primary='Wyloguj się' />
						</ListItemButton>
					</ListItem>
				</List>
			</Box>
		</>
	)
	const loggedOutMenuItems = (
		<>
			<Box
				sx={{
					display: 'flex',
					flexDirection: 'column',
					justifyContent: 'center',
					alignItems: 'center',
					gap: '10px',
					padding: '15px',
				}}>
				<Button
					onClick={() => {
						navigate('/login')
						toggleDrawer()
					}}
					fullWidth
					sx={{ fontWeight: 600, color: 'white' }}
					variant='contained'>
					Zaloguj się
				</Button>
				<Button
					onClick={() => {
						navigate('/register')
						toggleDrawer()
					}}
					fullWidth
					sx={{ fontWeight: 600 }}
					variant='outlined'>
					Zarejestruj się
				</Button>
			</Box>
			<Divider variant='middle'></Divider>
			<List>
				{loggedOutMenu.map((el, index) => (
					<ListItem disablePadding key={index}>
						<ListItemButton onClick={() => handleNavigate(el.pathname)}>
							<ListItemIcon>{el.icon}</ListItemIcon>
							<ListItemText sx={{ color: 'text.secondary' }} primary={el.title} />
						</ListItemButton>
					</ListItem>
				))}
			</List>
		</>
	)

	return (
		<>
			<Drawer anchor='left' PaperProps={{ style: { width: '300px' } }} open={showSidebar} onClose={toggleDrawer}>
				{isAuthenticated ? loggedInMenuItems : loggedOutMenuItems}
			</Drawer>
		</>
	)
}
