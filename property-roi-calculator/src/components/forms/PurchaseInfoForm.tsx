import React from 'react';
import { useForm } from 'react-hook-form';
import { usePropertyStore } from '../../store/usePropertyStore';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Button } from '../ui/button';
import { FileText } from 'lucide-react';
import type { PurchaseInformation } from '../../types/property';

export const PurchaseInfoForm: React.FC = () => {
  const { analysis, updatePurchaseInfo, goToNextStep, goToPreviousStep } = usePropertyStore();

  const { register, handleSubmit, watch } = useForm<PurchaseInformation>({
    defaultValues: analysis.purchaseInfo || {
      closingCost: 0,
      holdingCostsLoanWhileVacant: 0,
      utilitiesWhileVacant: 0,
      leaseUpFee: 0,
      grassCuttingFeeWhileVacant: 0,
      insuranceWhileVacant: 0,
      propertyTaxesWhileVacant: 0,
    }
  });

  const w = watch();
  const total = 
    (w.closingCost || 0) +
    (w.holdingCostsLoanWhileVacant || 0) +
    (w.utilitiesWhileVacant || 0) +
    (w.leaseUpFee || 0) +
    (w.grassCuttingFeeWhileVacant || 0) +
    (w.insuranceWhileVacant || 0) +
    (w.propertyTaxesWhileVacant || 0);

  const onSubmit = (data: PurchaseInformation) => {
    updatePurchaseInfo(data);
    goToNextStep();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <Card className="card-shadow">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-primary" />
            Purchase Information
          </CardTitle>
          <CardDescription>Enter acquisition-related costs</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Closing Cost</Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                <Input type="number" {...register('closingCost', { valueAsNumber: true })} className="pl-8" />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Holding Costs Loan While Vacant</Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                <Input type="number" {...register('holdingCostsLoanWhileVacant', { valueAsNumber: true })} className="pl-8" />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Lease Up Fee</Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                <Input type="number" {...register('leaseUpFee', { valueAsNumber: true })} className="pl-8" />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Utilities While Vacant</Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                <Input type="number" {...register('utilitiesWhileVacant', { valueAsNumber: true })} className="pl-8" />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Grass Cutting Fee While Vacant</Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                <Input type="number" {...register('grassCuttingFeeWhileVacant', { valueAsNumber: true })} className="pl-8" />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Insurance While Vacant</Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                <Input type="number" {...register('insuranceWhileVacant', { valueAsNumber: true })} className="pl-8" />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Property Taxes While Vacant</Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                <Input type="number" {...register('propertyTaxesWhileVacant', { valueAsNumber: true })} className="pl-8" />
              </div>
            </div>
          </div>

          <div className="mt-4 p-4 bg-muted rounded-lg">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Total Acquisition Costs</span>
              <span className="font-semibold">${total.toLocaleString()}</span>
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

export default PurchaseInfoForm;
