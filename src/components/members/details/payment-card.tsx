'use client';

import React from 'react';

import { useQueryClient } from '@tanstack/react-query';
import { Clock, Edit, Info } from 'lucide-react';

import { ManagePaymentSheet } from '@/components/payments/manage-payment';
import { FeeStatusBadge } from '@/components/shared/badges/fee-status-badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { useSheet } from '@/hooks/use-sheet';
import {
  calculateDaysRemaining,
  formatDateTime,
  getPaymentBadgeStatus,
} from '@/lib/utils';
import { useMemberPaymentDetails } from '@/services/member';

interface PaymentCardProps {
  memberId: string | number;
}

function PaymentCard({ memberId }: PaymentCardProps) {
  const { data: paymentData, isLoading } = useMemberPaymentDetails(memberId);
  const { isOpen, openSheet, closeSheet } = useSheet();
  const queryClient = useQueryClient();

  const handleCloseSheet = () => {
    closeSheet();
    // Revalidate payment data after sheet closes
    queryClient.invalidateQueries({
      queryKey: ['memberPaymentDetails', memberId],
    });
  };

  if (isLoading) {
    return (
      <div className="rounded-lg h-full bg-secondary-blue-500 p-5 pb-7 w-full">
        <p className="text-white">Loading payment details...</p>
      </div>
    );
  }

  if (!paymentData) {
    return (
      <div className="rounded-lg h-full bg-secondary-blue-500 p-5 pb-7 w-full">
        <p className="text-white">No payment data available</p>
      </div>
    );
  }

  const status = getPaymentBadgeStatus(
    paymentData.paymentStatus,
    paymentData.pendingAmount
  );
  const daysRemaining = calculateDaysRemaining(paymentData.dueDate);
  const bufferDaysRemaining = paymentData.bufferEndDate
    ? calculateDaysRemaining(paymentData.bufferEndDate)
    : 0;
  const hasBuffer = paymentData.bufferEndDate && bufferDaysRemaining >= 0;
  const isPartialPayment = paymentData.paymentStatus === 'Partial';

  // Progress calculation based on payment cycle
  const progressValue = (() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const dueDate = new Date(paymentData.dueDate);
    dueDate.setHours(0, 0, 0, 0);
    const lastPaidDate = new Date(paymentData.lastPaidDate);
    lastPaidDate.setHours(0, 0, 0, 0);

    const cycleDays = Math.ceil(
      (dueDate.getTime() - lastPaidDate.getTime()) / (1000 * 60 * 60 * 24)
    );
    const daysPassed = Math.ceil(
      (today.getTime() - lastPaidDate.getTime()) / (1000 * 60 * 60 * 24)
    );

    if (cycleDays <= 0) return 0;
    return Math.max(0, Math.min(100, (daysPassed / cycleDays) * 100));
  })();

  // Convert to Payment type for the sheet
  const memberForSheet = {
    id: 0,
    memberId: paymentData.memberId,
    memberIdentifier: paymentData.memberIdentifier,
    memberName: paymentData.memberName,
    gymId: 0,
    package: paymentData.membershipPlanId,
    packageName: paymentData.membershipPlanName,
    planFee: paymentData.planFee,
    totalAmountPaid: paymentData.totalAmountPaid,
    amountPaid: paymentData.totalAmountPaid,
    pendingAmount: paymentData.pendingAmount,
    paymentDate: paymentData.lastPaidDate,
    dueDate: paymentData.dueDate,
    upcomingDueDate: paymentData.dueDate,
    bufferEndDate: null,
    bufferDaysRemaining: 0,
    paymentMethod: '',
    totalPayments: paymentData.totalPaymentsMade,
    cyclesElapsed: 1,
    expectedTotalFee: paymentData.totalAmountPaid + paymentData.pendingAmount,
    feeStatus: paymentData.paymentStatus as
      | 'Pending'
      | 'Completed'
      | 'Partial'
      | 'Arrears',
    profilePicture: null,
  };

  return (
    <>
      <div className="shadow-sm bg-secondary-blue-500 rounded-lg h-full flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-5 pt-5 pb-2">
          <div className="tracking-tight text-white text-base font-normal leading-normal">
            Dues & Payments
          </div>
          <Button
            onClick={openSheet}
            className="text-white hover:bg-primary-blue-400"
            variant="ghost"
            size="sm"
          >
            <Edit className="h-4 w-4" />
          </Button>
        </div>

        {/* Buffer Period Banner */}
        {isPartialPayment && hasBuffer && bufferDaysRemaining > 0 && (
          <div className="bg-secondary-yellow-500/30 text-neutral-ochre-200 inline-flex items-center gap-2 px-4 py-1 border-l-4 border-yellow-400">
            <Info size={12} />{' '}
            <p className="text-xs">
              On Buffer Period: {bufferDaysRemaining} days remaining
            </p>
          </div>
        )}

        {/* Payment Timeline with Progress Component */}
        <div className="px-5 py-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-secondary-blue-50 text-sm font-medium">
              Payment Timeline
            </span>
            <span className="text-secondary-blue-50 text-sm">
              {paymentData.membershipPlanName} Plan - ₹
              {paymentData.planFee.toLocaleString()}
            </span>
          </div>

          <div className="relative">
            <Progress value={progressValue} className="w-full h-2 mb-2" />
            <div className="flex justify-between text-xs text-secondary-blue-50">
              <span>{formatDateTime(paymentData.lastPaidDate, 'date')}</span>
              <span>{formatDateTime(paymentData.dueDate, 'date')}</span>
            </div>
          </div>
        </div>

        {/* Financial Summary */}
        <div className="px-5 pb-4">
          <div className="bg-primary-blue-400 rounded-lg p-3">
            <div className="flex items-center justify-between mb-1">
              <span className="text-white font-medium">Fee Overview</span>
              <FeeStatusBadge status={status} />
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-2">
              <div className="text-center flex-1">
                <div
                  className={`text-lg font-bold ${paymentData.pendingAmount > 0 ? 'text-red-400' : 'text-green-400'}`}
                >
                  ₹{paymentData.pendingAmount.toLocaleString()}
                </div>
                <div className="text-primary-blue-50 text-xs">Outstanding</div>
              </div>

              <Separator
                orientation="vertical"
                className="hidden sm:block h-8 bg-white/20"
              />

              <div className="text-center flex-1">
                <div className="text-lg font-bold text-blue-400">
                  ₹{paymentData.lastPaidAmount.toLocaleString()}
                </div>
                <div className="text-primary-blue-50 text-xs">Last Paid</div>
                <div className="text-white/70 text-xs">
                  {formatDateTime(paymentData.lastPaidDate, 'date')}
                </div>
              </div>

              <Separator
                orientation="vertical"
                className="hidden sm:block h-8 bg-white/20"
              />

              <div className="text-center flex-1">
                <div
                  className={`text-lg font-bold ${daysRemaining < 0 ? 'text-red-400' : daysRemaining <= 3 ? 'text-orange-400' : 'text-white'}`}
                >
                  {Math.abs(daysRemaining)}
                </div>
                <div className="text-primary-blue-50 text-xs">
                  {daysRemaining < 0 ? 'Days Overdue' : 'Days Left'}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer - Payment History */}
        <div className="px-5 py-2 border-t border-white/10 mt-auto">
          <div className="flex items-center justify-center gap-2 text-primary-blue-50 text-xs">
            <Clock className="h-3 w-3" />
            <span>{paymentData.totalPaymentsMade} payments made</span>
          </div>
        </div>
      </div>

      <ManagePaymentSheet
        open={isOpen}
        onOpenChange={handleCloseSheet}
        member={memberForSheet}
      />
    </>
  );
}

export default PaymentCard;
