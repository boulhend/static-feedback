import React from 'react';
import { useForm } from 'react-hook-form';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  FormControl,
  FormLabel,
  useToast,
  Input,
  Button
} from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import { createSite } from '../lib/db';
import { useAuth } from '../lib/auth';
import useSWR from 'swr';
import fetcher from '../utils/fetcher';
import { formatRFC7231 } from 'date-fns';
export default function Addsitemodal({ text }) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const initialRef = React.useRef();
  const finalRef = React.useRef();
  const { register, handleSubmit, watch, errors } = useForm();
  const toast = useToast();
  const auth = useAuth();
  const { data, mutate } = useSWR(['/api/sites', auth.user.token], fetcher);
  const onSubmit = ({ name, link }) => {
    const newSite = {
      userId: auth.user.uid,
      createdAt: formatRFC7231(new Date()),
      name,
      link,
      icons:'show',
      timestamp:'show',
      ratings:'show'
    };

    const { id } = createSite(newSite);
    toast({
      title: 'Success!',
      description: "We've created a site for you.",
      status: 'success',
      duration: 5000,
      isClosable: true
    });
    mutate({ sites: [{ id, ...newSite }, ...data.sites] }, false);
    onClose();
  };
  return (
    <>
      <Button
        variant="solid"
        size="md"
        color="#ffffff"
        backgroundColor="#000000"
        mt={3}
        _hover={{ bg: 'gray.700' }}
        _active={{
          bg: 'gray.800',
          transform: 'sclae(0.95)'
        }}
        onClick={onOpen}
        leftIcon={<AddIcon w={3} h={3} mb={1} />}
      >
        {text}
      </Button>
      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent as="form" onSubmit={handleSubmit(onSubmit)}>
          <ModalHeader fontWeight="bold">Add site</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel fontWeight="medium">Name</FormLabel>
              <Input
                placeholder="My Site "
                name="name"
                ref={register({ required: true })}
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel fontWeight="medium">Link</FormLabel>
              <Input
                placeholder="https://www.website.com"
                name="link"
                ref={register({ required: true })}
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="teal" mr={3} type="submit">
              Add site
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
