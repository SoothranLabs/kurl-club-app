'use client';

import { ArrowLeft, History } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { formatDateTime } from '@/lib/utils';

type PaymentHistoryItem = {
  id: number;
  amount: number;
  paymentMethod: string;
  paymentDate: string;
};

type PaymentHistoryProps = {
  history: PaymentHistoryItem[];
  memberName?: string;
  onBack?: () => void;
  onViewAll?: () => void;
  showRecent?: boolean;
};

export function PaymentHistory({
  history,
  memberName,
  onBack,
  onViewAll,
  showRecent = false,
}: PaymentHistoryProps) {
  const displayHistory = showRecent ? history.slice(0, 2) : history;

  if (showRecent && history.length === 0) return null;

  if (showRecent) {
    return (
      <div className="rounded-md border border-primary-blue-400 bg-secondary-blue-500 px-4 py-3">
        <div className="flex items-center justify-between mb-3">
          <div className="text-sm font-medium text-white">
            Recent Transactions
          </div>
          <Button
            variant="link"
            size="sm"
            onClick={onViewAll}
            className="text-xs text-primary-green-200 hover:text-primary-green-100 p-1 h-auto"
          >
            <History className="w-3 h-3" />
            View All
          </Button>
        </div>
        <div className="space-y-2">
          {displayHistory.map((payment) => (
            <div
              key={payment.id}
              className="flex justify-between items-center text-xs"
            >
              <div className="text-white">
                ₹{payment.amount} - {payment.paymentMethod}
              </div>
              <div className="text-primary-blue-200">
                {formatDateTime(payment.paymentDate, 'date')}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="sm" onClick={onBack} className="p-1">
          <ArrowLeft className="w-4 h-4" />
        </Button>
        <div>
          <h3 className="text-base font-semibold text-white">
            Payment History
          </h3>
          <p className="text-xs text-primary-blue-200">{memberName}</p>
        </div>
      </div>

      <div className="space-y-2">
        {history.length === 0 ? (
          <div className="text-center py-8 text-primary-blue-300">
            No payment history found
          </div>
        ) : (
          history.map((payment) => (
            <div
              key={payment.id}
              className="flex justify-between items-center p-3 rounded-md border border-primary-blue-400 bg-primary-blue-500/10"
            >
              <div>
                <div className="text-white font-medium">₹{payment.amount}</div>
                <div className="text-xs text-primary-blue-200">
                  {payment.paymentMethod}
                </div>
              </div>
              <div className="text-xs text-primary-blue-300">
                {formatDateTime(payment.paymentDate, 'date')}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
