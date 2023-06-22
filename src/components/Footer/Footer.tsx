import React from 'react';
import {
  Box,
  Typography,
  Container,
  Grid,
  Divider,
  ListItem,
  List,
  ListItemIcon,
  ListItemText,
  IconButton,
  Stack,
  useMediaQuery,
  Link as MuiLink,
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import LogoWhite from '../../assets/photos/LogoWhite.svg';
import FmdGoodIcon from '@mui/icons-material/FmdGood';
import EmailIcon from '@mui/icons-material/Email';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';

function Footer() {
  const isScreenSmall = useMediaQuery('(max-width:600px)');
  const currentYear = new Date().getFullYear();

  return (
    <Box sx={{ backgroundColor: 'secondary.main', color: 'white', padding: '20px', marginTop: '150px' }}>
      <Container>
        <Grid container justifyContent='center' columnSpacing={5} rowSpacing={5} paddingTop='75px' paddingBottom='75px'>
          <Grid
            item
            xs={12}
            md={3}
            sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center' }}
          >
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-start',
                alignItems: isScreenSmall ? 'center' : 'flex-start',
              }}
            >
              <img width='200px' src={LogoWhite} alt='Logo' />
              <Typography textAlign={isScreenSmall ? 'center' : undefined} variant='body2' color='text.primary' mt={2}>
                Jesteśmy platformą umożliwiającą łatwe zamawianie jedzenia online. Nasza misja to zaspokojenie Twojego głodu w najprostszy i najszybszy sposób.
              </Typography>
            </Box>
          </Grid>
          <Grid
            item
            xs={12}
            md={3}
            sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center' }}
          >
            <Box
              sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start' }}
            >
              <Typography variant='h6' color='white' fontWeight={600} mb={2}>
                Nawigacja
              </Typography>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '5px',
                  color: 'text.primary',
                  textAlign: isScreenSmall ? 'center' : 'left',
                }}
              >
                <MuiLink component={RouterLink} underline='none' to='/' variant='body2' color='text.primary'>
                  Strona główna
                </MuiLink>
                <MuiLink component={RouterLink} underline='none' to='/restauracje' variant='body2' color='text.primary'>
                  Restauracje
                </MuiLink>
                <MuiLink component={RouterLink} underline='none' to='/koszyk' variant='body2' color='text.primary'>
                  Koszyk
                </MuiLink>
                <MuiLink component={RouterLink} underline='none' to='/informacje' variant='body2' color='text.primary'>
                  Informacje
                </MuiLink>
              </Box>
            </Box>
          </Grid>
          <Grid
            item
            xs={12}
            md={3}
            sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center' }}
          >
            <Box
              sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start' }}
            >
              <Typography variant='h6' color='white' fontWeight={600}>
                Zostańmy w kontakcie
              </Typography>
              <List>
                <ListItem disableGutters>
                  <ListItemIcon>
                    <FmdGoodIcon color='primary' />
                  </ListItemIcon>
                  <ListItemText
                    primary='Kwiatowa 23/5, Nieistnogród'
                    sx={{ color: 'text.primary' }}
                    primaryTypographyProps={{ variant: 'body2' }}
                  />
                </ListItem>
                <ListItem disableGutters>
                  <ListItemIcon>
                    <EmailIcon color='primary' />
                  </ListItemIcon>
                  <ListItemText
                    sx={{ color: 'text.primary' }}
                    primary='kontakt@niedobre.pl'
                    primaryTypographyProps={{ variant: 'body2' }}
                  />
                </ListItem>
                <ListItem disableGutters>
                  <ListItemIcon>
                    <LocalPhoneIcon color='primary' />
                  </ListItemIcon>
                  <ListItemText
                    sx={{ color: 'text.primary' }}
                    primary='+48123456789'
                    primaryTypographyProps={{ variant: 'body2' }}
                  />
                </ListItem>
              </List>
            </Box>
          </Grid>
          <Grid
            item
            xs={12}
            md={3}
            sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center' }}
          >
            <Box
              sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start' }}
            >
              <Typography variant='h6' color='white' fontWeight={600} mb={2}>
                Zaobserwuj nas
              </Typography>
              <Stack direction='row' spacing={2}>
                <IconButton sx={{ border: '2px solid #348756' }}>
                  <FacebookIcon color='primary' />
                </IconButton>
                <IconButton sx={{ border: '2px solid #348756' }}>
                  <TwitterIcon color='primary' />
                </IconButton>
                <IconButton sx={{ border: '2px solid #348756' }}>
                  <InstagramIcon color='primary' />
                </IconButton>
              </Stack>
            </Box>
          </Grid>
        </Grid>
        <Divider color='#c1c0c1' variant='middle' />
        <Box mt={2} sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant='body2'>
            {'Website by '}
            <MuiLink
              href='https://github.com/Rozmyk'
              fontWeight={600}
              underline='none'
              target='_blank'
              rel='noopener noreferrer'
            >
              Rozmyk
            </MuiLink>
          </Typography>

          <Typography variant='body2'>
            ©{currentYear}
            <MuiLink href='https://niedobre.pl' underline='none' fontWeight={600} rel='noopener noreferrer'>
              {' Niedobre.pl '}
            </MuiLink>
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}

export default Footer;
