import React from 'react';

import { KViewMore } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useSkippers } from '@/hooks/use-skipper';
import { skipperData } from '@/lib/dummy/data';

import { SkipperColumns } from './table/skipper-column';
import { SkipperTable } from './table/skipper-table';

function SkipperStats() {
  const { outstanding } = useSkippers(skipperData);

  return (
    <Card className="relative border-none bg-secondary-blue-500 rounded-lg w-full overflow-hidden">
      <CardHeader className="flex flex-row items-center justify-between p-5">
        <CardTitle className="text-white text-base font-normal leading-normal">
          Skipper stats
        </CardTitle>
        <Button className="bg-transparent! h-fit w-fit p-0">
          <KViewMore className="w-8! h-8!" />
        </Button>
      </CardHeader>

      <CardContent className="p-5 pt-0 k-chart">
        <SkipperTable columns={SkipperColumns} data={outstanding} />
      </CardContent>

      <div className="absolute bottom-0 left-0 w-full h-28 bg-linear-to-t from-secondary-blue-500 via-secondary-blue-500/70 to-transparent rounded-b-lg pointer-events-none z-10" />
    </Card>
  );
}

export default SkipperStats;
