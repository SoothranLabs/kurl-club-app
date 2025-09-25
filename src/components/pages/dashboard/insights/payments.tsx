import React from 'react';

import { Cell, Pie, PieChart, ResponsiveContainer } from 'recharts';

import { Card, CardContent, CardTitle } from '@/components/ui/card';

const chartData = [
  { name: 'Unpaid', value: 120000 },
  { name: 'Paid', value: 25500 },
];

const COLORS = ['#F7FF93', '#96AF01'];

const paymentSummary = [
  {
    label: 'Total unpaid members',
    value: 100,
    color: '#F7FF93',
  },
  {
    label: 'Total outstanding',
    value: '₹1,20,000',
    color: '#F7FF93',
  },
  {
    label: 'Total paid members',
    value: 10,
    color: '#96AF01',
  },
  {
    label: 'Total paid',
    value: '₹25,500',
    color: '#96AF01',
  },
];

function Payments() {
  return (
    <Card className="border-none bg-secondary-blue-500 rounded-lg w-full">
      <CardContent className="flex h-full flex-row gap-3 p-5 justify-between flex-wrap">
        <div className="flex flex-col gap-2 w-full md:w-fit">
          <CardTitle className="text-white text-base font-normal leading-normal">
            Payments
          </CardTitle>
          {/* Pie Chart */}
          <div className="w-[240px] h-[240px] relative mx-auto">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  innerRadius={85}
                  outerRadius={120}
                  dataKey="value"
                  stroke="none"
                >
                  {chartData.map((_, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>

            {/* Center Label */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white text-center leading-normal">
              <div className="text-[32px] font-medium">₹120K</div>
              <div className="text-[15px]">Unpaid</div>
            </div>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="flex flex-col py-3 justify-center gap-[6px] text-white w-full md:max-w-[50%] max-w-full">
          <div className="bg-primary-blue-400 rounded-xl h-full p-5 flex flex-col gap-[10px]">
            {paymentSummary.slice(0, 2).map((item, idx) => (
              <div className="flex items-start gap-[6px]" key={idx}>
                <span
                  className="w-[14px] h-[14px] rounded-full"
                  style={{ backgroundColor: item.color }}
                ></span>
                <div className="flex flex-col gap-2">
                  <span className="text-sm leading-normal">{item.label}</span>
                  <span className="font-medium text-base leading-normal ">
                    {item.value}
                  </span>
                </div>
              </div>
            ))}
          </div>
          <div className="bg-primary-blue-400 rounded-xl h-full p-5 flex flex-col gap-[10px]">
            {paymentSummary.slice(2).map((item, idx) => (
              <div className="flex items-start gap-[6px]" key={idx}>
                <span
                  className="w-[14px] h-[14px] rounded-full"
                  style={{ backgroundColor: item.color }}
                ></span>
                <div className="flex flex-col gap-2">
                  <span className="text-sm leading-normal">{item.label}</span>
                  <span className="font-medium text-base leading-normal ">
                    {item.value}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default Payments;
