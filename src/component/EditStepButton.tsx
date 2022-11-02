import Button from '@mui/material/Button';
import { useState } from 'react';
import MakeStepDialog from './MakeStepDialog';

const EditStepButton = ({ itemId }: { itemId: number }) => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <MakeStepDialog open={open} handleClose={handleClose} itemId={itemId} />
      <Button variant='text' onClick={handleClickOpen}>
        編集
      </Button>
    </>
  );
};

export default EditStepButton;
