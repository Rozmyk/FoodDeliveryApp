import { Divider, Box, Typography } from '@mui/material'
import { SingleListitemProps } from '../../../types/types'

const SingleListItem = ({ primaryText, number }: SingleListitemProps) => {
	return (
		<>
			<Divider></Divider>
			<Box sx={{ display: 'flex', justifyContent: 'space-between', alginItems: 'center', padding: '8px 16px' }}>
				<Typography>{primaryText}</Typography>
				<Typography variant='subtitle1' fontWeight={600} color='primary'>
					{number}
				</Typography>
			</Box>
		</>
	)
}

export default SingleListItem
