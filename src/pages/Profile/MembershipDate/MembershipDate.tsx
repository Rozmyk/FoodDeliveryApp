import { Typography, Box } from '@mui/material'
import { MembershipDateProps } from '../../../types/types'

const MembershipDate: React.FC<MembershipDateProps> = ({ data }) => {
	const date = new Date(data)
	const day = date.toLocaleDateString('pl', { day: 'numeric' })
	const month = date.toLocaleDateString('pl', { month: 'long' })
	const year = date.toLocaleDateString('pl', { year: 'numeric' })

	return (
		<Box mt={5} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
			<Box sx={{ display: 'flex' }}>
				<Typography variant='body1'>Jesteś z nami od:</Typography>
				<Typography variant='body1' color='primary'>
					{`${day} ${month} ${year}`}
				</Typography>
			</Box>

			<Typography variant='body2' color='text.primary'>
				Dziękujemy!
			</Typography>
		</Box>
	)
}

export default MembershipDate
