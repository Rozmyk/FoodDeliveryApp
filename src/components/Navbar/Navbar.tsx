import { useMediaQuery, Backdrop, AppBar, Box, Toolbar, IconButton } from '@mui/material'

import MenuIcon from '@mui/icons-material/Menu'

import Logo from '../../assets/photos/Logo.svg'
import { useState } from 'react'

import NavbarDesktop from './NavbarDesktop/NavbarDesktop'
import NavbarMobile from './NavbarMobile/NavbarMobile'
import { useNavigate } from 'react-router-dom'

import Sidebar from './Sidebar/Sidebar'

export default function PrimarySearchAppBar() {
	const navigate = useNavigate()

	const [showSidebar, setShowSidebar] = useState(false)
	const isMobile = useMediaQuery('(max-width:700px)')
	const [showPrompts, setShowPrompts] = useState(false)
	return (
		<Box
			sx={{
				flexGrow: 1,
				position: 'sticky',
				top: '0',
				right: '0',
				height: '80px',
				zIndex: '10',
				
				maxWidth: '100%',
			}}>
			<AppBar sx={{ boxShadow: 'none', position: 'relative' }}>
				<Toolbar sx={{ backgroundColor: '#fefffe', padding: '15px', zIndex: 4}}>
					<IconButton
						onClick={() => {
							setShowSidebar(!showSidebar)
						}}
						size='large'
						edge='start'
						aria-label='open drawer'
						sx={{ mr: 2 }}>
						<MenuIcon />
					</IconButton>
					<img
						style={{ cursor: 'pointer' }}
						src={Logo}
						width='150px'
						onClick={() => {
							navigate('/')
						}}></img>
					{isMobile ? (
						<NavbarMobile></NavbarMobile>
					) : (
						<NavbarDesktop showPrompts={showPrompts} setShowPrompts={setShowPrompts}></NavbarDesktop>
					)}
				</Toolbar>
			</AppBar>
			<Backdrop sx={{ zIndex: 5 }} open={showPrompts}></Backdrop>

			<Sidebar showSidebar={showSidebar} setShowSidebar={setShowSidebar}></Sidebar>
		</Box>
	)
}
