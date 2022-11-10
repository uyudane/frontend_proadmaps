import { Button } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useResetRecoilState } from 'recoil';
import roadmapState from 'recoil/atoms/roadmapState';
import stepsState from 'recoil/atoms/stepsState';

const RoadmapCancelButton = () => {
  const router = useRouter();
  const resetRoadmap = useResetRecoilState(roadmapState);
  const resetSteps = useResetRecoilState(stepsState);

  // recoilに設定したロードマップ、ステップの入力データを削除
  const execCancel = () => {
    resetRoadmap();
    resetSteps();
    router.push({
      pathname: `/`,
    });
  };

  // キャンセル確認ダイアログに使用
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      <Button variant='contained' onClick={handleClickOpen} color='inherit' sx={{ mr: 1 }}>
        Cancel
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <DialogTitle id='alert-dialog-title'>{'キャンセル確認'}</DialogTitle>
        <DialogContent>
          <DialogContentText id='alert-dialog-description'>
            入力データを削除してホーム画面に移動します。
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>作成に戻る</Button>
          <Button onClick={execCancel} autoFocus>
            キャンセルを続行する
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
export default RoadmapCancelButton;
