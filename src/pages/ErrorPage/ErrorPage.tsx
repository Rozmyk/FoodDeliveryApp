import { Container, Typography, Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import Lottie from 'lottie-react'
import animation from '../../assets/photos/lottieFiles/ErroPage.json'

export default function ErrorPage() {
	const navigate = useNavigate()
	return (
		<Container sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
			<Lottie animationData={animation} style={{ width: '500px' }} />

			<Typography variant='h5' gutterBottom>
				Przepraszamy, coś poszło nie tak.
			</Typography>
			<Typography marginBottom={2} variant='subtitle2' color='text.primary' textAlign='center' maxWidth='50%'>
				Pracujemy nad naprawą problemu i będziemy gotowi wkrótce. W międzyczasie, sprawdź nasze najpopularniejsze
				restauracje lub skorzystaj z wyszukiwarki, aby znaleźć interesujące Cię miejsce.
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


