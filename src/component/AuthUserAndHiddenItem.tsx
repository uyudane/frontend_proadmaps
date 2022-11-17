import { useEffect, useState, ReactNode } from 'react';
import { useRecoilValue } from 'recoil';
import userState from 'recoil/atoms/userState';
import { UserState } from 'types';

// コンポーネントをこのコンポーネントで挟んで、 現在のユーザと渡されたユーザプロップスが一致した場合のみ、
// childrenとして渡ってきたコンポーネントを表示する
// 渡ってきたpropsをもとに表示非表示を制御する処理は、
// リロードすると「Hydration failed because the initial UI does not match what was rendered on the server」のエラーが出力。
// サーバ側とクライアントでレンダリング結果が不一致となっているため、useEffectで設定するようにする。

type Props = {
  user: UserState;
  children: ReactNode;
};

const AuthUserAndHiddenItem = ({ user, children }: Props) => {
  const current_user = useRecoilValue(userState); // RecoilのTokneを取得する
  const [authentication, setAuthentication] = useState<boolean>(false); // 自分のプロフィールの場合のみプロフィール編集ボタンを作成する
  useEffect(() => {
    if (user.sub === current_user.sub) {
      setAuthentication(true);
    } else {
      setAuthentication(false);
    }
  }, []);

  return <>{authentication && children}</>;
};

export default AuthUserAndHiddenItem;
