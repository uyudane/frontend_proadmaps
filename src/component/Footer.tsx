import { Grid, Box, Typography, Link as MuiLink } from '@mui/material';
import Link from 'next/link';

const Footer = () => {
  return (
    <>
      <Box
        sx={{ mt: 'calc(5%)', width: '100%', bottom: 0, bgcolor: '#eeeeee' }}
        component='footer'
        // variant='outlined'
      >
        <Grid
          container
          direction='row'
          justifyContent='flex-end'
          alignItems='center'
          spacing={2}
          pb={2}
        >
          <Grid item>
            <MuiLink
              href='https://twitter.com/uyudane'
              target='_blank'
              rel='noopener noreferrer'
              underline='none'
            >
              お問い合わせ
            </MuiLink>
          </Grid>
          <Grid item>
            <Link href='/terms' passHref>
              <MuiLink underline='none'>利用規約</MuiLink>
            </Link>
          </Grid>
          <Grid item>
            <Link href='/privacy' passHref>
              <MuiLink underline='none'>プライバシーポリシー</MuiLink>
            </Link>
          </Grid>
          <Grid item pr={2}>
            <Typography variant='body1'>©2022 ProadMaps</Typography>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default Footer;
