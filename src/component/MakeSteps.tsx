import { Button, Box } from '@mui/material';
import { useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Container from './Container';
import MakeStepDialog from './MakeStepDialog';

const MakeSteps = ({ handleNext, handleBack }: { handleNext: any; handleBack: any }) => {
  const [open, setOpen] = useState(true);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      ステップの作成
      <MakeStepDialog open={open} handleClose={handleClose} />
      <DndProvider backend={HTML5Backend}>
        <Container handleClickOpen={handleClickOpen} />
      </DndProvider>
      <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
        <Button color='primary' variant='contained' onClick={handleBack} sx={{ mr: 1 }}>
          Back
        </Button>
        <Box sx={{ flex: '1 1 auto' }} />
        <Button color='primary' variant='contained' onClick={handleNext}>
          Next
        </Button>
      </Box>
    </>
  );
};

export default MakeSteps;
