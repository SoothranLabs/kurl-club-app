import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

function SkipperStats() {
  return (
    <Card className="border-none bg-secondary-blue-500 rounded-lg w-full">
      <CardHeader className="flex flex-row items-center justify-between p-5 pb-7">
        <CardTitle className="text-white text-base font-normal leading-normal">
          Skipper stats
        </CardTitle>
      </CardHeader>
      <CardContent className="px-5 pb-5 k-chart">Contents</CardContent>
    </Card>
  );
}

export default SkipperStats;
