"use client";

import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface Subscription {
  id: number;
  companyName: string;
  starterDate: string;
  renewalDate: string;
  status: 'Premium' | 'Trial' | 'Paid';
  plan: 'Upgrade' | 'Downgrade' | 'Trial Extend';
}

const SubscriptionsTable: React.FC = () => {
  const [selectedPlans, setSelectedPlans] = useState<{[key: number]: string}>({});

  // Dummy data - replace with API data later
  const subscriptions: Subscription[] = [
    {
      id: 1,
      companyName: 'TaleStream',
      starterDate: '10-08-2025',
      renewalDate: '13-09-2025',
      status: 'Premium',
      plan: 'Upgrade'
    },
    {
      id: 2,
      companyName: 'Victoria',
      starterDate: '15-08-2025',
      renewalDate: '11-10-2025',
      status: 'Trial',
      plan: 'Downgrade'
    },
    {
      id: 3,
      companyName: 'Acme Inc.',
      starterDate: '16-08-2025',
      renewalDate: '20-09-2025',
      status: 'Paid',
      plan: 'Trial Extend'
    }
  ];

  const planOptions = ['Upgrade', 'Downgrade', 'Trial Extend', 'Basic', 'Pro', 'Premium'];

  const handlePlanChange = (subscriptionId: number, newPlan: string) => {
    setSelectedPlans(prev => ({
      ...prev,
      [subscriptionId]: newPlan
    }));
  };

  return (
    <div className="bg-gray-50 min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <h1 className="text-2xl font-semibold text-gray-900 mb-6">Subscriptions</h1>

        {/* Table */}
        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="bg-blue-800">
                <th className="px-6 py-4 text-left text-sm font-medium text-white">
                  Company Name
                </th>
                <th className="px-6 py-4 text-left text-sm font-medium text-white">
                  Starter date
                </th>
                <th className="px-6 py-4 text-left text-sm font-medium text-white">
                  Renewal Date
                </th>
                <th className="px-6 py-4 text-left text-sm font-medium text-white">
                  Status
                </th>
                <th className="px-6 py-4 text-left text-sm font-medium text-white">
                  Plan
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {subscriptions.map((subscription) => (
                <tr key={subscription.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {subscription.companyName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {subscription.starterDate}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {subscription.renewalDate}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {subscription.status}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <div className="relative">
                      <select
                        className="appearance-none bg-white border border-gray-300 rounded px-3 py-2 pr-8 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent cursor-pointer"
                        value={selectedPlans[subscription.id] || subscription.plan}
                        onChange={(e) => handlePlanChange(subscription.id, e.target.value)}
                      >
                        {planOptions.map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                      <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Empty space to match the design */}
        <div className="mt-8"></div>
      </div>
    </div>
  );
};

export default SubscriptionsTable;