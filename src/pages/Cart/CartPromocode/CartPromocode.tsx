import { Chip, TextField, IconButton, Box, Tooltip, Button, Grid } from '@mui/material'
import { useSnackbar } from 'notistack'
import { useState, useContext } from 'react'
import CartContext from '../../../contexts/CartContext'
import ClearIcon from '@mui/icons-material/Clear'
import { motion, AnimatePresence } from 'framer-motion'
import { getDatabase, ref, get } from 'firebase/database'
export default function CartPromocode() {
	const cart = useContext(CartContext)
	const { enqueueSnackbar } = useSnackbar()
	const [term, setTerm] = useState<string>('')
	const [errorText, setErrorText] = useState<string>('')

	const handleCheckCode = async () => {
		try {
			const db = getDatabase()
			const promocodeRef = ref(db, 'Discount_code')
			const snapshot = await get(promocodeRef)
			if (snapshot.exists()) {
				const data = snapshot.val()
				const newCode = data.find((x: { code: string }) => x.code.toLowerCase() === term.toLowerCase())

				if (newCode) {
					cart.setDiscount(newCode)
					setErrorText('')
					enqueueSnackbar(`Twój kod rabatowy "${term}" został pomyślnie dodany.`)
					setTerm('')
				} else {
					setErrorText('Niepoprawny kod')
				}
			}
		} catch (err) {
			console.error(err)
		}
	}

	const handleDelete = () => {
		cart.setDiscount({
			code: '',
			discountValue: 0,
		})
		setTerm('')
	}

	return (
		<>
			<Box>
				<AnimatePresence>
					{cart.discount.code && (
						<motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
							<Chip
								label={cart.discount.code}
								sx={{ fontWeight: '600', textTransform: 'uppercase', color: 'white', mb: 2 }}
								color='primary'
								onDelete={handleDelete}
							/>
						</motion.div>
					)}
				</AnimatePresence>
			</Box>
			<Grid container>
				<Grid item xs={8}>
					<Box sx={{ display: 'flex', alignItems: 'stretch' }}>
						<TextField
							id='standard-basic'
							variant='filled'
							value={term}
							fullWidth
							label='Wpisz kod rabatowy:'
							helperText={errorText}
							error={!!errorText}
							onChange={e => {
								setTerm(e.target.value)
								setErrorText('')
							}}
							onKeyDown={e => {
								if (e.key === 'Enter') {
									handleCheckCode()
								}
							}}
							InputProps={{
								endAdornment: term && (
									<Tooltip title='Usuń zawartość'>
										<IconButton
											onClick={() => {
												setTerm('')
												setErrorText('')
											}}>
											<ClearIcon style={{ color: '#717170' }} />
										</IconButton>
									</Tooltip>
								),
							}}
							sx={{ flexGrow: 1 }}
						/>
					</Box>
				</Grid>
				<Grid item xs={4}>
					<Box sx={{ display: 'flex', alignItems: 'stretch', height: '56px' }}>
						<Button fullWidth variant='contained' onClick={handleCheckCode} sx={{ height: '100%', fontWeight: 600 }}>
							Zaakceptuj
						</Button>
					</Box>
				</Grid>
			</Grid>
		</>
	)
}
