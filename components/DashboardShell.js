import React from 'react';
import {
  Flex,
  Link,
  Stack,
  Avatar,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Heading,
  Button
} from '@chakra-ui/react';
import { Logo } from '../styles/theme';
import { useAuth } from '../lib/auth';
import Addsitemodal from './Addsitemodal';
import NextLink from 'next/link'
const DashboardShell = ({ children }) => {
  const auth = useAuth();
  return (
    <Flex flexDirection="column" height="100vh">
      <Flex
        justifyContent="space-between"
        alignItems="center"
        p={3}
        pr={8}
        pl={8}
      >
        <Stack spacing={5} isInline alignItems="center">
          <Logo color="black" />
          <Link>Feedback</Link>
          <Link>Sites</Link>
        </Stack>
        <Flex justifyContent="space-around" alignItems="center">
          <NextLink href="/" passHref><Link mr={3} onClick={()=>auth.signout()}>Log out</Link></NextLink>
          <Avatar src={auth.user?.photoURL} />
        </Flex>
      </Flex>
      <Flex backgroundColor="gray.100" h="100%">
        <Flex flexDirection="column" ml="auto" mr="auto" w="65%" mt="7">
          <Breadcrumb>
            <BreadcrumbItem>
              <BreadcrumbLink color="#100f0f">Sites</BreadcrumbLink>
            </BreadcrumbItem>
          </Breadcrumb>
          <Flex justify="space-between">
            <Heading size="lg">My sites</Heading>
            <Addsitemodal text="Add site"/>
          </Flex>

          {children}
        </Flex>
      </Flex>
    </Flex>
  );
};

export default DashboardShell;
