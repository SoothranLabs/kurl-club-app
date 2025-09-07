import { KFormField, KFormFieldType } from '@/components/form/k-formfield';
import { KSelect } from '@/components/form/k-select';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { EditDetailsForm } from '@/schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { Check } from 'lucide-react';
import React, { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

interface EditDetailsData {
  paidAmount: string;
  packageType: string;
}

function EditDetails() {
  const form = useForm<EditDetailsData>({
    resolver: zodResolver(EditDetailsForm),
    defaultValues: {
      paidAmount: '',
      packageType: '',
    },
  });

  const [selectedPackage, setSelectedPackage] = useState<string>('');
  const [isOpen, setOpen] = useState<boolean>(false);

  const handleSelectionChange = (
    field: keyof EditDetailsData,
    value: string
  ) => {
    form.setValue(field, value);
    setSelectedPackage(value);
  };

  const handleSubmit = (data: EditDetailsData) => {
    console.log('Form submitted with:', data);
  };

  return (
    <FormProvider {...form}>
      <form className="space-y-4" onSubmit={form.handleSubmit(handleSubmit)}>
        <DropdownMenu open={isOpen}>
          <DropdownMenuTrigger asChild>
            <Button
              onClick={() => setOpen(true)}
              className="shadow-none text-primary-green-500 p-0"
              variant="link"
            >
              Edit details
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="p-5 min-w-[305px] border-primary-blue-400 bg-secondary-blue-700 rounded-lg">
            <DropdownMenuLabel className="p-0 mb-3.5">
              <div className="flex justify-between items-center">
                <h6 className="text-white text-base font-normal leading-normal">
                  Edit details
                </h6>
                <span
                  className="cursor-pointer rounded-full p-1 hover:bg-secondary-blue-500 k-transition"
                  onClick={() => setOpen(false)}
                >
                  <Check size={18} />
                </span>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuGroup className="flex flex-col gap-4">
              <DropdownMenuItem className="p-0">
                <KFormField
                  fieldType={KFormFieldType.INPUT}
                  control={form.control}
                  name="paidAmount"
                  label="Last paid amount"
                  className="w-full"
                  suffix="Rs"
                />
              </DropdownMenuItem>
              <DropdownMenuItem className="p-0">
                <KSelect
                  label="Package"
                  value={selectedPackage}
                  onValueChange={(value) =>
                    handleSelectionChange('packageType', value)
                  }
                  options={[
                    { label: 'Monthly', value: 'monthly' },
                    { label: 'Quarterly', value: 'quarterly' },
                    { label: 'Yearly', value: 'yearly' },
                  ]}
                />
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </form>
    </FormProvider>
  );
}

export default EditDetails;
