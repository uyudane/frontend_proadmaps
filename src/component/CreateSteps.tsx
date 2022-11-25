import { Button, Box } from '@mui/material';
import { useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useRecoilValue } from 'recoil';
import CreateStepDialog from './CreateStepDialog';
import DndStepContainer from './DndStepContainer';
import RoadmapCancelButton from './RoadmapCancelButton';
import RoadmapDraftSubmitButton from './RoadmapDraftSubmitButton';
import roadmapState from 'recoil/atoms/roadmapState';
import stepsState from 'recoil/atoms/stepsState';

type Props = {
  handleNext: () => void;
  handleBack: () => void;
};

const CreateSteps = ({ handleNext, handleBack }: Props) => {
  // CreateStepDialogでステップを作成する際に使用する内部的なIDの設定に使用。
  // リロードしても連番になるように、配列のIDで一番大きいID+1の値になるように設定。
  const step = useRecoilValue(stepsState);
  let stepId = step.length === 0 ? 0 : Math.max(...step.map((s) => s.id)) + 1;
  const getStepId = () => {
    return stepId++;
  };
  const roadmap = useRecoilValue(roadmapState);

  const [open, setOpen] = useState(true);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <CreateStepDialog {...{ open, handleClose, getStepId }} />
      <DndProvider backend={HTML5Backend}>
        <DndStepContainer {...{ handleClickOpen }} />
      </DndProvider>
      <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
        <Button color='primary' variant='contained' onClick={handleBack} sx={{ mr: 1 }}>
          Back
        </Button>
        <Box sx={{ flex: '1 1 auto' }} />
        <RoadmapCancelButton />
        {/* ロードマップが下書きからの修正、新規作成の時のみ、下書き保存ボタンを出す */}
        {roadmap?.is_published !== true && <RoadmapDraftSubmitButton />}
        <Button color='primary' variant='contained' onClick={handleNext} sx={{ ml: 10 }}>
          Next
        </Button>
      </Box>
    </>
  );
};

export default CreateSteps;
