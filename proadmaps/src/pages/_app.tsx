import { Auth0Provider } from '@auth0/auth0-react';
import { CacheProvider, EmotionCache } from '@emotion/react';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import createEmotionCache from '../createEmotionCache';
import theme from '../theme';

const clientSideEmotionCache = createEmotionCache();
interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

function MyApp(props: MyAppProps) {
  const redirectUri = `${process.env['NEXT_PUBLIC_BASE_URL']}/login`;
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <meta name='viewport' content='initial-scale=1, width=device-width' />
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Auth0Provider
          domain={process.env['NEXT_PUBLIC_AUTH0_DOMAIN']!}
          clientId={process.env['NEXT_PUBLIC_AUTH0_CLIENT_ID']!}
          audience={process.env['NEXT_PUBLIC_AUTH0_AUDIENCE']!}
          redirectUri={redirectUri}
        >
          <Component {...pageProps} />
        </Auth0Provider>
      </ThemeProvider>
    </CacheProvider>
  );
}

export default MyApp;
