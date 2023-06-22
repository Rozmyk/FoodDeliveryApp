import { useState } from 'react'
import { Button, Dialog, DialogContent, DialogTitle, Box, Typography } from '@mui/material'
import { useAuth } from '../../../../../contexts/AuthContext'

const DeleteAccount = () => {
	const [openDialog, setOpenDialog] = useState(false)

	const { deleteAccount } = useAuth()

	const handleOpenDialog = () => {
		setOpenDialog(true)
	}

	const handleCloseDialog = () => {
		setOpenDialog(false)
	}

	return (
		<div>
			<Button variant='outlined' onClick={handleOpenDialog} color='error'>
				Usuń konto
			</Button>

			<Dialog open={openDialog} onClose={handleCloseDialog}>
				<DialogTitle>
					<Typography  variant='body1' fontWeight={600} color='text.secondary'>
						Czy na pewno chcesz usunąć swoje konto?
					</Typography>
				</DialogTitle>
				<DialogContent>
					<Typography mb={2} variant='body2' color='text.secondary'>
						Ta operacja jest nieodwracalna i spowoduje trwałe usunięcie wszystkich danych związanych z Twoim kontem. Po
						usunięciu konta nie będzie możliwości odzyskania danych.
					</Typography>
					<Box sx={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
						<Button
							variant='contained'
							onClick={() => {
								deleteAccount()
							}}>
							Usuń konto
						</Button>
						<Button variant='outlined' onClick={handleCloseDialog}>
							Anuluj
						</Button>
					</Box>
				</DialogContent>
			</Dialog>
		</div>
	)
}

export default DeleteAccount
