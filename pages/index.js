import { Button, Flex, Link } from '@chakra-ui/react';
import NextLink from 'next/link';
import Head from 'next/head';
import { useAuth } from '../lib/auth';
import { Logo } from '../styles/theme';
export default function Home() {
  const auth = useAuth();

  return (
    <div>
      <Head>
        <title>Create Next App</title>
        {
          <script
            dangerouslySetInnerHTML={{
              __html: `
          if (document.cookie && document.cookie.includes('fast-feedback-auth')) {
            window.location.href = "/dashboard"
          }
        `
            }}
          />
        }
      </Head>

      <Flex
        direction="column"
        w="400px"
        align="center"
        justify="center"
        margin="auto"
      >
        <Logo boxSize={60} color="black" />
        {!auth.user ? (
          <Button onClick={(e) => auth.signinWithGithub()}>Sign In</Button>
        ) : (
          <>
            <NextLink href="/dashboard" passHref>
              <Link
                backgroundColor="teal"
                textDecoration="none"
                px={4}
                py={2}
                color="white"
                borderRadius={4}
                _hover={{ backgroundColor: 'teal.500' }}
                fontWeight="medium"
              >
                View Dashboard
              </Link>
            </NextLink>
          </>
        )}
      </Flex>
    </div>
  );
}
