import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Button } from '@mui/material';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import userState from 'recoil/atoms/userState';

const useAuthUser = (user: any) => {
  const current_user = useRecoilValue(userState); // RecoilのTokneを取得する
  const [authentication, setAuthentication] = useState<boolean>(false); // 自分のプロフィールの場合のみプロフィール編集ボタンを作成する
  const router = useRouter();

  useEffect(() => {
    if (user.sub == current_user.sub) {
      setAuthentication(true);
    } else {
      router.replace({
        pathname: '/',
        query: { errorMessage: '権限がありません' },
      });
    }
  }, []);

  return authentication;
};

export default useAuthUser;
