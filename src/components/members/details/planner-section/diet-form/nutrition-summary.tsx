import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { Activity } from 'lucide-react';
import { Goal, ACTIVITY, ActivityKey } from '@/hooks/use-diet-calculator';
import { SharePlanModal } from './share-plan-modal';

interface NutritionSummaryProps {
  goal: Goal;
  activityKey: ActivityKey;
  bmr: number;
  tdee: number;
  calories: number;
  proteinG: number;
  carbsG: number;
  fatG: number;
  chartData: Array<{ name: string; value: number; color: string }>;
  prescriptionText: string;
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-muted-foreground">{label}</span>
      <span className="font-medium">{value}</span>
    </div>
  );
}

export function NutritionSummary({
  goal,
  activityKey,
  bmr,
  tdee,
  calories,
  proteinG,
  carbsG,
  fatG,
  chartData,
  prescriptionText,
}: NutritionSummaryProps) {
  const goalAdjustments = {
    'Fat loss': -0.2,
    Maintenance: 0,
    'Lean bulk': 0.1,
    Bulk: 0.2,
  } as const;

  return (
    <Card className="bg-primary-blue-400/70 border-primary-blue-400">
      <CardHeader className="px-6">
        <CardTitle className="text-base md:text-lg flex items-center gap-2">
          <Activity className="h-5 w-5 text-emerald-400" />
          Nutrition plan summary
        </CardTitle>
        <div className="mt-2 flex justify-between">
          <div className="flex flex-wrap gap-2">
            <Badge className="bg-neutral-green-500/15 text-neutral-green-200 border border-emerald-400/40">
              Trainer-ready
            </Badge>
            {goalAdjustments[goal] < 0 && (
              <Badge className="bg-amber-500/15 text-amber-400 border border-amber-400/40">
                Calorie deficit
              </Badge>
            )}
            {goalAdjustments[goal] > 0 && (
              <Badge className="bg-sky-500/15 text-sky-400 border border-sky-400/40">
                Calorie surplus
              </Badge>
            )}
          </div>
          <SharePlanModal prescriptionText={prescriptionText} />
        </div>
      </CardHeader>
      <CardContent className="space-y-4 h-full">
        <div className="grid grid-cols-2 gap-4">
          <div className="rounded-md p-3 bg-secondary-blue-600/80">
            <div className="text-xs text-muted-foreground">BMR</div>
            <div className="text-xl font-semibold">{Math.round(bmr)} kcal</div>
          </div>
          <div className="rounded-md p-3 bg-secondary-blue-600/80">
            <div className="text-xs text-muted-foreground">
              TDEE ({ACTIVITY[activityKey].label})
            </div>
            <div className="text-xl font-semibold">{tdee} kcal</div>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-md p-3 bg-secondary-blue-600/80">
            <div className="text-xs text-muted-foreground mb-2">
              Daily targets
            </div>
            <div className="space-y-2">
              <Row label="Calories" value={`${calories} kcal`} />
              <Row label="Protein" value={`${proteinG} g`} />
              <Row label="Carbs" value={`${carbsG} g`} />
              <Row label="Fat" value={`${fatG} g`} />
            </div>
          </div>
          <div className="rounded-md p-3 bg-secondary-blue-600/80">
            <div className="text-xs text-muted-foreground mb-2">
              Macro split
            </div>
            <div className="h-48 w-full">
              <ResponsiveContainer>
                <PieChart>
                  <Pie
                    data={chartData}
                    dataKey="value"
                    nameKey="name"
                    innerRadius={48}
                    outerRadius={70}
                  >
                    {chartData.map((entry, idx) => (
                      <Cell key={`cell-${idx}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-2 grid grid-cols-3 gap-2 text-xs">
              {chartData.map((d) => (
                <div key={d.name} className="flex items-center gap-2">
                  <span
                    className="inline-block size-2 rounded-sm"
                    style={{ backgroundColor: d.color }}
                  />
                  <span className="text-muted-foreground">{d.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
