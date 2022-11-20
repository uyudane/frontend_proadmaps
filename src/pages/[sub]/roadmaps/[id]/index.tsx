import { Box, Grid } from '@mui/material';
import { GetStaticPropsContext, NextPage } from 'next';
import { useRouter } from 'next/router';
import AuthUserAndHiddenItem from 'component/AuthUserAndHiddenItem';
import Meta from 'component/Meta';
import RoadmapEditDeleteButton from 'component/RoadmapEditDeleteButton';
import RoadmapIntroduction from 'component/RoadmapIntroduction';
import StepCard from 'component/StepCard';
import TwitterCard from 'component/TwitterCard';
import { getRoadmap } from 'services/roadmaps';
import { getUsers } from 'services/users';
import type { RoadmapFullData, UserFullData } from 'types';

type Props = {
  roadmap: RoadmapFullData;
};

const RoadmapDeteilPage: NextPage<Props> = ({ roadmap }: Props) => {
  const router = useRouter();
  if (router.isFallback) {
    return <h3>Loading...</h3>;
  }

  // step_number順に表示されるステップの順番を並び替える
  const stepData = [...roadmap.steps];
  // ロードマップ作成後のため、step_numberがnullになることはない
  const orderedSteps = stepData.sort((a, b) => (a.step_number! > b.step_number! ? 1 : -1));
  return (
    <>
      <Meta pageTitle='ロードマップ詳細' />
      <TwitterCard {...{ roadmap }} />
      <AuthUserAndHiddenItem user={roadmap.user}>
        <RoadmapEditDeleteButton roadmap={roadmap} />
      </AuthUserAndHiddenItem>
      <Box sx={{ width: '100%' }}>
        <Box display='flex' justifyContent='center' alignItems='center'>
          <RoadmapIntroduction roadmap={roadmap} steps={roadmap.steps} user={roadmap.user} />
        </Box>
        <Grid container alignItems='center' justifyContent='center'>
          {orderedSteps.map((step, i) => (
            <StepCard key={`step${i}`} step={step} index={String(i + 1)} />
          ))}
        </Grid>
      </Box>
    </>
  );
};

export const getStaticPaths = async () => {
  const users: UserFullData[] = await getUsers();
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
    return { notFound: true };
  }
  try {
    const roadmap = await getRoadmap(String(params.id));
    // 見つからなかった場合は、errorが渡ってきて、以下のコマンドで「Not Found」が出力される
    // console.log(roadmap.response.statusText); // 「Not Found」
    // roadmap.user.subでエラーになり、エラー処理に渡る
    if (roadmap.user.sub === params.sub) {
      return { props: { roadmap: roadmap }, revalidate: 5 };
    } else {
      return { notFound: true };
    }
  } catch (err) {
    // 見つからなかった際に、404エラーページに飛ばす
    return { notFound: true };
  }
};

export default RoadmapDeteilPage;
