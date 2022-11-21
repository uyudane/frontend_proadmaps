import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import userState from 'recoil/atoms/userState';

const useAuthAdminAndRedirect = () => {
  const current_user = useRecoilValue(userState); // RecoilのTokneを取得する
  const [authentication, setAuthentication] = useState<boolean>(false); // 自分のプロフィールの場合のみプロフィール編集ボタンを作成する
  const router = useRouter();

  useEffect(() => {
    if (current_user.sub == '103183815') {
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

export default useAuthAdminAndRedirect;
