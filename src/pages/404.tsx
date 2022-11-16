import { Box, Button, Typography } from '@mui/material';
import { useRouter } from 'next/router';

const Custom404 = () => {
  const router = useRouter();

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        minHeight: '50vh',
        // backgroundColor: '#F2DF3A',
      }}
    >
      <Typography variant='h4' style={{ color: 'black' }}>
        404
      </Typography>
      <Typography variant='h6' style={{ color: 'black' }}>
        ページが見つかりません。
      </Typography>
      <br />
      <Button
        variant='contained'
        onClick={() => {
          router.push('/');
        }}
      >
        Back Home
      </Button>
    </Box>
  );
};

export default Custom404;
