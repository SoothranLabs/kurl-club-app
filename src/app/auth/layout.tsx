import Image from 'next/image';

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="grid w-full h-screen grid-cols-1 gap-8 p-6 md:grid-cols-2 md:p-8">
      <span className="h-[calc(100vh-64px)] w-full hidden md:block">
        <Image
          src="/assets/png/login-banner.png"
          alt="login-banner"
          className="object-cover object-left-bottom w-full h-full rounded-xl"
          height={1000}
          width={1000}
          priority
        />
      </span>

      <div className="flex flex-col items-end justify-between w-full h-full gap-4">
        <span>
          <Image
            className="ml-auto w-fit"
            src="/assets/svg/logo-light.svg"
            alt="logo"
            height={1000}
            width={1000}
            priority
          />
        </span>

        <div className="flex items-center justify-center w-full h-full">
          {children}
        </div>
      </div>
    </main>
  );
}
