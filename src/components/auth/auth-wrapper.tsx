import { AuthFooter, AuthHeader } from '@/components/auth/auth-wrapper-helpers';
import { Social } from '@/components/auth/social';

interface AuthWrapperProps {
  children?: React.ReactNode;
  header?: {
    title?: string;
    description?: string;
  };
  footer?: {
    linkUrl?: string;
    linkText?: string;
    isLogin?: boolean;
  };
  socials?: boolean;
  verification?: boolean;
  onBackButtonClick?: () => void;
}

export const AuthWrapper = ({
  children,
  header = {},
  footer = {},
  socials,
  verification,
}: AuthWrapperProps) => {
  const { linkUrl = '', linkText = '', isLogin = false } = footer;
  const { title = '', description = '' } = header;

  return (
    <div className="w-full max-w-full sm:max-w-[500px] md:max-w-[60%] md:min-w-[400px]">
      {!verification ? (
        <>
          {/* header */}
          <AuthHeader authTitle={title} authDesc={description} />

          {/* body */}
          <div className="">{children}</div>

          {/* social section */}
          {socials && <Social isLogin={isLogin} />}

          {/* footer */}
          {linkUrl && (
            <AuthFooter
              footerLink={linkUrl}
              footerDesc={linkText}
              isLogin={isLogin}
            />
          )}
        </>
      ) : (
        // verification
        <div className="flex flex-col gap-7">
          <h4 className="text-white font-semibold text-[32px] leading-normal">
            Verify email ✅
          </h4>
          <p className="text-xl font-medium leading-normal text-white">
            KurlClub has sent a mail to your account, login to by following the
            link there !
          </p>
        </div>
      )}
    </div>
  );
};
