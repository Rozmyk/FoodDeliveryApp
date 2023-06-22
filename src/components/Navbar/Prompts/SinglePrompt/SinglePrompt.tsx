import { useNavigate } from 'react-router-dom'
import { ListItem, ListItemAvatar, ListItemText, ListItemButton, Avatar } from '@mui/material'
import { motion } from 'framer-motion'
import { SinglePromptProps } from '../../../../types/types'

const SinglePrompt = ({ id, handleClose, photo, name, category }: SinglePromptProps) => {
	const navigate = useNavigate()

	const handleClick = () => {
		navigate(`/restaurants/${id}`)
		handleClose()
	}

	return (
		<ListItem key={id}>
			<motion.div style={{ width: '100%' }} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
				<ListItemButton onClick={handleClick}>
					<ListItemAvatar>
						<Avatar src={photo} />
					</ListItemAvatar>
					<ListItemText primary={name} sx={{ textTransform: 'capitalize' }} secondary={category} />
				</ListItemButton>
			</motion.div>
		</ListItem>
	)
}

export default SinglePrompt
