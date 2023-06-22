import { motion } from 'framer-motion'
import { Box, Typography } from '@mui/material'
import { useNavigate, createSearchParams } from 'react-router-dom'
import { SingleCategoryProps } from '../../../../types/types'

const SingleCategory = ({ category, index }: SingleCategoryProps) => {
	const navigate = useNavigate()

	const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
		event.preventDefault()
		navigate(`/restaurants?category=${category.value}`)
	}

	return (
		<motion.div
			initial={{ opacity: 0, y: 50 }}
			animate={{ opacity: 1, y: 0 }}
			exit={{ opacity: 0, y: 50 }}
			transition={{ delay: index * 0.1 }}>
			<Box
				onClick={handleClick}
				sx={{
					width: '100px',
					height: '100px',
					display: 'flex',
					flexDirection: 'column',
					justifyContent: 'center',
					alignItems: 'center',
					paddingTop: '10px',
					paddingBottom: '10px',
					paddingLeft: '10px',
					paddingRight: '10px',
					cursor: 'pointer',
				}}>
				<Box
					sx={{
						backgroundColor: '#e7efeb',
						borderRadius: '50%',
						display: 'flex',
						flexDirection: 'column',
						justifyContent: 'center',
						alignItems: 'center',
						width: '60px',
						height: '60px',
						padding: '10px',
					}}>
					<img src={category.icon} width='100%' alt={category.name} />
				</Box>
				<Typography textAlign='center' variant='subtitle1' fontWeight='600' color='text.secondary'>
					{category.name}
				</Typography>
			</Box>
		</motion.div>
	)
}

export default SingleCategory
