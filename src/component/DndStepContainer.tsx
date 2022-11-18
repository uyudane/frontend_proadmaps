import AddIcon from '@mui/icons-material/Add';
import { IconButton, List, Grid, Box } from '@mui/material';
import update from 'immutability-helper';
import { useCallback } from 'react';
import { useRecoilState } from 'recoil';
import DndStep from './DndStep';
import stepsState from 'recoil/atoms/stepsState';
import type { Step } from 'types';

type Props = {
  handleClickOpen: () => void;
};

const DndStepContainer = ({ handleClickOpen }: Props) => {
  const [steps, setSteps] = useRecoilState(stepsState);

  const moveStep = useCallback((dragIndex: number, hoverIndex: number) => {
    setSteps((prevSteps: Step[]) =>
      update(prevSteps, {
        $splice: [
          // ドラッグしたindexの値を削除
          [dragIndex, 1],
          // ホバーした先のインデックスに挿入する
          [hoverIndex, 0, prevSteps[dragIndex] as Step],
        ],
      }),
    );
  }, []);

  const renderStep = useCallback((step: Step, index: number) => {
    return <DndStep key={step.id} index={index} step={step} id={step.id} moveStep={moveStep} />;
  }, []);

  return (
    <>
      <Grid container alignItems='center' justifyContent='center' direction='column'>
        <Box sx={{ width: '100%', maxWidth: 'md' }}>
          <Grid item>
            <List>
              {/* stepの内容とi(stepの並び順になるIndex)を渡している。 */}
              <div>{steps.map((step, i) => renderStep(step, i))}</div>
            </List>
          </Grid>
        </Box>
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
