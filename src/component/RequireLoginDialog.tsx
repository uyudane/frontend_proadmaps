import { useAuth0 } from '@auth0/auth0-react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import * as React from 'react';

export interface AlertDialogProps {
  onClose: () => void;
  open: boolean;
}

const RequireLoginDialog = (props: AlertDialogProps) => {
  const { onClose, open } = props;
  const { loginWithRedirect } = useAuth0();
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
          <Button onClick={loginWithRedirect} autoFocus>
            ログイン/ユーザ登録を行う
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default RequireLoginDialog;
