"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { ChevronDown } from 'lucide-react';

const OrganaizationInfo: React.FC = () => {
  const [formData, setFormData] = useState({
    companyName: 'Monsters, Inc.',
    founded: 'Abc',
    year: '2024',
    businessType: 'See more',
    companyDescription: 'Welcome to the.......................................'
  });

  const [isBusinessTypeOpen, setIsBusinessTypeOpen] = useState(false);

  // Mock image - replace with your actual import
  const humanImage = "/api/placeholder/400/400";

  const businessTypeOptions = [
    'See more',
    'Technology',
    'Healthcare',
    'Finance',
    'Manufacturing',
    'Retail',
    'Education',
    'Consulting'
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleUpdateCompanyInfo = () => {
    console.log('Company Info Updated:', formData);
    // Here you would make your API call
  };

  return (
    <div className="max-w-6xl mx-auto">
      {/* Top Section with Image and Text */}
      <div className="w-full ml-3 md:h-[400px] space-y-6 bg-white p-12 mb-12 md:flex justify-between items-center rounded-lg shadow-md gap-4">
        {/* text left side  */}
        <div className="flex-1 space-y-4 md:text-left">
          <p className="text-base text-[#231f20] mt-2 leading-relaxed">
            Track and analyze key financial metrics that influence strategy
            development and execution. This component helps you monitor revenue,
            expenses, cash flow, and credit risks to align financials with the
            strategic direction.
          </p>
        </div>
        <div className="flex-none mr-20 w-full md:w-[400px]">
          <Image
            src={humanImage}
            alt="Financial Overview Image"
            layout="responsive"
            width={400}
            height={400}
          />
        </div>
      </div>

      {/* Company Information Form */}
      <div className="bg-white p-8 rounded-lg shadow-md">
        <div className="space-y-6">
        {/* Company Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Company Name
          </label>
          <input
            type="text"
            value={formData.companyName}
            onChange={(e) => handleInputChange('companyName', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
          />
        </div>

        {/* Founded */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Founded
          </label>
          <input
            type="text"
            value={formData.founded}
            onChange={(e) => handleInputChange('founded', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
          />
        </div>

        {/* Year */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Year
          </label>
          <input
            type="text"
            value={formData.year}
            onChange={(e) => handleInputChange('year', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
          />
        </div>

        {/* Business type */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Business type
          </label>
          <div className="relative">
            <button
              type="button"
              onClick={() => setIsBusinessTypeOpen(!isBusinessTypeOpen)}
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md bg-white text-left flex items-center justify-between hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <span className="text-gray-700">{formData.businessType}</span>
              <ChevronDown className="w-4 h-4 text-gray-400" />
            </button>
            
            {isBusinessTypeOpen && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-md shadow-lg z-10">
                {businessTypeOptions.map((option) => (
                  <button
                    key={option}
                    type="button"
                    className="w-full px-3 py-2 text-sm text-left hover:bg-gray-50 text-gray-700"
                    onClick={() => {
                      handleInputChange('businessType', option);
                      setIsBusinessTypeOpen(false);
                    }}
                  >
                    {option}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Company Descriptions */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Company Descriptions
          </label>
          <textarea
            value={formData.companyDescription}
            onChange={(e) => handleInputChange('companyDescription', e.target.value)}
            rows={8}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none text-sm"
          />
        </div>

        {/* Update Button */}
        <div className="flex justify-end pt-4">
          <button
            onClick={handleUpdateCompanyInfo}
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-2 rounded-md transition-colors duration-200 text-sm"
          >
            Updated Company Info
          </button>
        </div>
              </div>
      </div>
    </div>
  );
};

export default OrganaizationInfo;