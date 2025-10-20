import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { appreciationSchema } from '../../lib/validations';
import { usePropertyStore } from '../../store/usePropertyStore';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Button } from '../ui/button';
import { Calendar, Percent } from 'lucide-react';
import type { AppreciationInputs } from '../../types/property';

export const AppreciationForm: React.FC = () => {
  const { analysis, updateAppreciation, goToNextStep } = usePropertyStore();
  const { register, handleSubmit, formState: { errors } } = useForm<AppreciationInputs>({
    resolver: zodResolver(appreciationSchema),
    defaultValues: analysis.appreciation || {
      annualAppreciationRate: 3,
      annualRentGrowthRate: 3,
      annualExpenseIncreaseRate: 2,
      holdingPeriodYears: 5,
    }
  });

  const onSubmit = (data: AppreciationInputs) => {
    updateAppreciation(data);
    goToNextStep();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <Card className="card-shadow">
        <CardHeader>
          <CardTitle>Appreciation Inputs</CardTitle>
          <CardDescription>Set long-term growth assumptions</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Annual Appreciation</Label>
              <div className="relative">
                <Input type="number" step="0.1" {...register('annualAppreciationRate', { valueAsNumber: true })} className={errors.annualAppreciationRate ? 'pr-10 border-destructive' : 'pr-10'} />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">%</span>
              </div>
            </div>
            <div className="space-y-2">
              <Label>Annual Rent Growth</Label>
              <div className="relative">
                <Input type="number" step="0.1" {...register('annualRentGrowthRate', { valueAsNumber: true })} className={errors.annualRentGrowthRate ? 'pr-10 border-destructive' : 'pr-10'} />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">%</span>
              </div>
            </div>
            <div className="space-y-2">
              <Label>Annual Expense Increase</Label>
              <div className="relative">
                <Input type="number" step="0.1" {...register('annualExpenseIncreaseRate', { valueAsNumber: true })} className={errors.annualExpenseIncreaseRate ? 'pr-10 border-destructive' : 'pr-10'} />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">%</span>
              </div>
            </div>
            <div className="space-y-2">
              <Label className="flex items-center gap-2"><Calendar className="w-4 h-4"/> Holding Period</Label>
              <div className="relative">
                <Input type="number" {...register('holdingPeriodYears', { valueAsNumber: true })} className={errors.holdingPeriodYears ? 'pr-14 border-destructive' : 'pr-14'} />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">years</span>
              </div>
            </div>
          </div>

          <div className="flex justify-end pt-2">
            <Button type="submit" className="gradient-primary text-white">Save and Continue</Button>
          </div>
        </CardContent>
      </Card>
    </form>
  );
};

export default AppreciationForm;
