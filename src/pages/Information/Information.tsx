import { Typography, Link, List, ListItem, ListItemText, Container, Box } from '@mui/material'
import TitleWithSubtitle from '../../components/TitleWithSubtitle/TitleWithSubtitle'
import { motion } from 'framer-motion'
import useWebsiteTitle from '../../hooks/useWebsiteTitle'
const libraries = [
	{ name: 'React', link: 'https://www.npmjs.com/package/react' },
	{ name: 'Material-UI', link: 'https://www.npmjs.com/package/@material-ui/core' },
	{ name: 'Framer Motion', link: 'https://www.npmjs.com/package/framer-motion' },
	{ name: 'Firebase', link: 'https://www.npmjs.com/package/firebase' },
	{ name: 'React Slick', link: 'https://www.npmjs.com/package/react-slick' },
	{ name: 'React Router DOM', link: 'https://www.npmjs.com/package/react-router-dom' },
	{ name: 'Notistack', link: 'https://www.npmjs.com/package/notistack' },
	{ name: 'Lottie Icons', link: 'https://www.npmjs.com/package/react-lottie' },
	{ name: 'Formik', link: 'https://www.npmjs.com/package/formik' },
	{ name: 'Yup', link: 'https://www.npmjs.com/package/yup' },
	{ name: 'TypeScript', link: 'https://www.typescriptlang.org/' },
]

export default function Information() {
	useWebsiteTitle('Informacje')
	return (
		<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
			<Container
				maxWidth='md'
				sx={{
					borderRadius: '15px',
					marginTop: { xs: '20px', md: '50px' },
					padding: { xs: '10px', md: '20px' },
					boxShadow: { xs: 'none', md: '0px 4px 20px rgba(0, 0, 0, 0.1)' },
				}}>
				<TitleWithSubtitle title='Informacje' subtitle='Technologie i narzędzia' />
				<Typography variant='body1' mb={2}>
					Poniżej znajduje się opis projektu strony internetowej do zamawiania jedzenia, która umożliwia dodawanie
					produktów do koszyka, dodawanie opinii, logowanie i rejestrację użytkowników oraz dodawanie restauracji do
					ulubionych. Dane o restauracjach są pobierane z Firebase, a strona pozwala na filtrowanie restauracji za
					pomocą filtrów.
				</Typography>
				<Link sx={{ marginTop: '50px' }}>Github link</Link>
				<Box sx={{ display: 'flex', flexDirection: 'column', marginTop: '50px' }}>
					<TitleWithSubtitle
						title='Wykorzystane technologie:'
						subtitle='Lista technologii wykorzystanych w projekcie'
					/>

					<List>
						{libraries.map((library, index) => (
							<ListItem key={index}>
								<ListItemText primary={library.name} secondary={<Link href={library.link}>{library.link}</Link>} />
							</ListItem>
						))}
					</List>
				</Box>
			</Container>
		</motion.div>
	)
}
