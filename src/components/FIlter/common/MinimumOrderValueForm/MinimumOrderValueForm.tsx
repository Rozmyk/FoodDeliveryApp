import React, { ChangeEvent } from 'react'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import { MinimumOrderValueFormProps } from '../../../../types/types'
import CustomAccordion from '../CustomAccordion/CustomAccordion'

const MinimumOrderValueForm: React.FC<MinimumOrderValueFormProps> = ({ setSearchValues, minOrder }) => {
	const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
		setSearchValues(prevValues => ({
			...prevValues,
			minOrder: parseFloat(event.target.value),
		}))
	}

	return (
		<CustomAccordion
			title='Min. kwota zamówienia'
			content={
				<RadioGroup
					sx={{ color: 'text.secondary' }}
					aria-labelledby='demo-controlled-radio-buttons-group'
					name='controlled-radio-buttons-group'
					value={minOrder}
					defaultValue={0}
					onChange={handleChange}>
					<FormControlLabel value='0' control={<Radio />} label='Pokaż wszystkie' />
					<FormControlLabel value='35' control={<Radio />} label='35.00 zł lub mniej' />
					<FormControlLabel value='50' control={<Radio />} label='50.00 zł lub mniej' />
				</RadioGroup>
			}
		/>
	)
}

export default MinimumOrderValueForm
