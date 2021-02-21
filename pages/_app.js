import { AuthProvider } from '../lib/auth';
import { CSSReset, ChakraProvider } from '@chakra-ui/react';
import { css, Global } from '@emotion/react';
import Head from 'next/head';
function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider>
      <Head>
        <title>Fast feedback</title>
      </Head>
      <AuthProvider>
        <CSSReset />
        <Global
          styles={css`
            * {
              margin: 0;
              padding: 0;
              box-sizing: border-box;
            }
            html {
              min-width: 360px;
              scroll-behavior: smooth;
            }
            #__next {
              display: flex;
              flex-direction: column;
              min-height: 100vh;
            }
          `}
        />
        <Component {...pageProps} />
      </AuthProvider>
    </ChakraProvider>
  );
}

export default MyApp;
