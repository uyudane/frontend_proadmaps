import { Typography } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import { useRouter } from 'next/router';
import { TwitterShareButton } from 'react-share';
import { Roadmap } from 'types';

type Props = {
  onClose: () => void;
  open: boolean;
  roadmap: Roadmap;
};

const RequestTweetDialog = ({ onClose, open, roadmap }: Props) => {
  const router = useRouter();
  return (
    <div>
      <Dialog
        open={open}
        onClose={onClose}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <DialogContent>
          <DialogContentText id='alert-dialog-description'>
            ロードマップを投稿しました!
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>キャンセル</Button>
          <TwitterShareButton
            url={`${process.env['NEXT_PUBLIC_BASE_URL']}/${router.query.sub}/roadmaps/${router.query.id}`}
            title={`「${roadmap.title}」を投稿しました!`}
            hashtags={['ProadMaps']}
          >
            <Typography variant='body2' color='#143F6B'>
              Twitterに投稿する
            </Typography>
          </TwitterShareButton>
        </DialogActions>
      </Dialog>
    </div>
  );
};
export default RequestTweetDialog;
