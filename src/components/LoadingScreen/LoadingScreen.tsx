import { Box, CircularProgress, Typography } from '@mui/material'
import { useContext, useEffect } from 'react'
import { RestaurantsContext } from '../../contexts/RestaurantsDataContext'
import { motion, useAnimation, Variants } from 'framer-motion'

const LoadingScreen = () => {
  const { loading } = useContext(RestaurantsContext)
  const controls = useAnimation()

  useEffect(() => {
    if (loading) {
      document.body.style.overflow = 'hidden'
      controls.start('animate')
    } else {
      document.body.style.overflow = 'auto'
      controls.start('exit')
    }
  }, [loading, controls])

  const loadingScreenVariants: Variants = {
    animate: {
      opacity: 1,
      pointerEvents: 'auto',
      transition: {
        duration: 0.5,
      },
    },
    exit: {
      opacity: 0,
      pointerEvents: 'none',
    },
  }

  return (
    <motion.div
      className='loading-screen'
      initial='initial'
      animate={controls}
      variants={loadingScreenVariants}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        zIndex: 20,
      }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <CircularProgress size={40} />
        <Typography sx={{ fontWeight: 600 }} variant='body1'>
          Ładowanie danych...
        </Typography>
      </Box>
    </motion.div>
  )
}

export default LoadingScreen
