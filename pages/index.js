import { Button, Flex, Link, Box, Heading, Text } from '@chakra-ui/react';
import NextLink from 'next/link';
import Head from 'next/head';
import { useAuth } from '../lib/auth';
import { Logo, Github, Google } from '../styles/theme';
import getAllFeedback from '../lib/db-admin';
const siteId = 'ZSnYVWW5R8nIrwRlD55X';
export async function getStaticProps({ params }) {
  const feedback = await getAllFeedback(siteId);
  return {
    props: {
      allFeeedback: feedback || []
    },
    revalidate: 1
  };
}
export default function Home({ allFeeedback }) {
  const auth = useAuth();

  return (
    <Box>
      <Head>
        <title>Fast feedback</title>
        {/* {
          <script
            dangerouslySetInnerHTML={{
              __html: `
          if (document.cookie && document.cookie.includes('fast-feedback-auth')) {
            window.location.href = "/"
          }
        `
            }}
          />
        } */}
      </Head>
      <Flex flexDirection="column" width="100%">
        <Flex
          direction="column"
          align="flex-start"
          justify="center"
          margin="auto"
          backgroundColor="gray.100"
          py="50px"
          pl="250px"
          width="100%"
        >
          <Logo boxSize={10} color="black" />
          <Text fontSize="lg" width="60%" my={5}>
            Fast Feedback was built as part of React 2025. It's the easiest way
            to add comments or reviews to your static site. Try it out by
            leaving a comment below. After the comment is approved, it will
            display below.
          </Text>
          {!auth.user ? (
            <Flex mt={2}>
              <Button
                variant="solid"
                size="md"
                color="white"
                backgroundColor="gray.900"
                mt={3}
                mr={5}
                _hover={{ bg: 'gray.700' }}
                _active={{
                  bg: 'gray.800',
                  transform: 'sclae(0.95)'
                }}
                leftIcon={<Github fill="white" mb={1} mr={1} />}
                onClick={() => auth.signinWithGithub()}
                px={4}
                py={3}
                fontSize="sm"
              >
                Sign In With Github
              </Button>
              <Button
                variant="solid"
                size="md"
                color="gray.900"
                backgroundColor="white"
                mt={3}
                _hover={{ bg: 'gray.200' }}
                _active={{
                  bg: 'gray.300',
                  transform: 'sclae(0.95)'
                }}
                leftIcon={<Google mb={1} mr={1} />}
                onClick={() => auth.signinWithGoogle()}
                px={4}
                py={3}
                fontSize="sm"
              >
                Sign In With Google
              </Button>
            </Flex>
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
        <Box py={4} width="70%" margin="auto">
          {allFeeedback.map((feedcback) => (
            <Box key={feedcback.id}>
              <Heading fontSize="md" mt={6}>
                {feedcback.author}
              </Heading>
              <Text fontSize="small" color="gray.600">
                {feedcback.createdAt}
              </Text>
              <Text mt={5} mb={8}>
                {feedcback.text}
              </Text>
              <Box borderBottom="1px" color="gray.200" />
            </Box>
          ))}
        </Box>
      </Flex>
    </Box>
  );
}
