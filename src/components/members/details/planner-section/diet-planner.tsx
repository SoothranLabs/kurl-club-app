'use client';

import { useMemo, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

import {
  useDietCalculator,
  type Goal,
  type Vitals,
  type ActivityKey,
  type BloodPanels,
  type DiabeticPanel,
} from '@/hooks/use-diet-calculator';
import { generatePlanText } from '@/utils/diet-plan-generator';

import { GoalActivitySection } from './diet-form/goal-activity-section';
import { BasicInfoSection } from './diet-form/basic-info-section';
import { BloodWorkSection } from './diet-form/blood-work-section';
import { NutritionSummary } from './diet-form/nutrition-summary';
import { MaintainWeightIcon } from '@/components/icons';

type ThyroidPanel = { tsh?: number; ft4?: number; meds?: string };
type LipidPanel = { ldl?: number; hdl?: number; tg?: number };
type BPPanel = { systolic?: number; diastolic?: number };
type RenalPanel = { egfr?: number; creatinine?: number };

interface DietPlannerProps {
  vitals: Vitals;
  defaultGoal?: Goal;
  onSave?: (payload: {
    goal: Goal;
    activity: ActivityKey;
    bodyFatPct?: number;
    bloodFlags: BloodPanels;
    panels: {
      diabetic?: DiabeticPanel;
      thyroid?: ThyroidPanel;
      lipid?: LipidPanel;
      bp?: BPPanel;
      renal?: RenalPanel;
    };
    notes?: string;
    prescription: {
      calories: number;
      proteinG: number;
      carbsG: number;
      fatG: number;
    };
  }) => void;
}

export default function DietPlanner({
  vitals,
  defaultGoal = 'Fat loss',
  onSave,
}: DietPlannerProps) {
  const [goal, setGoal] = useState<Goal>(defaultGoal);
  const [activityKey, setActivityKey] = useState<ActivityKey>('moderate');
  const [bodyFatPct, setBodyFatPct] = useState<number | undefined>(undefined);
  const [dietaryPreference, setDietaryPreference] = useState<
    'No Restriction' | 'Vegetarian' | 'Vegan' | 'Keto' | 'Paleo'
  >('No Restriction');
  const [notes, setNotes] = useState<string>('');

  const [bloodFlags, setBloodFlags] = useState<BloodPanels>({});
  const [diabetic, setDiabetic] = useState<DiabeticPanel>({});
  const [thyroid, setThyroid] = useState<ThyroidPanel>({});
  const [lipid, setLipid] = useState<LipidPanel>({});
  const [bp, setBp] = useState<BPPanel>({});
  const [renal, setRenal] = useState<RenalPanel>({});

  const {
    bmr,
    tdee,
    calories,
    proteinG,
    fatG,
    carbsG,
    diabeticTightCarb,
    hydration,
    chartData,
    prescription,
  } = useDietCalculator({
    vitals,
    goal,
    activityKey,
    bloodFlags,
    diabetic,
  });

  const prescriptionText = useMemo(() => {
    return generatePlanText({
      vitals,
      goal,
      activityKey,
      bodyFatPct,
      bloodFlags,
      panels: { diabetic, thyroid, lipid, bp, renal },
      notes,
      prescription,
      diabeticTightCarb,
      hydration,
    });
  }, [
    vitals,
    goal,
    activityKey,
    bodyFatPct,
    bloodFlags,
    diabetic,
    thyroid,
    lipid,
    bp,
    renal,
    notes,
    prescription,
    diabeticTightCarb,
    hydration,
  ]);

  const handleSave = () => {
    onSave?.({
      goal,
      activity: activityKey,
      bodyFatPct,
      bloodFlags,
      panels: { diabetic, thyroid, lipid, bp, renal },
      notes,
      prescription,
    });
  };

  return (
    <div className="grid gap-4 md:grid-cols-2 items-stretch p-6">
      <Card className="bg-primary-blue-400/70 border-primary-blue-400">
        <CardHeader className="px-6">
          <CardTitle className="text-base md:text-lg flex items-center gap-2">
            <MaintainWeightIcon className="h-5 w-5 text-emerald-400" />
            Diet plan setup
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <GoalActivitySection
            goal={goal}
            activityKey={activityKey}
            onGoalChange={setGoal}
            onActivityChange={setActivityKey}
          />

          <BasicInfoSection
            bodyFatPct={bodyFatPct}
            dietaryPreference={dietaryPreference}
            notes={notes}
            onBodyFatChange={setBodyFatPct}
            onDietaryPreferenceChange={setDietaryPreference}
            onNotesChange={setNotes}
          />

          <BloodWorkSection
            bloodFlags={bloodFlags}
            diabetic={diabetic}
            thyroid={thyroid}
            lipid={lipid}
            bp={bp}
            renal={renal}
            onBloodFlagsChange={setBloodFlags}
            onDiabeticChange={setDiabetic}
            onThyroidChange={setThyroid}
            onLipidChange={setLipid}
            onBpChange={setBp}
            onRenalChange={setRenal}
          />

          <div className="flex justify-end">
            <Button type="button" onClick={handleSave}>
              Save plan
            </Button>
          </div>
        </CardContent>
      </Card>

      <NutritionSummary
        goal={goal}
        activityKey={activityKey}
        bmr={bmr}
        tdee={tdee}
        calories={calories}
        proteinG={proteinG}
        carbsG={carbsG}
        fatG={fatG}
        chartData={chartData}
        prescriptionText={prescriptionText}
      />
    </div>
  );
}
