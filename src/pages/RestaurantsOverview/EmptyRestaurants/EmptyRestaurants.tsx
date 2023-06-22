import animation from '../../../assets/photos/lottieFiles/EmptyRestaurants.json'
import Lottie from 'lottie-react'
import { Typography, Button, Container } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { EmptyRestaurantsProps } from '../../../types/types'
const EmptyRestaurants = ({ query }: EmptyRestaurantsProps) => {
	const navigate = useNavigate()
	return (
		<Container
			maxWidth='sm'
			sx={{
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'center',
				alignItems: 'center',
			}}>
			<Lottie animationData={animation} style={{ width: '300px' }} />
			<Typography textAlign='center' variant='h6' fontWeight={600}>
				{query ? `Nie znaleźliśmy wyników dla hasła "${query}"` : 'Nie znaleźliśmy wyników'}
			</Typography>
			<Typography mb={2} variant='subtitle2' color='text.primary' textAlign='center' maxWidth='50%'>
				Poszukaj czegoś innego
			</Typography>
			<Button
				variant='outlined'
				onClick={() => {
					navigate('/restaurants')
				}}
				sx={{ fontWeight: '600' }}>
				Zobacz wszystkie restauracje
			</Button>
		</Container>
	)
}

export default EmptyRestaurants
