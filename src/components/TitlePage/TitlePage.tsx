import { Box, Typography } from '@mui/material'
import { TitlePageProps } from '../../types/types'
function TitlePage({ title, description }: TitlePageProps) {
	return (
		<Box
			maxWidth='sm'
			sx={{
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'center',
				alignItems: 'flex-start',
				marginBottom: '2em',
			}}>
			<Typography textAlign='left' component='h1' variant='h4' fontWeight={600}>
				{title}
			</Typography>
			<Typography variant='subtitle1'>{description}</Typography>
		</Box>
	)
}

export default TitlePage
