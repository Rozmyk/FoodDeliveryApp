import { Box, Typography, Button } from '@mui/material'
import { GoogleButtonProps } from '../../types/types'
import googleLogo from '../../assets/photos/googleLogo.svg'
const GoogleButton = ({ loading, onClick, text }: GoogleButtonProps) => {
	return (
		<Button variant='text' size='small' disabled={loading} onClick={onClick}>
			<Box sx={{ display: 'flex', gap: '10px', justifyContent: 'center', alignItems: 'center' }}>
				<img src={googleLogo}></img>
				<Typography textTransform='none' color='secondary'>
					{text}
				</Typography>
			</Box>
		</Button>
	)
}

export default GoogleButton
