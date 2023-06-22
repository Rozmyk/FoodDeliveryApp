import Container from '@mui/material/Container'
import { styled } from '@mui/material/styles'
import { FullWidthContainer } from '../../types/types'
function FullWidthBackgroundContainer({ photo, children, rest }: FullWidthContainer) {
	const FullWidthContainer = styled(Container)({
		backgroundImage: `url(${photo})`,
		backgroundRepeat: 'no-repeat',
		backgroundSize: 'cover',
		backgroundPosition: 'center',
		height: '30vh',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		position: 'relative',
	})

	return (
		<FullWidthContainer maxWidth={false} {...rest}>
			{children}
		</FullWidthContainer>
	)
}

export default FullWidthBackgroundContainer
