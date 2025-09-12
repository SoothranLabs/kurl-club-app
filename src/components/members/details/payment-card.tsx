'use client';

import React from 'react';

import { useQueryClient } from '@tanstack/react-query';
import { Edit } from 'lucide-react';

import { FeeStatusBadge } from '@/components/badges/fee-status-badge';
import { ManagePaymentSheet } from '@/components/payments/manage-payment';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { useSheet } from '@/hooks/use-sheet';
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

  const getStatus = () => {
    if (paymentData.paymentStatus === 'Completed') return 'paid';
    if (paymentData.paymentStatus === 'Partial') return 'partially_paid';
    return 'unpaid';
  };

  const status = getStatus();
  const isPaid = status === 'paid';
  const statusColor = isPaid ? 'text-white' : 'text-alert-red-400';
  const amountColor = isPaid ? 'text-neutral-green-400' : 'text-white';

  // Progress calculation
  const progressValue = (() => {
    const today = new Date();
    const dueDate = new Date(paymentData.dueDate);
    const joinDate = new Date(paymentData.memberDOJ);

    const totalDays = Math.ceil(
      (dueDate.getTime() - joinDate.getTime()) / (1000 * 60 * 60 * 24)
    );
    const daysRemaining = Math.ceil(
      (dueDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
    );

    // Prevent division by zero
    if (totalDays <= 0) return 0;

    return Math.max(0, Math.min(100, (daysRemaining / totalDays) * 100));
  })();

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  };

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
      <div className="rounded-lg h-full bg-secondary-blue-500 p-5 pb-7 w-full">
        <div className="flex items-center justify-between gap-x-4 gap-y-1 flex-wrap">
          <div className="flex items-center gap-4">
            <h6 className="text-white font-normal text-base">Payments</h6>
            <div className="flex items-center gap-2">
              <FeeStatusBadge status={status} />
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={openSheet}
            className="text-white hover:bg-primary-blue-400"
          >
            <Edit className="h-4 w-4" />
          </Button>
        </div>

        {/* Progress bar */}
        <Progress value={progressValue} className="w-full mt-6" />

        {/* Amounts */}
        <div className="p-2 mt-8 grid grid-cols-2 gap-4 bg-primary-blue-400 rounded-[4px]">
          {[
            {
              label: 'Current outstanding',
              value: paymentData.pendingAmount,
              color: statusColor,
            },
            {
              label: 'Last paid amount',
              value: paymentData.lastPaidAmount,
              color: amountColor,
            },
          ].map((item, index) => (
            <div key={index} className="flex flex-col gap-3">
              <h6 className="text-primary-blue-100 font-normal leading-normal text-base">
                {item.label}
              </h6>
              <h5
                className={`text-2xl ${item.color} leading-normal font-medium`}
              >
                ₹{item.value}
              </h5>
            </div>
          ))}
        </div>

        {/* Package + Due Date */}
        <div className="grid grid-cols-2 gap-4 mt-8">
          {[
            { label: 'Package', value: paymentData.membershipPlanName },
            {
              label: 'Due date',
              value: formatDate(paymentData.dueDate),
              color: statusColor,
            },
          ].map((item, index) => (
            <div key={index} className="flex flex-col gap-3">
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

      <ManagePaymentSheet
        open={isOpen}
        onOpenChange={handleCloseSheet}
        member={memberForSheet}
      />
    </>
  );
}

export default PaymentCard;
