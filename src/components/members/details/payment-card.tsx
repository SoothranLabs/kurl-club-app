import { FeeStatusBadge } from '@/components/badges/fee-status-badge';
import React from 'react';
import EditDetails from './edit-details';
import { Progress } from '@/components/ui/progress';

interface PaymentCardProps {
  info: {
    status: 'paid' | 'partially_paid' | 'unpaid';
    delay: number;
    outstanding: number;
    paid_amount: number;
    package: string;
    due_data: string;
  };
}

function PaymentCard({ info }: PaymentCardProps) {
  const isPaid = info.status === 'paid';
  const statusColor = isPaid ? 'text-white' : 'text-alert-red-400';
  const amountColor = isPaid ? 'text-neutral-green-400' : 'text-white';

  return (
    <div className="rounded-lg h-full bg-secondary-blue-500 p-5 pb-7 w-full">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <h6 className="text-white font-normal text-base">Payments</h6>
          <div className="flex items-center gap-2">
            <FeeStatusBadge
              status={info.status as 'paid' | 'partially_paid' | 'unpaid'}
            />
            {info.status !== 'paid' && info.delay > 0 && (
              <FeeStatusBadge days={info.delay} />
            )}
          </div>
        </div>
        <EditDetails />
      </div>
      <Progress value={70} className="w-full mt-6" gradient />
      <div className="p-2 mt-8 grid grid-cols-2 gap-4 bg-primary-blue-400 rounded-[4px]">
        {[
          {
            label: 'Current outstanding',
            value: info.outstanding,
            color: statusColor,
          },
          {
            label: 'Last paid amount',
            value: info.paid_amount,
            color: amountColor,
          },
        ].map((item, index) => (
          <div key={index} className="flex flex-col gap-3">
            <h6 className="text-primary-blue-100 font-normal leading-normal text-base">
              {item.label}
            </h6>
            <h5 className={`text-2xl ${item.color} leading-normal font-medium`}>
              ₹{item.value}
            </h5>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-2 gap-4 mt-8">
        {[
          { label: 'Package', value: info.package },
          { label: 'Due date', value: info.due_data, color: statusColor },
        ].map((item, index) => (
          <div key={index} className=" flex flex-col gap-3">
            <h6 className="text-primary-blue-100 font-normal leading-normal text-base">
              {item.label}
            </h6>
            <h5
              className={`text-xl ${item.color || 'text-white'} leading-normal font-medium`}
            >
              {item.value}
            </h5>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PaymentCard;
