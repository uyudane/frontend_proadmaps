import { Button, Box } from '@mui/material';

const MakeSteps = ({ handleNext, handleBack }: { handleNext: any; handleBack: any }) => {
  return (
    <>
      ステップの作成
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
