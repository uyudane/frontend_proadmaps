import { useAuth0 } from '@auth0/auth0-react';
import type { NextPage } from 'next';
import { useEffect } from 'react';
import { useSetRecoilState } from 'recoil'; // Auth0の認証情報をグローバルステートに保存
import tokenState from '../recoil/atoms/tokenState'; // Auth0の認証情報をグローバルステートに保存
import Meta from 'component/meta';
import { postProfiles } from 'services/profiles';

const Home: NextPage = () => {
  const { getAccessTokenSilently, isAuthenticated, user } = useAuth0();
  const setToken = useSetRecoilState(tokenState);

  // ログイン完了後にトークンを取得しRecoilへ格納
  useEffect(() => {
    const getToken = async () => {
      try {
        const accessToken = await getAccessTokenSilently({});
        setToken(accessToken);
        if (isAuthenticated) {
          postProfiles(
            {
              name: user!.name,
            },
            accessToken,
          );
        }
        console.log(user);
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
