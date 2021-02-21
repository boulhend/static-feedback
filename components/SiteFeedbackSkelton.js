import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    Box,
    Skeleton
  } from '@chakra-ui/react';
  const SkeltonRow = ({ width }) => {
    return (
      <Box as="tr">
        <Td>
          <Skeleton height="10px" w={width} my={4} />
        </Td>
        <Td>
          <Skeleton height="10px" w={width} my={4} />
        </Td>
        <Td>
          <Skeleton height="10px" w={width} my={4} />
        </Td>
        <Td>
          <Skeleton height="10px" w={width} my={4} />
        </Td>
      </Box>
    );
  };
  export default function SiteFeedbackSkelton() {
    return (
      <Table variant="simple" mt={6} background="white" borderRadius="md" boxShadow="md">
        <Thead color="gray.500" background="gray.200">
          <Tr>
            <Th>Name</Th>
            <Th>Feedback</Th>
            <Th>Route</Th>
            <Th>Visible</Th>
            <Th>{''}</Th>
          </Tr>
        </Thead>
        <Tbody>
          <SkeltonRow width="75px" />
          <SkeltonRow width="125px" />
          <SkeltonRow width="50px" />
          <SkeltonRow width="100px" />
          <SkeltonRow width="75px" />
        </Tbody>
      </Table>
    );
  }
  