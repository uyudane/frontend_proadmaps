import { useAuth0 } from '@auth0/auth0-react';
import { Button } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useRecoilValue, useResetRecoilState } from 'recoil';
import roadmapState from 'recoil/atoms/roadmapState';
import stepsState from 'recoil/atoms/stepsState';
import tokenState from 'recoil/atoms/tokenState';
import userState from 'recoil/atoms/userState';
import { deleteUser } from 'services/users';

const UserDeleteButton = () => {
  const token = useRecoilValue(tokenState);
  const current_user = useRecoilValue(userState);

  const { logout } = useAuth0();

  const resetRoadmap = useResetRecoilState(roadmapState);
  const resetSteps = useResetRecoilState(stepsState);
  const resetToken = useResetRecoilState(tokenState);
  const resetUser = useResetRecoilState(userState);
  const router = useRouter();

  // 削除確認ダイアログに使用
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const execDeleteUser = async () => {
    const result = await deleteUser({ sub: current_user.sub, token: token });
    if (result === 'OK') {
      resetRoadmap();
      resetSteps();
      resetToken();
      resetUser();
      setOpen(false);
      logout({ returnTo: window.location.origin });
      router.push({
        pathname: '/',
        query: { successMessage: 'アカウントを削除しました' },
      });
    }
  };

  return (
    <>
      <Button variant='outlined' onClick={handleClickOpen} color='error'>
        アカウントを削除する
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <DialogTitle id='alert-dialog-title'>{'削除確認'}</DialogTitle>
        <DialogContent>
          <DialogContentText id='alert-dialog-description'>
            一度アカウントを削除すると、データの復旧はできません。削除を続行しますか。
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>キャンセル</Button>
          <Button onClick={execDeleteUser} autoFocus>
            削除する
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default UserDeleteButton;
