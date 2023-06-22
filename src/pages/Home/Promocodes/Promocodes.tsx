import { Container, Box } from '@mui/material'
import Carousel from '../../../components/Carousel/Carousel'
import promocodesData from '../../../data/promocodesData'
import SingleCard from './SingleCard/SingleCard'
import { motion } from 'framer-motion'
import TitleWithSubtitle from '../../../components/TitleWithSubtitle/TitleWithSubtitle'

export default function Promocodes() {
	const items = promocodesData.map((code) => {
		return (
			<Box sx={{ maxWidth: '95%', margin: 'auto' }}>
				<SingleCard {...code}></SingleCard>
			</Box>
		)
	})
	return (
		<Container>
			<TitleWithSubtitle title='Promocje' subtitle='Odkryj najlepsze oferty w restauracji.'></TitleWithSubtitle>
			<motion.div
				initial={{ opacity: 0, y: -20 }}
				animate={{
					opacity: 1,
					y: 0,
					transition: { delay: 0.1, y: { stiffness: 1000, velocity: -100 } },
				}}
				transition={{ duration: 0.5 }}>
				<Carousel items={items}></Carousel>
			</motion.div>
		</Container>
	)
}
