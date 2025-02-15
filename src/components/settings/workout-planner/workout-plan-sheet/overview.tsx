'use client';

import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Clock, PenLine, TrendingUp, User2 } from 'lucide-react';

import { workoutPlanSchema } from '@/schemas';
import type { WorkoutPlan } from '@/types/workoutplan';

import { Form } from '@/components/ui/form';
import { Separator } from '@/components/ui/separator';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { KFormField, KFormFieldType } from '@/components/form/k-formfield';

type WorkoutPlanFormValues = z.infer<typeof workoutPlanSchema>;

interface OverviewProps {
  plan: WorkoutPlan;
  isEditMode: boolean;
  onPlanChange: (updatedPlan: WorkoutPlan) => void;
  onDelete: () => void;
  onEdit: () => void;
}

export function Overview({
  plan,
  isEditMode,
  onPlanChange,
  onEdit,
}: OverviewProps) {
  const form = useForm<WorkoutPlanFormValues>({
    resolver: zodResolver(workoutPlanSchema),
    defaultValues: {
      planName: plan.planName,
      description: plan.description,
      difficultyLevel: plan.difficultyLevel,
      durationInDays: plan.durationInDays,
      isDefault: plan.isDefault,
    },
  });

  const onSubmit = (data: WorkoutPlanFormValues) => {
    onPlanChange({ ...plan, ...data });
  };

  const renderOverviewCard = (data: WorkoutPlanFormValues) => (
    <Card className="w-full bg-secondary-blue-500 border-secondary-blue-600 text-white rounded-md">
      <CardHeader className="space-y-3">
        <div className="flex items-center justify-between">
          <h1 className="text-xl leading-tight font-normal">{data.planName}</h1>
          <button
            className="text-zinc-400 hover:text-primary-green-200 transition-colors"
            onClick={onEdit}
          >
            <PenLine className="w-5 h-5" />
          </button>
        </div>
        <p className="text-[15px] text-zinc-200 font-light leading-relaxed">
          {data.description}
        </p>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
          <div className="flex items-start gap-3">
            <User2 className="w-6 h-6 text-primary-blue-200 shrink-0" />
            <div>
              <p className="text-primary-blue-200 text-sm">Member strength</p>
              <div className="flex items-center">
                <div className="flex -space-x-2">
                  {[1, 2, 3].map((i) => (
                    <Avatar
                      key={i}
                      className="border-[1px] border-neutral-50 w-5 h-5"
                    >
                      <AvatarImage
                        src={`https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=3276&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D`}
                        alt={`Member ${i}`}
                      />
                      <AvatarFallback>M{i}</AvatarFallback>
                    </Avatar>
                  ))}
                </div>
                <span className="ml-1 text-sm">+ 27 others</span>
              </div>
            </div>
          </div>

          <Separator
            orientation="vertical"
            className="h-12 hidden sm:block bg-primary-blue-400"
          />

          <div className="flex items-start gap-3">
            <TrendingUp className="w-6 h-6 text-primary-blue-200 shrink-0" />
            <div>
              <p className="text-primary-blue-200 text-sm">Training level</p>
              <p className="text-sm capitalize">{data.difficultyLevel}</p>
            </div>
          </div>

          <Separator
            orientation="vertical"
            className="h-12 hidden sm:block bg-primary-blue-400"
          />

          <div className="flex items-start gap-3">
            <Clock className="w-6 h-6 text-primary-blue-200 shrink-0" />
            <div>
              <p className="text-primary-blue-200 text-sm">Duration</p>
              <p className="text-sm">{data.durationInDays} Days</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return isEditMode ? (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <KFormField
          control={form.control}
          name="planName"
          label="Plan Name"
          fieldType={KFormFieldType.INPUT}
          disabled={!isEditMode}
        />

        <KFormField
          control={form.control}
          name="description"
          label="Description"
          fieldType={KFormFieldType.TEXTAREA}
          disabled={!isEditMode}
        />

        <div className="flex gap-4">
          <KFormField
            control={form.control}
            name="difficultyLevel"
            label="Difficulty Level"
            fieldType={KFormFieldType.SELECT}
            disabled={!isEditMode}
            options={[
              { label: 'Beginner', value: 'beginner' },
              { label: 'Intermediate', value: 'intermediate' },
              { label: 'Advanced', value: 'advanced' },
            ]}
          />

          <KFormField
            control={form.control}
            name="durationInDays"
            label="Duration (days)"
            fieldType={KFormFieldType.INPUT}
            disabled={!isEditMode}
          />
        </div>

        <KFormField
          control={form.control}
          name="isDefault"
          label="Is Default Plan"
          fieldType={KFormFieldType.CHECKBOX}
          disabled={!isEditMode}
        />
      </form>
    </Form>
  ) : (
    <>{renderOverviewCard(form.getValues())}</>
  );
}
