import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { usePropertyStore } from '../../store/usePropertyStore';
import { Download, FileText, Link as LinkIcon } from 'lucide-react';
import { exportAsPDF, copyGoogleTemplate } from '../../services/export';

export const SummaryDashboard: React.FC = () => {
  const { analysis, calculateDSCR, calculateROI } = usePropertyStore();
  const dscr = calculateDSCR();
  const roi = calculateROI();

  const onExportPDF = async () => {
    await exportAsPDF(analysis);
  };

  const onExportSheets = async () => {
    try {
      await fetch('https://primary-production-56087.up.railway.app/webhook/gmail-from-web', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(analysis),
      });
    } catch (e) {
      // no-op; keep UX quiet
    }
  };

  const onCopyTemplate = async () => {
    await copyGoogleTemplate();
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Purchase Details</CardTitle>
            <CardDescription>Key acquisition metrics</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <div className="flex justify-between"><span>Purchase Price</span><span className="font-semibold">${analysis.contingency?.purchasePrice?.toLocaleString() || 0}</span></div>
            <div className="flex justify-between"><span>ARV</span><span className="font-semibold">${analysis.contingency?.afterRepairValue?.toLocaleString() || 0}</span></div>
            <div className="flex justify-between"><span>Acquisition Costs</span><span className="font-semibold">${analysis.purchaseInfo?.totalAcquisitionCost?.toLocaleString() || 0}</span></div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Mortgage Summary</CardTitle>
            <CardDescription>Debt overview</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <div className="flex justify-between"><span>Loan Amount</span><span className="font-semibold">${analysis.mortgage?.loanAmount?.toLocaleString() || 0}</span></div>
            <div className="flex justify-between"><span>Interest Rate</span><span className="font-semibold">{analysis.mortgage?.interestRate || 0}%</span></div>
            <div className="flex justify-between"><span>Monthly Payment</span><span className="font-semibold">${analysis.mortgage?.monthlyPayment?.toFixed(2) || 0}</span></div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Monthly DSCR</CardTitle>
            <CardDescription>Debt coverage ratio</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <div className="flex justify-between"><span>NOI (Annual)</span><span className="font-semibold">${(dscr?.netOperatingIncome || 0).toLocaleString()}</span></div>
            <div className="flex justify-between"><span>Debt Service (Annual)</span><span className="font-semibold">${(dscr?.debtService || 0).toLocaleString()}</span></div>
            <div className="flex justify-between"><span>DSCR</span><span className="font-semibold">{(dscr?.dscr || 0).toFixed(2)}</span></div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>MACRS Summary</CardTitle>
            <CardDescription>Cost recovery totals</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            {analysis.capitalExpenditures?.items?.length ? (
              <>
                {Object.entries(analysis.capitalExpenditures.totalByCategory || {}).map(([cat, total]) => (
                  <div key={cat} className="flex justify-between"><span>{cat}</span><span className="font-semibold">${(total as number).toLocaleString()}</span></div>
                ))}
                <div className="flex justify-between border-t pt-2"><span>Total</span><span className="font-semibold">${analysis.capitalExpenditures.grandTotal.toLocaleString()}</span></div>
              </>
            ) : (
              <p className="text-muted-foreground">No MACRS items added.</p>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Total Investment</CardTitle>
            <CardDescription>ROI overview</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <div className="flex justify-between"><span>Total Investment</span><span className="font-semibold">${(roi?.totalInvestment || 0).toLocaleString()}</span></div>
            <div className="flex justify-between"><span>Cap Rate</span><span className="font-semibold">{(roi?.capRate || 0).toFixed(2)}%</span></div>
            <div className="flex justify-between"><span>Cash-on-Cash</span><span className="font-semibold">{(roi?.cashOnCashReturn || 0).toFixed(2)}%</span></div>
          </CardContent>
        </Card>
      </div>

      <div className="flex flex-wrap gap-2 justify-end">
        <Button variant="outline" onClick={onCopyTemplate}><LinkIcon className="w-4 h-4 mr-2"/>Copy Sheets Template</Button>
        <Button variant="outline" onClick={onExportSheets}><Download className="w-4 h-4 mr-2"/>Export to Sheets</Button>
        <Button className="gradient-primary text-white" onClick={onExportPDF}><FileText className="w-4 h-4 mr-2"/>Export PDF</Button>
      </div>
    </div>
  );
};

export default SummaryDashboard;
