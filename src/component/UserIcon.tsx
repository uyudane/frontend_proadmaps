import { Container, Avatar } from '@mui/material';
import { UserState } from 'types';

type Props = {
  user: UserState;
};

const UserIcon = ({ user }: Props) => {
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
