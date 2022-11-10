import { Button } from '@mui/material';
import { useRouter } from 'next/router';
import { useRecoilValue, useResetRecoilState } from 'recoil';
import roadmapState from 'recoil/atoms/roadmapState';
import stepsState from 'recoil/atoms/stepsState';
import tokenState from 'recoil/atoms/tokenState';
import { postRoadmap } from 'services/roadmaps';

const RoadmapDraftSubmitButton = () => {
  const router = useRouter();
  const token = useRecoilValue(tokenState);
  const roadmap = useRecoilValue(roadmapState);
  const steps = useRecoilValue(stepsState);
  const resetRoadmap = useResetRecoilState(roadmapState);
  const resetSteps = useResetRecoilState(stepsState);
  const execDraftRoadmap = async () => {
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
    if (result === 'OK') {
      resetRoadmap();
      resetSteps();
      router.push({
        pathname: `/`,
        query: { successMessage: 'ロードマップを下書き保存しました' },
      });
    }
  };

  return (
    <>
      <Button color='secondary' variant='contained' onClick={execDraftRoadmap} sx={{ mr: 5 }}>
        下書き保存する
      </Button>
    </>
  );
};

export default RoadmapDraftSubmitButton;
