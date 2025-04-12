import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const data = [
  { name: 'Unpaid', value: 120000 },
  { name: 'Paid', value: 25500 },
];

const COLORS = ['#B3D108', '#EFF69D'];

function Payments() {
  return (
    <Card className="border-none bg-secondary-blue-500 rounded-lg w-full">
      <CardHeader className="flex flex-row items-center justify-between p-5 pb-7">
        <CardTitle className="text-white text-base font-normal leading-normal">
          Payments
        </CardTitle>
      </CardHeader>

      <CardContent className="relative flex justify-center items-center px-5 pb-5 k-chart">
        <div className="w-[200px] h-[200px] relative">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                dataKey="value"
                stroke="none"
              >
                {data.map((_, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>

          {/* Center Label */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white text-center">
            <div className="text-xl font-bold">₹120K</div>
            <div className="text-sm opacity-70">Unpaid</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default Payments;
