import React from 'react'
import CustomAccordion from '../CustomAccordion/CustomAccordion'
import FreeDeliveryForm from './FreeDeliveryForm/FreeDeliveryForm'
import { AdditionalSettingsProps } from '../../../../types/types'

const AdditionalSettings: React.FC<AdditionalSettingsProps> = ({ setSearchValues, freeDelivery }) => {
	return (
		<CustomAccordion
			title='Dodatkowe'
			content={<FreeDeliveryForm setSearchValues={setSearchValues} freeDelivery={freeDelivery} />}
		/>
	)
}

export default AdditionalSettings
