import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

function OutstandingPayment() {
  return (
    <Card className="border-none bg-secondary-blue-500 rounded-lg w-full">
      <CardHeader className="flex flex-row items-center justify-between p-5 pb-7">
        <CardTitle className="text-white text-base font-normal leading-normal">
          Outstanding payments
        </CardTitle>
      </CardHeader>
      <CardContent className="px-5 pb-5 k-chart"></CardContent>
    </Card>
  );
}

export default OutstandingPayment;
