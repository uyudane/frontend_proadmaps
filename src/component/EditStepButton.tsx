import Button from '@mui/material/Button';
import { useState } from 'react';
import CreateStepDialog from './CreateStepDialog';

const EditStepButton = ({ index }: { index: number }) => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <CreateStepDialog open={open} handleClose={handleClose} index={index} />
      <Button variant='text' onClick={handleClickOpen}>
        編集
      </Button>
    </>
  );
};

export default EditStepButton;
