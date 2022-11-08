import Box from '@mui/material/Box';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Stepper from '@mui/material/Stepper';
import Typography from '@mui/material/Typography';
import { NextPage } from 'next';
import { useState } from 'react';
import ConfirmRoadmap from 'component/ConfirmRoadmap';
import CreateRoadmap from 'component/CreateRoadmap';
import CreateSteps from 'component/CreateSteps';
import Meta from 'component/Meta';

const steps = ['ロードマップ/学習記録の概要', 'ステップ', '確認'];

const CreateRoadmapPage: NextPage = () => {
  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <>
      <Meta pageTitle='ロードマップ作成' />
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
        {activeStep === 0 && <CreateRoadmap handleNext={handleNext} />}
        {activeStep === 1 && <CreateSteps handleNext={handleNext} handleBack={handleBack} />}
        {activeStep === 2 && <ConfirmRoadmap handleBack={handleBack} />}
      </Box>
    </>
  );
};

export default CreateRoadmapPage;