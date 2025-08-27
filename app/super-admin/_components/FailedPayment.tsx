"use client";

import React, { useState } from 'react';

const FailedPayments: React.FC = () => {
  const [selectedPayments, setSelectedPayments] = useState<string[]>([]);

  const handlePaymentSelection = (paymentId: string) => {
    setSelectedPayments(prev => 
      prev.includes(paymentId) 
        ? prev.filter(id => id !== paymentId)
        : [...prev, paymentId]
    );
  };

  const handleSelectAllPayments = () => {
    const allPaymentIds = ['A', 'B', 'C', 'D', 'E'];
    setSelectedPayments(prev => 
      prev.length === allPaymentIds.length ? [] : allPaymentIds
    );
  };

  const handleRetrySelectedPayments = () => {
    console.log('Retrying selected payments:', selectedPayments);
    // Handle retry logic here
    setSelectedPayments([]);
  };

  const failedPayments = [
    { id: 'A', customer: 'Customer A', amount: '$100', date: '2024-01-15', status: 'Failed' },
    { id: 'B', customer: 'Customer B', amount: '$75', date: '2024-01-17', status: 'Failed' },
    { id: 'C', customer: 'Customer C', amount: '$150', date: '2024-01-18', status: 'Failed' },
    { id: 'D', customer: 'Customer D', amount: '$150', date: '2024-01-19', status: 'Failed' },
    { id: 'E', customer: 'Customer E', amount: '$150', date: '2024-01-18', status: 'Failed' }
  ];

  return (
    <div className="bg-gray-50 min-h-screen p-6">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-lg shadow-sm">
          <div className="p-6 pb-4">
            <h1 className="text-lg font-semibold text-gray-900 mb-6">Failed Payments</h1>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">
                      <input
                        type="checkbox"
                        checked={selectedPayments.length === failedPayments.length}
                        onChange={handleSelectAllPayments}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="ml-2">Select</span>
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Customer</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Amount</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Date</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {failedPayments.map((payment) => (
                    <tr key={payment.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-4">
                        <input
                          type="checkbox"
                          checked={selectedPayments.includes(payment.id)}
                          onChange={() => handlePaymentSelection(payment.id)}
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-900">{payment.customer}</td>
                      <td className="py-3 px-4 text-sm text-gray-900">{payment.amount}</td>
                      <td className="py-3 px-4 text-sm text-gray-900">{payment.date}</td>
                      <td className="py-3 px-4">
                        <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full font-medium">
                          {payment.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          
          <div className="p-6 pt-4 border-t border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                {selectedPayments.length > 0 && (
                  <span className="text-sm text-gray-600">
                    {selectedPayments.length} payment{selectedPayments.length > 1 ? 's' : ''} selected
                  </span>
                )}
              </div>
              <button
                onClick={handleRetrySelectedPayments}
                disabled={selectedPayments.length === 0}
                className="bg-blue-600 text-white py-2 px-6 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors font-medium disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                Retry Selected Payments
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FailedPayments;