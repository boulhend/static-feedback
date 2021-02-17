import React from 'react';
import { Flex, Heading, Text, Button } from '@chakra-ui/react';
import DashboardShell from './DashboardShell';
const FreeEmptyState = () => (
  <DashboardShell>
    <Flex
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      backgroundColor="#ffffff"
      borderRadius="8px"
      minHeight="30vh"
      mt={4}
    >
      <Heading mb={2}>Get feedback on your site instantly.</Heading>
      <Text mb={1}>Start today, then grow with us 🌱</Text>
      <Button
        variant="solid"
        size="md"
        color="#ffffff"
        backgroundColor="#000000"
        mt={3}
      >
        Upgrade to Starter
      </Button>
    </Flex>
  </DashboardShell>
);

export default FreeEmptyState;
