import { useAuth0 } from '@auth0/auth0-react';
import { Container, Avatar } from '@mui/material';

const UserIcon = () => {
  const { isAuthenticated, isLoading, user } = useAuth0();

  return (
    <>
      <Container sx={{ flexGrow: 0 }}>
        {isAuthenticated ? (
          <>
            <Avatar alt='Remy Sharp' src={user!.picture} sx={{ width: '100%', height: '100%' }} />
          </>
        ) : // ログイン確認中はローディングを出す
        isLoading ? (
          <div>Loading...</div>
        ) : (
          <Avatar alt='Remy Sharp' src='' />
        )}
      </Container>
    </>
  );
};

export default UserIcon;
