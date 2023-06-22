import { IconButton, Chip, Box } from '@mui/material'
import CartContext from '../../../contexts/CartContext'
import { useState, useContext } from 'react'
import ShoppingCartRoundedIcon from '@mui/icons-material/ShoppingCartRounded'
import SearchRoundedIcon from '@mui/icons-material/SearchRounded'
import SearchPanel from './SearchPanel/SearchPanel'
const NavbarMobile = () => {
	const [showModal, setShowModal] = useState(false)

	const cart = useContext(CartContext)
	return (
		<Box sx={{ display: 'flex', justifyContent: 'flex-end', width: '100%', alignItems: 'center' }}>
			<IconButton
				onClick={() => {
					setShowModal(true)
				}}>
				<SearchRoundedIcon></SearchRoundedIcon>
			</IconButton>
			<Chip
				onClick={() => {
					cart.toggleCart(true)
				}}
				color='primary'
				label={cart.products.length}
				icon={<ShoppingCartRoundedIcon fontSize='small'></ShoppingCartRoundedIcon>}></Chip>
			<SearchPanel showModal={showModal} setShowModal={setShowModal}></SearchPanel>
		</Box>
	)
}

export default NavbarMobile
