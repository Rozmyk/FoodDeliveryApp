import React from 'react'
import CustomAccordion from '../CustomAccordion/CustomAccordion'
import { Slider, Box } from '@mui/material'
import { DeliveryMaxCostProps } from '../../../../types/types'

const DeliveryMaxCost: React.FC<DeliveryMaxCostProps> = ({ setSearchValues, deliveryMaxCost }) => {
	const marks = [
		{
			value: 15,
			label: '15zł',
		},
		{
			value: 25,
			label: '25zł',
		},
		{
			value: 35,
			label: '35zł',
		},
		{
			value: 0,
			label: '0zł',
		},
	]

	const handleChange = (_: Event, value: number | number[]) => {
		setSearchValues(prevValues => ({
			...prevValues,
			deliveryMaxCost: value,
		}))
	}

	function valuetext(value: number) {
		return `${value}zł`
	}

	return (
		<CustomAccordion
			title='Maks. opłata za dostawę'
			content={
				<Box sx={{ width: '90%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
					<Slider
						onChange={handleChange}
						defaultValue={20}
						value={deliveryMaxCost}
						getAriaValueText={valuetext}
						step={null}
						max={35}
						valueLabelDisplay='auto'
						marks={marks}
					/>
				</Box>
			}
		/>
	)
}

export default DeliveryMaxCost
