import { Box, Typography } from '@mui/material'
const LeftRightText = ({ leftText, rightText }: { leftText: string; rightText: string }) => {
	return (
		<Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 0.5 }}>
			<Typography variant='body1' color='text.primary'>
				{leftText}
			</Typography>
			<Typography variant='body1' color='text.primary'>
				{rightText}
			</Typography>
		</Box>
	)
}

export default LeftRightText
