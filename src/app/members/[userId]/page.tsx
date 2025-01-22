import Contents from '@/components/members/details/contents';
import { Sidebar } from '@/components/members/details/sidebar';

export default async function MemberDetailsPage() {
  return (
    <main className="flex flex-auto">
      <Sidebar />
      <Contents />
    </main>
  );
}
