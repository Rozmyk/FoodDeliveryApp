import {
	Card,
	CardContent,
	Typography,
	CardMedia,
	Button,
	useMediaQuery,
	useTheme,
	Box,
	Chip,
	Container,
} from '@mui/material'
import TitleWithSubtitle from '../../../components/TitleWithSubtitle/TitleWithSubtitle'
import { Link as MuiLink } from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'
import StarIcon from '@mui/icons-material/Star'
import { useNavigate } from 'react-router-dom'
import { LastVisitedRestaurantType } from '../../../types/types'

const LastVisitedRestaurant = () => {
	const theme = useTheme()
	const navigate = useNavigate()
	const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

	const lastVisitedRestaurantData: LastVisitedRestaurantType | null = JSON.parse(
		localStorage.getItem('lastVisitedRestaurant') || 'null'
	)
	const lastVisitedRestaurant: LastVisitedRestaurantType =
		lastVisitedRestaurantData || ({} as LastVisitedRestaurantType)

	const textLimit = 150
	let description = ''
	if (lastVisitedRestaurantData) {
		description = lastVisitedRestaurant.description.substring(0, textLimit) + '...'
	}

	return (
		<>
			{lastVisitedRestaurantData && (
				<Container>
					<TitleWithSubtitle
						title='Ostatnio oglądana restauracja'
						subtitle='W jednym miejscu miej podgląd na swoją ostatnio przeglądaną restaurację.'
					/>
					<Card
						sx={{
							display: 'flex',
							flexDirection: isMobile ? 'column' : 'row',
							borderRadius: '15px',
							padding: '15px',
						}}>
						<CardMedia
							component='img'
							sx={{ width: isMobile ? '100%' : 200, borderRadius: '15px' }}
							image={lastVisitedRestaurant.photo?.url}
							alt={lastVisitedRestaurant.photo?.alt}
						/>
						<CardContent>
							<Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
								<Chip
									label={lastVisitedRestaurant.category}
									color='primary'
									sx={{ fontWeight: 600, color: 'white', textTransform: 'capitalize' }}
								/>
								<Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '5px' }}>
									{lastVisitedRestaurant.averageRating === 0 ? (
										<Typography color='text.secondary'>Brak ocen</Typography>
									) : (
										<>
											<Typography fontWeight={600} color='text.secondary'>
												{lastVisitedRestaurant.averageRating}
											</Typography>
											<StarIcon sx={{ color: '#FAAF00' }} />
										</>
									)}
								</Box>
							</Box>
							<Typography variant='h6' textAlign='left' fontWeight={600} color='text.secondary'>
								{lastVisitedRestaurant.name}
							</Typography>
							<Typography variant='body2' textAlign='left' mb={1}>
								{description}
								<MuiLink component={RouterLink} to={lastVisitedRestaurant.pathname || ''} color='primary'>
									Czytaj dalej
								</MuiLink>
							</Typography>
							<Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
								<Button
									color='secondary'
									onClick={() => {
										navigate(lastVisitedRestaurant.pathname || '')
									}}
									sx={{ fontWeight: 600, color: 'white' }}
									variant='contained'>
									Przejdź
								</Button>
							</Box>
						</CardContent>
					</Card>
				</Container>
			)}
		</>
	)
}

export default LastVisitedRestaurant
