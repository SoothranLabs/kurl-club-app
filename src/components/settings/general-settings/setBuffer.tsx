import { useState } from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { CheckCheck, Plus, Trash2 } from 'lucide-react';
import { KFormField, KFormFieldType } from '@/components/form/k-formfield';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { dayBufferSchema } from '@/schemas';
import { z } from 'zod/v4';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';

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
      day_buffer_days: '12',
      fee_buffer_amount: '',
      fee_buffer_days: '',
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
      <Accordion type="single" collapsible>
        <AccordionItem className="border-0" value="day-buffer">
          <AccordionTrigger className="p-6 no-underline!">
            <div className="flex flex-col gap-3">
              <h2 className="font-medium text-white text-xl leading-normal">
                Set buffer
              </h2>
              <p className="font-normal text-white text-base leading-normal">
                Set up buffer for fee & due time
              </p>
            </div>
          </AccordionTrigger>
          <AccordionContent className="border-t border-secondary-blue-400 p-6">
            <FormProvider {...form}>
              <form
                id="buffer-form"
                className="flex flex-col gap-5 max-w-[630px]"
              >
                {/* day buffer section */}
                <div>
                  <h3 className="text-base text-white leading-normal">
                    Day buffer
                  </h3>
                  <p className="text-sm text-white leading-normal mt-3">
                    Enter the time period a person can use the gym facilities
                    after their fee is due.
                  </p>
                  <KFormField
                    fieldType={KFormFieldType.INPUT}
                    control={form.control}
                    name="day_buffer_days"
                    label="Days"
                    maxLength={5}
                    className="mt-4 bg-secondary-blue-400 hover:outline-primary-green-700! max-w-[88px]"
                  />
                </div>

                {/* Fee Buffer Section */}
                <div className="mt-3">
                  <h3 className="text-base text-white leading-normal">
                    Fee buffer
                  </h3>
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
                        className=" bg-secondary-blue-400 hover:outline-primary-green-700!"
                      />
                      <div className="max-w-[88px]">
                        <KFormField
                          fieldType={KFormFieldType.INPUT}
                          control={form.control}
                          name="fee_buffer_days"
                          label="Days"
                          maxLength={8}
                          className=" bg-secondary-blue-400 hover:outline-primary-green-700!"
                        />
                      </div>
                      <Select>
                        <SelectTrigger className="bg-secondary-blue-400 rounded-md border-transparent hover:border-primary-green-700 focus:border-primary-green-700 active:border-primary-green-700 text-white ring-0! h-13 text-sm px-3 aria-expanded:border-primary-green-700">
                          <SelectValue placeholder="Select a plan" />
                        </SelectTrigger>
                        <SelectContent className="shad-select-content">
                          {selectPlans.map((option) => (
                            <SelectItem
                              className="shad-select-item"
                              key={option.value}
                              value={option.value}
                            >
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
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
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
