import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { operatingExpensesSchema } from '../../lib/validations';
import { usePropertyStore } from '../../store/usePropertyStore';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Button } from '../ui/button';
import { Receipt, Shield, Wrench, Briefcase, Scale, Fuel, Zap, Droplets, Leaf, RotateCw, PiggyBank, Puzzle } from 'lucide-react';
import type { MonthlyOperatingExpenses } from '../../types/property';

export const OperatingExpensesForm: React.FC = () => {
  const { analysis, updateOperatingExpenses, goToNextStep } = usePropertyStore();
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<MonthlyOperatingExpenses>({
    resolver: zodResolver(operatingExpensesSchema),
    defaultValues: (analysis.operatingExpenses as any) || {
      advertising: 0,
      insurance: 0,
      cpa: 0,
      legal: 0,
      maintenance: 0,
      taxes: 0,
      gas: 0,
      electric: 0,
      waterSewerTrash: 0,
      landscaping: 0,
      turnovers: 0,
      reserves: 0,
      miscellaneous: 0,
    },
  });

  const watchedValues = watch();
  const totalExpenses =
    (watchedValues.advertising || 0) +
    (watchedValues.insurance || 0) +
    (watchedValues.cpa || 0) +
    (watchedValues.legal || 0) +
    (watchedValues.maintenance || 0) +
    (watchedValues.taxes || 0) +
    (watchedValues.gas || 0) +
    (watchedValues.electric || 0) +
    (watchedValues.waterSewerTrash || 0) +
    (watchedValues.landscaping || 0) +
    (watchedValues.turnovers || 0) +
    (watchedValues.reserves || 0) +
    (watchedValues.miscellaneous || 0);

  const onSubmit = (data: MonthlyOperatingExpenses) => {
    updateOperatingExpenses(data);
    goToNextStep();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <Card className="card-shadow">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Receipt className="w-5 h-5 text-primary" />
            Monthly Operating Expenses
          </CardTitle>
          <CardDescription>
            Enter all monthly operating expenses for the property
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="advertising" className="flex items-center gap-2">
                <Receipt className="w-4 h-4" />
                Advertising & Marketing
              </Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                <Input
                  id="advertising"
                  type="number"
                  step="10"
                  {...register('advertising', { valueAsNumber: true })}
                  placeholder="50"
                  className={errors.advertising ? 'border-destructive pl-8' : 'pl-8'}
                />
              </div>
              {errors.advertising && (
                <p className="text-sm text-destructive">{errors.advertising.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="insurance" className="flex items-center gap-2"><Shield className="w-4 h-4"/> Insurance</Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                <Input
                  id="insurance"
                  type="number"
                  step="10"
                  {...register('insurance', { valueAsNumber: true })}
                  placeholder="150"
                  className={errors.insurance ? 'border-destructive pl-8' : 'pl-8'}
                />
              </div>
              {errors.insurance && (
                <p className="text-sm text-destructive">{errors.insurance.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="cpa" className="flex items-center gap-2"><Briefcase className="w-4 h-4"/> Certified Public Accountant (CPA)</Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                <Input
                  id="cpa"
                  type="number"
                  step="10"
                  {...register('cpa', { valueAsNumber: true })}
                  placeholder="0"
                  className={errors.cpa ? 'border-destructive pl-8' : 'pl-8'}
                />
              </div>
              {errors.cpa && (
                <p className="text-sm text-destructive">{(errors as any).cpa?.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="legal" className="flex items-center gap-2"><Scale className="w-4 h-4"/> Legal</Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                <Input
                  id="legal"
                  type="number"
                  step="10"
                  {...register('legal', { valueAsNumber: true })}
                  placeholder="0"
                  className={errors.legal ? 'border-destructive pl-8' : 'pl-8'}
                />
              </div>
              {errors.legal && (
                <p className="text-sm text-destructive">{(errors as any).legal?.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="maintenance" className="flex items-center gap-2"><Wrench className="w-4 h-4"/> Maintenance</Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                <Input
                  id="maintenance"
                  type="number"
                  step="10"
                  {...register('maintenance', { valueAsNumber: true })}
                  placeholder="0"
                  className={errors.maintenance ? 'border-destructive pl-8' : 'pl-8'}
                />
              </div>
              {errors.maintenance && (
                <p className="text-sm text-destructive">{errors.maintenance.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="taxes" className="flex items-center gap-2"><Receipt className="w-4 h-4"/> Taxes</Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                <Input
                  id="taxes"
                  type="number"
                  step="10"
                  {...register('taxes', { valueAsNumber: true })}
                  placeholder="0"
                  className={errors.taxes ? 'border-destructive pl-8' : 'pl-8'}
                />
              </div>
              {errors.taxes && (
                <p className="text-sm text-destructive">{(errors as any).taxes?.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="gas" className="flex items-center gap-2"><Fuel className="w-4 h-4"/> Gas</Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                <Input
                  id="gas"
                  type="number"
                  step="10"
                  {...register('gas', { valueAsNumber: true })}
                  placeholder="0"
                  className={(errors as any).gas ? 'border-destructive pl-8' : 'pl-8'}
                />
              </div>
              {(errors as any).gas && (
                <p className="text-sm text-destructive">{(errors as any).gas?.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="electric" className="flex items-center gap-2"><Zap className="w-4 h-4"/> Electric</Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                <Input
                  id="electric"
                  type="number"
                  step="10"
                  {...register('electric', { valueAsNumber: true })}
                  placeholder="0"
                  className={(errors as any).electric ? 'border-destructive pl-8' : 'pl-8'}
                />
              </div>
              {(errors as any).electric && (
                <p className="text-sm text-destructive">{(errors as any).electric?.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="waterSewerTrash" className="flex items-center gap-2"><Droplets className="w-4 h-4"/> Water/Sewer/Trash</Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                <Input id="waterSewerTrash" type="number" step="10" {...register('waterSewerTrash', { valueAsNumber: true })} placeholder="0" className={(errors as any).waterSewerTrash ? 'border-destructive pl-8' : 'pl-8'} />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="landscaping" className="flex items-center gap-2"><Leaf className="w-4 h-4"/> Landscaping</Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                <Input id="landscaping" type="number" step="10" {...register('landscaping', { valueAsNumber: true })} placeholder="0" className={(errors as any).landscaping ? 'border-destructive pl-8' : 'pl-8'} />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="turnovers" className="flex items-center gap-2"><RotateCw className="w-4 h-4"/> Turnovers</Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                <Input id="turnovers" type="number" step="10" {...register('turnovers', { valueAsNumber: true })} placeholder="0" className={(errors as any).turnovers ? 'border-destructive pl-8' : 'pl-8'} />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="reserves" className="flex items-center gap-2"><PiggyBank className="w-4 h-4"/> Reserves</Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                <Input id="reserves" type="number" step="10" {...register('reserves', { valueAsNumber: true })} placeholder="0" className={(errors as any).reserves ? 'border-destructive pl-8' : 'pl-8'} />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="miscellaneous" className="flex items-center gap-2"><Puzzle className="w-4 h-4"/> Miscellaneous</Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                <Input id="miscellaneous" type="number" step="10" {...register('miscellaneous', { valueAsNumber: true })} placeholder="0" className={(errors as any).miscellaneous ? 'border-destructive pl-8' : 'pl-8'} />
              </div>
            </div>
          </div>

          {/* Expense Summary */}
          <div className="mt-6 p-4 bg-muted rounded-lg space-y-3">
            <h3 className="font-semibold text-sm">Expense Summary</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div>
                <p className="text-muted-foreground">Total Monthly Expenses</p>
                <p className="text-xl font-semibold">${totalExpenses.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Total Annual Expenses</p>
                <p className="text-xl font-semibold">${(totalExpenses * 12).toLocaleString()}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Expense Ratio</p>
                <p className="text-xl font-semibold">
                  {analysis.rentOccupancy?.effectiveMonthlyRent 
                    ? ((totalExpenses / analysis.rentOccupancy.effectiveMonthlyRent) * 100).toFixed(1)
                    : '0'}%
                </p>
              </div>
            </div>
          </div>

          <div className="flex justify-end pt-4">
            <Button type="submit" className="gradient-primary text-white">
              Save and Continue
            </Button>
          </div>
        </CardContent>
      </Card>
    </form>
  );
};
