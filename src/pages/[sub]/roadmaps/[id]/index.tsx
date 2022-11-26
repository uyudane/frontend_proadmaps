import { Box, Grid } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import { GetStaticPropsContext, NextPage } from 'next';
import { useRouter } from 'next/router';
import { useState } from 'react';
import AuthUserAndHiddenItem from 'component/AuthUserAndHiddenItem';
import ConvertRoadmapIntoMarkdownButton from 'component/ConvertRoadmapIntoMarkdownButton';
import Meta from 'component/Meta';
import RequestTweetDialog from 'component/RequestTweetDialog';
import RoadmapEditDeleteButton from 'component/RoadmapEditDeleteButton';
import RoadmapIntroduction from 'component/RoadmapIntroduction';
import RoadmapTwitterCard from 'component/RoadmapTwitterCard';
import StepCard from 'component/StepCard';
import { getRoadmap } from 'services/roadmaps';
import { getUsers } from 'services/users';
import type { RoadmapFullData, UserFullData } from 'types';

type Props = {
  roadmap: RoadmapFullData;
};

const RoadmapDeteilPage: NextPage<Props> = ({ roadmap }: Props) => {
  const router = useRouter();
  // ロードマップ投稿時のTwitter投稿依頼ダイアログの開閉に使用
  const [open, setOpen] = useState(true);
  if (router.isFallback) {
    return (
      <div>
        <CircularProgress />
      </div>
    );
  }

  // ロードマップ作成、更新後のアラートメッセージの有無で、Twitter投稿依頼ダイアログの有無を制御
  const successMessage = router.query.successMessage || null;

  // ロードマップ投稿時のTwitter投稿依頼ダイアログの開閉に使用
  const dialogClose = () => {
    setOpen(false);
  };

  // step_number順に表示されるステップの順番を並び替える
  const stepData = [...roadmap.steps];
  // ロードマップ作成後のため、step_numberがnullになることはない
  const orderedSteps = stepData.sort((a, b) => (a.step_number! > b.step_number! ? 1 : -1));
  return (
    <>
      <Meta pageTitle='ロードマップ詳細' />
      <RoadmapTwitterCard {...{ roadmap }} />
      {/* Twitter投稿依頼ダイアログ */}
      {successMessage && open && (
        <RequestTweetDialog open={open} onClose={dialogClose} roadmap={roadmap} />
      )}
      <AuthUserAndHiddenItem user={roadmap.user}>
        <Box sx={{ display: { xs: 'none', md: 'block' } }}>
          <RoadmapEditDeleteButton roadmap={roadmap} />
          <ConvertRoadmapIntoMarkdownButton roadmap={roadmap} steps={orderedSteps} />
        </Box>
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
      return { props: { roadmap: roadmap }, revalidate: 1 };
    } else {
      return { notFound: true };
    }
  } catch (err) {
    // 見つからなかった際に、404エラーページに飛ばす
    return { notFound: true };
  }
};

export default RoadmapDeteilPage;
