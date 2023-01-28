import type { AppProps } from 'next/app';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ChakraProvider } from '@chakra-ui/react';

function App({ Component, pageProps }: AppProps) {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider>
        <Component {...pageProps} />
      </ChakraProvider>
    </QueryClientProvider>
  );
}

export default App;
