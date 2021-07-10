import { Table, Thead, Tbody, Tr, Th, Td } from '@chakra-ui/react';
import DeleteFeedbackModal from './DeleteFeedbackModal';
import { useState } from 'react';
import FeedbackRow from './FeedbackRow';
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
          <Th>Site Name</Th>
          <Th>Feedback</Th>
          <Th>Route</Th>
          <Th>Visible</Th>
          <Th>Delete</Th>
        </Tr>
      </Thead>
      <Tbody>
        {tableFeedback.map((feedback) => (
          <FeedbackRow key={feedback.id} {...feedback}>
            <Td>
              <DeleteFeedbackModal
                feedbackId={feedback.id}
                tableFeedback={tableFeedback}
                setTablefeedback={setTablefeedback}
              />
            </Td>
          </FeedbackRow>
        ))}
      </Tbody>
    </Table>
  );
}
