import React, { useEffect, useState } from 'react'
import { List, ListItem, Link, useMediaQuery } from '@mui/material'
import { useSearchParams } from 'react-router-dom'
import RestaurantSorter from './common/RestaurantSorter/RestaurantSorter'
import AdditionalSettings from './common/AdditionalSettings/AdditionalSettings'
import RatingForm from './common/RatingForm/RatingForm'
import MinimumOrderValueForm from './common/MinimumOrderValueForm/MinimumOrderValueForm'
import DeliveryMaxCost from './common/DeliveryMaxCost/DeliveryMaxCost'
import { SearchValuesType, FilterContainerProps } from '../../types/types'

const FilterContainer: React.FC<FilterContainerProps> = ({ handleClose }) => {
	const [searchParams, setSearchParams] = useSearchParams()
	const isScreenLarge = useMediaQuery('(min-width:1200px')
	const rating = searchParams.get('rating')
	const minOrder = searchParams.get('minOrder')
	const freeDelivery = searchParams.get('freeDelivery')
	const deliveryMaxCost = searchParams.get('deliveryMaxCost')
	const sortBy = searchParams.get('sortBy')
	const [searchValues, setSearchValues] = useState<SearchValuesType>({
		rating: rating ? Number(rating) : null,
		minOrder: minOrder ? Number(minOrder) : 0,
		freeDelivery: freeDelivery === 'true',
		deliveryMaxCost: deliveryMaxCost ? Number(deliveryMaxCost) : 0,
		sortBy: sortBy || 'default',
	})

	const clearFilters = () => {
		setSearchParams({})
		setSearchValues({
			rating: null,
			minOrder: 0,
			freeDelivery: false,
			deliveryMaxCost: 0,
			sortBy: 'default',
		})
	}

	const updateSearchParams = () => {
		const params = new URLSearchParams()

		// Zachowanie istniejących parametrów category i query
		const categoryParam = searchParams.get('category')
		const queryParam = searchParams.get('query')
		if (categoryParam) {
			params.set('category', categoryParam)
		}
		if (queryParam) {
			params.set('query', queryParam)
		}

		if (searchValues.rating !== null) {
			params.set('rating', String(searchValues.rating))
		}
		if (searchValues.minOrder !== 0) {
			params.set('minOrder', String(searchValues.minOrder))
		}
		if (searchValues.freeDelivery) {
			params.set('freeDelivery', String(searchValues.freeDelivery))
		}
		if (searchValues.deliveryMaxCost !== 0) {
			params.set('deliveryMaxCost', String(searchValues.deliveryMaxCost))
		}
		if (searchValues.sortBy && searchValues.sortBy !== 'default') {
			params.set('sortBy', searchValues.sortBy)
		}

		setSearchParams(params)
	}

	useEffect(() => {
		updateSearchParams()
	}, [searchValues])

	const searchParamsArray = Array.from(searchParams.entries())

	return (
		<List
			sx={{
				width: '100%',
				justifyContent: 'center',
				alignItems: 'flex-start',
			}}>
			<ListItem sx={{ width: '100%' }} disableGutters disablePadding>
				<RestaurantSorter setSearchValues={setSearchValues} sortBy={searchValues.sortBy} />
			</ListItem>
			<ListItem disableGutters disablePadding>
				<AdditionalSettings setSearchValues={setSearchValues} freeDelivery={searchValues.freeDelivery} />
			</ListItem>
			<ListItem disableGutters disablePadding>
				<RatingForm rating={searchValues.rating} setSearchValues={setSearchValues} />
			</ListItem>
			<ListItem disableGutters>
				<MinimumOrderValueForm minOrder={searchValues.minOrder} setSearchValues={setSearchValues} />
			</ListItem>
			<ListItem disableGutters disablePadding>
				<DeliveryMaxCost deliveryMaxCost={searchValues.deliveryMaxCost} setSearchValues={setSearchValues} />
			</ListItem>
			{searchParamsArray.length !== 0 && (
				<ListItem>
					<Link
						textAlign={isScreenLarge ? 'left' : 'center'}
						width='100%'
						onClick={() => {
							clearFilters()
							handleClose?.()
						}}>
						Wyczyść wszystko
					</Link>
				</ListItem>
			)}
		</List>
	)
}

export default FilterContainer
