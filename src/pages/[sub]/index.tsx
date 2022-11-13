import { Grid, Typography } from '@mui/material';
import { GetStaticPropsContext } from 'next';
import { useRouter } from 'next/router';
import AuthUserAndHiddenItem from 'component/AuthUserAndHiddenItem';
import Meta from 'component/Meta';
import ProfileEditButton from 'component/ProfileEditButton';
import ProfilePageTabs from 'component/ProfilePageTabs';
import SocialButton from 'component/SocialButton';
import UserIcon from 'component/UserIcon';
import { getRoadmaps } from 'services/roadmaps';
import { getUsers, getUser } from 'services/users';
import type { User, Users } from 'types';

const UserPage = ({ user, usersRoadmaps, likedRoadmaps }: any) => {
  const router = useRouter();
  if (router.isFallback) {
    return <h3>Loading...</h3>;
  }
  return (
    <>
      <Meta pageTitle='プロフィール' />
      <Grid container>
        <Grid item xs={12}></Grid>
        <Grid item xs={2}>
          <Grid container alignItems='center' justifyContent='center' direction='column'>
            <Grid item>
              <UserIcon user={user} />
            </Grid>
            <Typography variant='h6'>{user.name}</Typography>
            <Grid item>
              <SocialButton profileUser={user} />
            </Grid>
            <Grid item>
              <AuthUserAndHiddenItem user={user}>
                <ProfileEditButton />
              </AuthUserAndHiddenItem>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={10} sx={{ pt: 2, pb: 4, bgcolor: '#eeeeee' }}>
          <ProfilePageTabs
            user={user}
            usersRoadmaps={usersRoadmaps}
            likedRoadmaps={likedRoadmaps}
          />
        </Grid>
      </Grid>
    </>
  );
};

export const getStaticPaths = async () => {
  const users: Users = await getUsers();
  if (!users) return { paths: [], fallback: false };
  const paths = users.map((user) => ({
    params: { sub: `${user.sub}` },
  }));
  return { paths, fallback: true };
};

export const getStaticProps = async ({ params }: GetStaticPropsContext) => {
  if (!params) {
    throw new Error('params is undefined');
  }
  const user: User = await getUser(String(params.sub));
  const roadmaps = await getRoadmaps();
  const usersRoadmaps = roadmaps.filter((roadmap: any) => roadmap.user.sub === params.sub);
  const likedRoadmapIds = user.likes!.map((like: any) => like.roadmap_id);
  const likedRoadmaps = roadmaps.filter((roadmap: any) => likedRoadmapIds.includes(roadmap.id));
  return {
    props: { user: user, usersRoadmaps: usersRoadmaps, likedRoadmaps: likedRoadmaps },
    revalidate: 5,
  };
};

export default UserPage;
