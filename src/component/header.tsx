import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import AppLogo from './atoms/app-logo';
import HeaderNav from './header_nav';

const Header = () => {
  return (
    <>
      <header>
        <Container maxWidth='lg'>
          <Box sx={{ bgcolor: '#143F6B' }}>
            <Grid container spacing={2}>
              <Grid item xs={3} justifyContent='flex-start'>
                <AppLogo />
              </Grid>
              <Grid item xs={5} justifyContent='flex-end'></Grid>
              <Grid item xs={4} justifyContent='flex-end'>
                <HeaderNav />
              </Grid>
            </Grid>
          </Box>
        </Container>
      </header>
    </>
  );
};
export default Header;
