import { useState } from 'react'
import { useMediaQuery } from '@mui/material'
import { Grid, Tab, Tabs } from '@mui/material'
import MenuItem from './MenuItem/MenuItem'
import { Product } from '../../../../types/types'
import { MenuComponentProps } from '../../../../types/types'

export default function MenuComponent({ categories, products, restaurant,  setUpPopup }: MenuComponentProps) {
	const [selectedCategory, setSelectedCategory] = useState<number | null>(-1)
	const isMobile = useMediaQuery('(max-width:600px)')

	const handleCategoryChange = (event: React.ChangeEvent<{}>, newValue: number | null) => {
		setSelectedCategory(newValue)
	}

	const filteredProducts =
		selectedCategory === null || selectedCategory === -1
			? Object.values(products).flat()
			: products[categories[selectedCategory]]

	return (
		<Grid container spacing={2}>
			<Grid item xs={12} sm={2}>
				<Tabs
					value={selectedCategory}
					onChange={handleCategoryChange}
					orientation={isMobile ? 'horizontal' : 'vertical'}
					variant='scrollable'
					scrollButtons='auto'>
					<Tab label='Wszystko' value={-1} sx={{ backgroundColor: '#FFFFFF' }} />
					{categories.map((category, index) => (
						<Tab key={category} label={category} value={index} sx={{ backgroundColor: '#FFFFFF' }} />
					))}
				</Tabs>
			</Grid>
			<Grid
				item
				xs={12}
				sm={10}
				sx={{
					display: 'flex',
					flexDirection: 'column',
					justifyContent: 'center',
					alignItems: 'center',
					gap: '15px',
				}}>
				{filteredProducts.map((product: Product, index: number) => (
					<MenuItem
						key={`${product.name}-${product.price}-${index}`}
						index={index}
						product={product}
						setUpPopup={setUpPopup}
						restaurant={restaurant}
					/>
				))}
			</Grid>
		</Grid>
	)
}
