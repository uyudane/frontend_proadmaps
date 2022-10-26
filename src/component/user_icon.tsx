import { useAuth0 } from '@auth0/auth0-react';
import { Tooltip, Box, IconButton, Avatar } from '@mui/material';

const UserIcon = () => {
  const { isAuthenticated, loginWithRedirect, logout, isLoading, user } = useAuth0();
  return (
    <>
      <Box sx={{ flexGrow: 0 }}>
        {isAuthenticated ? (
          <>
            <Avatar alt='Remy Sharp' src={user!.picture} sx={{ width: '90%', height: '90%' }} />
          </>
        ) : // ログイン確認中はローディングを出す
        isLoading ? (
          <div>Loading...</div>
        ) : (
          <Avatar alt='Remy Sharp' src='' />
        )}
      </Box>
    </>
  );
};

export default UserIcon;
