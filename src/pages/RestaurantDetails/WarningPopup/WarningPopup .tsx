import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material'
import CartContext from '../../../contexts/CartContext'
import { useContext } from 'react'
import { WarningPopupProps, SetUpPopupInterface } from '../../../types/types'
export default function WarningPopup({ product, restaurant, show, setUpPopup }: WarningPopupProps) {
	const cart = useContext(CartContext)

	const handleClose = () => {
		setUpPopup(false, null, null)
	}
	const buttonStyle = {
		color: 'white',
		fontWeight: '600',
	}

	const handleAddToCart = () => {
		if (product != null && restaurant !== null) {
			cart.updateCartAndRestaurant(product, restaurant)
		}

		handleClose()
	}

	return (
		<div>
			<Dialog open={show} onClose={handleClose}>
				<DialogTitle color='text.secondary' id='alert-dialog-title'>
					{'Czy chcesz wyczyścic koszyk?'}
				</DialogTitle>
				<DialogContent>
					<DialogContentText id='alert-dialog-description'>
						Dodanie produktu z innej restauracji spowoduje wyczyszczenie Twojego koszyka. Czy na pewno chcesz dodać
						produkt z innej restauracji?
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button sx={buttonStyle} variant='contained' onClick={handleClose}>
						Nie, anuluj
					</Button>
					<Button
						sx={buttonStyle}
						variant='contained'
						onClick={() => {
							handleAddToCart()
						}}>
						Tak, dodaj produkt
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	)
}
