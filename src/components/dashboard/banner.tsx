import { Button } from '@/components/ui/button';
import KDialog from '@/components/form/k-dialog';
import { OnboardingStepForm } from '@/components/onboarding/onboarding-step-form';

function Banner() {
  return (
    // TODO: Add gradient border
    <div className='relative flex flex-col items-start rounded-xl border-[1px] border-white px-9 py-[39px] bg-[url("/assets/png/dashboard-banner.png")] bg-cover bg-right'>
      <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent rounded-xl"></div>
      <div className="relative z-10">
        <h4 className="text-white leading-normal font-medium text-[28px]">
          Complete profile
        </h4>
        <p className="mt-4 mb-6 max-w-[400px] text-white text-sm font-semibold leading-normal">
          Complete your profile to access full length access to all Kurlclub
          features
        </p>
        <KDialog
          closable={false}
          className="p-[48px] w-[638px]"
          trigger={
            <Button className="py-[13px] px-6 h-10">Finish setting up</Button>
          }
        >
          <OnboardingStepForm />
        </KDialog>
      </div>
    </div>
  );
}

export default Banner;
