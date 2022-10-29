import { Grid, Typography } from '@mui/material';
import { GetStaticPropsContext } from 'next';
import Meta from 'component/Meta';
import ProfileEditButton from 'component/ProfileEditButton';
import SocialButton from 'component/SocialButton';
import UserIcon from 'component/UserIcon';
import { getUsers, getUser } from 'services/users';
import type { User, Users } from 'types';

const UserPage = ({ user }: any) => {
  return (
    <>
      <Meta pageTitle='プロフィール' />
      <Grid container>
        <Grid item xs={12}></Grid>
        <Grid item xs={2}>
          <Grid container alignItems='center' justifyContent='center' direction='column'>
            <Grid item>
              <UserIcon />
            </Grid>
            <Typography variant='h6'>{user.name}</Typography>
            <Grid item>
              <SocialButton profileUser={user} />
            </Grid>
            <Grid item>
              <ProfileEditButton profileUser={user} />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={10} sx={{ pt: 2, pb: 4, bgcolor: '#eeeeee' }}></Grid>
      </Grid>
    </>
  );
};

export const getStaticPaths = async () => {
  const result: Users = await getUsers();
  if (!result) return { paths: [], fallback: false };
  const paths = result.map((user) => ({
    params: { sub: `${user.sub}` },
  }));
  return { paths, fallback: false };
};

export const getStaticProps = async ({ params }: GetStaticPropsContext) => {
  if (!params) {
    throw new Error('params is undefined');
  }
  const result: User = await getUser(String(params.sub));
  return { props: { user: result } };
};

export default UserPage;
