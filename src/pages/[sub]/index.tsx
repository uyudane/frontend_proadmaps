import { Grid, Typography } from '@mui/material';
import { GetStaticPropsContext, NextPage } from 'next';
import { useRouter } from 'next/router';
import AuthUserAndHiddenItem from 'component/AuthUserAndHiddenItem';
import Meta from 'component/Meta';
import ProfileEditButton from 'component/ProfileEditButton';
import ProfilePageTabs from 'component/ProfilePageTabs';
import SocialButton from 'component/SocialButton';
import UserIcon from 'component/UserIcon';
import { getRoadmaps } from 'services/roadmaps';
import { getUser } from 'services/users';
import type { UserFullData, RoadmapFullData } from 'types';

type Props = {
  user: UserFullData;
  usersRoadmaps: RoadmapFullData[];
  likedRoadmaps: RoadmapFullData[];
};

const UserPage: NextPage<Props> = ({ user, usersRoadmaps, likedRoadmaps }: Props) => {
  return (
    <>
      <Meta pageTitle='プロフィール' />
      <Grid container>
        <Grid item xs={12}></Grid>
        <Grid item xs={12} md={2}>
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
        <Grid item xs={12} md={10} sx={{ pt: 2, pb: 4, bgcolor: '#eeeeee' }}>
          <ProfilePageTabs {...{ user, usersRoadmaps, likedRoadmaps }} />
        </Grid>
      </Grid>
    </>
  );
};

export const getServerSideProps = async ({ params }: GetStaticPropsContext) => {
  if (!params) {
    throw new Error('params is undefined');
  }
  try {
    const user: UserFullData = await getUser(String(params.sub));
    const roadmaps: RoadmapFullData[] = await getRoadmaps();
    // ユーザのロードマップを抽出
    const usersRoadmaps = roadmaps.filter((roadmap) => roadmap.user.sub === params.sub);
    // ユーザのいいねしたロードマップIDをもとに、ロードマップを抽出
    const likedRoadmapIds = user.likes.map((like) => like.roadmap_id);
    const likedRoadmaps = roadmaps.filter((roadmap) => likedRoadmapIds.includes(roadmap.id));
    return {
      props: { ...{ user, usersRoadmaps, likedRoadmaps } },
    };
  } catch (err) {
    // 見つからなかった際に、404エラーページに飛ばす
    return { notFound: true };
  }
};

export default UserPage;
