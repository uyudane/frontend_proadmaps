import { Button } from '@mui/material';
import { useRouter } from 'next/router';
import { useRecoilValue, useResetRecoilState } from 'recoil';
import roadmapState from 'recoil/atoms/roadmapState';
import stepsState from 'recoil/atoms/stepsState';
import tokenState from 'recoil/atoms/tokenState';
import { postRoadmap, editRoadmap } from 'services/roadmaps';

const RoadmapDraftSubmitButton = () => {
  const router = useRouter();
  const token = useRecoilValue(tokenState);
  const roadmap = useRecoilValue(roadmapState);
  const steps = useRecoilValue(stepsState);
  const resetRoadmap = useResetRecoilState(roadmapState);
  const resetSteps = useResetRecoilState(stepsState);
  const baseParams = {
    id: roadmap.id,
    title: roadmap.title,
    tags: roadmap.tags,
    introduction: roadmap.introduction,
    start_skill: roadmap.start_skill,
    end_skill: roadmap.end_skill,
    steps: steps,
    is_published: false,
  };
  const execDraftRoadmap = async () => {
    let result = undefined;
    // 新規作成時はpost
    if (roadmap.id === null) {
      result = await postRoadmap(baseParams, token);
    } else {
      // 下書き時はedit
      result = await editRoadmap(baseParams, token);
    }
    if (result.id) {
      resetRoadmap();
      resetSteps();
      router.push({
        pathname: `/drafts`,
        query: { successMessage: 'ロードマップを下書き保存しました' },
      });
    }
  };

  return (
    <>
      <Button color='inherit' variant='contained' onClick={execDraftRoadmap} sx={{ mr: 1 }}>
        下書き保存
      </Button>
    </>
  );
};

export default RoadmapDraftSubmitButton;
