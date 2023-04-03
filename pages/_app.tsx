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

  return (
    <>
      <Head>
        <title>Ditto</title>
        <link rel="apple-touch-icon" sizes="180x180" href="/favicon/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon/favicon-16x16.png" />
        <link rel="manifest" href="/favicon/site.webmanifest" />
        <link rel="mask-icon" href="/favicon/safari-pinned-tab.svg" color="#5bbad5" />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#ffffff" />
        <meta
          name="viewport"
          content="width=device-width,initial-scale=1.0,maximum-scale=1.0,minimum-scale=1.0,user-scalable=no"
        />
      </Head>
      <GoogleAnalytics />
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          <ChakraProvider theme={theme} resetCSS cssVarsRoot="#app">
            <Fonts />
            <ErrorBoundary fallback={<div>에러 페이지</div>}>
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
