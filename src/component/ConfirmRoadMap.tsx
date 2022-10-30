import { Button, Box } from '@mui/material';

const ConfirmRoadMap = ({ handleBack }: { handleBack: any }) => {
  return (
    <>
      最終確認
      <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
        <Button color='primary' variant='contained' onClick={handleBack} sx={{ mr: 1 }}>
          Back
        </Button>
        <Box sx={{ flex: '1 1 auto' }} />
        <Button color='secondary' variant='contained'>
          finish
        </Button>
      </Box>
    </>
  );
};

export default ConfirmRoadMap;
