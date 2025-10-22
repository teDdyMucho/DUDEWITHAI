import { z } from 'zod';

export const propertyInfoSchema = z.object({
  address: z.string().min(1, 'Address is required'),
  city: z.string().min(1, 'City is required'),
  state: z.string().min(2).max(2, 'State must be 2 characters'),
  zipCode: z.string().regex(/^\d{5}(-\d{4})?$/, 'Invalid ZIP code'),
  squareFootage: z.number().min(100, 'Square footage must be at least 100'),
  bedrooms: z.number().min(0).max(20, 'Bedrooms must be between 0 and 20'),
  bathrooms: z.number().min(0).max(20, 'Bathrooms must be between 0 and 20'),
  yearBuilt: z.number().min(1800).max(new Date().getFullYear()).optional(),
  propertyType: z.enum(['single-family', 'multi-family', 'condo', 'townhouse']).optional(),
});

export const mortgageInfoSchema = z.object({
  financePercentOfARV: z.number().min(0).max(100, 'Must be between 0 and 100'),
  interestRate: z.number().min(0).max(30, 'Interest rate must be between 0 and 30'),
  loanTermYears: z.number().min(1).max(40, 'Loan term must be between 1 and 40 years'),
  downPaymentPercent: z.number().min(0).max(100, 'Must be between 0 and 100'),
});

export const rentOccupancySchema = z.object({
  monthlyRent: z.number().min(0, 'Monthly rent must be positive'),
  occupancyRate: z.number().min(0).max(100, 'Occupancy rate must be between 0 and 100'),
});

export const operatingExpensesSchema = z.object({
  advertising: z.number().min(0),
  insurance: z.number().min(0),
  cpa: z.number().min(0).optional().default(0),
  legal: z.number().min(0).optional().default(0),
  maintenance: z.number().min(0),
  taxes: z.number().min(0),
  gas: z.number().min(0).optional().default(0),
  electric: z.number().min(0).optional().default(0),
  waterSewerTrash: z.number().min(0).optional().default(0),
  landscaping: z.number().min(0).optional().default(0),
  turnovers: z.number().min(0).optional().default(0),
  reserves: z.number().min(0).optional().default(0),
  miscellaneous: z.number().min(0).optional().default(0),
});

export const macrsItemSchema = z.object({
  id: z.string(),
  description: z.string().min(1, 'Description is required'),
  unitCost: z.number().min(0, 'Unit cost must be positive'),
  quantity: z.number().min(1, 'Quantity must be at least 1'),
  totalCost: z.number().min(0),
  category: z.enum(['27.5-year', '15-year', '7-year', '5-year', '3-year', '1-year']),
});

export const purchaseInfoSchema = z.object({
  closingCost: z.number().min(0),
  holdingCostsLoanWhileVacant: z.number().min(0),
  utilitiesWhileVacant: z.number().min(0),
  leaseUpFee: z.number().min(0),
  grassCuttingFeeWhileVacant: z.number().min(0),
  insuranceWhileVacant: z.number().min(0),
  propertyTaxesWhileVacant: z.number().min(0),
});

export const contingencySchema = z.object({
  contingencyPercent: z.number().min(0).max(50, 'Contingency must be between 0 and 50%'),
  purchasePrice: z.number().min(0, 'Purchase price must be positive'),
});

export const appreciationSchema = z.object({
  annualAppreciationRate: z.number().min(-10).max(30, 'Must be between -10% and 30%'),
  annualRentGrowthRate: z.number().min(-10).max(20, 'Must be between -10% and 20%'),
  annualExpenseIncreaseRate: z.number().min(0).max(20, 'Must be between 0% and 20%'),
});
