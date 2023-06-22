import { Container, Box, Typography } from '@mui/material'
import CategoryList from './CategoryList/CategoryList'
import RecommendedRestaurants from './RecommendedRestaurants/RecommendedRestaurants'
import Promocodes from './Promocodes/Promocodes'
import LastVisitedRestaurant from './LastVisitedRestaurant/LastVisitedRestaurant'
import useWebsiteTitle from '../../hooks/useWebsiteTitle'

export default function Home() {
	useWebsiteTitle('Strona główna')
	return (
		<Container maxWidth='xl' sx={{ padding: '15px' }}>
			<Box
				sx={{
					display: 'flex',
					flexDirection: 'column',
					justifyContent: 'center',
					alignItems: 'flex-start',
					mb: '25px',
				}}>
				<Typography variant='h5' textAlign='left'>
					Zamów swój <br />
					<strong>ulubiony posiłek</strong>
					
				</Typography>
			</Box>

			<Box
				sx={{
					display: 'flex',
					flexDirection: 'column',
					justifyContent: 'center',
					alignItems: 'flex-start',
					mb: '25px',
					mt: '50px',
				}}>
				<Promocodes />
			</Box>

			<Box
				sx={{
					display: 'flex',
					flexDirection: 'column',
					justifyContent: 'center',
					alignItems: 'flex-start',
					mb: '25px',
					mt: '50px',
				}}>
				<CategoryList></CategoryList>
			</Box>
			<LastVisitedRestaurant />

			<Box
				sx={{
					display: 'flex',
					flexDirection: 'column',
					justifyContent: 'center',
					alignItems: 'flex-start',
					mb: '25px',
					mt: '50px',
				}}>
				<RecommendedRestaurants />
			</Box>
		</Container>
	)
}
