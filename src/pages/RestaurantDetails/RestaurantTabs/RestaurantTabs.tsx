import * as React from 'react'
import { Tabs, Tab, Typography, Box } from '@mui/material'
import PropTypes from 'prop-types'
import { useState } from 'react'
import MenuComponent from './MenuComponent/MenuComponent'
import ReviewsComponent from './ReviewsComponent/ReviewsComponent'
import RestaurantInformation from './RestaurantInformation/RestaurantInformation'
import { TabPanelProps, RestaurantTabsProps } from '../../../types/types'
function TabPanel({ children, value, index, ...other }: TabPanelProps) {
	return (
		<div
			role='tabpanel'
			hidden={value !== index}
			id={`simple-tabpanel-${index}`}
			aria-labelledby={`simple-tab-${index}`}
			{...other}>
			{value === index && (
				<Box sx={{ p: 3 }}>
					<Typography>{children}</Typography>
				</Box>
			)}
		</div>
	)
}

TabPanel.propTypes = {
	children: PropTypes.node,
	index: PropTypes.number.isRequired,
	value: PropTypes.number.isRequired,
}

function a11yProps(index: number) {
	return {
		id: `simple-tab-${index}`,
		'aria-controls': `simple-tabpanel-${index}`,
	}
}

export default function RestaurantTabs({ categories, setUpPopup, restaurant, id,  }: RestaurantTabsProps) {
	const [value, setValue] = useState(0)

	const handleChange = (event: React.SyntheticEvent, newValue: number) => {
		setValue(newValue)
	}

	return (
		<Box sx={{ width: '100%', mt: 2 }}>
			<Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
				<Tabs textColor='primary' indicatorColor='primary' value={value} onChange={handleChange}>
					<Tab label='Menu' {...a11yProps(0)} />
					<Tab label='Opinie' {...a11yProps(1)} />
					<Tab label='O nas' {...a11yProps(2)} />
				</Tabs>
			</Box>
			<TabPanel value={value} index={0}>
				<MenuComponent
					categories={categories}
					setUpPopup={setUpPopup}
					products={restaurant.products}
					restaurant={restaurant}></MenuComponent>
			</TabPanel>
			<TabPanel value={value} index={1}>
				<ReviewsComponent averageRating={restaurant.averageRating} id={id}></ReviewsComponent>
			</TabPanel>
			<TabPanel value={value} index={2}>
				<RestaurantInformation {...restaurant}></RestaurantInformation>
			</TabPanel>
		</Box>
	)
}
