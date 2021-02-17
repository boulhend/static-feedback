import React from 'react';
import { Flex, Heading, Text } from '@chakra-ui/react';
import Addsitemodal from './Addsitemodal';
const EmptyState = () => {
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
        You haven't added any sites.
      </Heading>
      <Text mb={1}>Welcome let's get started</Text>
      <Addsitemodal text="Add your first site" />
    </Flex>
  );
};

export default EmptyState;
