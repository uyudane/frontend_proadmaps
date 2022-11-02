import AddIcon from '@mui/icons-material/Add';
import { IconButton, List, Grid } from '@mui/material';
import update from 'immutability-helper';
import { useCallback, useState } from 'react';
import { useSetRecoilState, useRecoilValue } from 'recoil';
import DndStep from './DndStep';
import stepState from 'recoil/atoms/stepState';
import type { Step } from 'types';

const DndStepContainer = ({ handleClickOpen }: { handleClickOpen: any }) => {
  const setSteps = useSetRecoilState(stepState);
  const steps = useRecoilValue(stepState);

  const moveStep = useCallback((dragIndex: number, hoverIndex: number) => {
    setSteps((prevSteps: Step[]) =>
      update(prevSteps, {
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, prevSteps[dragIndex] as Step],
        ],
      }),
    );
  }, []);

  const renderStep = useCallback((step: { id: number; url: string }, index: number) => {
    return <DndStep key={step.id} index={index} id={step.id} url={step.url} moveStep={moveStep} />;
  }, []);

  return (
    <>
      <Grid container alignItems='center' justifyContent='center' direction='column'>
        <Grid item>
          <List sx={{ width: '100%', maxWidth: 'md', p: 1 }}>
            <div>{steps.map((step, i) => renderStep(step, i))}</div>
          </List>
        </Grid>
        <Grid item>
          <IconButton aria-label='AddStep' onClick={handleClickOpen}>
            <AddIcon
              fontSize='large'
              sx={{ color: 'white', backgroundColor: '#E8630A', borderRadius: '20%' }}
            />
          </IconButton>
        </Grid>
      </Grid>
    </>
  );
};

export default DndStepContainer;
