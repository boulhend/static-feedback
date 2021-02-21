import { Button, Flex, Link } from '@chakra-ui/react';
import NextLink from 'next/link';
import Head from 'next/head';
import { useAuth } from '../lib/auth';
import { Logo, Github, Google } from '../styles/theme';
export default function Home() {
  const auth = useAuth();

  return (
    <div>
      <Head>
        <title>Fast feedback</title>
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
        align="center"
        justify="center"
        margin="auto"
        height="100vh"
      >
        <Logo boxSize={20} color="black" />
        {!auth.user ? (
          <>
            <Button
              variant="solid"
              size="md"
              color="white"
              backgroundColor="gray.900"
              mt={3}
              _hover={{ bg: 'gray.700' }}
              _active={{
                bg: 'gray.800',
                transform: 'sclae(0.95)'
              }}
              leftIcon={<Github fill="white" mb={1} mr={1} />}
              onClick={() => auth.signinWithGithub()}
              px={8}
              py={6}
              fontSize="lg"
            >
              Sign In With Github
            </Button>
            <Button
              variant="solid"
              size="md"
              color="gray.900"
              backgroundColor="gray.100"
              mt={3}
              _hover={{ bg: 'gray.200' }}
              _active={{
                bg: 'gray.300',
                transform: 'sclae(0.95)'
              }}
              leftIcon={<Google mb={1} mr={1} />}
              onClick={() => auth.signinWithGoogle()}
              px={8}
              py={6}
              fontSize="lg"
            >
              Sign In With Google
            </Button>
          </>
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
