import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import type { WorkoutPlan } from '@/types/workoutplan';

interface OverviewProps {
  plan: WorkoutPlan;
  isEditMode: boolean;
  onPlanChange: (updates: Partial<WorkoutPlan>) => void;
  onSave: () => void;
  onDelete: () => void;
  onCancel: () => void;
}

export function Overview({
  plan,
  isEditMode,
  onPlanChange,
  onSave,
  onCancel,
}: OverviewProps) {
  return (
    <div className="space-y-4">
      <div>
        <label className="text-sm font-medium">Name</label>
        <Input
          value={plan.planName}
          onChange={(e) => onPlanChange({ planName: e.target.value })}
          disabled={!isEditMode}
        />
      </div>
      <div>
        <label className="text-sm font-medium">Description</label>
        <Textarea
          value={plan.description}
          onChange={(e) => onPlanChange({ description: e.target.value })}
          disabled={!isEditMode}
        />
      </div>
      <div>
        <label className="text-sm font-medium">Type</label>
        <Select
          value={plan.type}
          onValueChange={(value) =>
            onPlanChange({ type: value as WorkoutPlan['type'] })
          }
          disabled={!isEditMode}
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="strength">Strength</SelectItem>
            <SelectItem value="cardio">Cardio</SelectItem>
            <SelectItem value="hybrid">Hybrid</SelectItem>
            <SelectItem value="flexibility">Flexibility</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <label className="text-sm font-medium">Difficulty Level</label>
        <Select
          value={plan.difficultyLevel}
          onValueChange={(value) =>
            onPlanChange({
              difficultyLevel: value as WorkoutPlan['difficultyLevel'],
            })
          }
          disabled={!isEditMode}
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="beginner">Beginner</SelectItem>
            <SelectItem value="intermediate">Intermediate</SelectItem>
            <SelectItem value="advanced">Advanced</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <label className="text-sm font-medium">Duration (days)</label>
        <Input
          type="number"
          value={plan.durationInDays}
          onChange={(e) =>
            onPlanChange({ durationInDays: Number.parseInt(e.target.value) })
          }
          disabled={!isEditMode}
        />
      </div>
      <div>
        <label className="text-sm font-medium">Cost</label>
        <Input
          type="number"
          value={plan.cost}
          onChange={(e) =>
            onPlanChange({ cost: Number.parseFloat(e.target.value) })
          }
          disabled={!isEditMode}
        />
      </div>
      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          id="isDefault"
          checked={plan.isDefault}
          onChange={(e) => onPlanChange({ isDefault: e.target.checked })}
          disabled={!isEditMode}
        />
        <label htmlFor="isDefault" className="text-sm font-medium">
          Is Default Plan
        </label>
      </div>
      {isEditMode && (
        <div className="flex justify-end space-x-2">
          <Button variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button onClick={onSave}>Save Changes</Button>
        </div>
      )}
    </div>
  );
}
