import React from 'react';
import { useForm } from 'react-hook-form';
import { usePropertyStore } from '../../store/usePropertyStore';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Button } from '../ui/button';
 
import type { ContingencyPurchase } from '../../types/property';

export const ContingencyForm: React.FC = () => {
  const { analysis, updateContingency, goToNextStep, goToPreviousStep } = usePropertyStore();
  const { register, handleSubmit, watch } = useForm<ContingencyPurchase>({
    defaultValues: analysis.contingency || {
      contingencyPercent: 5,
      purchasePrice: 450000,
      afterRepairValue: 500000,
    }
  });

  const w = watch();
  const contingencyAmount = ((w.contingencyPercent||0)/100) * (w.purchasePrice||0);

  const onSubmit = (data: ContingencyPurchase) => {
    updateContingency(data);
    goToNextStep();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <Card className="card-shadow">
        <CardHeader>
          <CardTitle>Contingency & Purchase Price</CardTitle>
          <CardDescription>Set purchase amounts and contingency</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label>Purchase Price</Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                <Input type="number" {...register('purchasePrice', { valueAsNumber: true })} className="pl-8" />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Contingency</Label>
              <div className="relative">
                <Input type="number" step="0.1" {...register('contingencyPercent', { valueAsNumber: true })} className="pr-10" />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">%</span>
              </div>
            </div>
            <div className="space-y-2">
              <Label>After Repair Value (ARV)</Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                <Input type="number" {...register('afterRepairValue', { valueAsNumber: true })} className="pl-8" />
              </div>
            </div>
          </div>

          <div className="mt-4 p-4 bg-muted rounded-lg">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Contingency Amount</span>
              <span className="font-semibold">${contingencyAmount.toLocaleString()}</span>
            </div>
          </div>

          <div className="flex justify-between pt-2">
            <Button type="button" variant="outline" onClick={goToPreviousStep}>Back</Button>
            <Button type="submit" className="gradient-primary text-white">Save and Continue</Button>
          </div>
        </CardContent>
      </Card>
    </form>
  );
};

export default ContingencyForm;
