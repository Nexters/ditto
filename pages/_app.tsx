import type { AppProps } from 'next/app';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactElement, ReactNode } from 'react';
import Head from 'next/head';
import { ChakraProvider } from '@chakra-ui/react';
import theme from '@/styles/theme';
import { NextPage } from 'next';
import ErrorBoundary from '@/components/ErrorBoundary/ErrorBoundary';
import { useProtectedRoute } from '@/hooks/useProtectedRoute';

export type NextPageWithLayout<P = object, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
  needProtected?: boolean;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

function App({ Component, pageProps }: AppPropsWithLayout) {
  const queryClient = new QueryClient();
  const getLayout = Component.getLayout ?? ((page) => page);
  const { showLoadingPage } = useProtectedRoute(Component?.needProtected, '/');

  return (
    <>
      <Head>
        <title>Ditto</title>
        <meta
          name="viewport"
          content="width=device-width,initial-scale=1.0,maximum-scale=1.0,minimum-scale=1.0,user-scalable=no"
        />
      </Head>
      <QueryClientProvider client={queryClient}>
        <ChakraProvider theme={theme} resetCSS>
          <ErrorBoundary fallback={<div>에러 페이지</div>}>
            {showLoadingPage ? 'loading...' : getLayout(<Component {...pageProps} />)}
          </ErrorBoundary>
        </ChakraProvider>
      </QueryClientProvider>
    </>
  );
}

export default App;
