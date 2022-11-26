import { withAuthenticationRequired } from '@auth0/auth0-react';
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

const steps = ['ロードマップ/学習記録の概要作成', 'ステップ作成', '確認'];

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
          {/* 上部のステップのsteps */}
          {steps.map((label) => {
            const stepProps: { completed?: boolean } = {};
            return (
              <Step key={label} {...stepProps}>
                <StepLabel>{label}</StepLabel>
              </Step>
            );
          })}
        </Stepper>
        <Typography sx={{ mt: 2, mb: 1 }}>Step {activeStep + 1} / 3</Typography>
        {activeStep === 0 && <CreateRoadmap {...{ handleNext }} />}
        {activeStep === 1 && <CreateSteps {...{ handleNext, handleBack }} />}
        {activeStep === 2 && <ConfirmRoadmap {...{ handleBack }} />}
      </Box>
    </>
  );
};

export default withAuthenticationRequired(CreateRoadmapPage, {
  onRedirecting: () => <div>このページを開くにはログインが必要です。</div>,
});
