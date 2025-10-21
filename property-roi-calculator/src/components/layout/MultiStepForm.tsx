import React from 'react';
import { Check } from 'lucide-react';
import { cn } from '../../lib/utils';
import { usePropertyStore } from '../../store/usePropertyStore';
import { PropertyInfoForm } from '../forms/PropertyInfoForm';
import { MortgageInfoForm } from '../forms/MortgageInfoForm';
import { RentOccupancyForm } from '../forms/RentOccupancyForm';
import { OperatingExpensesForm } from '../forms/OperatingExpensesForm';
import { MacrsForm } from '../forms/MacrsForm';
import { PurchaseInfoForm } from '../forms/PurchaseInfoForm';
import { ContingencyForm } from '../forms/ContingencyForm';
import { AppreciationForm } from '../forms/AppreciationForm';
import { SummaryDashboard } from '../summary/SummaryDashboard';
import { PurchasePriceForm } from '../forms/PurchasePriceForm';

interface Step {
  id: number;
  title: string;
  description: string;
  component: React.ComponentType;
}

export const steps: Step[] = [
  {
    id: 0,
    title: 'Property Information',
    description: 'Basic property details',
    component: PropertyInfoForm,
  },
  {
    id: 1,
    title: 'Mortgage Information',
    description: 'Financing details',
    component: MortgageInfoForm,
  },
  {
    id: 2,
    title: 'Rent & Occupancy',
    description: 'Rental income details',
    component: RentOccupancyForm,
  },
  {
    id: 3,
    title: 'Operating Expenses',
    description: 'Monthly expenses',
    component: OperatingExpensesForm,
  },
  {
    id: 4,
    title: 'Capital Expenditures',
    description: 'MACRS depreciation',
    component: MacrsForm,
  },
  {
    id: 5,
    title: 'Purchase Information',
    description: 'Acquisition costs',
    component: PurchaseInfoForm,
  },
  {
    id: 6,
    title: 'Contingency & Price',
    description: 'Purchase price details',
    component: ContingencyForm,
  },
  {
    id: 7,
    title: 'Appreciation Inputs',
    description: 'Growth projections',
    component: AppreciationForm,
  },
  {
    id: 8,
    title: 'Purchase Price',
    description: 'Enter purchase price',
    component: PurchasePriceForm,
  },
  {
    id: 9,
    title: 'Summary',
    description: 'Review and export',
    component: SummaryDashboard,
  },
];

export const MultiStepForm: React.FC = () => {
  const { currentStep, completedSteps, setCurrentStep } = usePropertyStore();
  const CurrentStepComponent = steps[currentStep].component;

  return (
    <div className="min-h-screen bg-background">
      {/* Progress Bar */}
      <div className="sticky top-0 z-10 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-montserrat font-bold">Property ROI Calculator</h1>
            <div className="text-sm text-muted-foreground">
              Step {currentStep + 1} of {steps.length}
            </div>
          </div>
          
          {/* Step Indicators */}
          <div className="flex items-center space-x-2">
            {steps.map((step, index) => (
              <React.Fragment key={step.id}>
                <button
                  onClick={() => setCurrentStep(index)}
                  className={cn(
                    "flex items-center justify-center w-10 h-10 rounded-full transition-all",
                    currentStep === index
                      ? "bg-primary text-primary-foreground"
                      : completedSteps.has(index)
                      ? "bg-green-500 text-white"
                      : "bg-muted text-muted-foreground"
                  )}
                  disabled={!completedSteps.has(index) && index !== currentStep}
                >
                  {completedSteps.has(index) && index !== currentStep ? (
                    <Check className="w-5 h-5" />
                  ) : (
                    <span className="text-sm font-medium">{index + 1}</span>
                  )}
                </button>
                {index < steps.length - 1 && (
                  <div
                    className={cn(
                      "flex-1 h-1 transition-all",
                      completedSteps.has(index) ? "bg-green-500" : "bg-muted"
                    )}
                  />
                )}
              </React.Fragment>
            ))}
          </div>
          
          {/* Step Title */}
          <div className="mt-4">
            <h2 className="text-lg font-semibold">{steps[currentStep].title}</h2>
            <p className="text-sm text-muted-foreground">{steps[currentStep].description}</p>
          </div>
        </div>
      </div>

      {/* Form Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="animate-fade-in">
            <CurrentStepComponent />
          </div>
        </div>
      </div>

      
    </div>
  );
};
