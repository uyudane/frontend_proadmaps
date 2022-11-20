import SendIcon from '@mui/icons-material/Send';
import { Button } from '@mui/material';
import { useRouter } from 'next/router';
import { useRecoilValue, useResetRecoilState } from 'recoil';
import roadmapState from 'recoil/atoms/roadmapState';
import stepsState from 'recoil/atoms/stepsState';
import tokenState from 'recoil/atoms/tokenState';
import userState from 'recoil/atoms/userState';
import { postRoadmap, editRoadmap } from 'services/roadmaps';

const RoadmapSubmitButton = () => {
  const current_user = useRecoilValue(userState); // RecoilのTokneを取得する
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
    is_published: true,
  };
  const execPostRoadmap = async () => {
    const result = await postRoadmap(
      {
        ...baseParams,
      },
      token,
    );
    return result;
  };

  const execEditRoadmap = async () => {
    const result = await editRoadmap(
      {
        ...baseParams,
        id: roadmap.id,
      },
      token,
    );
    return result;
  };

  const execSubmit = async () => {
    let result = undefined;
    switch (router.pathname) {
      case '/roadmap/new':
        result = await execPostRoadmap();
        break;
      case '/drafts/[id]/edit':
        result = await execEditRoadmap();
        break;
      default:
        return;
    }
    if (result.id) {
      resetRoadmap();
      resetSteps();
      router.push({
        pathname: `/${current_user.sub}/roadmaps/${result.id}`,
        query: { successMessage: 'ロードマップを投稿しました' },
      });
    } else {
      // バックエンドから200以外が返ってきた際に、エラーを伝える
      router.push({
        pathname: router.asPath,
        query: {
          errorMessage: '500（Internal Server Error） | ロードマップの投稿に失敗しました',
        },
      });
    }
  };

  return (
    <>
      <Button
        color='secondary'
        variant='contained'
        onClick={execSubmit}
        sx={{ ml: 10 }}
        endIcon={<SendIcon />}
      >
        {/* ロードマップが公開済みの場合は"更新する"、新規作成、下書きからの編集の場合は"投稿する" */}
        {roadmap.is_published === true ? '更新する' : '投稿する'}
      </Button>
    </>
  );
};

export default RoadmapSubmitButton;
