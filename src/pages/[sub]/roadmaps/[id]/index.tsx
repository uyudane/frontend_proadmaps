import { Box, Grid } from '@mui/material';
import { GetStaticPropsContext } from 'next';
import { useRouter } from 'next/router';
import Meta from 'component/Meta';
import RoadmapEditDeleteButton from 'component/RoadmapEditDeleteButton';
import RoadmapIntroduction from 'component/RoadmapIntroduction';
import StepCard from 'component/StepCard';
import { getRoadmap } from 'services/roadmaps';
import { getUsers } from 'services/users';
import type { User, Roadmap } from 'types';

const RoadmapDeteilPage = ({ roadmap }: any) => {
  // step_number順に表示されるステップの順番を並び替える
  const stepData = [...roadmap.steps];
  const orderedSteps = stepData.sort((a, b) => (a.step_number > b.step_number ? 1 : -1));
  const router = useRouter();
  if (router.isFallback) {
    return <h3>Loading...</h3>;
  }
  return (
    <>
      <Meta pageTitle='ロードマップ詳細' />
      <RoadmapEditDeleteButton roadmap={roadmap} />
      <Box sx={{ width: '100%' }}>
        <Box display='flex' justifyContent='center' alignItems='center'>
          <RoadmapIntroduction roadmap={roadmap} steps={roadmap.steps} user={roadmap.user} />
        </Box>
        <Grid container alignItems='center' justifyContent='center'>
          {orderedSteps.map((step: any, i: any) => (
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
  return { paths, fallback: true };
};

export const getStaticProps = async ({ params }: GetStaticPropsContext) => {
  if (!params) {
    throw new Error('params is undefined');
  }
  const roadmap = await getRoadmap(String(params.id));
  if (roadmap.user.sub === params.sub) {
    return { props: { roadmap: roadmap }, revalidate: 5 };
  } else {
    throw new Error('params is undefined');
  }
};

export default RoadmapDeteilPage;
