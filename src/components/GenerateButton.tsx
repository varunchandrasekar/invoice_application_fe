import React, { useState } from 'react';
import { BillFormData } from '../types/bill.types';
import { generateBill } from '../services/billApiService';
import { FileText, CheckCircle, AlertCircle } from 'lucide-react';

interface Props {
  formData: BillFormData;
}

export const GenerateButton: React.FC<Props> = ({ formData }) => {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleGenerate = async () => {
    setStatus('loading');
    setErrorMessage('');
    try {
      formData = {
    "invoiceHeader": {
        "invoiceNumber": "ND/Q.Abbas/Lit/KR-1",
        "invoiceDate": "2026-08-17",
        "vatNumber": "531020904",
        "hourlyRate": 450,
        "paralegalRate": 0
    },
    "clientDetails": {
        "clientName": "Mr. Qazal Abbas",
        "addressLine1": "24 northhyde lane, UB2 5TE",
        "email": "q.abbas786@hotmail.co.uk",
        "matterReference": "RE - HMRC- TAX ENQUIRY VS A.Abbas"
    },
    "timeCosts": [
        {
            "id": "020481cb-cd19-4756-ae5e-bcb8907f02f5",
            "category": "PERSONAL_ATTENDANCE",
            "description": "Meeting Abbass 23 05 2026 - 4PM",
            "hours": 0,
            "minutes": 30,
            "vatApplicable": true
        },
        {
            "id": "9ecd9655-d8f4-47a6-ab07-49ec7f5607e7",
            "category": "PERSONAL_ATTENDANCE",
            "description": "Meeting as Asif's (Accountant) 29 05 2026 - 3.50PM to 6.00PM",
            "hours": 2,
            "minutes": 0,
            "vatApplicable": true
        },
        {
            "id": "a0b5eead-074d-457e-bd15-caa26a7e4401",
            "category": "PERSONAL_ATTENDANCE",
            "description": "Meeting as Asifs - 10 06 2026 - 10AM - 11AM",
            "hours": 1,
            "minutes": 0,
            "vatApplicable": true
        },
        {
            "id": "c2fdb223-e772-4917-a059-ffb26f4902e5",
            "category": "PERSONAL_ATTENDANCE",
            "description": "Meeting Abbas 06 07 2026 - 6PM",
            "hours": 0,
            "minutes": 30,
            "vatApplicable": true
        },
        {
            "id": "76d26c49-a2a5-4233-abe7-c8618ac0ad0b",
            "category": "TELEPHONE_ATTENDANCE",
            "description": "Various calls",
            "hours": 0,
            "minutes": 30,
            "vatApplicable": true
        },
        {
            "id": "49485b54-4891-4e3f-b9fe-758018cb4fc9",
            "category": "WORK_ON_DOCUMENTS",
            "description": "See the Scedule below",
            "hours": 26,
            "minutes": 0,
            "vatApplicable": true
        }
    ],
    "disbursements": [{
      "id": "c367b0d9-7c90-4bd0-9246-4f0759533efa",
      "description": "Barrister-A Chelliah-Inv dated25.11.06.2026=£1500 Paid Directly",
      "netAmount": 0,
      "vatApplicable": true
  }],
    "outstandingInvoices": [],
    "moneyOnAccount": [
        {
            "id": "33f549a2-49bc-4be4-a070-4ffbaadb03f5",
            "amountReceived": 2000,
            "paymentDate": "2026-07-22",
            "description": "check"
        },
        {
            "id": "f95633cb-71f3-4a1a-862e-05d71d87e3c4",
            "amountReceived": 1000,
            "paymentDate": "2026-07-27",
            "description": "check"
        }
    ],
    "discountPercentage": 15,
    "scheduleOfWork": [
        {
            "id": "69be2be4-db86-4046-8afd-3ed625b857bb",
            "workDescription": "Reading 23 Files from Asif(Accountant)",
            "gradeAHours": 3,
            "gradeAMinutes": 3,
            "paralegalHours": 0,
            "paralegalMinutes": 0
        },
        {
            "id": "54d7c7fd-a5ca-4381-b551-e9c2dd3acac2",
            "workDescription": "Reading Case Summary of Asif",
            "gradeAHours": 1,
            "gradeAMinutes": 3,
            "paralegalHours": 0,
            "paralegalMinutes": 0
        },
        {
            "id": "7c6e02d4-6f35-4bc3-8a01-a0a044494029",
            "workDescription": "Reviewing Bank Statement from 2020 to 2025",
            "gradeAHours": 4,
            "gradeAMinutes": 0,
            "paralegalHours": 0,
            "paralegalMinutes": 0
        },
        {
            "id": "5c1155bc-b83b-46d4-888e-ec0ca720ed94",
            "workDescription": "Preparing Substantial Reply for Independence review",
            "gradeAHours": 15,
            "gradeAMinutes": 3,
            "paralegalHours": 0,
            "paralegalMinutes": 0
        },
        {
            "id": "c67c63d9-d6a8-4323-b7e6-bd1c03bc5259",
            "workDescription": "Drafting Harcharn's Statement dated 16 07 2026",
            "gradeAHours": 1,
            "gradeAMinutes": 0,
            "paralegalHours": 0,
            "paralegalMinutes": 0
        },
        {
            "id": "0dbbb0a7-9bb7-44f1-aa79-4726dc95ab64",
            "workDescription": "Reviewing and Collating Company Details",
            "gradeAHours": 0,
            "gradeAMinutes": 3,
            "paralegalHours": 0,
            "paralegalMinutes": 0
        }
    ]
};
      await generateBill(formData);
      setStatus('success');
      setTimeout(() => setStatus('idle'), 3000);
    } catch (err: any) {
      setStatus('error');
      setErrorMessage(err.message || 'Failed to generate bill');
      setTimeout(() => setStatus('idle'), 5000);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <button 
        type="button" 
        className="btn btn-primary w-full max-w-md py-4 text-lg"
        onClick={handleGenerate}
        disabled={status === 'loading'}
      >
        {status === 'loading' ? (
          <><div className="spinner"></div> Generating Invoice...</>
        ) : status === 'success' ? (
          <><CheckCircle /> Generated Successfully!</>
        ) : (
          <><FileText /> Generate Excel Bill</>
        )}
      </button>
      
      {status === 'error' && (
        <div className="mt-4 flex items-center gap-2 text-error bg-error/10 px-4 py-2 rounded-md border border-error/20">
          <AlertCircle size={18} /> {errorMessage}
        </div>
      )}
    </div>
  );
};
