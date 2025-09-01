"use client";

import React from "react";
import { Download } from "lucide-react";
import Button from "@/components/reusable-button/Button";

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
      timestamp: "2024-03-15 10:00 AM",
      eventType: "Tenant Created",
      user: "Admin User",
      details: "Tenant 'Acme Corp' created",
    },
    {
      id: 2,
      timestamp: "2024-03-15 11:30 AM",
      eventType: "Billing Changed",
      user: "Admin User",
      details: "Billing plan for 'Acme Corp' updated to 'Premium'",
    },
    {
      id: 3,
      timestamp: "2024-03-18 01:00 PM",
      eventType: "Subscription Renewed",
      user: "System",
      details: "Subscription for 'Acme Corp' renewed",
    },
    {
      id: 4,
      timestamp: "2024-03-19 04:30 PM",
      eventType: "Billing Changed",
      user: "Admin User",
      details: "Billing plan for 'Acme Corp' updated to 'Enterprise'",
    },
    {
      id: 5,
      timestamp: "2024-03-16 02:45 PM",
      eventType: "Invite Sent",
      user: "Admin User",
      details: "User 'jane.smith@acme.com' joined 'Acme Corp'",
    },
    {
      id: 4,
      timestamp: "2024-03-19 04:30 PM",
      eventType: "Billing Changed",
      user: "Admin User",
      details: "Billing plan for 'Acme Corp' updated to 'Enterprise'",
    },
    {
      id: 5,
      timestamp: "2024-03-16 02:45 PM",
      eventType: "Invite Sent",
      user: "Admin User",
      details: "User 'jane.smith@acme.com' joined 'Acme Corp'",
    },
  ];

  const handleExport = () => {
    // Implement export functionality here
    console.log("Exporting logs...");
  };

  return (
    <div className="bg-white min-h-screen p-6 rounded-sm">
      <div className="">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-semibold text-gray-900">Logs</h1>
        </div>

        {/* Table */}
        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-lg font-medium text-gray-700">
                  Timestamp
                </th>
                <th className="px-6 py-4 text-left text-lg font-medium text-gray-700">
                  Event Type
                </th>
                <th className="px-6 py-4 text-left text-lg font-medium text-gray-700">
                  User
                </th>
                <th className="px-6 py-4 text-left text-lg font-medium text-gray-700">
                  Details
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {logs.map((log) => (
                <tr key={log.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-base text-gray-700">
                    {log.timestamp}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-base text-gray-700">
                    {log.eventType}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-base text-gray-700">
                    {log.user}
                  </td>
                  <td className="px-6 py-4 text-base text-gray-700">
                    {log.details}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="mt-24 flex  justify-end p-4">
            <Button onClick={handleExport} className="flex items-center">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
          </div>
        </div>

        {/* Empty space to match the design */}
        <div className="mt-8"></div>
      </div>
    </div>
  );
};

export default LogsTable;
