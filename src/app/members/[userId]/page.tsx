import { Chart } from '@/components/members/details/chart';

interface MemberDetailsPageProps {
  params: Promise<{ userId: string }>;
}

export default async function MemberDetailsPage({
  params,
}: MemberDetailsPageProps) {
  const userId = (await params).userId;

  return (
    <div>
      UserId = {userId}
      <Chart />
    </div>
  );
}
