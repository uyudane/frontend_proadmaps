import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Stepper from '@mui/material/Stepper';
import Typography from '@mui/material/Typography';
import { GetServerSideProps, NextPage } from 'next';
import { useState, useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import ConfirmRoadmap from 'component/ConfirmRoadmap';
import CreateRoadmap from 'component/CreateRoadmap';
import CreateSteps from 'component/CreateSteps';
import Meta from 'component/Meta';
import useAuthUserAndRedirect from 'hooks/useAuthUserAndRedirect';
import roadmapState from 'recoil/atoms/roadmapState';
import stepsState from 'recoil/atoms/stepsState';
import { getRoadmap } from 'services/roadmaps';
import { RoadmapFullData } from 'types';

const steps = ['ロードマップ/学習記録の概要作成', 'ステップ作成', 'プレビュー確認'];

type Props = {
  roadmap: RoadmapFullData;
};

const EditRoadmapPage: NextPage<Props> = ({ roadmap }: Props) => {
  const setRoadmap = useSetRecoilState(roadmapState);
  const setSteps = useSetRecoilState(stepsState);
  useEffect(() => {
    setRoadmap({ ...roadmap });
    // step_number順に編集時に表示されるステップの順番を並び替える
    const stepData = [...roadmap.steps];
    // 編集時のため、step_numberがnullなることはない
    const orderedSteps = stepData.sort((a, b) => (a.step_number! > b.step_number! ? 1 : -1));
    setSteps(orderedSteps);
  }, [roadmap]);

  const authentication = useAuthUserAndRedirect(roadmap.user);

  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  if (!authentication) {
    return (
      <div>
        <CircularProgress />
      </div>
    );
  }
  return (
    <>
      <Meta pageTitle='ロードマップ編集' />
      <Box sx={{ width: '100%' }}>
        {/* 上部のステップ表示部分 */}
        {/* Stepperでアクティブの所まで色がつく */}
        <Stepper activeStep={activeStep} alternativeLabel>
          {steps.map((label) => {
            const stepProps: { completed?: boolean } = {};
            return (
              <Step key={label} {...stepProps}>
                <StepLabel>{label}</StepLabel>
              </Step>
            );
          })}
        </Stepper>
        <Typography sx={{ mt: 2, mb: 1 }}>Step {activeStep + 1}</Typography>
        {activeStep === 0 && <CreateRoadmap {...{ handleNext }} />}
        {activeStep === 1 && <CreateSteps {...{ handleNext, handleBack }} />}
        {activeStep === 2 && <ConfirmRoadmap {...{ handleBack }} />}
      </Box>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  if (!params) {
    throw new Error('params is undefined');
  }
  const roadmap = await getRoadmap(String(params.id));
  return { props: { roadmap: roadmap } };
};

export default EditRoadmapPage;
