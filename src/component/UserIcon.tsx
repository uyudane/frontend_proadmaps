import { useAuth0 } from '@auth0/auth0-react';
import { Container, Avatar } from '@mui/material';

const UserIcon = () => {
  const { isAuthenticated, isLoading, user } = useAuth0();

  return (
    <>
      <Container sx={{ flexGrow: 0 }}>
        {isAuthenticated ? (
          <>
            <Avatar
              alt='Remy Sharp'
              src={user!.picture}
              sx={{ width: { md: 100, lg: 150 }, height: { md: 100, lg: 150 } }}
            />
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
