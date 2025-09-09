'use client';

import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import { Clock, Hourglass, Wallet } from 'lucide-react';
import { z } from 'zod/v4';

import { KFormField, KFormFieldType } from '@/components/form/k-formfield';
import { KSheet } from '@/components/form/k-sheet';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { useAppDialog } from '@/hooks/use-app-dialog';
import {
  usePaymentHistory,
  usePaymentManagement,
} from '@/hooks/use-payment-management';
import { paymentMethodOptions } from '@/lib/constants';
import { formatDateTime } from '@/lib/utils';
import { useGymBranch } from '@/providers/gym-branch-provider';
import { paymentFormSchema } from '@/schemas';
import type { Payment } from '@/types/payment';

import { PaymentHistory } from './payment-history';

type PaymentFormData = z.infer<typeof paymentFormSchema>;

type ManagePaymentSheetProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  member: Payment | null;
};

export function ManagePaymentSheet({
  open,
  onOpenChange,
  member,
}: ManagePaymentSheetProps) {
  const [showHistory, setShowHistory] = useState(false);
  const pending = member?.pendingAmount || 0;
  const { gymBranch } = useGymBranch();
  const {
    recordPartialPayment,
    recordFullPayment,
    extendBuffer,
    isProcessing,
  } = usePaymentManagement();
  const { data: paymentHistory = [] } = usePaymentHistory(
    member?.memberId || 0
  );
  const { showConfirm } = useAppDialog();

  const form = useForm<PaymentFormData>({
    resolver: zodResolver(paymentFormSchema),
    defaultValues: {
      amount: '',
      method: '',
      extendDays: '',
    },
  });

  const formValues = form.watch();
  const amountNum = Number(formValues.amount) || 0;
  const extendDaysNum = Number(formValues.extendDays) || 0;

  const isPartialPaymentValid =
    amountNum >= 1 && amountNum <= pending && formValues.method;
  const isExtendValid = extendDaysNum >= 1;

  const handlePartialPayment = async () => {
    if (!member || !gymBranch?.gymId) return;

    await recordPartialPayment({
      memberId: member.memberId,
      gymId: gymBranch.gymId,
      membershipPlanId: member.package,
      amount: amountNum,
      paymentMethod: formValues.method,
      paymentType: 0,
    });

    form.reset();
    onOpenChange(false);
  };

  const handleFullPayment = () => {
    if (!member || !gymBranch?.gymId || !formValues.method) return;

    showConfirm({
      title: 'Confirm Full Payment',
      description: `Are you sure you want to mark ₹${pending} as fully paid for ${member.memberName}?`,
      confirmLabel: 'Mark Paid',
      onConfirm: async () => {
        await recordFullPayment({
          memberId: member.memberId,
          gymId: gymBranch.gymId,
          membershipPlanId: member.package,
          amount: pending,
          paymentMethod: formValues.method,
          paymentType: 1,
        });

        form.reset();
        onOpenChange(false);
      },
    });
  };

  const handleExtendBuffer = async () => {
    if (!member) return;

    await extendBuffer({
      memberId: member.memberId,
      daysToAdd: extendDaysNum,
    });

    form.reset();
    onOpenChange(false);
  };

  const footer = (
    <div className="flex items-center justify-end gap-3">
      <Button variant="outline" onClick={() => onOpenChange(false)}>
        Close
      </Button>
    </div>
  );

  return (
    <KSheet
      isOpen={open}
      onClose={() => {
        setShowHistory(false);
        onOpenChange(false);
      }}
      title={showHistory ? 'Payment History' : 'Manage Payment'}
      footer={footer}
      className="w-[450px]"
    >
      {!member ? null : showHistory ? (
        <PaymentHistory
          history={paymentHistory}
          memberName={member.memberName}
          onBack={() => setShowHistory(false)}
        />
      ) : (
        <div className="space-y-4">
          {/* Summary */}
          <div className="rounded-md border border-primary-blue-400 bg-primary-blue-500/20 px-4 py-3">
            <div className="flex items-center justify-between mb-4">
              <div>
                <div className="text-xs text-primary-green-200">
                  # {member.memberIdentifier}
                </div>
                <div className="text-base font-semibold">
                  {member.memberName}
                </div>
              </div>
              <Badge
                variant="secondary"
                className="bg-primary-blue-400 text-blue-300 text-xs"
              >
                {member.packageName}
              </Badge>
            </div>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <div className="flex items-center gap-2">
                <Wallet className="w-5 h-5 text-primary-blue-200" />
                <div>
                  <div className="text-primary-blue-50 text-xs">Fee</div>
                  <div>₹{member.amountPaid + member.pendingAmount}</div>
                </div>
              </div>
              <Separator
                orientation="vertical"
                className="h-12 hidden sm:block bg-primary-blue-400"
              />

              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-primary-blue-200" />
                <div>
                  <div className="text-primary-blue-50 text-xs">Due</div>
                  <div>{formatDateTime(member.paymentDate, 'date')}</div>
                </div>
              </div>

              <Separator
                orientation="vertical"
                className="h-12 hidden sm:block bg-primary-blue-400"
              />

              <div className="flex items-center gap-2">
                <Hourglass className="w-5 h-5 text-primary-blue-200" />
                <div>
                  <div className="text-primary-blue-50 text-xs">Pending</div>
                  <div>₹{pending}</div>
                </div>
              </div>
            </div>
          </div>

          <PaymentHistory
            history={paymentHistory}
            showRecent
            onViewAll={() => setShowHistory(true)}
          />

          {/* Partial payment */}
          <FormProvider {...form}>
            <div className="rounded-md border border-primary-blue-400 bg-primary-blue-500/20 px-4 py-3">
              <div className="mb-3 text-sm font-medium text-white">
                Record partial payment
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <KFormField
                    fieldType={KFormFieldType.INPUT}
                    control={form.control}
                    name="amount"
                    label="Amount (INR)"
                    type="number"
                  />
                  <div className="mt-1 text-xs text-secondary-blue-200">
                    Max ₹{pending}
                  </div>
                </div>
                <KFormField
                  fieldType={KFormFieldType.SELECT}
                  control={form.control}
                  name="method"
                  label="Method"
                  options={paymentMethodOptions}
                />
              </div>
              <div className="mt-3">
                <Button
                  size="sm"
                  disabled={!isPartialPaymentValid || isProcessing}
                  onClick={handlePartialPayment}
                >
                  {isProcessing ? 'Processing...' : 'Add Payment'}
                </Button>
              </div>
            </div>
          </FormProvider>

          {/* Full settlement */}
          <FormProvider {...form}>
            <div className="rounded-md border border-primary-blue-400 bg-primary-blue-500/20 px-4 py-3">
              <div className="mb-3 text-sm font-medium text-white">
                Settle full payment
              </div>
              <div className="flex items-end gap-3">
                <div className="flex-1">
                  <KFormField
                    fieldType={KFormFieldType.SELECT}
                    control={form.control}
                    name="method"
                    label="Method"
                    options={paymentMethodOptions}
                  />
                </div>
                <Button
                  size="sm"
                  disabled={pending <= 0 || !formValues.method || isProcessing}
                  onClick={handleFullPayment}
                >
                  {isProcessing ? 'Processing...' : `Pay ₹${pending}`}
                </Button>
              </div>
            </div>
          </FormProvider>

          {/* Buffer controls */}
          <FormProvider {...form}>
            <div className="rounded-md border border-primary-blue-400 bg-primary-blue-500/20 px-4 py-3">
              <div className="mb-3 text-sm font-medium text-white">
                Buffer controls
              </div>
              <div className="flex items-end gap-3">
                <div className="flex-1">
                  <KFormField
                    fieldType={KFormFieldType.INPUT}
                    control={form.control}
                    name="extendDays"
                    label="Days"
                    type="number"
                  />
                </div>
                <Button
                  size="sm"
                  disabled={!isExtendValid || isProcessing}
                  onClick={handleExtendBuffer}
                >
                  {isProcessing ? 'Processing...' : 'Extend'}
                </Button>
              </div>
              <div className="mt-2 text-xs text-primary-blue-200">
                For genuine cases only
              </div>
            </div>
          </FormProvider>
        </div>
      )}
    </KSheet>
  );
}
