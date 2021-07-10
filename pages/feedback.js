import EmptyState from '../components/EmptyState';
import SiteFeedbackSkelton from '../components/SiteFeedbackSkelton';
import Feedbacktable from '../components/Feedbacktable';
import useSWR from 'swr';
import fetcher from '../utils/fetcher';
import { useAuth } from '../lib/auth';
import DashboardShell from '../components/DashboardShell';
import FeedbackTableHeader from '../components/FeedbackTableHeader';
export default function Feedback() {
  const { user } = useAuth();
  const { data } = useSWR(user ? ['/api/feedback', user.token] : null, fetcher);

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
      <FeedbackTableHeader />
      {data.allFeedback ? (
        <Feedbacktable allFeedback={data.allFeedback} />
      ) : (
        <EmptyState />
      )}
    </DashboardShell>
  );
}
