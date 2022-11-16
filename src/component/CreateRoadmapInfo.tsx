import { Modal, Box, Typography } from '@mui/material';

const style = {
  position: 'absolute' as const,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  maxwidth: 800,
  bgcolor: 'white',
  border: '10px solid #E8630A',
  boxShadow: 24,
  p: 4,
};

const CreateRoadmapInfo = ({ open, handleClose }: { open: boolean; handleClose: () => void }) => {
  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box sx={style}>
          <Typography id='modal-modal-title' variant='h5' component='h2'>
            〜作成時のお願い〜
          </Typography>
          <Typography id='modal-modal-description1' sx={{ mt: 2 }} variant='h6' gutterBottom>
            ①IT技術、エンジニアに関することであればどのようなものでも構いません!
          </Typography>
          <Typography id='modal-modal-description2' sx={{ mt: 1 }} variant='h6'>
            ②ロードマップだけでなく、学習記録、今後の学習スケジュール等も歓迎です!
          </Typography>
          <Typography id='modal-modal-description2' sx={{ mt: 1 }} variant='h6'>
            ③言語等、題材が被っているものでも、多くの人が使っている教材や別の勉強法を知るために、ぜひ投稿をお願いします！
          </Typography>
        </Box>
      </Modal>
    </>
  );
};

export default CreateRoadmapInfo;
