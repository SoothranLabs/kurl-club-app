'use client';

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { DateRange } from 'react-day-picker';

// Function to calculate the current week's date range starting from Sunday
const getCurrentWeekRange = (): DateRange => {
  const today = new Date();
  const dayOfWeek = today.getDay();
  const diffToSunday = dayOfWeek === 0 ? 0 : -dayOfWeek;
  const sunday = new Date(today);
  sunday.setDate(today.getDate() + diffToSunday);
  const saturday = new Date(sunday);
  saturday.setDate(sunday.getDate() + 6);
  return { from: sunday, to: saturday };
};

// Function to generate dummy data based on the selected date range
const generateDummyData = (range: DateRange) => {
  if (!range?.from || !range?.to) return [];

  const startDate = new Date(range.from);
  const endDate = new Date(range.to);
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Normalize today's time to midnight
  const diffInDays =
    Math.ceil(
      (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)
    ) + 1;

  const days = Array.from({ length: diffInDays }, (_, i) => {
    const date = new Date(startDate);
    date.setDate(startDate.getDate() + i);
    const isFuture = date > today;
    return {
      day: date.toLocaleDateString('en-US', { weekday: 'short' }),
      hours: isFuture ? 0 : parseFloat((Math.random() * 2.5).toFixed(2)), // Future dates have 0 hours
    };
  });

  return days;
};

const chartConfig = {
  hours: {
    label: 'Hours',
    color: 'hsl(69, 93%, 76%)',
  },
} satisfies ChartConfig;

export function AttendanceChats() {
  const currentWeekRange = getCurrentWeekRange();

  const chartData = generateDummyData(currentWeekRange);

  return (
    <Card className="border-none bg-secondary-blue-500 rounded-lg w-full">
      <CardHeader className="flex flex-row items-center justify-between p-5 pb-7">
        <CardTitle className="text-white text-base font-normal leading-normal">
          Attendance stats (Days v/s Count)
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0 pr-5 pb-5 k-chart">
        <ChartContainer config={chartConfig} className="w-full h-[235px]">
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid stroke="#414349" vertical={false} />
            <XAxis
              dataKey="day"
              tickLine={false}
              tickMargin={8}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
              tick={(props) => {
                const { x, y, payload } = props;
                return (
                  <text x={x} y={y} dy={10} textAnchor="middle" fill="#ffff">
                    {payload.value.slice(0, 3)}
                  </text>
                );
              }}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              ticks={[0, 500, 1000, 1500, 2000, 2500]}
              domain={[0, 2.5]}
              tick={(props) => {
                const { x, y, payload } = props;
                return (
                  <text
                    x={x}
                    y={y}
                    dx={0}
                    dy={3}
                    textAnchor="end"
                    fill="#b5b6b9"
                  >
                    {payload.value}
                  </text>
                );
              }}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar
              className="hello"
              dataKey="hours"
              fill="#EBFB8B"
              radius={[6, 6, 0, 0]}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
