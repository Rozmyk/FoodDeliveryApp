import React from 'react'
import { FormControlLabel, Switch } from '@mui/material'
import { FreeDeliveryFormProps } from '../../../../../types/types'

const FreeDeliveryForm: React.FC<FreeDeliveryFormProps> = ({ setSearchValues, freeDelivery }) => {
	const handleSwitchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setSearchValues(prevValues => ({
			...prevValues,
			freeDelivery: event.target.checked,
		}))
	}

	return (
		<div>
			<FormControlLabel
				control={<Switch checked={freeDelivery} onChange={handleSwitchChange} />}
				label='Darmowa dostawa'
			/>
		</div>
	)
}

export default FreeDeliveryForm
