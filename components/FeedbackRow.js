import { useState } from 'react';
import { Td, Box, Switch,Link } from '@chakra-ui/react';
import {updateFeedback} from '../lib/db'
import { mutate } from 'swr';
import { useAuth } from '../lib/auth';
import NextLink from 'next/link'
const FeedbackRow = ({ id,siteId, siteName, text, status,route,children }) => {
  const auth = useAuth()
  const [checked, setChecked] = useState(status === 'active');
  const toggleCheck = async () => {
    setChecked(!checked);
    await updateFeedback(id,{status : checked ? 'pending':'active'})
    mutate(['/api/feedback'],auth.user.token)
  };
  return (
    <Box as="tr">
      <Td fontWeight="medium"><NextLink href={`/site/${siteId}`} passHref><Link>{siteName}</Link></NextLink></Td>
      <Td>{text}</Td>
      <Td>{route}</Td>
      <Td>
        <Switch
          variant="ghost"
          colorScheme="green"
          isChecked={checked}
          defaultChecked={status ==='active'}
          onChange={toggleCheck}
        />
      </Td>
      {children}
    </Box>
  );
};

export default FeedbackRow;
