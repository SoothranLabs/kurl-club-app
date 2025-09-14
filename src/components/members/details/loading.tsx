import React from 'react';

import { Skeleton } from '@/components/ui/skeleton';

export const Loading = () => {
  return (
    <div className="container p-0 flex flex-auto gap-4 md:gap-0">
      <Skeleton className="sm:max-w-[50%] md:max-w-[300px] lg:max-w-[336px] w-full sticky left-0 top-[80px] h-[calc(100vh-80px)] overflow-y-auto scrollbar-thin border-r border-secondary-blue-500 transform transition-transform duration-300 ease-in-out md:translate-x-0" />
      <div className="md:px-8 pt-0 w-full max-w-[calc(100%-95px)] md:max-w-[calc(100%-300px)] lg:max-w-[calc(100%-336px)] ">
        <div className="flex pt-4 md:pt-[26px] pb-4 z-20 drop-shadow-xl w-full items-center bg-primary-blue-500 justify-between gap-3 flex-wrap">
          <Skeleton className="h-[30px] w-[70px]" />
          <div className="flex items-center gap-2">
            <Skeleton className="h-[40px] w-[40px]" />
            <Skeleton className="h-[40px] w-[85px]" />
            <Skeleton className="h-[40px] w-[100px]" />
          </div>
        </div>
        <Skeleton className="max-w-[332px]! h-[72px] w-full md:mt-4" />
        <div className="grid grid-cols-1 [@media(max-width:900px)]:grid-cols-1 sm:grid-cols-2 md:grid-cols-1 xl:grid-cols-2 gap-4 mt-3">
          <Skeleton className="w-full h-[340px]" />
          <Skeleton className="w-full h-[340px]" />
        </div>
        <Skeleton className="w-full h-[400px] mt-4" />
      </div>
    </div>
  );
};
