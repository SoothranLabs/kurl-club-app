'use client';

import { Button } from '@/components/ui/button';

export const Subscription = () => {
  return (
    <div className="bg-yellow-400/10 border border-yellow-400/30 rounded-lg p-4">
      <h3 className="text-lg font-semibold text-white">
        Level up your business, unlock Kurlclub premium !
      </h3>
      <p className="text-sm text-zinc-400 mb-3">
        Per account, per month/billed annually
      </p>

      <ul className="space-y-2 mb-4">
        <li className="flex items-center gap-2">
          <span className="text-yellow-400">✓</span>
          <span>Unlimited members</span>
        </li>
        <li className="flex items-center gap-2">
          <span className="text-yellow-400">✓</span>
          <span>Exclusive Access to Class & Trainer Scheduling</span>
        </li>
        <li className="flex items-center gap-2">
          <span className="text-yellow-400">✓</span>
          <span>Automated Payment & Renewal</span>
        </li>
        <li className="flex items-center gap-2">
          <span className="text-yellow-400">✓</span>
          <span>Member app for the ultimate PT experience</span>
        </li>
      </ul>

      <Button className="bg-black text-white hover:bg-zinc-900">
        See all plans
      </Button>
    </div>
  );
};
