import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { rentOccupancySchema } from '../../lib/validations';
import { usePropertyStore } from '../../store/usePropertyStore';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Button } from '../ui/button';
import { Home, Percent, TrendingUp, DollarSign } from 'lucide-react';
import type { RentOccupancy } from '../../types/property';

export const RentOccupancyForm: React.FC = () => {
  const { analysis, updateRentOccupancy, goToNextStep, goToPreviousStep } = usePropertyStore();
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<RentOccupancy>({
    resolver: zodResolver(rentOccupancySchema),
    defaultValues: analysis.rentOccupancy || {
      monthlyRent: 2500,
      occupancyRate: 95,
      annualRentIncrease: 3,
    },
  });

  const watchedValues = watch();
  const effectiveMonthlyRent = (watchedValues.monthlyRent || 0) * ((watchedValues.occupancyRate || 0) / 100);
  const annualRent = effectiveMonthlyRent * 12;

  const onSubmit = (data: RentOccupancy) => {
    updateRentOccupancy(data);
    goToNextStep();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <Card className="card-shadow">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Home className="w-5 h-5 text-primary" />
            Rent & Occupancy
          </CardTitle>
          <CardDescription>
            Enter the rental income and occupancy details
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="monthlyRent" className="flex items-center gap-2">
                <DollarSign className="w-4 h-4" />
                Monthly Rent
              </Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                <Input
                  id="monthlyRent"
                  type="number"
                  step="50"
                  {...register('monthlyRent', { valueAsNumber: true })}
                  placeholder="2500"
                  className={errors.monthlyRent ? 'border-destructive pl-8' : 'pl-8'}
                />
              </div>
              {errors.monthlyRent && (
                <p className="text-sm text-destructive">{errors.monthlyRent.message}</p>
              )}
              <p className="text-xs text-muted-foreground">
                The full market rent for the property
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="occupancyRate" className="flex items-center gap-2">
                <Percent className="w-4 h-4" />
                Occupancy Rate
              </Label>
              <div className="relative">
                <Input
                  id="occupancyRate"
                  type="number"
                  step="1"
                  {...register('occupancyRate', { valueAsNumber: true })}
                  placeholder="95"
                  className={errors.occupancyRate ? 'border-destructive pr-8' : 'pr-8'}
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">%</span>
              </div>
              {errors.occupancyRate && (
                <p className="text-sm text-destructive">{errors.occupancyRate.message}</p>
              )}
              <p className="text-xs text-muted-foreground">
                Expected average occupancy throughout the year
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="annualRentIncrease" className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4" />
                Annual Rent Increase
              </Label>
              <div className="relative">
                <Input
                  id="annualRentIncrease"
                  type="number"
                  step="0.5"
                  {...register('annualRentIncrease', { valueAsNumber: true })}
                  placeholder="3"
                  className={errors.annualRentIncrease ? 'border-destructive pr-8' : 'pr-8'}
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">%</span>
              </div>
              {errors.annualRentIncrease && (
                <p className="text-sm text-destructive">{errors.annualRentIncrease.message}</p>
              )}
              <p className="text-xs text-muted-foreground">
                Expected yearly rent growth rate
              </p>
            </div>
          </div>

          {/* Income Projections */}
          <div className="mt-6 p-4 bg-muted rounded-lg space-y-3">
            <h3 className="font-semibold text-sm">Income Projections</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div>
                <p className="text-muted-foreground">Effective Monthly Rent</p>
                <p className="text-xl font-semibold">${effectiveMonthlyRent.toFixed(2)}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Annual Rental Income</p>
                <p className="text-xl font-semibold">${annualRent.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-muted-foreground">5-Year Projected Rent</p>
                <p className="text-xl font-semibold">
                  ${(watchedValues.monthlyRent * Math.pow(1 + (watchedValues.annualRentIncrease || 0) / 100, 5)).toFixed(0)}/mo
                </p>
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
