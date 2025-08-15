"use client";
import React, { useState } from "react";
import { ChevronDown, ChevronUp } from 'lucide-react';
import clarhetLogo from '@/public/image/ClarhetAI-Logo.png'
import Image from "next/image";

// Define the static data for the financial table
const financialData = [
  { label: "Total revenue", value: "$6,000" },
  { label: "Total expenses", value: "$4,500" },
  { label: "Budget Allocated to business goals", value: "$3,000" },
];

// Define the static data for the recommendations
const recommendations = [
  {
    title: "Reveals recommendations for increasing revenue",
    content: "Implement targeted marketing campaigns to new demographics. Optimize pricing strategies based on market analysis. Introduce new product tiers or bundles to increase average order value.",
  },
  {
    title: "shows expense reduction tips.",
    content: "Review and renegotiate vendor contracts. Automate manual processes to reduce labor costs. Consolidate software subscriptions and eliminate redundant services.",
  },
];

// A reusable component for the collapsible recommendation items
type Recommendation = {
  title: string;
  content: string;
};

const RecommendationItem = ({ item }: { item: Recommendation }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="py-2">
      <div 
        className="flex justify-between items-center cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="text-[16px] font-medium text-gray-700">{item.title}</span>
        {isOpen ? <ChevronUp size={16} className="text-gray-500" /> : <ChevronDown size={16} className="text-gray-500" />}
      </div>
      {isOpen && (
        <div className="py-2 text-[15px] font-thin text-gray-500">
          <p>{item.content}</p>
        </div>
      )}
    </div>
  );
};

export default function FinancialSnapshot() {
  return (
    // Main container with shadow and padding
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-[18px] font-semibold text-blue-900 mb-6">
        Financial Snapshot
      </h2>

      {/* Main grid layout for financial data and recommendations */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 border-t border-gray-200 pt-6">
        {/* Financial Data section */}
        <div className="space-y-4">
          {financialData.map((item, index) => (
            <div key={index} className="flex justify-between items-center pb-2 border-b border-gray-200 last:border-b-0">
              <span className="text-[16px] text-gray-700">{item.label}</span>
              <span className="text-[16px] font-bold text-gray-900">{item.value}</span>
            </div>
          ))}
        </div>

        {/* Recommendations Section */}
        <div className="md:border-l md:pl-8 border-gray-200">
          <div className="flex items-center gap-2 mb-4">
           <Image 
              src={clarhetLogo} 
              alt="ClarhetAI Logo" 
              className="rounded-full w-8 p-1 bg-blue-100 h-8"
            />
            <h3 className="text-[16px] font-semibold text-gray-800">ClarhetAI Recommendations</h3>
          </div>
          <div className="space-y-2">
            {recommendations.map((item, index) => (
              <RecommendationItem key={index} item={item} />
            ))}
          </div>
        </div>
      </div>
       
    </div>
  );
}
