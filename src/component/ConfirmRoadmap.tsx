import { Button, Box, Grid, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import { useRecoilValue, useResetRecoilState } from 'recoil';
import RoadmapCard from './RoadmapCard';
import RoadmapIntroduction from './RoadmapIntroduction';
import StepCard from './StepCard';
import roadmapState from 'recoil/atoms/roadmapState';
import stepsState from 'recoil/atoms/stepsState';
import tokenState from 'recoil/atoms/tokenState';
import userState from 'recoil/atoms/userState';
import { postRoadmap, editRoadmap } from 'services/roadmaps';

const ConfirmRoadmap = ({ handleBack }: { handleBack: () => void }) => {
  const router = useRouter();
  const token = useRecoilValue(tokenState);
  const roadmap = useRecoilValue(roadmapState);
  const steps = useRecoilValue(stepsState);
  const current_user = useRecoilValue(userState);
  const resetRoadmap = useResetRecoilState(roadmapState);
  const resetSteps = useResetRecoilState(stepsState);
  const execPostRoadmap = async () => {
    const result = await postRoadmap(
      {
        title: roadmap.title,
        tags: roadmap.tags,
        introduction: roadmap.introduction,
        start_skill: roadmap.start_skill,
        end_skill: roadmap.end_skill,
        steps: steps,
      },
      token,
    );
    return result;
  };

  const execEditRoadmap = async () => {
    const result = await editRoadmap(
      {
        id: roadmap.id,
        title: roadmap.title,
        tags: roadmap.tags,
        introduction: roadmap.introduction,
        start_skill: roadmap.start_skill,
        end_skill: roadmap.end_skill,
        steps: steps,
      },
      token,
    );
    return result;
  };

  const execSubmit = async () => {
    let result = '';
    switch (router.pathname) {
      case '/roadmap/new':
        result = (await execPostRoadmap()) as any;
        break;
      case '/drafts/[id]/edit':
        result = (await execEditRoadmap()) as any;
        break;
      default:
        // リファクト必要
        console.log('エラー');
        return;
    }
    if (result === 'OK') {
      resetRoadmap();
      resetSteps();
      router.push({
        pathname: `/`,
        query: { successMessage: 'ロードマップを投稿しました' },
      });
    }
  };

  return (
    <>
      <Box
        display='flex'
        justifyContent='center'
        alignItems='center'
        sx={{
          bgcolor: '#F2DF3A',
        }}
      >
        <Typography variant='h6'>まだ投稿は完了していません!</Typography>
      </Box>
      <Typography variant='h6' component='div'>
        ①概要プレビュー(一覧ページで表示)
      </Typography>
      <Box display='flex' justifyContent='center' alignItems='center'>
        <RoadmapCard roadmap={roadmap} steps={steps} user={current_user} />
      </Box>
      <Typography variant='h6' component='div'>
        ②詳細プレビュー(詳細ページで表示)
      </Typography>
      <RoadmapIntroduction roadmap={roadmap} steps={steps} user={current_user} />
      <Grid container alignItems='center' justifyContent='center'>
        {steps.map((step, i) => (
          <StepCard key={`step${i}`} step={step} index={String(i + 1)} />
        ))}
      </Grid>
      <br />
      <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
        <Button color='primary' variant='contained' onClick={handleBack} sx={{ mr: 1 }}>
          Back
        </Button>
        <Box sx={{ flex: '1 1 auto' }} />
        <Button color='secondary' variant='contained' onClick={execSubmit}>
          finish
        </Button>
      </Box>
    </>
  );
};

export default ConfirmRoadmap;
