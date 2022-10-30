import { Button, Box } from '@mui/material';
import { useEffect, useContext } from 'react';
import { useRecoilValue } from 'recoil';
import { UserInputData } from 'pages/roadmap';
import tokenState from 'recoil/atoms/tokenState';
import { postRoadmap } from 'services/roadmaps';

const ConfirmRoadMap = ({ handleBack }: { handleBack: any }) => {
  const token = useRecoilValue(tokenState);
  const { currentState } = useContext(UserInputData);
  const execPostRoadmap = () => {
    postRoadmap(
      {
        title: currentState.title,
        introduction: currentState.introduction,
        start_skill: currentState.start_skill,
        end_skill: currentState.end_skill,
      },
      token,
    );
  };
  return (
    <>
      最終確認
      <br />
      {currentState.title}
      <br />
      {currentState.introduction}
      <br />
      {currentState.start_skill}
      <br />
      {currentState.end_skill}
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
