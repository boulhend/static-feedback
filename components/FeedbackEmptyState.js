import React from 'react';
import { Flex, Heading, Text,Link } from '@chakra-ui/react';
import NextLink from 'next/link';
const FeedbackEmptyState = ({siteId}) => {
  return (
    <Flex
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      backgroundColor="#ffffff"
      borderRadius="8px"
      minHeight="30vh"
      mt={4}
      p={12}
    >
      <Heading mb={2} size="md">
        You haven't left any feedback.
      </Heading>
      <Text mb={1}>Comon add some feedback</Text>
      <NextLink href={`/site/${siteId}`} passHref>
        <Link
          variant="solid"
          size="md"
          color="#ffffff"
          backgroundColor="#000000"
          mt={3}
          px={5}
          py={2}
          borderRadius={3}
          _hover={{ bg: 'gray.700' }}
          _active={{
            bg: 'gray.800',
            transform: 'sclae(0.95)'
          }}
        >
          Add a feedback
        </Link>
      </NextLink>
    </Flex>
  );
};

export default FeedbackEmptyState;
