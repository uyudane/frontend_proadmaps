import { useAuth0 } from '@auth0/auth0-react';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import tokenState from 'recoil/atoms/tokenState';

const LoginPage: NextPage = () => {
  const router = useRouter();

  const { isAuthenticated, logout, getAccessTokenSilently } = useAuth0();

  const setToken = useSetRecoilState(tokenState);

  // useEffectの中で、レンダリング時に
  useEffect(() => {
    const getToken = async () => {
      try {
        // Tokenを取得
        const accessToken = await getAccessTokenSilently({});
        // ReconcilのTokenを更新
        setToken(accessToken);
      } catch (e: any) {
        console.log(e.message);
      }
    };
    getToken();
  }, []);

  return (
    <div>
      <h2>ログイン状態</h2>
      {isAuthenticated ? (
        <>
          <p>ログイン中です</p>
          <button onClick={() => logout({ returnTo: window.location.origin })}>ログアウト</button>
          <button
            onClick={() => {
              router.push('/roadmap');
            }}
          >
            記事投稿ページへ
          </button>
        </>
      ) : (
        <p>ログアウトしています</p>
      )}
    </div>
  );
};

export default LoginPage;
