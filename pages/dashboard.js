import EmptyState from '../components/EmptyState';
import DashboardShell from '../components/DashboardShell';
import SiteTableSkelton from '../components/SiteTableSkelton';
import SiteTable from '../components/SiteTable';
import useSWR from 'swr';
import fetcher from '../utils/fetcher';
import { useAuth } from '../lib/auth';
export default function Dashboard() {
  const { user } = useAuth();
  const { data, error } = useSWR(
    user ? ['/api/sites', user.token] : null,
    fetcher
  );
  if (data == undefined)
    return (
      <DashboardShell>
        <SiteTableSkelton />
      </DashboardShell>
    );
  return (
    <DashboardShell>
      {data.sites ? <SiteTable sites={data.sites} /> : <EmptyState />}
    </DashboardShell>
  );
}
