import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Button,
  Heading,
  Text
} from '@chakra-ui/react';

import Feedback from '../../components/Feedback';
import getAllFeedback, { getAllSites, getSite } from '../../lib/db-admin';
import { useRouter } from 'next/router';
import { useAuth } from '../../lib/auth';
import { useEffect, useRef, useState } from 'react';
import { createFeedback } from '../../lib/db';
import { formatRFC7231 } from 'date-fns';
import DashboardShell from '../../components/DashboardShell';
import EditSiteHeader from '../../components/EditSiteHeader';

const Sitefeedback = ({
  Inititalfeedback,
  siteId,
  rou,
  siteName,
  icons,
  timestamp,
  ratings
}) => {
  const router = useRouter();
  const auth = useAuth();
  const inputRef = useRef('');
  const [allfeedback, setAllfeedback] = useState(Inititalfeedback);

  useEffect(() => {
    setAllfeedback(Inititalfeedback);
  }, [Inititalfeedback, siteId]);
  const onSubmit = async (e) => {
    e.preventDefault();
    const newFeedback = {
      author: auth.user.name,
      authorId: auth.user.uid,
      siteName,
      route: rou || '/',
      createdAt: formatRFC7231(new Date()),
      siteId,
      text: inputRef.current.value,
      provider: auth.user.provider,
      status: 'pending',
      icons,
      timestamp,
      ratings
    };
    inputRef.current.value = '';
    if (allfeedback === undefined) {
      setAllfeedback([newFeedback]);
    } else {
      setAllfeedback([newFeedback, ...allfeedback]);
    }

    createFeedback(newFeedback);
  };
  return (
    <DashboardShell>
      <EditSiteHeader
        siteId={siteId}
        siteName={siteName}
        setAllfeedback={setAllfeedback}
        allfeedback={allfeedback}
      />

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
            <Input
              backgroundColor="white"
              type="textarea"
              placeholder="Feedback ..."
              type="texArea"
              ref={inputRef}
            />
            <Button
              type="submit"
              fontWeight="medium"
              backgroundColor="gray.900"
              color="white"
              _hover={{ backgroundColor: 'gray.700' }}
              mt={3}
              isDisabled={router.isFallback}
            >
              Add comment
            </Button>
          </FormControl>
        </Box>
        <Box py={4}>
          {allfeedback &&
            allfeedback.map((feedback) => (
              <Feedback
                {...feedback}
                key={feedback.id}
                icons={icons}
                timestamp={timestamp}
                ratings={ratings}
              />
            ))}
        </Box>
      </Box>
    </DashboardShell>
  );
};
export async function getStaticProps({ params }) {
  let [siteId, rou] = params.siteId;
  if (rou === undefined) rou = '/';
  const feedback = await getAllFeedback(siteId, rou);
  const { name, icons, timestamp, ratings } = await getSite(siteId);
  return {
    props: {
      Inititalfeedback: feedback,
      siteName: name,
      siteId,
      icons,
      timestamp,
      ratings,
      rou
    },
    revalidate: 1
  };
}
export async function getStaticPaths() {
  const sites = await getAllSites();
  const paths = sites.map((site) => ({
    params: {
      siteId: [site.id]
    }
  }));
  return {
    paths,
    fallback: true
  };
}
export default Sitefeedback;
