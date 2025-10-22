export interface PropertyInformation {
  address: string;
  city: string;
  state: string;
  zipCode: string;
  squareFootage: number;
  bedrooms: number;
  bathrooms: number;
  yearBuilt?: number;
  propertyType?: 'single-family' | 'multi-family' | 'condo' | 'townhouse';
}

export interface MortgageInformation {
  financePercentOfARV: number;
  interestRate: number;
  loanTermYears: number;
  downPaymentPercent: number;
  loanAmount?: number;
  monthlyPayment?: number;
}

export interface RentOccupancy {
  monthlyRent: number;
  occupancyRate: number;
  effectiveMonthlyRent?: number;
}

export interface MonthlyOperatingExpenses {
  advertising: number;
  insurance: number;
  cpa?: number;
  legal?: number;
  maintenance: number;
  taxes: number;
  gas?: number;
  electric?: number;
  waterSewerTrash?: number;
  landscaping?: number;
  turnovers?: number;
  reserves?: number;
  miscellaneous?: number;
  total?: number;
}

export type MACRSCategory = '27.5-year' | '15-year' | '7-year' | '5-year' | '3-year' | '1-year';

export interface MACRSItem {
  id: string;
  description: string;
  unitCost: number;
  quantity: number;
  totalCost: number;
  category: MACRSCategory;
  depreciationSchedule?: number[];
}

export interface CapitalExpenditures {
  items: MACRSItem[];
  totalByCategory: Record<MACRSCategory, number>;
  grandTotal: number;
}

export interface PurchaseInformation {
  closingCost: number;
  holdingCostsLoanWhileVacant: number;
  utilitiesWhileVacant: number;
  leaseUpFee: number;
  grassCuttingFeeWhileVacant: number;
  insuranceWhileVacant: number;
  propertyTaxesWhileVacant: number;
  totalAcquisitionCost?: number;
}

export interface ContingencyPurchase {
  contingencyPercent: number;
  purchasePrice: number;
  contingencyAmount?: number;
}

export interface AppreciationInputs {
  annualAppreciationRate: number;
  annualRentGrowthRate: number;
  annualExpenseIncreaseRate: number;
}

export interface DSCRCalculation {
  netOperatingIncome: number;
  debtService: number;
  dscr: number;
  cashFlow: number;
  cashOnCashReturn: number;
}

export interface PropertyAnalysis {
  propertyInfo: PropertyInformation;
  mortgage: MortgageInformation;
  rentOccupancy: RentOccupancy;
  operatingExpenses: MonthlyOperatingExpenses;
  capitalExpenditures: CapitalExpenditures;
  purchaseInfo: PurchaseInformation;
  contingency: ContingencyPurchase;
  appreciation: AppreciationInputs;
  dscr?: DSCRCalculation;
  roi?: ROICalculation;
}

export interface ROICalculation {
  totalInvestment: number;
  yearOneNOI: number;
  yearOneCashFlow: number;
  capRate: number;
  cashOnCashReturn: number;
  projectedIRR?: number;
  projectedEquity?: number[];
  projectedCashFlows?: number[];
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'analyst' | 'viewer';
  createdAt: Date;
  lastLogin?: Date;
}

export interface Project {
  id: string;
  userId: string;
  name: string;
  analysis: PropertyAnalysis;
  status: 'draft' | 'completed' | 'archived';
  createdAt: Date;
  updatedAt: Date;
  sharedWith?: string[];
  googleSheetsUrl?: string;
}
