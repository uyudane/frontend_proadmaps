import DeleteIcon from '@mui/icons-material/Delete';
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
import { deleteUserAdmin } from 'services/admin';
import { UserFullData } from 'types';

type Props = {
  user: UserFullData;
};

const AdminUserDeleteButton = ({ user }: Props) => {
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

  const execDeleteUser = async () => {
    const result = await deleteUserAdmin(String(user.sub), token);
    if (result === 'OK') {
      router.reload();
      setOpen(false);
    } else {
      setOpen(false);
      // バックエンドから200以外が返ってきた際に、エラーを伝える
      router.push({
        pathname: router.asPath,
        query: {
          errorMessage: '500（Internal Server Error） | ユーザの削除に失敗しました',
        },
      });
    }
  };

  return (
    <>
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
            ユーザを削除しますか？
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

export default AdminUserDeleteButton;
