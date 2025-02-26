'use client';

import { Clock, PenLine, TrendingUp, User2 } from 'lucide-react';

import type { WorkoutPlan } from '@/types/workoutplan';
import { getDifficultyColor } from '@/lib/utils';

import { Separator } from '@/components/ui/separator';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';

import { KInput } from '@/components/form/k-input';
import { KTextarea } from '@/components/form/k-textarea';
import { KSelect } from '@/components/form/k-select';

interface OverviewProps {
  plan: WorkoutPlan;
  isEditMode: boolean;
  onUpdatePlan: (updatedPlan: WorkoutPlan) => void;
  onDelete: () => void;
  onEdit: () => void;
  onShowMembers: () => void;
}

export function Overview({
  plan,
  isEditMode,
  onUpdatePlan,
  onEdit,
  onShowMembers,
}: OverviewProps) {
  const renderOverviewCard = (data: WorkoutPlan) => (
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
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="flex items-start gap-3">
            <User2 className="w-6 h-6 text-primary-blue-200 shrink-0" />
            <div>
              <p className="text-primary-blue-50 text-sm">Member strength</p>
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
                <span
                  className="ml-1 text-sm text-semantic-blue-500 underline cursor-pointer"
                  onClick={onShowMembers}
                >
                  + 27 others
                </span>
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
              <p className="text-primary-blue-50 text-sm">Training level</p>
              <Badge
                variant="secondary"
                className={`${getDifficultyColor(plan.difficultyLevel)} text-xs rounded-2xl px-2 py-1 capitalize`}
              >
                {plan.difficultyLevel}
              </Badge>
            </div>
          </div>

          <Separator
            orientation="vertical"
            className="h-12 hidden sm:block bg-primary-blue-400"
          />

          <div className="flex items-start gap-3">
            <Clock className="w-6 h-6 text-primary-blue-200 shrink-0" />
            <div>
              <p className="text-primary-blue-50 text-sm">Duration</p>
              <p className="text-sm text-white">{data.duration} Minutes</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return isEditMode ? (
    <div className="space-y-4">
      <KInput
        label="Name"
        placeholder=" "
        value={plan.planName}
        onChange={(e) => onUpdatePlan({ ...plan, planName: e.target.value })}
        disabled={!isEditMode}
        mandetory
      />

      <KTextarea
        label="Description"
        value={plan.description}
        onChange={(e) => onUpdatePlan({ ...plan, description: e.target.value })}
        disabled={!isEditMode}
      />

      <div className="flex flex-col md:flex-row gap-4">
        <KSelect
          label="Difficulty level"
          value={plan.difficultyLevel}
          onValueChange={(value) =>
            onUpdatePlan({
              ...plan,
              difficultyLevel: value as WorkoutPlan['difficultyLevel'],
            })
          }
          options={[
            { label: 'Beginner', value: 'beginner' },
            { label: 'Intermediate', value: 'intermediate' },
            { label: 'Advanced', value: 'advanced' },
          ]}
          className="!border-white !rounded-lg"
        />

        <KInput
          label="Duration (minutes)"
          type="number"
          placeholder={undefined}
          value={plan.duration}
          onChange={(e) =>
            onUpdatePlan({
              ...plan,
              duration: Number.parseInt(e.target.value),
            })
          }
          disabled={!isEditMode}
          mandetory
        />
      </div>

      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          id="isDefault"
          checked={plan.isDefault}
          onChange={(e) =>
            onUpdatePlan({ ...plan, isDefault: e.target.checked })
          }
          disabled={!isEditMode}
        />
        <label htmlFor="isDefault" className="text-sm text-white">
          Set as default plan
        </label>
      </div>
    </div>
  ) : (
    <>{renderOverviewCard(plan)}</>
  );
}
