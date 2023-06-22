import CloseRoundedIcon from '@mui/icons-material/CloseRounded'
import { motion } from 'framer-motion'
import ClickAwayListener from '@mui/base/ClickAwayListener'
import { TextField, Popper, Chip, Tooltip, Box, Avatar, IconButton } from '@mui/material'
import { useState, useEffect, useContext } from 'react'
import SearchIcon from '@mui/icons-material/Search'
import ShoppingCartRoundedIcon from '@mui/icons-material/ShoppingCartRounded'
import { useNavigate } from 'react-router-dom'
import { useRef } from 'react'
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded'
import { useAuth } from '../../../contexts/AuthContext'
import CartContext from '../../../contexts/CartContext'
import BackspaceIcon from '@mui/icons-material/Backspace'
import Prompts from '../Prompts/Prompts'
import { NavbarDesktopProps } from '../../../types/types'

const NavbarDesktop = ({ setShowPrompts, showPrompts }: NavbarDesktopProps): JSX.Element => {
	const [fullWidthInput, setFullWidthInput] = useState(false)
	const navigate = useNavigate()

	const [term, setTerm] = useState('')

	const textFieldRef = useRef<HTMLInputElement | null>(null)
	const cart = useContext(CartContext)
	const { isAuthenticated, userData } = useAuth()

	const handleOpen = () => {
		setFullWidthInput(true)
	}
	const handleClose = () => {
		setFullWidthInput(false)
		setTerm('')
		setShowPrompts(false)
	}
	const searchHandler = () => {
		if (term !== '') {
			navigate({
				pathname: '/restaurants',
				search: `?query=${term}`,
			})
			handleClose()
		}
	}

	useEffect(() => {
		if (term === '') {
			setShowPrompts(false)
		} else {
			setShowPrompts(true)
		}
	}, [term])

	return (
		<>
			<ClickAwayListener onClickAway={handleClose}>
				<Box
					sx={{
						display: 'flex',
						width: '100%',
						justifyContent: 'center',
						alignItems: 'center',
						overflow: 'hidden',
					}}>
					<motion.div animate={{ width: fullWidthInput ? '90%' : 'auto' }} transition={{ duration: 0.3 }}>
						<Box
							sx={{
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'center',
								backgroundColor: 'background.default',
								borderRadius: '15px',
							}}>
							<TextField
								onFocus={() => {
									handleOpen()
								}}
								onKeyDown={e => {
									if (e.key === 'Enter') {
										searchHandler()
									}
								}}
								value={term}
								onChange={e => {
									setTerm(e.target.value)
								}}
								inputRef={textFieldRef}
								variant='standard'
								InputProps={{
									disableUnderline: true,
									endAdornment: term && (
										<Tooltip title='Usuń zawartość'>
											<IconButton
												onClick={() => {
													setTerm('')
												}}>
												<BackspaceIcon fontSize='small' />
											</IconButton>
										</Tooltip>
									),
								}}
								sx={{
									backgroundColor: 'background.default',
									border: 'none',
									marginLeft: '10px',
									marginRight: '10px',
									borderRadius: '15px',
									width: '100%',
								}}
							/>
							<IconButton onClick={searchHandler}>
								<SearchIcon />
							</IconButton>
						</Box>
					</motion.div>

					{fullWidthInput && (
						<IconButton onClick={handleClose}>
							<CloseRoundedIcon />
						</IconButton>
					)}
					<Popper
						placement='bottom-end'
						sx={{ zIndex: 15, position: 'relative', paddingTop: '15px', width: '100vw' }}
						anchorEl={textFieldRef.current}
						open={showPrompts}>
						<Prompts term={term} searchHandler={searchHandler} handleClose={handleClose} />
					</Popper>
				</Box>
			</ClickAwayListener>

			{!fullWidthInput && (
				<Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '5px' }}>
					<Chip
						color='primary'
						sx={{ fontWeight: '600', color: 'white' }}
						onClick={() => {
							cart.toggleCart(true)
						}}
						icon={<ShoppingCartRoundedIcon fontSize='small' />}
						label={`Koszyk • ${cart.products.length}`}></Chip>

					{isAuthenticated ? (
						<>
							<Avatar
								onClick={() => {
									navigate('/profile')
								}}
								src={userData.photoUrl || undefined}
								alt={userData.name || undefined}
								sx={{ cursor: 'pointer' }}
							/>
						</>
					) : (
						<>
							<Chip
								icon={<AccountCircleRoundedIcon fontSize='small' />}
								label='Zaloguj się'
								color='primary'
								onClick={() => {
									navigate('/login')
								}}
								sx={{ fontWeight: '600', color: 'white' }}></Chip>
						</>
					)}
				</Box>
			)}
		</>
	)
}

export default NavbarDesktop
