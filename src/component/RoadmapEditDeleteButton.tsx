import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Button } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useRecoilValue } from 'recoil';
import tokenState from 'recoil/atoms/tokenState';
import { deleteRoadmap } from 'services/roadmaps';

const RoadmapEditDeleteButton = ({ roadmap }: any) => {
  const router = useRouter();

  // 削除確認ダイアログに使用
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const token = useRecoilValue(tokenState);

  // delete後のリダイレクト先を、下書き削除時は下書き一覧にする
  let deletedRedirectPath = '';
  router.pathname === '/draft' ? (deletedRedirectPath = '/draft') : (deletedRedirectPath = '/');

  const execDeleteRoadmap = async () => {
    const result = await deleteRoadmap(roadmap.id, token);
    if (result === 'OK') {
      router.push({
        pathname: deletedRedirectPath,
        query: { successMessage: 'ロードマップを削除しました' },
      });
    }
  };

  return (
    <>
      <Button
        variant='outlined'
        onClick={() => {
          router.push(`/drafts/${roadmap.id}/edit`);
        }}
      >
        <EditIcon />
      </Button>
      <Button variant='outlined' onClick={handleClickOpen}>
        <DeleteIcon />
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
            ロードマップを削除しますか？
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>キャンセル</Button>
          <Button onClick={execDeleteRoadmap} autoFocus>
            削除する
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default RoadmapEditDeleteButton;
