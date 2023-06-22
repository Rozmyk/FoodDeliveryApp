
import CircularProgress from '@mui/material/CircularProgress'
import { Box } from '@mui/system'
import { Typography } from '@mui/material'
export default function Loading() {
	return (
		<Box
			sx={{
				display: 'flex',
				wdith: '100vw',
				height: '100vh',
				justifyContent: 'center',
				alignItems: 'center',
				flexDirection: 'column',
				gap: '10px',
			}}>
			<CircularProgress size='60px'></CircularProgress>
			<Typography>Ładowanie...</Typography>
		</Box>
	)
}
