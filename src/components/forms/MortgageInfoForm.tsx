import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { mortgageInfoSchema } from '../../lib/validations';
import { usePropertyStore } from '../../store/usePropertyStore';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Button } from '../ui/button';
import { DollarSign, Percent, Calendar, TrendingDown } from 'lucide-react';
import type { MortgageInformation } from '../../types/property';

export const MortgageInfoForm: React.FC = () => {
  const { analysis, updateMortgageInfo, goToNextStep, goToPreviousStep } = usePropertyStore();
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<MortgageInformation>({
    resolver: zodResolver(mortgageInfoSchema),
    defaultValues: analysis.mortgage || {
      financePercentOfARV: 70,
      interestRate: 7.5,
      loanTermYears: 30,
      downPaymentPercent: 20,
    },
  });

  const watchedValues = watch();
  const purchasePrice = analysis.contingency?.purchasePrice || 0;
  const loanAmount = purchasePrice * (1 - (watchedValues.downPaymentPercent || 0) / 100);
  const monthlyRate = (watchedValues.interestRate || 0) / 100 / 12;
  const numPayments = (watchedValues.loanTermYears || 0) * 12;
  const monthlyPayment = monthlyRate > 0 && numPayments > 0
    ? loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, numPayments)) / 
      (Math.pow(1 + monthlyRate, numPayments) - 1)
    : 0;

  const onSubmit = (data: MortgageInformation) => {
    updateMortgageInfo(data);
    goToNextStep();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <Card className="card-shadow">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <DollarSign className="w-5 h-5 text-primary" />
            Mortgage Information
          </CardTitle>
          <CardDescription>
            Enter the financing details for the property
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="financePercentOfARV" className="flex items-center gap-2">
                <Percent className="w-4 h-4" />
                Finance % of ARV
              </Label>
              <div className="relative">
                <Input
                  id="financePercentOfARV"
                  type="number"
                  step="0.1"
                  {...register('financePercentOfARV', { valueAsNumber: true })}
                  placeholder="75"
                  className={errors.financePercentOfARV ? 'border-destructive pr-8' : 'pr-8'}
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">%</span>
              </div>
              {errors.financePercentOfARV && (
                <p className="text-sm text-destructive">{errors.financePercentOfARV.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="interestRate" className="flex items-center gap-2">
                <TrendingDown className="w-4 h-4" />
                Interest Rate
              </Label>
              <div className="relative">
                <Input
                  id="interestRate"
                  type="number"
                  step="0.01"
                  {...register('interestRate', { valueAsNumber: true })}
                  placeholder="7.875"
                  className={errors.interestRate ? 'border-destructive pr-8' : 'pr-8'}
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">%</span>
              </div>
              {errors.interestRate && (
                <p className="text-sm text-destructive">{errors.interestRate.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="loanTermYears" className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                Number of Years
              </Label>
              <div className="relative">
                <Input
                  id="loanTermYears"
                  type="number"
                  {...register('loanTermYears', { valueAsNumber: true })}
                  placeholder="30"
                  className={errors.loanTermYears ? 'border-destructive pr-12' : 'pr-12'}
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">years</span>
              </div>
              {errors.loanTermYears && (
                <p className="text-sm text-destructive">{errors.loanTermYears.message}</p>
              )}
            </div>
          </div>

          {/* Calculated Values Display */}
          <div className="mt-6 p-4 bg-muted rounded-lg space-y-3">
            <h3 className="font-semibold text-sm">Calculated Values</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Purchase Price:</span>
                <span className="font-medium">${purchasePrice.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Loan Amount:</span>
                <span className="font-medium">${loanAmount.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Est. Monthly Payment:</span>
                <span className="font-medium">${monthlyPayment.toFixed(2)}</span>
              </div>
            </div>
          </div>

          <div className="flex justify-between pt-4">
            <Button type="button" variant="outline" onClick={goToPreviousStep}>Back</Button>
            <Button type="submit" className="gradient-primary text-white">Save and Continue</Button>
          </div>
        </CardContent>
      </Card>
    </form>
  );
};
