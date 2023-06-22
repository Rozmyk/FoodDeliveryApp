import { Drawer, Box, IconButton, Button, Typography, Chip, Badge } from '@mui/material'
import { useState } from 'react'
import TuneIcon from '@mui/icons-material/Tune'
import CloseIcon from '@mui/icons-material/Close'
import FilterContainer from '../FilterContainer'
import { FilterMobileProps } from '../../../types/types'
const FilterMobile = ({ query, restaurantsLenght, filterCount }: FilterMobileProps) => {
	const [open, setOpen] = useState(false)

	const handleClose = () => {
		setOpen(false)
	}
	

	const drawer = (
		<div style={{ width: '100vw', padding: '10px' }} role='presentation'>
			<Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
				<IconButton onClick={handleClose}>
					<CloseIcon></CloseIcon>
				</IconButton>
			</Box>
			<FilterContainer handleClose={handleClose}></FilterContainer>
			<Button onClick={handleClose} fullWidth variant='contained'>
				Zamknij
			</Button>
		</div>
	)
	return (
		<>
			<Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
				{query ? (
					<>
						<Typography variant='body1'>
							Liczba wyników dla zapytania <strong>"{query}"</strong> wynosi
							<strong>({restaurantsLenght})</strong>
						</Typography>
					</>
				) : (
					<Typography variant='body1' fontWeight={600}>
						Najlepsze lokalizacje w Twojej okolicy
					</Typography>
				)}
				<Badge
					badgeContent={filterCount}
					color='error'
					anchorOrigin={{
						vertical: 'top',
						horizontal: 'left',
					}}>
					<Chip
						onClick={() => {
							setOpen(!open)
						}}
						icon={<TuneIcon fontSize='small'></TuneIcon>}
						color='primary'
						label='Filtry'></Chip>
				</Badge>
			</Box>

			<Drawer anchor='bottom' open={open} onClose={handleClose}>
				{drawer}
			</Drawer>
		</>
	)
}

export default FilterMobile
