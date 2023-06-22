import { Rating, Typography, Box, Avatar, Divider, Grid, useMediaQuery } from '@mui/material'
import getTimeDifference from '../../../../../helpers/getTimeDifference'
import { motion } from 'framer-motion'
import { SingleReviewProps } from '../../../../../types/types'
export default function SingleReview({ timestamp, index, userData, value, comment }: SingleReviewProps) {
	const isScreenLarge = useMediaQuery('(min-width:1000px)')

	const timeDifference = timestamp ? getTimeDifference(timestamp) : ''

	return (
		<motion.div
			style={{ width: '100%' }}
			initial={{ opacity: 0, y: -20 }}
			animate={{
				opacity: 1,
				y: 0,
				transition: { delay: index * 0.1, y: { stiffness: 1000, velocity: -100 } },
			}}
			transition={{ duration: 0.5 }}>
			<Box sx={{ mb: 3, width: '100%' }}>
				<Grid
					container
					sx={{
						display: 'flex',
						flexDirection: isScreenLarge ? 'row' : 'column',
						justifyContent: 'flex-start',
						alignItems: 'flex-start',
					}}>
					<Grid
						sx={{
							display: 'flex',
							justifyContent: 'flex-start',
							alignItems: 'center',
							gap: '10px',
							mb: isScreenLarge ? 0 : 1,
						}}
						item
						md={2}
						xs={12}>
						<Avatar alt={userData.name} src={userData.name}></Avatar>
						<Typography variant='body2'>{userData.name}</Typography>
					</Grid>
					<Grid item md={10} xs={12} sx={{ mb: 2 }}>
						<Box sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', gap: '5px', mb: 2 }}>
							<Rating size='small' defaultValue={value} precision={0.25} readOnly></Rating>
							<Typography color='text.primary' variant='body2'>
								&#x2022;
							</Typography>
							<Typography color='text.primary' variant='body2'>
								{timeDifference}
							</Typography>
						</Box>
						<Typography variant='body2'>{comment}</Typography>
					</Grid>
				</Grid>
				<Divider />
			</Box>
		</motion.div>
	)
}
