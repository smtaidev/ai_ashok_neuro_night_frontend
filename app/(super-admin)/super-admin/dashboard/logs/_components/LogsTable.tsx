
"use client";

import React from 'react';
import { Download } from 'lucide-react';

interface Log {
  id: number;
  timestamp: string;
  eventType: string;
  user: string;
  details: string;
}

const LogsTable: React.FC = () => {
  // Dummy data - replace with API data later
  const logs: Log[] = [
    {
      id: 1,
      timestamp: '2024-03-15 10:00 AM',
      eventType: 'Tenant Created',
      user: 'Admin User',
      details: "Tenant 'Acme Corp' created"
    },
    {
      id: 2,
      timestamp: '2024-03-15 11:30 AM',
      eventType: 'Billing Changed',
      user: 'Admin User',
      details: "Billing plan for 'Acme Corp' updated to 'Premium'"
    },
    {
      id: 3,
      timestamp: '2024-03-18 01:00 PM',
      eventType: 'Subscription Renewed',
      user: 'System',
      details: "Subscription for 'Acme Corp' renewed"
    },
    {
      id: 4,
      timestamp: '2024-03-19 04:30 PM',
      eventType: 'Billing Changed',
      user: 'Admin User',
      details: "Billing plan for 'Acme Corp' updated to 'Enterprise'"
    },
    {
      id: 5,
      timestamp: '2024-03-16 02:45 PM',
      eventType: 'Invite Sent',
      user: 'Admin User',
      details: "User 'jane.smith@acme.com' joined 'Acme Corp'"
    }
  ];

  const handleExport = () => {
    // Implement export functionality here
    console.log('Exporting logs...');
  };

  return (
    <div className="bg-white min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold text-gray-900">Logs</h1>
          <button
            onClick={handleExport}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
          >
            <Download className="w-4 h-4 mr-2" />
            Export
          </button>
        </div>

        {/* Table */}
        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">
                  Timestamp
                </th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">
                  Event Type
                </th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">
                  User
                </th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">
                  Details
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {logs.map((log) => (
                <tr key={log.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {log.timestamp}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {log.eventType}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {log.user}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {log.details}
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

export default LogsTable;