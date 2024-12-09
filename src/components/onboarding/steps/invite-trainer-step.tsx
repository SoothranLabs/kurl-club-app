import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useFieldArray, useForm } from 'react-hook-form';

import { TrainerFormSchema } from '@/schemas';

import { Button } from '@/components/ui/button';
import { KFormField, KFormFieldType } from '@/components/form/k-formfield';
import { KTrash } from '@/components/icons';

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
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Add Trainers</h2>
        <p className="text-large text-gray-400">
          Add your buddies that make your gym awesome!
        </p>
      </div>

      <FormProvider {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="flex flex-col space-y-4"
        >
          {fields.map((field, index) => (
            <div key={field.id} className="flex items-center space-x-2">
              <div className="w-[25rem]">
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
                className="h-[42px]"
                variant="secondary"
              >
                <KTrash />
              </Button>
            </div>
          ))}
          <div className="flex justify-between space-x-4">
            <Button
              type="button"
              onClick={() => append({ email: '' })}
              className="w-1/2"
            >
              + Add More
            </Button>
            <Button type="submit" className="w-1/2">
              Invite Trainers
            </Button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
};
