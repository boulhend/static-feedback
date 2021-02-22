import EmptyState from '../components/EmptyState';
import DashboardShell from '../components/DashboardShell';
import SiteTableSkelton from '../components/SiteTableSkelton';
import SiteTable from '../components/SiteTable';
import useSWR from 'swr';
import fetcher from '../utils/fetcher';
import { useAuth } from '../lib/auth';
import SiteTableHeader from '../components/SiteTableHeader';
export default function Dashboard() {
  const { user } = useAuth();
  const { data } = useSWR(
    user ? ['/api/sites', user.token] : null,
    fetcher
  );
  if (!data)
    return (
      <DashboardShell>
        <SiteTableHeader />
        <SiteTableSkelton />
      </DashboardShell>
    );
  return (
    <DashboardShell>
      <SiteTableHeader />
      {data.sites ? <SiteTable sites={data.sites} /> : <EmptyState />}
    </DashboardShell>
  );
}
