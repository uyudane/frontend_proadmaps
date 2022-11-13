import { Grid, Box, Paper, Container, Typography } from '@mui/material';
import Image from 'next/image';

const Footer = () => {
  return (
    <>
      <Paper
        sx={{ mt: 'calc(10% + 30px)', width: '100%', bottom: 0, bgcolor: '#eeeeee' }}
        component='footer'
        variant='outlined'
      >
        <Container maxWidth='lg'>
          <Box
            sx={{
              flexGrow: 1,
              justifyContent: 'center',
              display: 'flex',
              my: 1,
            }}
          >
            <div>
              <Image priority src='/logo_unit.png' width={16} height={16} alt='Logo' />
            </div>
          </Box>

          <Box
            sx={{
              flexGrow: 1,
              justifyContent: 'center',
              display: 'flex',
              mb: 2,
            }}
          >
            <Typography variant='caption'>Copyright ©2022. [] Limited</Typography>
          </Box>
        </Container>
      </Paper>
    </>
  );
};

export default Footer;
