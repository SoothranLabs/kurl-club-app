import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useFieldArray, useForm } from 'react-hook-form';
import { TrainerFormSchema } from '@/schemas';
import { Button } from '@/components/ui/button';
import { KFormField, KFormFieldType } from '@/components/form/k-formfield';
import { Trash2 } from 'lucide-react';

type InviteTrainerStepData = z.infer<typeof TrainerFormSchema>;

type InviteTrainerStepProps = {
  onSubmit: (data: InviteTrainerStepData) => void;
};

export const InviteTrainerStep = ({ onSubmit }: InviteTrainerStepProps) => {
  const form = useForm<InviteTrainerStepData>({
    resolver: zodResolver(TrainerFormSchema),
    defaultValues: { trainers: [{ email: '' }] },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'trainers',
  });

  const handleSubmit = (data: InviteTrainerStepData) => {
    console.log('Invitation sent to:', data);
    onSubmit(data);
  };

  return (
    <div>
      <div className="mb-8">
        <h4 className="text-[28px] leading-normal font-medium  mb-4 text-White ">
          Add Trainers
        </h4>
        <p className="text-[15px] leading-normal font-normal text-white">
          Add your buddies that make your gym awesome!
        </p>
      </div>

      <FormProvider {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="flex flex-col gap-5"
        >
          <div className="space-y-5 overflow-y-auto max-h-[300px] p-1">
            {fields.map((field, index) => (
              <div key={field.id} className="flex items-center gap-3">
                <div className="w-full">
                  <KFormField
                    fieldType={KFormFieldType.INPUT}
                    control={form.control}
                    name={`trainers.${index}.email`}
                    label={`Enter Trainer Email ${index + 1}`}
                    placeholder="trainer@example.com"
                  />
                </div>
                <Button
                  type="button"
                  onClick={() => remove(index)}
                  className="h-[52px] w-[52px]"
                  variant="secondary"
                >
                  <Trash2 />
                </Button>
              </div>
            ))}
          </div>
          <div className="flex justify-between space-x-4">
            <Button
              variant="outline"
              type="button"
              onClick={() => append({ email: '' })}
              className="w-1/2 h-[46px]"
            >
              + Add More
            </Button>
            <Button type="submit" className="w-1/2 h-[46px]">
              Invite all
            </Button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
};
