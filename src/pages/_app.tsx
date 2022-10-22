import { Auth0Provider } from '@auth0/auth0-react';
import { CacheProvider, EmotionCache } from '@emotion/react';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { RecoilRoot } from 'recoil';
import createEmotionCache from '../createEmotionCache';
import theme from '../theme';

const clientSideEmotionCache = createEmotionCache();
interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

function MyApp(props: MyAppProps) {
  // auth0で使用
  const redirectUri = `${process.env['NEXT_PUBLIC_BASE_URL']}/login`;

  // emotionのSSRで使用
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  return (
    <CacheProvider value={emotionCache}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Auth0Provider
          domain={process.env['NEXT_PUBLIC_AUTH0_DOMAIN']!}
          clientId={process.env['NEXT_PUBLIC_AUTH0_CLIENT_ID']!}
          audience={process.env['NEXT_PUBLIC_AUTH0_AUDIENCE']!}
          redirectUri={redirectUri}
        >
          <RecoilRoot>
            <Component {...pageProps} />
          </RecoilRoot>
        </Auth0Provider>
      </ThemeProvider>
    </CacheProvider>
  );
}

export default MyApp;
