import React, { ReactNode } from 'react';

interface AuthLayoutProps {
  children: ReactNode;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  return (
    <main className="grid grid-cols-2 h-screen w-full p-8 gap-20">
      <span className="h-[calc(100vh-64px)] w-full">
        <img
          src="/assets/png/login-banner.png"
          alt="login-banner"
          className="h-full w-full object-cover object-bottom rounded-xl"
        />
      </span>
      <div className="">
        <span className="">
          <img
            className="ml-auto"
            src="/assets/svg/logo-light.svg"
            alt="logo"
          />
        </span>
        <div className="w-full h-full flex justify-center items-center">
          {children}
        </div>
      </div>
    </main>
  );
};

export default AuthLayout;
