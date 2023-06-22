import { Tooltip, TextField, Box, Button, Typography, Modal, IconButton, Grid } from '@mui/material'
import Prompts from '../../Prompts/Prompts'
import CloseIcon from '@mui/icons-material/Close'
import TitleWithSubtitle from '../../../TitleWithSubtitle/TitleWithSubtitle'
import { useNavigate, createSearchParams } from 'react-router-dom'
import BackspaceIcon from '@mui/icons-material/Backspace'
import { useState, useContext } from 'react'
import SearchIcon from '@mui/icons-material/Search'
import { motion } from 'framer-motion'
import { CategoryData, Category } from '../../../../types/types'
import { RestaurantsContext } from '../../../../contexts/RestaurantsDataContext'
import { SearchPanelProps } from '../../../../types/types'
const style = {
	position: 'absolute',
	top: 0,
	right: 0,
	left: 0,
	bottom: 0,
	width: '100vw',
	height: '100%',
	bgcolor: 'background.paper',

	boxShadow: 24,
	padding: '25px',
}

export default function SearchPanel({ setShowModal, showModal }: SearchPanelProps) {
	const { categories } = useContext(RestaurantsContext)

	const navigate = useNavigate()
	const [term, setTerm] = useState('')
	const [showAllCategories, setShowAllCategories] = useState(false)

	let newCategoriesData: CategoryData = []
	if (categories) {
		newCategoriesData = categories.filter(el => el.value !== '')
	}
	const handleClose = () => {
		setShowModal(false)
		setTerm('')
	}
	const searchHandler = () => {
		if (term !== '') {
			navigate({
				pathname: '/restaurants',
				search: `?query=${term}`,
			})

			handleClose()
		}
	}

	return (
		<div>
			<Modal
				open={showModal}
				onClose={handleClose}
				aria-labelledby='modal-modal-title'
				aria-describedby='modal-modal-description'>
				<Box sx={style}>
					<Box sx={{ marginBottom: '25px' }}>
						<Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', width: '100%' }}>
							<TitleWithSubtitle title='Wyszukaj' subtitle='Znajdź to co chcesz'></TitleWithSubtitle>
							<IconButton onClick={handleClose}>
								<CloseIcon></CloseIcon>
							</IconButton>
						</Box>
						<Box
							sx={{
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'center',
								backgroundColor: 'background.default',
								borderRadius: '15px',
							}}>
							<TextField
								focused={true}
								variant='standard'
								value={term}
								onChange={e => {
									setTerm(e.target.value)
								}}
								onKeyDown={e => {
									if (e.key === 'Enter') {
										searchHandler()
										handleClose()
									}
								}}
								InputProps={{
									disableUnderline: true,
									endAdornment: term && (
										<Tooltip title='Usuń zawartość'>
											<IconButton
												onClick={() => {
													setTerm('')
												}}>
												<BackspaceIcon fontSize='small' />
											</IconButton>
										</Tooltip>
									),
								}}
								sx={{
									backgroundColor: 'background.default',
									border: 'none',
									marginLeft: '10px',
									marginRight: '10px',
									borderRadius: '15px',
									width: '100%',
								}}></TextField>
							<IconButton onClick={searchHandler}>
								<SearchIcon style={{ color: '#717170' }} />
							</IconButton>
						</Box>
					</Box>

					{term === '' ? (
						<Box
							sx={{
								display: 'flex',
								flexDirection: 'column',
								justifyContent: 'flex-start',
								alignItems: 'flex-start',
								gap: '5px',
							}}>
							<Box
								sx={{
									display: 'flex',
									justifyContent: 'space-between',
									alignItems: 'center',
									width: '100%',
									marginTop: '15px',
								}}>
								<Typography variant='h6' fontWeight={600}>
									Kategorie
								</Typography>
								{newCategoriesData.length > 6 &&
									(showAllCategories ? (
										<>
											<Button size='small' onClick={() => setShowAllCategories(false)}>
												Ukryj
											</Button>
										</>
									) : (
										<>
											<Button size='small' onClick={() => setShowAllCategories(true)}>
												Pokaż wszystko
											</Button>
										</>
									))}
							</Box>
							<Grid container alignItems='center' justifyContent='flex-start' spacing={1}>
								{newCategoriesData
									.slice(0, showAllCategories ? newCategoriesData.length : 6)
									.map((category: Category, index: number) => {
										return (
											<Grid item xs={6} key={index}>
												<motion.div
													initial={{ opacity: 0, y: 50 }}
													animate={{ opacity: 1, y: 0 }}
													exit={{ opacity: 0, y: 50 }}
													transition={{ delay: index * 0.1 }}>
													<Box
														sx={{
															position: 'relative',
															display: 'flex',
															justifyContent: 'center',
															alignItems: 'center',
															height: '125px',
															width: '100%',
															backgroundImage: `url(${category.photo})`,
															backgroundSize: 'cover',
															borderRadius: '15px',
															overflow: 'hidden',
															cursor: 'pointer',
														}}
														onClick={() => {
															navigate({
																pathname: 'restaurants',
																search: createSearchParams({
																	category: `${category.value}`,
																}).toString(),
															})
															handleClose()
														}}>
														<Box
															sx={{
																position: 'absolute',
																width: '100%',
																height: '100%',
																top: 0,
																right: 0,
																backgroundColor: 'rgba(0, 0, 0, 0.5)',
															}}
														/>
														<Typography variant='h6' sx={{ color: '#fefefe', zIndex: '2', fontWeight: '600' }}>
															{category.name}
														</Typography>
													</Box>
												</motion.div>
											</Grid>
										)
									})}
							</Grid>
						</Box>
					) : (
						<Prompts term={term} handleClose={handleClose} searchHandler={searchHandler}></Prompts>
					)}
				</Box>
			</Modal>
		</div>
	)
}
