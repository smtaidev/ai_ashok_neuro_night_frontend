
"use client";
import React from 'react';
import { CheckCircle, XCircle, Clock, Eye, Download, MoreHorizontal } from 'lucide-react';

interface Payment {
  id: number;
  invoiceId: string;
  date: string;
  amount: string;
  status: 'Success' | 'Failed' | 'Pending';
}

const PaymentTable: React.FC = () => {
  // Dummy data - replace with API data later
  const payments: Payment[] = [
    {
      id: 1,
      invoiceId: 'INV-20240315-001',
      date: '05-08-2025',
      amount: '$100.00',
      status: 'Success'
    },
    {
      id: 2,
      invoiceId: 'INV-20240215-002',
      date: '05-08-2025',
      amount: '$200.00',
      status: 'Failed'
    },
    {
      id: 3,
      invoiceId: 'INV-20240115-003',
      date: '05-08-2025',
      amount: '$300.00',
      status: 'Pending'
    }
  ];

  const getStatusIcon = (status: Payment['status']) => {
    switch (status) {
      case 'Success':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'Failed':
        return <XCircle className="w-5 h-5 text-red-500" />;
      case 'Pending':
        return <Clock className="w-5 h-5 text-blue-500" />;
      default:
        return null;
    }
  };

  const getActionButtons = (status: Payment['status']) => {
    switch (status) {
      case 'Success':
        return (
          <div className="flex items-center space-x-2">
            <div className="flex items-center space-x-1">
              <button className="flex items-center text-gray-600 hover:text-blue-600 text-sm">
                <Eye className="w-4 h-4 mr-1" />
                View
              </button>
              <span className="text-gray-400"></span>
            </div>
            <button className="p-1 hover:bg-gray-100 rounded">
              <MoreHorizontal className="w-4 h-4 text-gray-500" />
            </button>
          </div>
        );
      case 'Failed':
        return (
          <div className="flex items-center space-x-2">
            <div className="flex items-center space-x-1">
              <button className="flex items-center text-gray-600 hover:text-blue-600 text-sm">
                <Download className="w-4 h-4 mr-1" />
                Export
              </button>
              <span className="text-gray-400"></span>
            </div>
            <button className="p-1 hover:bg-gray-100 rounded">
              <MoreHorizontal className="w-4 h-4 text-gray-500" />
            </button>
          </div>
        );
      case 'Pending':
        return (
          <div className="flex items-center">
            <button className="p-1 hover:bg-gray-100 rounded">
              <MoreHorizontal className="w-4 h-4 text-gray-500" />
            </button>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <h1 className="text-2xl font-semibold text-gray-900 mb-6">Payment</h1>

        {/* Table */}
        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="bg-blue-800">
                <th className="px-6 py-4 text-left text-sm font-medium text-white">
                  Invoice ID
                </th>
                <th className="px-6 py-4 text-left text-sm font-medium text-white">
                  Date
                </th>
                <th className="px-6 py-4 text-left text-sm font-medium text-white">
                  Amount
                </th>
                <th className="px-6 py-4 text-left text-sm font-medium text-white">
                  Payment Status
                </th>
                <th className="px-6 py-4 text-left text-sm font-medium text-white">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {payments.map((payment) => (
                <tr key={payment.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {payment.invoiceId}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {payment.date}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {payment.amount}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-gray-900">{payment.status}</span>
                      {getStatusIcon(payment.status)}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {getActionButtons(payment.status)}
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

export default PaymentTable;