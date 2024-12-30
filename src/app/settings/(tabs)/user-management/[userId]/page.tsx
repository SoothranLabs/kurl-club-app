interface UserDetailsPageProps {
  params: Promise<{ userId: string }>;
}

export default async function UserDetailsPage({
  params,
}: UserDetailsPageProps) {
  const userId = (await params).userId;
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-4">User ID: {userId}</h1>
    </div>
  );
}
