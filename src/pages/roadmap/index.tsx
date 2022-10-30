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

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
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

      {activeStep === 0 && <MakeRoadMap handleNext={handleNext} />}
      {activeStep === 1 && <MakeSteps handleNext={handleNext} handleBack={handleBack} />}
      {activeStep === 2 && <ConfirmRoadMap handleBack={handleBack} />}
    </Box>
  );
};

export default RoadmapPage;
