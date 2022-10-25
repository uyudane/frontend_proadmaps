import { UserProvider } from '@auth0/nextjs-auth0';
import { CacheProvider, EmotionCache } from '@emotion/react';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import type { AppProps } from 'next/app';
import { RecoilRoot } from 'recoil';
import createEmotionCache from '../createEmotionCache';
import theme from '../theme';
import Layout from 'component/layout';

const clientSideEmotionCache = createEmotionCache();
interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

const MyApp = (props: MyAppProps) => {
  // auth0で使用
  const redirectUri = `${process.env['NEXT_PUBLIC_BASE_URL']}`;

  // emotionのSSRで使用
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  return (
    <CacheProvider value={emotionCache}>
      <CssBaseline />
      <UserProvider>
        {/* Auth0の認証情報をRecoilを利用してグローバルステートで保存 */}
        <RecoilRoot>
          {/* MaterialUIのテーマを提供 */}
          <ThemeProvider theme={theme}>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </ThemeProvider>
        </RecoilRoot>
      </UserProvider>
    </CacheProvider>
  );
};

export default MyApp;
