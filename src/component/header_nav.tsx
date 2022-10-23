import Box from '@mui/material/Box';
import Link from '@mui/material/Link';

const HeaderNav = () => {
  return (
    <>
      <Box
        sx={{
          display: 'flex',
          mr: 2,
          flexWrap: 'wrap',
          height: 100,
          alignItems: 'center',
          justifyContent: 'flex-end',
          '& > :not(style) + :not(style)': {
            ml: 2,
          },
        }}
      >
        <Link href='/' underline='none' color='#ffffff'>
          {'Makemap!'}
        </Link>
        <Link href='/' underline='hover' color='#ffffff'>
          {'Login'}
        </Link>
        <Link href='/' underline='always' color='#ffffff'>
          {'sign up!'}
        </Link>
      </Box>
    </>
  );
};

export default HeaderNav;
