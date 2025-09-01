"use client";

import React from 'react';
import { AlertTriangle } from 'lucide-react';
import Button from '@/components/reusable-button/Button';

const ExpiringTrials: React.FC = () => {
  const expiringCompanies = [
    {
      id: 1,
      name: 'Tech Innovators Inc.',
      description: 'TechCorp, DataFlow, and 1 others need attention'
    },
    {
      id: 2,
      name: 'Global Solutions Ltd.',
      description: 'TechCorp, DataFlow, and 1 others need attention'
    },
    {
      id: 3,
      name: 'Future Dynamics Corp..',
      description: 'TechCorp, DataFlow, and 1 others need attention'
    }, 
    {
      id: 2,
      name: 'Global Solutions Ltd.',
      description: 'TechCorp, DataFlow, and 1 others need attention'
    },
    {
      id: 3,
      name: 'Future Dynamics Corp..',
      description: 'TechCorp, DataFlow, and 1 others need attention'
    }
  ];

  return (
    <div className="bg-white rounded-lg p-10 border my-6 ml-6 border-gray-200 ">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-[#0b1c33]">Expiring this week</h2>
        
      </div>

      {/* Company List */}
      <div className="border rounded-sm ">
        {expiringCompanies.map((company) => (
          <div key={company.id} className="flex  items-center space-x-4 p-4   hover:bg-gray-50 ">
            <div className=" bg-amber-100 rounded-lg p-2">
              <AlertTriangle className="w-8 h-8  text-yellow-600 " />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-semibold text-gray-700">{company.name}</h3>
              <p className="text-base text-[#231f20] mt-1">{company.description}</p>
            </div>
          </div>
        ))}
        <div className='mt-32 text-end p-12'>
        <Button >
          Send Trial Reminders
        </Button>
      </div>
      </div>
      
    </div>
  );
};

export default ExpiringTrials;