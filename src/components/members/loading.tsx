import React from 'react';

import { Skeleton } from '../ui/skeleton';

export const Loading = () => {
  return (
    <div className="h-full flex-1 flex-col space-y-8 p-8 flex container">
      <div className="flex items-center gap-4 justify-between">
        <h2 className="text-2xl font-bold tracking-tight">Members</h2>
        <div className="flex items-center gap-3">
          <Skeleton className="h-[40px] w-[157px]" />
          <Skeleton className="h-[40px] w-[180px]" />
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between gap-3 flex-wrap">
          <div className="flex items-center gap-3 flex-wrap">
            <Skeleton className="h-10 w-[250px]" />
            <Skeleton className="h-10 w-[110px]" />
            <Skeleton className="h-10 w-[110px]" />
            <Skeleton className="h-10 w-[110px]" />
          </div>
          <Skeleton className="h-10 w-[80px]" />
        </div>
        <Skeleton className="h-[420px]" />
      </div>
    </div>
  );
};
