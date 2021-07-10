import React from 'react';
import { Flex, Link, Stack, Avatar } from '@chakra-ui/react';
import { Logo } from '../styles/theme';
import { useAuth } from '../lib/auth';
import NextLink from 'next/link';
import { NextSeo } from 'next-seo';
import { useRouter } from 'next/router';

const DashboardShell = ({ children }) => {
  const auth = useAuth();
  const router = useRouter();
  let title = router.pathname.replace('/', '');
  title = title.charAt(0).toUpperCase() + title.slice(1);
  const url = `https://www.fastfeedback.com${router.pathname}`;
  const siteTitle = `${title} - FastFeedback`;
  return (
    <>
      <NextSeo title={siteTitle} canonical={url} openGraph={{ title, url }} />
      <Flex flexDirection="column" height="100vh">
        <Flex
          justifyContent="space-between"
          alignItems="center"
          p={3}
          pr={8}
          pl={8}
        >
          <Stack spacing={5} isInline alignItems="center">
            <NextLink href="/" passHref>
              <Link>
                <Logo cursor="pointer" color="black" width={10} height={8} />
              </Link>
            </NextLink>
            <NextLink href="/feedback" passHref>
              <Link>Feedback</Link>
            </NextLink>
            <NextLink href="/sites" passHref>
              <Link>Sites</Link>
            </NextLink>
          </Stack>
          <Flex justifyContent="space-around" alignItems="center">
            <NextLink href="/" passHref>
              <Link mr={3} onClick={() => auth.signout()}>
                Log out
              </Link>
            </NextLink>
            <Avatar src={auth.user?.photoURL} />
          </Flex>
        </Flex>
        <Flex backgroundColor="gray.50" h="100%">
          <Flex flexDirection="column" ml="auto" mr="auto" w="65%" mt="7">
            {children}
          </Flex>
        </Flex>
      </Flex>
    </>
  );
};

export default DashboardShell;
