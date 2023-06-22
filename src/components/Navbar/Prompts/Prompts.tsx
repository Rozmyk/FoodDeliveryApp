import { motion } from 'framer-motion'
import { Box, List, ListItem, ListItemButton, ListItemAvatar, ListItemText } from '@mui/material'
import SinglePrompt from './SinglePrompt/SinglePrompt'
import SinglePromptLoading from './SinglePrompt/SinglePromptLoading/SinglePromptLoading'
import { useState, useEffect, useMemo, useContext } from 'react'
import SearchIcon from '@mui/icons-material/Search'
import { RestaurantsContext } from '../../../contexts/RestaurantsDataContext'
import { PromptsProps, NewRestaurant} from '../../../types/types'
const Prompts = ({ term, handleClose, searchHandler }: PromptsProps) => {
	const [results, setResults] = useState<NewRestaurant[]>([])
	const { restaurants } = useContext(RestaurantsContext)
	const [loading, setLoading] = useState(true)

	const fetchRestaurants = () => {
		setLoading(true)
		const newResults: NewRestaurant[] = restaurants.filter(
			result =>
				result.name.toLowerCase().includes(term.toLowerCase()) ||
				result.category.toLowerCase().includes(term.toLowerCase())
		)
		setResults(newResults)
		setLoading(false)
	}

	useEffect(() => {
		fetchRestaurants()
	}, [])

	useEffect(() => {
		fetchRestaurants()
	}, [term])

	const promptList = useMemo(
		() =>
			results
				.slice(0, 4)
				.map(result => (
					<SinglePrompt
						key={result.id}
						id={result.id}
						handleClose={handleClose}
						photo={result.photo.url}
						name={result.name}
						category={result.category}
					/>
				)),
		[results, handleClose]
	)

	return (
		<>
			{loading ? (
				<SinglePromptLoading></SinglePromptLoading>
			) : (
				<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
					<motion.div
						initial={{ height: 0 }}
						animate={{ height: '500px' }}
						exit={{ height: 0 }}
						transition={{ duration: 0.3 }}>
						<Box
							sx={{
								width: '100vw',
								background: 'white',
								display: 'flex',
								justifyContent: 'center',
								alignItems: 'center',
							}}>
							<Box maxWidth='md' width='100%' height='100%'>
								<List sx={{ maxHeight: '100%' }}>
									<ListItem disablePadding>
										<ListItemButton onClick={searchHandler}>
											<ListItemAvatar>
												<SearchIcon />
											</ListItemAvatar>
											<ListItemText primary={`Wyszukaj "${term}"`} />
										</ListItemButton>
									</ListItem>
									{promptList}
								</List>
							</Box>
						</Box>
					</motion.div>
				</motion.div>
			)}
		</>
	)
}

export default Prompts
