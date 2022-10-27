import { useAuth0 } from '@auth0/auth0-react';
import type { NextPage } from 'next';
import { useEffect } from 'react';
import { useSetRecoilState } from 'recoil'; // Auth0の認証情報をグローバルステートに保存
import tokenState from '../recoil/atoms/tokenState'; // Auth0の認証情報をグローバルステートに保存
import userState from '../recoil/atoms/userState'; // Auth0の認証情報をグローバルステートに保存
import Meta from 'component/meta';
import { getMyprofile } from 'services/profiles';
import type { Profile } from 'types';

const Home: NextPage = () => {
  const { getAccessTokenSilently, isAuthenticated, user } = useAuth0();
  const setToken = useSetRecoilState(tokenState);
  const setUser = useSetRecoilState(userState);

  // ログイン完了後にトークンを取得しRecoilへ格納
  useEffect(() => {
    const getToken = async () => {
      try {
        const accessToken = await getAccessTokenSilently({});
        setToken(accessToken);
        const profile = await getMyprofile(accessToken);
        setUser(profile.user_id);
      } catch (e: any) {
        console.log(e.message);
        console.log('トークン格納しなかったよ');
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
