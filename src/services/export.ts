import jsPDF from 'jspdf';
import type { PropertyAnalysis } from '../types/property';

export async function exportAsPDF(analysis: Partial<PropertyAnalysis>) {
  const doc = new jsPDF();
  doc.setFontSize(16);
  doc.text('Property ROI Report', 14, 20);
  doc.setFontSize(12);
  doc.text(`Purchase Price: $${analysis.contingency?.purchasePrice ?? 0}`, 14, 35);
  doc.text(`Loan Amount: $${analysis.mortgage?.loanAmount ?? 0}`, 14, 43);
  doc.text(`Monthly Payment: $${analysis.mortgage?.monthlyPayment?.toFixed(2) ?? 0}`, 14, 51);
  doc.text(`Acquisition Costs: $${analysis.purchaseInfo?.totalAcquisitionCost ?? 0}`, 14, 59);
  doc.save('property-roi-report.pdf');
}

export async function exportToGoogleSheets(_analysis: Partial<PropertyAnalysis>) {
  // Placeholder: implement OAuth + Sheets write
  alert('Export to Google Sheets is stubbed. Configure Google OAuth and API keys to enable.');
}

export async function copyGoogleTemplate() {
  // Placeholder: implement Drive file copy
  alert('Copy Google Sheets template is stubbed. Configure Google OAuth and API keys to enable.');
}
