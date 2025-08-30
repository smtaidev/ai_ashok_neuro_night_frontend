"use client";

import React, { useState } from 'react';
import { Search, MoreHorizontal } from 'lucide-react';

interface Company {
  id: number;
  name: string;
  plan: string;
  status: 'Active' | 'Suspend' | 'Trial';
  adminEmail: string;
  renewal: string;
}

const CompaniesTable: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  // Dummy data - replace with API data later
  const companies: Company[] = [
    {
      id: 1,
      name: 'TaleStream',
      plan: 'Pro',
      status: 'Active',
      adminEmail: 'ubego02@gmail.com',
      renewal: '15-08-2025'
    },
    {
      id: 2,
      name: 'Victoria',
      plan: 'Pro',
      status: 'Suspend',
      adminEmail: 'bengplas77@gmail.com',
      renewal: '09-09-2025'
    },
    {
      id: 3,
      name: 'Acme Inc.',
      plan: 'Starter',
      status: 'Trial',
      adminEmail: 'ajajlmtal0@gmail.com',
      renewal: '05-10-2025'
    }
  ];

  const getStatusBadge = (status: Company['status']) => {
    const baseClasses = 'px-3 py-1 rounded-full text-xs font-medium';
    switch (status) {
      case 'Active':
        return `${baseClasses} bg-green-100 text-green-800`;
      case 'Suspend':
        return `${baseClasses} bg-red-100 text-red-800`;
      case 'Trial':
        return `${baseClasses} bg-blue-100 text-blue-800`;
      default:
        return baseClasses;
    }
  };

  const getActionButton = (status: Company['status']) => {
    const baseClasses = 'px-3 py-1 rounded text-xs font-medium';
    switch (status) {
      case 'Active':
        return `${baseClasses} bg-red-500 text-white`;
      case 'Suspend':
        return `${baseClasses} bg-green-500 text-white`;
      case 'Trial':
        return `${baseClasses} bg-green-500 text-white`;
      default:
        return baseClasses;
    }
  };

  const getActionText = (status: Company['status']) => {
    switch (status) {
      case 'Active':
        return 'Suspend';
      case 'Suspend':
        return 'Activate';
      case 'Trial':
        return 'Activate';
      default:
        return 'Action';
    }
  };

  return (
    <div className="bg-white min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold text-gray-900">Companies</h1>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search"
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Table */}
        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  SN
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Company Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Plan
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Admin Contact Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Renewal
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {companies.map((company, index) => (
                <tr key={company.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {index + 1}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {company.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {company.plan}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={getStatusBadge(company.status)}>
                      {company.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {company.adminEmail}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {company.renewal}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <div className="flex items-center space-x-2">
                      <button className={getActionButton(company.status)}>
                        {getActionText(company.status)}
                      </button>
                      <button className="p-1 hover:bg-gray-100 rounded">
                        <MoreHorizontal className="w-4 h-4 text-gray-500" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex justify-center items-center space-x-2 mt-6">
          <button 
            className="p-2 hover:bg-gray-100 rounded"
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
          >
            <span className="text-gray-500">‹</span>
          </button>
          
          {[1, 2, 3, 4, 5].map((page) => (
            <button
              key={page}
              className={`w-8 h-8 rounded ${
                page === currentPage
                  ? 'bg-blue-500 text-white'
                  : 'hover:bg-gray-100 text-gray-700'
              }`}
              onClick={() => setCurrentPage(page)}
            >
              {page}
            </button>
          ))}
          
          <button 
            className="p-2 hover:bg-gray-100 rounded"
            onClick={() => setCurrentPage(currentPage + 1)}
          >
            <span className="text-gray-500">›</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CompaniesTable;