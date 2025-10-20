import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import type { 
  PropertyAnalysis, 
  PropertyInformation, 
  MortgageInformation,
  RentOccupancy,
  MonthlyOperatingExpenses,
  PurchaseInformation,
  ContingencyPurchase,
  AppreciationInputs,
  MACRSItem,
  DSCRCalculation,
  ROICalculation
} from '../types/property';

interface PropertyStore {
  currentStep: number;
  completedSteps: Set<number>;
  analysis: Partial<PropertyAnalysis>;
  
  // Navigation
  setCurrentStep: (step: number) => void;
  markStepCompleted: (step: number) => void;
  goToNextStep: () => void;
  goToPreviousStep: () => void;
  
  // Data updates
  updatePropertyInfo: (data: Partial<PropertyInformation>) => void;
  updateMortgageInfo: (data: Partial<MortgageInformation>) => void;
  updateRentOccupancy: (data: Partial<RentOccupancy>) => void;
  updateOperatingExpenses: (data: Partial<MonthlyOperatingExpenses>) => void;
  updateCapitalExpenditures: (items: MACRSItem[]) => void;
  updatePurchaseInfo: (data: Partial<PurchaseInformation>) => void;
  updateContingency: (data: Partial<ContingencyPurchase>) => void;
  updateAppreciation: (data: Partial<AppreciationInputs>) => void;
  
  // Calculations
  calculateDSCR: () => DSCRCalculation | null;
  calculateROI: () => ROICalculation | null;
  
  // Utility
  resetAnalysis: () => void;
  loadAnalysis: (analysis: PropertyAnalysis) => void;
}

const calculateMonthlyPayment = (principal: number, rate: number, months: number): number => {
  const monthlyRate = rate / 100 / 12;
  return principal * (monthlyRate * Math.pow(1 + monthlyRate, months)) / (Math.pow(1 + monthlyRate, months) - 1);
};

export const usePropertyStore = create<PropertyStore>()(
  devtools(
    persist(
      (set, get) => ({
        currentStep: 0,
        completedSteps: new Set<number>(),
        analysis: {},
        
        setCurrentStep: (step) => set({ currentStep: step }),
        
        markStepCompleted: (step) => set((state) => ({
          completedSteps: new Set([...state.completedSteps, step])
        })),
        
        goToNextStep: () => set((state) => ({
          currentStep: Math.min(state.currentStep + 1, 9),
          completedSteps: new Set([...state.completedSteps, state.currentStep])
        })),
        
        goToPreviousStep: () => set((state) => ({
          currentStep: Math.max(state.currentStep - 1, 0)
        })),
        
        updatePropertyInfo: (data) => set((state) => ({
          analysis: {
            ...state.analysis,
            propertyInfo: { ...state.analysis.propertyInfo, ...data } as PropertyInformation
          }
        })),
        
        updateMortgageInfo: (data) => set((state) => {
          const mortgage = { ...state.analysis.mortgage, ...data } as MortgageInformation;
          const purchasePrice = state.analysis.contingency?.purchasePrice || 0;
          const downPayment = (mortgage.downPaymentPercent / 100) * purchasePrice;
          mortgage.loanAmount = purchasePrice - downPayment;
          mortgage.monthlyPayment = calculateMonthlyPayment(
            mortgage.loanAmount,
            mortgage.interestRate,
            mortgage.loanTermYears * 12
          );
          
          return {
            analysis: {
              ...state.analysis,
              mortgage
            }
          };
        }),
        
        updateRentOccupancy: (data) => set((state) => {
          const rentOccupancy = { ...state.analysis.rentOccupancy, ...data } as RentOccupancy;
          rentOccupancy.effectiveMonthlyRent = rentOccupancy.monthlyRent * (rentOccupancy.occupancyRate / 100);
          
          return {
            analysis: {
              ...state.analysis,
              rentOccupancy
            }
          };
        }),
        
        updateOperatingExpenses: (data) => set((state) => {
          const expenses = { ...state.analysis.operatingExpenses, ...data } as MonthlyOperatingExpenses;
          expenses.total = 
            (expenses.advertising || 0) +
            (expenses.insurance || 0) +
            (expenses.cpa || 0) +
            (expenses.legal || 0) +
            (expenses.maintenance || 0) +
            (expenses.taxes || 0) +
            (expenses.gas || 0) +
            (expenses.electric || 0) +
            (expenses.waterSewerTrash || 0) +
            (expenses.landscaping || 0) +
            (expenses.turnovers || 0) +
            (expenses.reserves || 0) +
            (expenses.miscellaneous || 0);
          
          return {
            analysis: {
              ...state.analysis,
              operatingExpenses: expenses
            }
          };
        }),
        
        updateCapitalExpenditures: (items) => set((state) => {
          const totalByCategory: Record<string, number> = {};
          let grandTotal = 0;
          
          items.forEach(item => {
            if (!totalByCategory[item.category]) {
              totalByCategory[item.category] = 0;
            }
            totalByCategory[item.category] += item.totalCost;
            grandTotal += item.totalCost;
          });
          
          return {
            analysis: {
              ...state.analysis,
              capitalExpenditures: {
                items,
                totalByCategory: totalByCategory as any,
                grandTotal
              }
            }
          };
        }),
        
        updatePurchaseInfo: (data) => set((state) => {
          const purchaseInfo = { ...state.analysis.purchaseInfo, ...data } as PurchaseInformation;
          purchaseInfo.totalAcquisitionCost = 
            (purchaseInfo.closingCost || 0) +
            (purchaseInfo.holdingCostsLoanWhileVacant || 0) +
            (purchaseInfo.utilitiesWhileVacant || 0) +
            (purchaseInfo.leaseUpFee || 0) +
            (purchaseInfo.grassCuttingFeeWhileVacant || 0) +
            (purchaseInfo.insuranceWhileVacant || 0) +
            (purchaseInfo.propertyTaxesWhileVacant || 0);
          
          return {
            analysis: {
              ...state.analysis,
              purchaseInfo
            }
          };
        }),
        
        updateContingency: (data) => set((state) => {
          const contingency = { ...state.analysis.contingency, ...data } as ContingencyPurchase;
          contingency.contingencyAmount = (contingency.contingencyPercent / 100) * contingency.purchasePrice;
          
          return {
            analysis: {
              ...state.analysis,
              contingency
            }
          };
        }),
        
        updateAppreciation: (data) => set((state) => ({
          analysis: {
            ...state.analysis,
            appreciation: { ...state.analysis.appreciation, ...data } as AppreciationInputs
          }
        })),
        
        calculateDSCR: () => {
          const state = get();
          const { rentOccupancy, operatingExpenses, mortgage } = state.analysis;
          
          if (!rentOccupancy || !operatingExpenses || !mortgage) return null;
          
          const annualRent = (rentOccupancy.effectiveMonthlyRent || 0) * 12;
          const annualExpenses = (operatingExpenses.total || 0) * 12;
          const noi = annualRent - annualExpenses;
          const debtService = (mortgage.monthlyPayment || 0) * 12;
          const dscr = debtService > 0 ? noi / debtService : 0;
          const cashFlow = noi - debtService;
          
          const totalInvestment = 
            (state.analysis.contingency?.purchasePrice || 0) * 
            ((state.analysis.mortgage?.downPaymentPercent || 0) / 100) +
            (state.analysis.purchaseInfo?.totalAcquisitionCost || 0);
          
          const cashOnCashReturn = totalInvestment > 0 ? (cashFlow / totalInvestment) * 100 : 0;
          
          return {
            netOperatingIncome: noi,
            debtService,
            dscr,
            cashFlow,
            cashOnCashReturn
          };
        },
        
        calculateROI: () => {
          const state = get();
          const dscr = state.calculateDSCR();
          if (!dscr) return null;
          
          const { contingency, purchaseInfo, mortgage, appreciation } = state.analysis;
          if (!contingency || !purchaseInfo || !mortgage) return null;
          
          const totalInvestment = 
            contingency.purchasePrice * (mortgage.downPaymentPercent / 100) +
            (purchaseInfo.totalAcquisitionCost || 0);
          
          const capRate = contingency.purchasePrice > 0 
            ? (dscr.netOperatingIncome / contingency.purchasePrice) * 100 
            : 0;
          
          // Calculate projected cash flows and equity for IRR
          const projectedCashFlows: number[] = [-totalInvestment];
          const projectedEquity: number[] = [];
          
          if (appreciation) {
            let currentValue = contingency.afterRepairValue;
            let currentRent = state.analysis.rentOccupancy?.effectiveMonthlyRent || 0;
            let currentExpenses = state.analysis.operatingExpenses?.total || 0;
            let remainingLoan = mortgage.loanAmount || 0;
            
            for (let year = 1; year <= appreciation.holdingPeriodYears; year++) {
              currentValue *= (1 + appreciation.annualAppreciationRate / 100);
              currentRent *= (1 + appreciation.annualRentGrowthRate / 100);
              currentExpenses *= (1 + appreciation.annualExpenseIncreaseRate / 100);
              
              const yearNOI = (currentRent * 12) - (currentExpenses * 12);
              const yearCashFlow = yearNOI - (mortgage.monthlyPayment || 0) * 12;
              
              // Simple loan amortization calculation
              const principalPayment = (mortgage.monthlyPayment || 0) * 12 - 
                (remainingLoan * (mortgage.interestRate / 100));
              remainingLoan = Math.max(0, remainingLoan - principalPayment);
              
              projectedCashFlows.push(yearCashFlow);
              projectedEquity.push(currentValue - remainingLoan);
            }
          }
          
          return {
            totalInvestment,
            yearOneNOI: dscr.netOperatingIncome,
            yearOneCashFlow: dscr.cashFlow,
            capRate,
            cashOnCashReturn: dscr.cashOnCashReturn,
            projectedCashFlows,
            projectedEquity
          };
        },
        
        resetAnalysis: () => set({
          currentStep: 0,
          completedSteps: new Set<number>(),
          analysis: {}
        }),
        
        loadAnalysis: (analysis) => set({
          analysis,
          completedSteps: new Set([0, 1, 2, 3, 4, 5, 6, 7, 8, 9])
        })
      }),
      {
        name: 'property-analysis-storage',
        partialize: (state) => ({ analysis: state.analysis })
      }
    )
  )
);
