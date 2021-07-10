import { useRouter } from 'next/router';
import useSWR from 'swr';
import DashboardShell from '../../components/DashboardShell';
import FeedbackTableHeader from '../../components/FeedbackTableHeader';
import SiteFeedbackSkelton from '../../components/SiteFeedbackSkelton';
import Feedbacktable from '../../components/Feedbacktable';
import FeedbackEmptyState from '../../components/FeedbackEmptyState';
import { useAuth } from '../../lib/auth';
import fetcher from '../../utils/fetcher';
export default function Feedback() {
  const router = useRouter();
  const { user } = useAuth();
  const { data } = useSWR(
    user ? [`/api/feedback/${router.query.siteId}`, user.token] : null,
    fetcher
  );

  if (!data) {
    return (
      <DashboardShell>
        <FeedbackTableHeader />
        <SiteFeedbackSkelton />
      </DashboardShell>
    );
  }
  return (
    <DashboardShell>
      {data.allFeedback.length>0 ? (
        <>
          <FeedbackTableHeader
            siteName={data.allFeedback[0].siteName}
            siteId={router.query.siteId}
          />
          <Feedbacktable allFeedback={data.allFeedback} />
        </>
      ) : (
        <>
          <FeedbackTableHeader />
          <FeedbackEmptyState siteId={router.query.siteId} />
        </>
      )}
    </DashboardShell>
  );
}
/* export async function getStaticProps({ params }) {
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
      fallback: true
    };
  }
   */
