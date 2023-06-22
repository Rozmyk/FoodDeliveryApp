import {  Grid } from '@mui/material'
import RestaurantCardLoading from '../../../components/RestaurantCard/RestaurantCardLoading/RestaurantCardLoading'
import { motion } from 'framer-motion'
export default function RestaurantsOverviewLoading() {
	return (
		<Grid container justifyContent='center' maxWidth='lg' alignItems='center' marginTop='15PX' spacing='25px'>
			<Grid item xs={12} md={6} xl={4}>
				<motion.div
					initial={{ opacity: 0, y: 50 }}
					animate={{ opacity: 1, y: 0 }}
					exit={{ opacity: 0, y: 50 }}
					transition={{ delay: 0.1 }}>
					<RestaurantCardLoading/>
				</motion.div>
			</Grid>
			<Grid item xs={12} md={6} xl={4}>
				<motion.div
					initial={{ opacity: 0, y: 50 }}
					animate={{ opacity: 1, y: 0 }}
					exit={{ opacity: 0, y: 50 }}
					transition={{ delay: 0.1 }}>
					<RestaurantCardLoading/>
				</motion.div>
			</Grid>
			<Grid item xs={12} md={6} xl={4}>
				<motion.div
					initial={{ opacity: 0, y: 50 }}
					animate={{ opacity: 1, y: 0 }}
					exit={{ opacity: 0, y: 50 }}
					transition={{ delay: 0.1 }}>
					<RestaurantCardLoading/>
				</motion.div>
			</Grid>
		</Grid>
	)
}
