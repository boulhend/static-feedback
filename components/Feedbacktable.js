import { Table, Thead, Tbody, Tr, Th, Td, Box, Switch } from '@chakra-ui/react';
import DeleteFeedbackModal from './DeleteFeedbackModal';
import { useState } from 'react';
export default function Feedbacktable({ allFeedback }) {
  const [tableFeedback, setTablefeedback] = useState(allFeedback);
  return (
    <Table
      variant="simple"
      mt={6}
      background="white"
      borderRadius="md"
      boxShadow="md"
    >
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
        {tableFeedback.map((feedback) => (
          <Box as="tr" key={feedback.id}>
            <Td fontWeight="medium">{feedback.siteName}</Td>
            <Td>{feedback.text}</Td>
            <Td>{'/'}</Td>
            <Td>
              <Switch
                variant="ghost"
                colorScheme="green"
                defaultChecked={feedback.status === 'active'}
              />
            </Td>
            <Td>
              <DeleteFeedbackModal
                feedbackId={feedback.id}
                tableFeedback={tableFeedback}
                setTablefeedback={setTablefeedback}
              />
            </Td>
          </Box>
        ))}
      </Tbody>
    </Table>
  );
}
