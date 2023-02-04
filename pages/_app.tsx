import type { AppProps } from 'next/app';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactElement, ReactNode, useEffect } from 'react';
import Head from 'next/head';
import { ChakraProvider } from '@chakra-ui/react';
import theme from '@/styles/theme';
import { NextPage } from 'next';
import ErrorBoundary from '@/components/ErrorBoundary/ErrorBoundary';
import { useUser } from '@/share/store/useUser';

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  // eslint-disable-next-line no-unused-vars
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

function App({ Component, pageProps }: AppPropsWithLayout) {
  const { login } = useUser();
  const queryClient = new QueryClient();
  const getLayout = Component.getLayout ?? ((page) => page);

  useEffect(() => {
    // @note:
    // edge function은 server side에서 호출할 수 없기에
    // 로그인 여부를 client side에서 체크합니다.
    login().catch(() => console.error('login failed'));
  }, [login]);

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
          {getLayout(
            <ErrorBoundary fallback={<div>에러 페이지</div>}>
              <Component {...pageProps} />
            </ErrorBoundary>
          )}
        </ChakraProvider>
      </QueryClientProvider>
    </>
  );
}

export default App;
