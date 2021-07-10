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
  useToast,
  Button,
  Checkbox,
  CheckboxGroup
} from '@chakra-ui/react';

import { SettingsIcon } from '@chakra-ui/icons';
import { useState } from 'react';
import { useAuth } from '../lib/auth';
import { mutate } from 'swr';
import { updateSite } from '../lib/db';
import {useRouter} from 'next/router';
import fetcher from './../utils/fetcher'
export default function Editsitemodal({
  text,
  siteName,
  siteId,
  allfeedback,
  setAllfeedback
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { register, handleSubmit } = useForm();
  const initialRef = React.useRef();
  const finalRef = React.useRef();
  const toast = useToast();
  const auth = useAuth();
  const [icons, setIcons] = useState(true);
  const [timestamp, setTimestamp] = useState(true);
  const [ratings, setRatings] = useState(true);
  const onSubmit = async () => {
    toast({
      title: 'Success!',
      description: `${siteName} has been edited`,
      status: 'success',
      duration: 3000,
      isClosable: true
    });
    onClose();
    
    if (allfeedback) {
      let newAllfeedback = allfeedback.forEach((f) => {
        f.icons = icons ? 'show' : 'hide';
        f.timestamp = timestamp ? 'show' : 'hide';
        f.ratings =   ratings ? 'show' : 'hide';
      });
      setAllfeedback(newAllfeedback);
    }

    await updateSite(siteId, {
      icons: icons ? 'show' : 'hide',
      timestamp: timestamp ? 'show' : 'hide',
      ratings: ratings ? 'show' : 'hide'
    });
    mutate(['/api/sites'], auth.user.token);
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
        leftIcon={<SettingsIcon w={3} h={3} mb={1} />}
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
          <ModalHeader fontWeight="bold">Edit website</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <CheckboxGroup colorScheme="green">
              <FormControl>
                <Checkbox
                  name="timestamp"
                  isChecked={timestamp}
                  onChange={() => setTimestamp(!timestamp)}
                  ref={register}
                >
                  Show timestamp
                </Checkbox>
              </FormControl>

              <FormControl>
                <Checkbox
                  name="icons"
                  isChecked={icons}
                  onChange={() => setIcons(!icons)}
                  ref={register}
                >
                  Show Icon
                </Checkbox>
              </FormControl>

              <FormControl>
                <Checkbox
                  name="ratings"
                  isChecked={ratings}
                  onChange={() => setRatings(!ratings)}
                  ref={register}
                >
                  Show ratings
                </Checkbox>
              </FormControl>
            </CheckboxGroup>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="teal" mr={3} type="submit">
              Update site
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
