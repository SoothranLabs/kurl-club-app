import Contents from '@/components/settings/user-management/details/contents';
import { Sidebar } from '@/components/settings/user-management/details/sidebar';

export default async function UserDetailsPage() {
  return (
    <main className="flex flex-auto">
      <Sidebar />
      <Contents />
    </main>
  );
}
