import { Button, Box, Grid, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import { useRecoilValue } from 'recoil';
import RoadmapCancelButton from './RoadmapCancelButton';
import RoadmapCard from './RoadmapCard';
import RoadmapDraftSubmitButton from './RoadmapDraftSubmitButton';
import RoadmapIntroduction from './RoadmapIntroduction';
import RoadmapSubmitButton from './RoadmapSubmitButton';
import StepCard from './StepCard';
import roadmapState from 'recoil/atoms/roadmapState';
import stepsState from 'recoil/atoms/stepsState';
import userState from 'recoil/atoms/userState';

const ConfirmRoadmap = ({ handleBack }: { handleBack: () => void }) => {
  const roadmap = useRecoilValue(roadmapState);
  const steps = useRecoilValue(stepsState);
  const current_user = useRecoilValue(userState);

  // 下書き保存ボタンの有無の制御に使用(編集時には出さない)
  const router = useRouter();

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
        <RoadmapCancelButton />
        {router.pathname === '/roadmap/new' && <RoadmapDraftSubmitButton />}
        <RoadmapSubmitButton />
      </Box>
    </>
  );
};

export default ConfirmRoadmap;
