import { Box, Text } from '@chakra-ui/react';
import { getAllSites, getAllActiveFeedback } from '../../lib/db-admin';
import Feedback from '../../components/Feedback';
const EmbeddedFeedbackPage = ({ feedback }) => {
  return (
    <Box display="flex" flexDirection="column" width="full">
      {feedback ? (
        feedback.map((_feedback) => (
          <Feedback key={_feedback.id} {..._feedback} />
        ))
      ) : (
        <Text>There are no comments for this site.</Text>
      )}
    </Box>
  );
};

export async function getStaticProps({ params }) {
  const [siteId, route] = params.site;
  const feedback = await getAllActiveFeedback(siteId, route);
  return {
    props: {
      feedback
    },
    revalidate: 1
  };
}
export async function getStaticPaths() {
  const sites = await getAllSites();
  const paths = sites.map((site) => ({
    params: {
      site: [site.id.toString()]
    }
  }));
  return {
    paths,
    fallback: true
  };
}

export default EmbeddedFeedbackPage;
