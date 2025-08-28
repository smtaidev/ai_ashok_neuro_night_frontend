"use client";
import React from 'react';
import { AlertTriangle } from 'lucide-react';

const TrialReminders: React.FC = () => {
  const handleSendReminders = () => {
    console.log('Sending trial reminders...');
    // Handle sending reminders logic here
  };

  const expiringTrials = [
    {
      id: '1',
      companyName: 'Tech Innovators Inc.',
      description: 'TechCorp, DataFlow, and 1 others need attention'
    },
    {
      id: '2',
      companyName: 'Global Solutions Ltd.',
      description: 'TechCorp, DataFlow, and 1 others need attention'
    },
    {
      id: '3',
      companyName: 'Future Dynamics Corp.',
      description: 'TechCorp, DataFlow, and 1 others need attention'
    }
  ];

  return (
    <div className="bg-gray-50 min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-lg shadow-sm">
          <div className="p-6 pb-4">
            <h1 className="text-lg font-semibold text-gray-900 mb-6">Expiring this week</h1>
            
            <div className="space-y-3 max-h-80 overflow-y-auto">
              {expiringTrials.map((trial) => (
                <div key={trial.id} className="flex items-start space-x-3 p-3 rounded-lg ">
                  <div className="p-1 bg-yellow-100 rounded mt-0.5">
                    <AlertTriangle className="w-4 h-4 text-yellow-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-sm font-medium text-gray-900">{trial.companyName}</h3>
                    <p className="text-sm text-gray-600 mt-1">{trial.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="p-6 pt-4 flex justify-end  ">
            <button
              onClick={handleSendReminders}
              className=" bg-blue-600  text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors font-medium"
            >
              Send Trial Reminders
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrialReminders;