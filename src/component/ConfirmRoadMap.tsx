import { Button, Box } from '@mui/material';
import { useRouter } from 'next/router';
import { useEffect, useContext } from 'react';
import { useRecoilValue, useResetRecoilState } from 'recoil';
import { UserInputData } from 'pages/roadmap';
import roadmapState from 'recoil/atoms/roadmapState';
import stepsState from 'recoil/atoms/stepsState';
import tokenState from 'recoil/atoms/tokenState';
import { postRoadmap } from 'services/roadmaps';

const ConfirmRoadMap = ({ handleBack }: { handleBack: any }) => {
  const router = useRouter();
  const token = useRecoilValue(tokenState);
  const roadmap = useRecoilValue(roadmapState);
  const resetRoadmap = useResetRecoilState(roadmapState);
  const resetSteps = useResetRecoilState(stepsState);
  const execPostRoadmap = async () => {
    const result = await postRoadmap(
      {
        title: roadmap.title,
        introduction: roadmap.introduction,
        start_skill: roadmap.start_skill,
        end_skill: roadmap.end_skill,
      },
      token,
    );
    resetRoadmap();
    resetSteps();
    if (result === 'OK') {
      router.push({
        pathname: `/`,
        query: { message: 'ロードマップを投稿しました' },
      });
    }
  };
  return (
    <>
      最終確認
      <br />
      {roadmap.title}
      <br />
      {roadmap.introduction}
      <br />
      {roadmap.start_skill}
      <br />
      {roadmap.end_skill}
      <br />
      <br />
      <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
        <Button color='primary' variant='contained' onClick={handleBack} sx={{ mr: 1 }}>
          Back
        </Button>
        <Box sx={{ flex: '1 1 auto' }} />
        <Button color='secondary' variant='contained' onClick={execPostRoadmap}>
          finish
        </Button>
      </Box>
    </>
  );
};

export default ConfirmRoadMap;
