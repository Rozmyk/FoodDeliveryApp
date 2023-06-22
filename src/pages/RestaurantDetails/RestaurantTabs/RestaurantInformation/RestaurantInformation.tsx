import { Box, Typography } from '@mui/material'
import LeftRightText from './LeftRightText/LeftRightText'
import { RestaurantInformationProps } from '../../../../types/types'
const RestaurantInformation = ({
	name,
	description,
	minimumOrderValue,
	delivery_time,
	delivery_price,
	free_ship,
}: RestaurantInformationProps) => {
	const openingHours = [
		{ day: 'Poniedziałek', hours: '10:00-18:00' },
		{ day: 'Wtorek', hours: '11:00-19:00' },
		{ day: 'Środa', hours: '09:00-17:00' },
		{ day: 'Czwartek', hours: '12:00-20:00' },
		{ day: 'Piątek', hours: '10:00-18:00' },
		{ day: 'Sobota', hours: '11:00-19:00' },
		{ day: 'Niedziela', hours: 'Zamknięte' },
	]

	return (
		<Box>
			<Box mb={4}>
				<Typography variant='h5' mb={2} fontWeight={600}>
					{name}
				</Typography>
				<Typography variant='body1' color='text.primary'>
					{description}
				</Typography>
			</Box>
			<Box mb={4}>
				<Typography variant='h5' mb={2} fontWeight={600}>
					Godziny otwarcia:
				</Typography>
				{openingHours.map((openingHour, index) => (
					<LeftRightText key={index} leftText={openingHour.day} rightText={openingHour.hours} />
				))}
			</Box>
			<Box>
				<Typography variant='h5' mb={2} fontWeight={600}>
					Informacje o dostawie
				</Typography>
				<LeftRightText leftText='Minimalna wartość zamówienia' rightText={`${minimumOrderValue} zł`} />
				<LeftRightText leftText='Szacowany czas dostawy' rightText={`${delivery_time} min`} />
				<LeftRightText leftText='Bazowa opłata za dostawę' rightText={`${delivery_price} zł`} />
				<LeftRightText leftText='Darmowa dostawa od' rightText={`${free_ship} zł`} />
			</Box>
		</Box>
	)
}

export default RestaurantInformation
