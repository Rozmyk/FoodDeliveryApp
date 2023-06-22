import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Box from '@mui/material/Box'
import { useState } from 'react'
import UserFavouriteRestaurants from './UserFavouriteRestaurants/UserFavouriteRestaurants'
import UserReviews from './UserReviews/UserReviews'
import UserSettings from './UserSettings/UserSettings'
import { UserDashboardProps } from '../../../types/types'
const UserDashboard = ({
	favRestaurants,
	setFavRestaurants,
	loadingFavourites,

	setReviews,
	reviews,
	loadingReviews,
}: UserDashboardProps) => {
	const [value, setValue] = useState(0)
	const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
		setValue(newValue)
	}
	return (
		<>
			<Box
				sx={{
					maxWidth: '100%',
					bgcolor: 'background.paper',
					marginTop: 2,
					marginBottom: 2,
					borderBottom: 1,
					borderColor: 'divider',
				}}>
				<Tabs
					value={value}
					onChange={handleChange}
					variant='scrollable'
					indicatorColor='primary'
					textColor='primary'
					scrollButtons='auto'
					aria-label='scrollable auto tabs example'>
					<Tab label='Polubione restaurację' />
					<Tab label='Dodane opinię' />
					<Tab label='Ustawienia'></Tab>
				</Tabs>
			</Box>
			{value === 0 && (
				<UserFavouriteRestaurants
					favRestaurants={favRestaurants}
					setFavRestaurants={setFavRestaurants}
					loading={loadingFavourites}
					
				/>
			)}

			{value === 1 && <UserReviews setReviews={setReviews} reviews={reviews} loading={loadingReviews}></UserReviews>}

			{value === 2 && <UserSettings></UserSettings>}
		</>
	)
}

export default UserDashboard
