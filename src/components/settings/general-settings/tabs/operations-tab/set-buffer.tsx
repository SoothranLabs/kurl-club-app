import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { CheckCheck, Plus, Trash2 } from 'lucide-react';
import { KFormField, KFormFieldType } from '@/components/form/k-formfield';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { dayBufferSchema } from '@/schemas';
import { z } from 'zod/v4';

type CreateMemberDetailsData = z.infer<typeof dayBufferSchema>;

export default function SetBuffer() {
  const [buffers, setBuffers] = useState([
    { id: 1, amount: '', days: '', plan: 'All plans' },
  ]);

  const addBuffer = () => {
    setBuffers([
      ...buffers,
      { id: Date.now(), amount: '', days: '', plan: 'All plans' },
    ]);
  };

  const removeBuffer = (id: number) => {
    setBuffers(buffers.filter((buffer) => buffer.id !== id));
  };

  // form
  const form = useForm<CreateMemberDetailsData>({
    resolver: zodResolver(dayBufferSchema),
    defaultValues: {
      fee_buffer_amount: '',
      fee_buffer_days: '',
      plan: 'all plans',
    },
  });

  const selectPlans = [
    {
      label: 'All plans',
      value: 'all plans',
    },
    {
      label: 'Weight loss',
      value: 'weight loss',
    },
    {
      label: 'Weight gain',
      value: 'weight gain',
    },
  ];

  return (
    <div className="w-full bg-secondary-blue-500 rounded-lg border border-secondary-blue-400">
      <div className="p-6">
        <div className="flex flex-col gap-3 mb-6">
          <h2 className="font-medium text-white text-xl leading-normal">
            Set buffer
          </h2>
          <p className="font-normal text-white text-base leading-normal">
            Set up buffer for fee & due time
          </p>
        </div>
        <div className="border-t border-secondary-blue-400 pt-4">
          <FormProvider {...form}>
            <form
              id="buffer-form"
              className="flex flex-col gap-5 max-w-[630px]"
            >
              {/* Fee Buffer Section */}
              <div>
                <p className="text-sm text-white leading-normal mt-3">
                  Enter the minimum payable amount to qualify for “Partial
                  payment”.
                </p>
                {buffers.map((buffer) => (
                  <div key={buffer.id} className="flex gap-3 mt-4">
                    <KFormField
                      fieldType={KFormFieldType.INPUT}
                      control={form.control}
                      name="fee_buffer_amount"
                      label="Amount"
                      maxLength={8}
                      className=" bg-secondary-blue-400/60"
                    />
                    <div className="max-w-[88px]">
                      <KFormField
                        fieldType={KFormFieldType.INPUT}
                        control={form.control}
                        name="fee_buffer_days"
                        label="Days"
                        maxLength={8}
                        className=" bg-secondary-blue-400/60"
                      />
                    </div>
                    <KFormField
                      fieldType={KFormFieldType.SELECT}
                      control={form.control}
                      name="plan"
                      label="Plan"
                      options={selectPlans}
                      className="bg-secondary-blue-400/60"
                    />
                    <Button
                      type="button"
                      onClick={() => removeBuffer(buffer.id)}
                      className="h-[52px] w-[52px] border border-secondary-blue-400 hover:border-primary-green-500"
                      variant="secondary"
                    >
                      <Trash2 />
                    </Button>
                    <Button type="button" className="h-[52px] w-[52px]">
                      <CheckCheck className="h-5! w-5!" />
                    </Button>
                  </div>
                ))}
              </div>

              <Button
                className="w-fit border border-secondary-blue-400 py-2.5 px-3 hover:border-primary-green-500"
                variant="ghost"
                onClick={addBuffer}
              >
                <Plus className="text-primary-green-500" /> Add
              </Button>
            </form>
          </FormProvider>
        </div>
      </div>
    </div>
  );
}
