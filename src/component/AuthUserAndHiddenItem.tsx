import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import userState from 'recoil/atoms/userState';

// コンポーネントをこのコンポーネントで挟んで、
// 現在のユーザと渡されたユーザプロップスが一致した場合のみ、
// childrenとして渡ってきたコンポーネントを表示する
const AuthUserAndHiddenItem = ({ user, children }: any) => {
  const current_user = useRecoilValue(userState); // RecoilのTokneを取得する
  const [authentication, setAuthentication] = useState<boolean>(false); // 自分のプロフィールの場合のみプロフィール編集ボタンを作成する
  // console.log(user);
  // console.log(children);
  useEffect(() => {
    if (user.sub === current_user.sub) {
      setAuthentication(true);
    } else {
      setAuthentication(false);
    }
  }, []);
  console.log('ねこ');

  return <>{authentication && children}</>;
};

export default AuthUserAndHiddenItem;
