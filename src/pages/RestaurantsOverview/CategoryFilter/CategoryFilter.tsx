import * as Mui from '@mui/material'
import { useState, useEffect, useContext, ChangeEvent } from 'react'
import { RestaurantsContext } from '../../../contexts/RestaurantsDataContext'
import { useSearchParams } from 'react-router-dom'
import { Category, CategoryFilterProps } from '../../../types/types'
function CategoryFilter({ setUpCategory }: CategoryFilterProps) {
	const { categories } = useContext(RestaurantsContext)

	const [searchParams, setSearchParams] = useSearchParams({ category: '' })
	const category = searchParams.get('category')
	const [value, setValue] = useState<number>(0)

	const handleChange = (event: ChangeEvent<{}>, newValue: number) => {
		setValue(newValue)
	}

	useEffect(() => {
		const searchedCategory: Category | undefined = categories.find(({ value }) => value === category)
		if (searchedCategory) {
			setValue(searchedCategory.key)
		}
	}, [searchParams, categories, category])

	return (
		<Mui.Tabs
			value={value}
			onChange={handleChange}
			variant='scrollable'
			scrollButtons='auto'
			sx={{
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',

				'& .MuiTab-root': {
					textTransform: 'capitalize',
					color: 'text.primary',
				},
			}}
			aria-label='scrollable auto tabs example'>
			{categories.map(tab => (
				<Mui.Tab key={tab.key} label={tab.name} onClick={() => setUpCategory(tab.value)} />
			))}
		</Mui.Tabs>
	)
}

export default CategoryFilter
