import { Box, Container, Typography } from '@mui/material'
import { useState, useContext, useEffect } from 'react'
import { RestaurantsContext } from '../../../contexts/RestaurantsDataContext'
import SingleCategory from './SingleCategory/SingleCategory'
import TitleWithSubtitle from '../../../components/TitleWithSubtitle/TitleWithSubtitle'
import CategoryListLoading from '../CategoryList/CategoryListLoading/CategoryListLoading'
import { CategoryData, Category } from '../../../types/types'
const CategoryList = () => {
	const { categories } = useContext(RestaurantsContext)
	const [loading, setLoading] = useState(true)
	const [categoriesData, setCategoriesData] = useState<CategoryData>([])

	const fetchCategories = () => {
		setLoading(true)

		if (categories) {
			let result: CategoryData = categories.filter(el => el.value !== '')
			setCategoriesData(result)
		}

		setLoading(false)
	}

	useEffect(() => {
		fetchCategories()
	}, [categories])

	if (!categories) {
		return <Typography>Brak danych</Typography>
	}

	return (
		<Container>
			<TitleWithSubtitle
				title='Kategorie'
				subtitle='Znajdź to, czego szukasz w łatwy sposób dzięki naszym kategoriom.'
			/>
			<Box
				sx={{
					display: 'flex',
					justifyContent: 'flex-start',
					alignItems: 'center',
					flexWrap: 'nowrap',
					overflowX: 'auto',
					scrollBehavior: 'smooth',
					WebkitOverflowScrolling: 'touch',
					gap: '15px',
					maxWidth: '100%',
					padding: '15px',
					backgroundColor: 'background.paper',
				}}>
				{loading ? (
					<CategoryListLoading />
				) : (
					categoriesData.map((category: Category, index: number) => {
						return <SingleCategory key={category.key} index={index} category={category} />
					})
				)}
			</Box>
		</Container>
	)
}

export default CategoryList
