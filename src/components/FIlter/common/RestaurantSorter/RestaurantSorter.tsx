import React, { useState } from 'react'
import { RadioGroup, FormControlLabel, Radio } from '@mui/material'
import { RestaurantSorterProps } from '../../../../types/types'
import CustomAccordion from '../CustomAccordion/CustomAccordion'

const RestaurantSorter: React.FC<RestaurantSorterProps> = ({ setSearchValues, sortBy }) => {
	const [sortValue, setSortValue] = useState(sortBy)

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setSortValue(event.target.value)
		setSearchValues(prevValues => ({
			...prevValues,
			sortBy: event.target.value,
		}))
	}

	return (
		<CustomAccordion
			title='Sortuj według'
			content={
				<RadioGroup sx={{ color: 'text.secondary' }} value={sortValue} defaultValue={'default'} onChange={handleChange}>
					<FormControlLabel value='default' control={<Radio />} label='Wybrane dla Ciebie (domyślnie)' />
					<FormControlLabel value='oldest' control={<Radio />} label='Od najstarszych' />
					<FormControlLabel value='rating' control={<Radio />} label='Po ocenach' />
					<FormControlLabel value='alphabetical' control={<Radio />} label='Alfabetycznie' />
				</RadioGroup>
			}
		/>
	)
}

export default RestaurantSorter
