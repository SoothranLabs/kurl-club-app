'use client';

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
      onClose={() => onOpenChange(false)}
      title="Manage Payment"
      footer={footer}
      className="w-[585px]"
    >
      {!member ? null : (
        <div className="space-y-6">
          {/* Summary */}
          <div className="rounded-md border border-primary-blue-400 bg-primary-blue-500/20 px-5 py-4">
            <div className="flex items-center justify-between mb-6">
              <div>
                <div className="text-sm text-muted-foreground uppercase text-primary-green-200">
                  # {member.memberIdentifier}
                </div>
                <div className="text-lg font-semibold">{member.memberName}</div>
              </div>
              <Badge
                variant="secondary"
                className="bg-primary-blue-400 text-blue-300"
              >
                {member.packageName}
              </Badge>
            </div>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <div className="flex items-start gap-3">
                <Wallet className="w-6 h-6 text-primary-blue-200 shrink-0" />
                <div>
                  <h4 className="text-primary-blue-50 text-sm">Fee</h4>
                  <span>&#8377;{member.amountPaid + member.pendingAmount}</span>
                </div>
              </div>

              <Separator
                orientation="vertical"
                className="h-12 hidden sm:block bg-primary-blue-400"
              />

              <div className="flex items-start gap-3">
                <Clock className="w-6 h-6 text-primary-blue-200 shrink-0" />
                <div>
                  <h4 className="text-primary-blue-50 text-sm">Due date</h4>
                  <span>{formatDateTime(member.paymentDate, 'date')}</span>
                </div>
              </div>

              <Separator
                orientation="vertical"
                className="h-12 hidden sm:block bg-primary-blue-400"
              />

              <div className="flex items-start gap-3">
                <Hourglass className="w-6 h-6 text-primary-blue-200 shrink-0" />
                <div>
                  <h4 className="text-primary-blue-50 text-sm">Pending</h4>
                  <span className="text-sm text-white">&#8377;{pending}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Partial payment */}
          <FormProvider {...form}>
            <div className="rounded-md border border-primary-blue-400 bg-primary-blue-500/20 px-5 py-4">
              <div className="mb-4 text-sm font-medium text-white">
                Record partial payment
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <KFormField
                    fieldType={KFormFieldType.INPUT}
                    control={form.control}
                    name="amount"
                    label="Amount - (In INR)"
                    type="number"
                  />
                  <div className="mt-1 text-[10px] text-secondary-blue-200">
                    Max ₹{pending}
                  </div>
                </div>
                <KFormField
                  fieldType={KFormFieldType.SELECT}
                  control={form.control}
                  name="method"
                  label="Payment method"
                  options={paymentMethodOptions}
                  placeholder="Select method"
                />
              </div>
              <div className="mt-4">
                <Button
                  disabled={!isPartialPaymentValid || isProcessing}
                  onClick={handlePartialPayment}
                >
                  {isProcessing ? 'Processing...' : 'Add partial payment'}
                </Button>
              </div>
            </div>
          </FormProvider>

          {/* Full settlement */}
          <FormProvider {...form}>
            <div className="rounded-md border border-primary-blue-400 bg-primary-blue-500/20 px-5 py-4">
              <div className="mb-4 text-sm font-medium text-white">
                Settle full payment
              </div>
              <div className="flex items-center gap-4">
                <Button
                  disabled={pending <= 0 || !formValues.method || isProcessing}
                  onClick={handleFullPayment}
                >
                  {isProcessing ? 'Processing...' : `Mark paid (₹${pending})`}
                </Button>
                <div className="min-w-[150px]">
                  <KFormField
                    fieldType={KFormFieldType.SELECT}
                    control={form.control}
                    name="method"
                    label="Method"
                    options={paymentMethodOptions}
                    placeholder="Select method"
                  />
                </div>
              </div>
            </div>
          </FormProvider>

          {/* Buffer controls */}
          <FormProvider {...form}>
            <div className="rounded-md border border-primary-blue-400 bg-primary-blue-500/20 px-5 py-4">
              <div className="mb-4 text-sm font-medium text-white">
                Buffer controls
              </div>
              <div className="grid grid-cols-3 gap-4">
                <KFormField
                  fieldType={KFormFieldType.INPUT}
                  control={form.control}
                  name="extendDays"
                  label="Extend by (days)"
                  type="number"
                />
                <div className="col-span-2 flex items-end">
                  <Button
                    disabled={!isExtendValid || isProcessing}
                    onClick={handleExtendBuffer}
                  >
                    {isProcessing ? 'Processing...' : 'Extend buffer'}
                  </Button>
                </div>
              </div>
              <div className="mt-2 text-xs text-primary-blue-200">
                Tip: Use this for genuine cases to temporarily extend grace.
              </div>
            </div>
          </FormProvider>

          {/* Payment history */}
          <div className="rounded-md border border-primary-blue-400 bg-primary-blue-500/20 px-5 py-4">
            <div className="mb-2 text-sm font-medium text-white">
              Payment history
            </div>
            <div className="space-y-2">
              {paymentHistory.length === 0 ? (
                <div className="text-sm text-primary-blue-300">
                  No payments recorded.
                </div>
              ) : (
                paymentHistory.map((payment) => (
                  <div
                    key={payment.id}
                    className="flex justify-between items-center text-sm"
                  >
                    <div className="text-white">
                      ₹{payment.amount} - {payment.paymentMethod}
                    </div>
                    <div className="text-primary-blue-300">
                      {formatDateTime(payment.paymentDate, 'date')}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}
    </KSheet>
  );
}
