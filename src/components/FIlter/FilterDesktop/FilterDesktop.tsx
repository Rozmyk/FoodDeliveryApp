
import { Typography, Box } from '@mui/material'
import FilterContainer from '../FilterContainer'

const FilterDesktop = ({ restaurantsLenght, query }: { restaurantsLenght: number; query: string }) => {
	return (
		<Box
			sx={{
				position: 'sticky',
				top: 0,
				left: 0,
				display: 'flex',
				zIndex: 3,
				flexDirection: 'column',
				justifyContent: 'space-between',
				alignItems: 'flex-start',
				wdith: '100%',
			}}>
			<Box
				sx={{
					display: 'flex',
					flexDirection: 'column',
					justifyContent: 'center',
					alignItems: 'flex-start',
					marginBottom: '15px',
				}}>
				{query && (
					<>
						<Typography variant='h5' mb={1} color='text.secondary' fontWeight={600}>
							{`"${query}"`}
						</Typography>
						<Typography>
							Liczba wyników dla zapytania <strong>"{query}"</strong> wynosi
							<strong>({restaurantsLenght})</strong>
						</Typography>
					</>
				)}
			</Box>
			<FilterContainer></FilterContainer>
		</Box>
	)
}

export default FilterDesktop
