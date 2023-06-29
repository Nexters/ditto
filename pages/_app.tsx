import type { AppProps } from 'next/app';
import { QueryClient, QueryClientProvider, Hydrate } from '@tanstack/react-query';
import { ReactElement, ReactNode, useState } from 'react';
import Head from 'next/head';
import { ChakraProvider } from '@chakra-ui/react';
import { Analytics as VercelAnalytics } from '@vercel/analytics/react';
import theme from '@/styles/theme';
import { NextPage } from 'next';
import ErrorBoundary from '@/components/errors/ErrorBoundary';
import { useProtectedRoute } from '@/hooks/useProtectedRoute';
import { SplashPage } from '@/components/loading/SplashPage';
import Fonts from '@/styles/Font';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { useCalcViewHeight } from '@/hooks/shared/useCalcViewHeight';
import { GoogleAnalytics } from '@/components/ga/GoogleAnalytics';
import { useFirebaseMessaging } from '@/hooks/useFirebaseMessaging';
import ErrorPage from './error';

export type NextPageWithLayout<P = object, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
  isProtectedPage?: boolean;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

function App({ Component, pageProps }: AppPropsWithLayout) {
  // ref: https://tech.kakao.com/2022/06/13/react-query/
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            useErrorBoundary: true,
            retry: 0,
            refetchOnMount: false,
            keepPreviousData: true,
          },
          mutations: {
            useErrorBoundary: true,
          },
        },
      })
  );
  const getLayout = Component.getLayout ?? ((page) => page);
  const { showLoadingPage } = useProtectedRoute(Component?.isProtectedPage, '/');

  useCalcViewHeight();
  useFirebaseMessaging();

  return (
    <>
      <Head>
        <title>Ditto</title>
        <meta name="application-name" content="Ditto" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Ditto" />
        <meta name="description" content="그룹 일정 & 버킷리스트 서비스" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />

        <meta name="msapplication-config" content="/favicon/browserconfig.xml" />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="msapplication-tap-highlight" content="no" />

        <link rel="shortcut icon" href="/favicon/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/favicon/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon/favicon-16x16.png" />
        <link rel="manifest" href="/favicon/site.webmanifest" />
        <link rel="mask-icon" href="/favicon/safari-pinned-tab.svg" color="#5bbad5" />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#ffffff" />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, user-scalable=no, viewport-fit=cover"
        />
      </Head>
      <GoogleAnalytics />
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          <ChakraProvider theme={theme} resetCSS cssVarsRoot="#app">
            <Fonts />
            <ErrorBoundary fallback={<ErrorPage />}>
              {showLoadingPage ? <SplashPage /> : getLayout(<Component {...pageProps} />)}
            </ErrorBoundary>
          </ChakraProvider>
        </Hydrate>
        <ReactQueryDevtools initialIsOpen={false} position="bottom-left" />
      </QueryClientProvider>
      <VercelAnalytics />
    </>
  );
}

export default App;
