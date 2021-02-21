import { DeleteIcon } from '@chakra-ui/icons';
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Button,
  IconButton
} from '@chakra-ui/react';
import React from 'react';
import { deleteFeedback } from '../lib/db';
function DeleteFeedback({ feedbackId,tableFeedback,setTablefeedback }) {
  const [isOpen, setIsOpen] = React.useState(false);
  const onClose = () => setIsOpen(false);
  const cancelRef = React.useRef();
  function deleteOneFeedback() {
    onClose();
    setTablefeedback(tableFeedback.filter(feedback=>feedback.id !== feedbackId))
    deleteFeedback(feedbackId);
  }
  return (
    <>
      <IconButton
        colorScheme="red"
        variant="ghost"
        aria-label="Delete feedback"
        icon={<DeleteIcon />}
        onClick={() => setIsOpen(true)}
      />
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete Feedback
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure? You can't undo this action afterwards.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button colorScheme="red" onClick={deleteOneFeedback} mr={3}>
                Delete
              </Button>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
}
export async function getStaticProps() {
  return {
    props: {
      Inititalfeedback: feedback,
      siteName
    },
    revalidate: 1
  };
}
export default DeleteFeedback;
