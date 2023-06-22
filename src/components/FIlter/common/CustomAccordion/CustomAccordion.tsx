import * as React from 'react'
import { Accordion, AccordionSummary, AccordionDetails, Typography } from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'

export default function CustomAccordion({ title, content }: { title: string; content: React.ReactNode }) {
	return (
		<Accordion disableGutters sx={{ boxShadow: 'none', width: '100%' }}>
			<AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls='panel1a-content' id='panel1a-header'>
				<Typography variant='body1' color='text.secondary' fontWeight={600}>
					{title}
				</Typography>
			</AccordionSummary>
			<AccordionDetails>{content}</AccordionDetails>
		</Accordion>
	)
}
