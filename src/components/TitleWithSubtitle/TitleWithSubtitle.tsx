import { Typography, Box } from '@mui/material'
import { TitleWithSubtitleProps } from '../../types/types'

const TitleWithSubtitle = ({ title, subtitle }: TitleWithSubtitleProps) => {
	return (
		<Box sx={{ marginBottom: '15px' }}>
			<Typography variant='h6' color='text.secondary' textAlign='left' fontWeight={600}>
				{title}
			</Typography>
			<Typography variant='subtitle2' textAlign='left' color='text.primary'>
				{subtitle}
			</Typography>
		</Box>
	)
}

export default TitleWithSubtitle
