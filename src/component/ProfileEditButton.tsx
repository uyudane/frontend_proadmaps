import { Button } from '@mui/material';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import userState from 'recoil/atoms/userState';
import type { User } from 'types';

const ProfileEditButton = ({ profileUser }: { profileUser: User }) => {
  const current_user = useRecoilValue(userState); // RecoilのTokneを取得する
  const [edit, setEdit] = useState<boolean>(false); // 自分のプロフィールの場合のみプロフィール編集ボタンを作成する
  const router = useRouter();

  useEffect(() => {
    setEdit(profileUser.sub == current_user.sub);
  }, []);

  return (
    <>
      {edit && (
        <Button
          variant='outlined'
          onClick={() => {
            router.push(`/setting/profile`);
          }}
        >
          編集する
        </Button>
      )}
    </>
  );
};

export default ProfileEditButton;
