import { Grid } from '@mui/material';
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
      <Grid container alignItems='center' justifyContent='center' direction='column'>
        <Grid item>
          <RoadMapIntroduction roadmap={roadmap} steps={roadmap.steps} user={roadmap.user} />
        </Grid>
        <Grid item>
          {roadmap.steps.map((step: any, i: any) => (
            <StepCard key={`step${i}`} step={step} index={String(i + 1)} />
          ))}
        </Grid>
      </Grid>
    </>
  );
};

export const getStaticPaths = async () => {
  type UserFull = User & { roadmaps: Roadmap[] };
  const users: UserFull[] = await getUsers();
  if (!users) return { paths: [], fallback: false };
  const paths = [];
  for (const user of users) {
    for (const roadmap of user.roadmaps) {
      paths.push({ params: { sub: `${user.sub}`, id: `${roadmap.id}` } });
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
