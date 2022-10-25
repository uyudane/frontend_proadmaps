import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import { useRouter } from 'next/router';
import * as React from 'react';

export interface AlertDialogProps {
  onClose: () => void;
  open: boolean;
}

const RequireLoginDialog = (props: AlertDialogProps) => {
  const { onClose, open } = props;
  const router = useRouter();
  return (
    <div>
      <Dialog
        open={open}
        onClose={onClose}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        {/* <DialogTitle id='alert-dialog-title'>{"Use Google's location service?"}</DialogTitle> */}
        <DialogContent>
          <DialogContentText id='alert-dialog-description'>
            この操作をするにはログインが必要です。
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>キャンセル</Button>
          <Button
            onClick={() => {
              router.push('/api/auth/login');
            }}
            autoFocus
          >
            ログイン/ユーザ登録を行う
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default RequireLoginDialog;
