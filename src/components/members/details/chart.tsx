'use client';

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { KDatePicker } from '@/components/form/k-datepicker';
import { useState } from 'react';
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

export function Chart() {
  const currentWeekRange = getCurrentWeekRange();

  const [selectedDateRange, setSelectedDateRange] =
    useState<DateRange>(currentWeekRange);
  const [chartData, setChartData] = useState(
    generateDummyData(currentWeekRange)
  );

  const handleDateChange = (range: DateRange | Date | undefined) => {
    if (range && 'from' in range && 'to' in range) {
      setSelectedDateRange(range);
      const newChartData = generateDummyData(range);
      setChartData(newChartData);
      // console.log(`Updated Chart Data:`, newChartData);
      // console.log(`Updated Date Range: ${JSON.stringify(range)}`);
    } else {
      console.error('Invalid date range selected');
    }
  };

  return (
    <div className="h-[343px] w-[512px]">
      <Card className="border-none bg-secondary-blue-500">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Attendance stats (Days v/s Hours)</CardTitle>
          <KDatePicker
            numberOfMonths={2}
            label="Pick Date"
            showPresets
            onDateChange={handleDateChange}
            value={selectedDateRange}
            mode="range"
          />
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig}>
            <BarChart accessibilityLayer data={chartData}>
              <CartesianGrid stroke="hsl(225, 6%, 27%)" vertical={false} />
              <XAxis
                dataKey="day"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                tickFormatter={(value) => value.slice(0, 3)}
                tick={{
                  fill: 'hsl(225, 3%, 72%)',
                }}
              />
              <YAxis
                tickLine={false}
                axisLine={false}
                tickMargin={10}
                ticks={[0, 0.5, 1, 1.5, 2, 2.5]}
                domain={[0, 2.5]}
                tickFormatter={(value) =>
                  `${value}${value === 2.5 ? '+' : 'h'}`
                }
                tick={{
                  fill: 'hsl(225, 3%, 72%)',
                }}
              />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Bar dataKey="hours" fill="hsl(69, 93%, 76%)" radius={8} />
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
}
