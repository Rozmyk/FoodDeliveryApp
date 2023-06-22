import { Typography, Box, Button, Grid } from '@mui/material'
import { useSnackbar } from 'notistack'
import { Promocode } from '../../../../types/types'
export default function SingleCard({backgroundColor, fontColor, value, description, btnColor, btnColorHover, code, photo, color}:Promocode) {
	const { enqueueSnackbar, closeSnackbar } = useSnackbar()
	const handleCopyToClipboard = () => {
		navigator.clipboard.writeText(code)
		enqueueSnackbar(`Pomyślnie skopiowano '${code}'`);
	}
	return (
		<Grid
			container
			sx={{
				backgroundColor: `${backgroundColor}`,
				borderRadius: '15px',
				padding: '15px',
				overflow: 'hidden',
				position: 'relative',
				maxWidth: '350px',
			}}>
			<Grid item xs={7} zIndex='2'>
				<Typography variant='subtitle1' fontWeight={600} color={fontColor} textTransform='uppercase'>
					Zniżka
				</Typography>
				<Typography variant='h4' fontWeight={600} color={color}>
					{`${value}% OFF`}
				</Typography>
				<Typography variant='body2' color={fontColor} marginBottom='10px'>
					{description}
				</Typography>
				<Button
					variant='contained'
					onClick={handleCopyToClipboard}
					sx={{
						backgroundColor: btnColor,
						fontWeight: 600,
						'&:hover': {
							backgroundColor: btnColorHover
						},
					}}>
					{`"${code}"`}
				</Button>
			</Grid>
			<Grid item xs={5} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: '2' }}>
				<img width='100%' src={photo}></img>
			</Grid>
			<Box
				sx={{
					position: 'absolute',
					top: '50%',
					right: -150,
					width: '150%',
					height: '100%',
					backgroundColor: 'white',
					opacity: '0.05',
					transform: 'rotate(-45deg)',
				}}></Box>
		</Grid>
	)
}
