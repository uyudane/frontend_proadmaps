import { useAuth0 } from '@auth0/auth0-react';
import type { NextPage } from 'next';
import { useEffect } from 'react';
import { useSetRecoilState } from 'recoil'; // Auth0の認証情報をグローバルステートに保存
import tokenState from '../recoil/atoms/tokenState'; // Auth0の認証情報をグローバルステートに保存
import userState from '../recoil/atoms/userState'; // Auth0の認証情報をグローバルステートに保存
import Meta from 'component/Meta';
import { getMyUser } from 'services/users';
import type { User } from 'types';

const Home: NextPage = () => {
  const { getAccessTokenSilently, isAuthenticated, user } = useAuth0();
  const setToken = useSetRecoilState(tokenState);
  const setUser = useSetRecoilState(userState);

  useEffect(() => {
    const getToken = async () => {
      try {
        // ログイン完了後にトークンを取得しRecoilへ格納
        const accessToken = await getAccessTokenSilently({});
        setToken(accessToken);
        const user_data = await getMyUser(accessToken);
        // ログイン完了後に自身の情報をバックエンドから取得してrecoilへ格納
        // ユーザ登録の場合は、このタイミングでバックエンドに情報が追加される
        setUser({ sub: user_data.sub, name: user_data.name });
      } catch (e: any) {
        console.log(e.message);
      }
    };
    getToken();
  }, []);

  return (
    <>
      <Meta pageTitle='トップ' />
      <div>記事一覧/検索画面</div>
      {isAuthenticated && <div>{user!.name}</div>}
      {isAuthenticated && <img src={user!.picture} />}
    </>
  );
};

export default Home;
