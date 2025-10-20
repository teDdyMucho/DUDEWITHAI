import React from 'react';
import { useForm } from 'react-hook-form';
import { usePropertyStore } from '../../store/usePropertyStore';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Button } from '../ui/button';

export const PurchasePriceForm: React.FC = () => {
  const { analysis, updateContingency, goToNextStep } = usePropertyStore();
  const { register, handleSubmit } = useForm<{ purchasePrice: number }>({
    defaultValues: { purchasePrice: analysis.contingency?.purchasePrice || 0 },
  });

  const onSubmit = (data: { purchasePrice: number }) => {
    updateContingency({ purchasePrice: data.purchasePrice });
    goToNextStep();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <Card className="card-shadow">
        <CardHeader>
          <CardTitle>Purchase Price</CardTitle>
          <CardDescription>Enter the purchase price for this property</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="purchasePrice">Purchase Price</Label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
              <Input id="purchasePrice" type="number" step="100" {...register('purchasePrice', { valueAsNumber: true })} className="pl-8" />
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

export default PurchasePriceForm;
