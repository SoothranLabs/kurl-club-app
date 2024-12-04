import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useFieldArray, useForm } from 'react-hook-form';

import { TrainerFormSchema } from '@/schemas';

import { Button } from '@/components/ui/button';
import { KFormField, KFormFieldType } from '@/components/form/k-formfield';

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
      <div>
        <h2 className="text-xl font-semibold mb-2">Add your Trainers</h2>
        <p className="text-sm text-gray-400">
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
              <KFormField
                fieldType={KFormFieldType.INPUT}
                control={form.control}
                name={`trainers.${index}.email`}
                label={`Trainer Email ${index + 1}`}
                placeholder="trainer@example.com"
              />
              <Button
                type="button"
                onClick={() => remove(index)}
                className="h-[42px]"
                variant="destructive"
              >
                Remove
              </Button>
            </div>
          ))}
          <Button
            type="button"
            onClick={() => append({ email: '' })}
            className="w-full"
          >
            + Add Another Trainer
          </Button>
          <Button type="submit" className="w-full mt-4">
            Invite Trainers
          </Button>
        </form>
      </FormProvider>
    </div>
  );
};
