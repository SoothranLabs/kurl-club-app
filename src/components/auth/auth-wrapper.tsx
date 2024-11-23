'use client';

import React, { ReactNode } from 'react';
import { KFormField, KFormFieldType } from '@/components/form/k-formfield';
import { useForm } from 'react-hook-form';
import { PatientFormValidation } from '@/lib/validation';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Form } from '../ui/form';
import { Button } from '../ui/button';
import { KApple, KBackArrow, KGoogle } from '../icons';
import Link from 'next/link';

interface AuthWrapperProps {
  children?: ReactNode;
  title?: string;
  desc?: string;
  checkbox?: boolean;
  verification?: boolean;
  backBtn?: boolean;
  footerLink?: string;
  footerDesc?: string;
  socialBtn?: boolean;
  onBackClick?: () => void;
  isLogin?: boolean;
}

const AuthWrapper: React.FC<AuthWrapperProps> = ({
  children,
  checkbox,
  title,
  desc,
  verification,
  backBtn,
  footerLink,
  footerDesc,
  socialBtn = true,
  onBackClick,
  isLogin,
}) => {
  const form = useForm<z.infer<typeof PatientFormValidation>>({
    resolver: zodResolver(PatientFormValidation),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
    },
  });

  return (
    <div className="w-full max-w-[400px]">
      {!verification ? (
        <>
          {/* back arrow */}
          {backBtn && (
            <div className="">
              <Button
                onClick={onBackClick}
                className="rounded-[27px] px-2 py-1 h-8 mb-9 bg-primary-blue-400 gap-1 text-primary-green-200 hover:bg-primary-blue-500"
              >
                <KBackArrow className="text-primary-green-200 capitalize" />
                Back
              </Button>
            </div>
          )}
          {/* header */}
          <div className="flex flex-col gap-2.5 mb-9">
            <h5 className="text-white text-[32px] font-semibold leading-normal">
              {title}
            </h5>
            <p className="text-primary-blue-50 text-[15px] font-normal leading-normal">
              {desc}
            </p>
          </div>
          {/* body */}
          <div className="">{children}</div>
          {/* social section */}
          {socialBtn && (
            <div className="">
              <div className="flex items-center gap-4 mt-3">
                <span className="h-[1px] flex-1 bg-gradient-to-l from-primary-blue-400 via-primary-blue-400 to-transparent"></span>
                <p className="text-center text-white text-sm font-normal leading-normal">
                  Or {isLogin ? 'login' : 'sign up'} with
                </p>
                <span className="h-[1px] flex-1 bg-gradient-to-l from-transparent via-primary-blue-400 to-primary-blue-400"></span>
              </div>
              <div className="flex w-full items-center gap-3 mt-5">
                <Button
                  variant="outline"
                  className="gap-2 py-2.5 w-full h-[46px] font-normal"
                >
                  <span className="">
                    <KGoogle />
                  </span>
                  {isLogin ? 'Login' : 'Sign up'} with Google
                </Button>
                <Button
                  variant="outline"
                  className="gap-2 py-2.5 w-full h-[46px] font-normal"
                >
                  <span className="">
                    <KApple />
                  </span>
                  {isLogin ? 'Login' : 'Sign up'} with apple ID
                </Button>
              </div>
            </div>
          )}
          {/* footer */}
          {footerLink && (
            <div className="flex w-full justify-center gap-2 items-center mt-6">
              <h6 className="text-white leading-normal text-sm font-normal">
                {footerDesc}
              </h6>
              <Link
                className=" text-semantic-blue-500 cursor-pointer underline underline-offset-2 font-normal text-sm leading-normal hover:no-underline k-transition"
                href={footerLink}
              >
                {isLogin ? 'Sign up' : 'Login'}
              </Link>
            </div>
          )}
          {/* checkbox */}
          {checkbox && (
            <Form {...form}>
              <form className="flex justify-center mt-[45px]">
                <KFormField
                  fieldType={KFormFieldType.CHECKBOX}
                  control={form.control}
                  name="privacyConsent"
                  label="I agree to the terms & conditions"
                />
              </form>
            </Form>
          )}
        </>
      ) : (
        // verification
        <div className="flex flex-col gap-7">
          <h4 className="text-white font-semibold text-[32px] leading-normal">
            Verify email ✅
          </h4>
          <p className="text-white font-medium text-xl leading-normal">
            KurlClub has sent a mail to your account, login to by following the
            link there !
          </p>
        </div>
      )}
    </div>
  );
};

export default AuthWrapper;
