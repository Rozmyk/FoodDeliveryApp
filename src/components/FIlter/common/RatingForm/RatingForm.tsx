import React from 'react'
import CustomAccordion from '../CustomAccordion/CustomAccordion'
import { Rating } from '@mui/material'
import { RatingFormProps } from '../../../../types/types'

const RatingForm: React.FC<RatingFormProps> = ({ setSearchValues, rating }) => {
	

	const handleChange = (_: React.ChangeEvent<{}>, newValue: number | null) => {
		if (newValue !== null) {
			
			setSearchValues(prevValues => ({
				...prevValues,
				rating: parseFloat(newValue.toFixed(1)),
			}))
		}
	}

	return (
		<CustomAccordion
			title='Oceny restauracji'
			content={<Rating size='large' name='simple-controlled' defaultValue={0} value={rating} onChange={handleChange} />}
		/>
	)
}

export default RatingForm
