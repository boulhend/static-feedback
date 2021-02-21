import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Button,
  Heading,
  Text
} from '@chakra-ui/react';
import getAllFeedback, { getAllSites, getSite } from '../../lib/db-admin';
import { useRouter } from 'next/router';
import { useAuth } from '../../lib/auth';
import { useRef, useState } from 'react';
import { createFeedback } from '../../lib/db';
import { formatRFC7231 } from 'date-fns';
export default function Sitefeedback({ Inititalfeedback, siteName }) {
  const router = useRouter();
  const auth = useAuth();
  const inputRef = useRef('');
  const [allfeedback, setAllfeedback] = useState(Inititalfeedback);
  const siteId = router.query.siteId;

  const onSubmit = async (e) => {
    e.preventDefault();
    const newFeedback = {
      author: auth.user.name,
      authorId: auth.user.uid,
      siteName,
      createdAt: formatRFC7231(new Date()),
      siteId,
      text: inputRef.current.value,
      provider: auth.user.provider,
      status: 'pending'
    };
    setAllfeedback([newFeedback, ...allfeedback]);
    createFeedback(newFeedback);
  };
  return (
    <Box
      display="flex"
      flexDirection="column"
      margin="0 auto"
      width="full"
      maxWidth="700px"
    >
      <Box as="form" onSubmit={onSubmit}>
        <FormControl id="email" my={8}>
          <FormLabel>Comment</FormLabel>
          <Input placeholder="Feedback ..." type="texArea" refs={inputRef} />
          <Button type="submit" fontWeight="medium" mt={3}>
            Add comment
          </Button>
        </FormControl>
      </Box>
      <Box py={4}>
        {allfeedback.map((feedcback) => (
          <Box key={feedcback.id}>
            <Heading fontSize="lg">{feedcback.author}</Heading>
            <Text>{feedcback.createdAt}</Text>
            <Text my={5}>{feedcback.text}</Text>
            <Box borderBottom="1px" color="gray.200" />
          </Box>
        ))}
      </Box>
    </Box>
  );
}
export async function getStaticProps({ params }) {
  const siteId = params.siteId;
  const feedback = await getAllFeedback(siteId);
  const siteName = await getSite(siteId);
  return {
    props: {
      Inititalfeedback: feedback,
      siteName
    },
    revalidate: 1
  };
}
export async function getStaticPaths() {
  const sites = await getAllSites();
  const paths = sites.map((site) => ({
    params: {
      siteId: site.id.toString()
    }
  }));
  return {
    paths,
    fallback: false
  };
}
