import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Stepper from '@mui/material/Stepper';
import Typography from '@mui/material/Typography';
import { NextPage } from 'next';
import { useState, ReactNode } from 'react';
import { useRecoilValue } from 'recoil';
import ConfirmRoadMap from 'component/ConfirmRoadMap';
import MakeRoadMap from 'component/MakeRoadMap';
import MakeSteps from 'component/MakeSteps';
import Meta from 'component/Meta';

// recoil
import tokenState from 'recoil/atoms/tokenState';

import { fetchRoadmaps, postRoadmaps } from 'services/roadmaps';

const steps = ['ロードマップ/学習記録の概要', 'ステップ', '確認'];

const RoadmapPage: NextPage = () => {
  const [activeStep, setActiveStep] = useState(0);

  const isStepOptional = (step: number) => {
    return step === 1;
  };

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <Box sx={{ width: '100%' }}>
      {/* 上部のステップ表示部分 */}
      {/* Stepperでアクティブの所まで色がつく */}
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => {
          const stepProps: { completed?: boolean } = {};

          return (
            <Step key={label} {...stepProps}>
              <StepLabel>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      <Typography sx={{ mt: 2, mb: 1 }}>Step {activeStep + 1}</Typography>
      {activeStep === 0 && <MakeRoadMap></MakeRoadMap>}
      {activeStep === 1 && <MakeSteps></MakeSteps>}
      {activeStep === 2 && <ConfirmRoadMap></ConfirmRoadMap>}

      {activeStep === steps.length ? (
        <>
          {/* muiの例だとリセットが出るようになっているが、ここにFinish後の処理を書けば良いと踏んだ。 */}
          <Typography sx={{ mt: 2, mb: 1 }}>All steps completed - you&apos;re finished</Typography>
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Box sx={{ flex: '1 1 auto' }} />
            <Button onClick={handleReset}>Reset</Button>
          </Box>
        </>
      ) : (
        <>
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Button color='inherit' disabled={activeStep === 0} onClick={handleBack} sx={{ mr: 1 }}>
              Back
            </Button>
            <Box sx={{ flex: '1 1 auto' }} />
            <Button onClick={handleNext}>
              {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
            </Button>
          </Box>
        </>
      )}
    </Box>
  );
};

export default RoadmapPage;
