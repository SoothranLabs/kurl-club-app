interface UserDetailsPageProps {
  params: Promise<{ userId: string }>;
}

export default async function UserDetailsPage({
  params,
}: UserDetailsPageProps) {
  const userId = (await params).userId;
  return (
    <main className="flex flex-auto">
      userId: {userId}
      {/* <Sidebar /> */}
      {/* <Contents /> */}
    </main>
  );
}
