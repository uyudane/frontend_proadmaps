import { getAccessToken, withApiAuthRequired } from '@auth0/nextjs-auth0';
import type { NextPage } from 'next';
import Link from 'next/link';
import { useEffect } from 'react';
import { useSetRecoilState } from 'recoil'; // Auth0の認証情報をグローバルステートに保存
import tokenState from '../recoil/atoms/tokenState'; // Auth0の認証情報をグローバルステートに保存
import { Meta } from 'component/meta';

const Home: NextPage = (req, res) => {
  // const { getAccessTokenSilently } = useAuth0();

  const setToken = useSetRecoilState(tokenState);

  // ログイン完了後にトークンを取得しRecoilへ格納
  // useEffect(() => {
  //   const getToken = async (req, res) => {
  //     try {
  //       const { accessToken } = await getAccessToken(req, res, {
  //         scopes: ['read:products'],
  //       });
  //       setToken(accessToken);
  //     } catch (e: any) {
  //       console.log(e.message);
  //     }
  //   };
  //   getToken(req, res);
  // }, []);

  useEffect(() => {
    const getToken = async () => {
      try {
        const { accessToken } = await getAccessToken(req, res, {
          scopes: ['read:home'],
        });
        console.log(accessToken);
        // setToken(accessToken);
      } catch (e: any) {
        console.log(e.message);
      }
    };
    getToken();
  }, []);
  return (
    <>
      <a href='/api/auth/login'>Login</a>
      <a href='/api/auth/logout'>Logout</a>
      <Meta pageTitle='トップ' />
      <div>記事一覧/検索画面</div>
      <Link href='/'>
        <a>Home</a>
      </Link>
    </>
  );
};

export default Home;
