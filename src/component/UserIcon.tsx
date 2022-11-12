import { useAuth0 } from '@auth0/auth0-react';
import { Container, Avatar } from '@mui/material';

const UserIcon = ({ user }: any) => {
  return (
    <>
      <Container sx={{ flexGrow: 0 }}>
        <Avatar
          alt='Remy Sharp'
          src={user.avatar}
          sx={{ width: { md: 100, lg: 150 }, height: { md: 100, lg: 150 } }}
        />
      </Container>
    </>
  );
};

export default UserIcon;
