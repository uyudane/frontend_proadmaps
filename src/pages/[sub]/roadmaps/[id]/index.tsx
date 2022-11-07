import { Box, Grid } from '@mui/material';
import { GetStaticPropsContext } from 'next';
import Meta from 'component/Meta';
import RoadMapIntroduction from 'component/RoadMapIntroduction';
import StepCard from 'component/StepCard';
import { getRoadmap } from 'services/roadmaps';
import { getUsers } from 'services/users';
import type { User, Roadmap } from 'types';

const UserPage = ({ roadmap }: any) => {
  return (
    <>
      <Meta pageTitle='ロードマップ詳細' />
      <Box sx={{ width: '100%' }}>
        <Box display='flex' justifyContent='center' alignItems='center'>
          <RoadMapIntroduction roadmap={roadmap} steps={roadmap.steps} user={roadmap.user} />
        </Box>
        <Grid container alignItems='center' justifyContent='center'>
          {roadmap.steps.map((step: any, i: any) => (
            <StepCard key={`step${i}`} step={step} index={String(i + 1)} />
          ))}
        </Grid>
      </Box>
    </>
  );
};

export const getStaticPaths = async () => {
  type UserFull = User & { roadmaps: Roadmap[] };
  const users: UserFull[] = await getUsers();
  if (!users) return { paths: [], fallback: false };
  const paths = [];
  for (const user of users) {
    if (typeof user.roadmaps !== 'undefined' && user.roadmaps.length > 0) {
      for (const roadmap of user.roadmaps) {
        paths.push({ params: { sub: `${user.sub}`, id: `${roadmap.id}` } });
      }
    }
  }
  return { paths, fallback: false };
};

export const getStaticProps = async ({ params }: GetStaticPropsContext) => {
  if (!params) {
    throw new Error('params is undefined');
  }
  const roadmap = await getRoadmap(String(params.id));
  return { props: { roadmap: roadmap } };
};

export default UserPage;