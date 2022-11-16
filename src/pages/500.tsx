import { Box, Button, Typography } from '@mui/material';
import { useRouter } from 'next/router';

const Custom500 = () => {
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
        500
      </Typography>
      <Typography variant='h6' style={{ color: 'black' }}>
        アクセスしようとしたページは表示できませんでした。
      </Typography>
      <Typography variant='h6' style={{ color: 'black' }}>
        Internal Server Error
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

export default Custom500;
