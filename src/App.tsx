import { useState } from 'react';
import { BillFormData } from './types/bill.types';
import { useBillCalculator } from './hooks/useBillCalculator';
import { InvoiceHeaderForm } from './components/InvoiceHeaderForm';
import { ClientDetailsForm } from './components/ClientDetailsForm';
import { TimeCostsSection } from './components/TimeCostsSection';
import { DisbursementsSection } from './components/DisbursementsSection';
import { OutstandingInvoicesSection } from './components/OutstandingInvoicesSection';
import { MoneyOnAccountSection } from './components/MoneyOnAccountSection';
import { ScheduleOfWorkSection } from './components/ScheduleOfWorkSection';
import { GenerateButton } from './components/GenerateButton';

const initialFormData: BillFormData = {
  invoiceHeader: {
    invoiceNumber: '',
    invoiceDate: new Date().toISOString().split('T')[0],
    vatNumber: '',
    hourlyRate: 0,
    paralegalRate: 0
  },
  clientDetails: {
    clientName: '',
    addressLine1: '',
    email: '',
    matterReference: ''
  },
  timeCosts: [],
  disbursements: [],
  outstandingInvoices: [],
  moneyOnAccount: [],
  discountPercentage: 0,
  scheduleOfWork: []
};

function App() {
  const [formData, setFormData] = useState<BillFormData>(initialFormData);

  const updateSection = <K extends keyof BillFormData>(key: K, data: BillFormData[K]) => {
    setFormData(prev => ({ ...prev, [key]: data }));
  };

  return (
    <div className="app-container">
      <div className="main-content">
        <header className="mb-4">
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-accent-blue to-accent-purple inline-block">
            Krish Ratna & Co
          </h1>
          <p className="text-secondary mt-1">Legal Bill Generator</p>
        </header>

        <InvoiceHeaderForm 
          data={formData.invoiceHeader}
          discountPercentage={formData.discountPercentage}
          onChange={d => updateSection('invoiceHeader', { ...formData.invoiceHeader, ...d })}
          onDiscountChange={val => updateSection('discountPercentage', val)}
        />

        <ClientDetailsForm 
          data={formData.clientDetails}
          onChange={d => updateSection('clientDetails', { ...formData.clientDetails, ...d })}
        />

        <TimeCostsSection 
          data={formData.timeCosts}
          hourlyRate={formData.invoiceHeader.hourlyRate}
          onChange={d => updateSection('timeCosts', d)}
        />

        <DisbursementsSection 
          data={formData.disbursements}
          onChange={d => updateSection('disbursements', d)}
        />

        <OutstandingInvoicesSection 
          data={formData.outstandingInvoices}
          onChange={d => updateSection('outstandingInvoices', d)}
        />

        <MoneyOnAccountSection 
          data={formData.moneyOnAccount}
          onChange={d => updateSection('moneyOnAccount', d)}
        />

        <ScheduleOfWorkSection 
          data={formData.scheduleOfWork}
          onChange={d => updateSection('scheduleOfWork', d)}
        />

        <div className="glass-card mt-8 bg-black/20 text-sm text-secondary text-center">
          <p className="mb-1 font-semibold text-primary">Bank Details for Payment</p>
          <p>HSBC Bank &nbsp;|&nbsp; Account: Krish Ratna &amp; Co Client A/c &nbsp;|&nbsp; Sort Code: 40-42-13 &nbsp;|&nbsp; A/c No: 63101908</p>
        </div>
      </div>

      {/* 
      <div className="sidebar">
        <SummaryPanel totals={totals} />
      </div>
      */}

      <div className="fixed-bottom-bar">
        <div className="fixed-bottom-bar-content">
          <GenerateButton formData={formData} />
        </div>
      </div>
    </div>
  );
}

export default App;
