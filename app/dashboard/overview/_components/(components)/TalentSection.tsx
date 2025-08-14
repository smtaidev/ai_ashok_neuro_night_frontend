"use client";
import React, { useState } from "react";
import { ChevronDown, ChevronUp } from 'lucide-react';

// Define the types for the data structures
interface TalentMetric {
  label: string;
  value: string;
}

interface ActionItem {
  title: string;
  details: string | null;
}

interface TrendItem {
  title: string;
}

// Data for the three metric cards at the top
const talentMetrics: TalentMetric[] = [
  { label: "Total Employees", value: "200" },
  { label: "Active Teams", value: "12" },
  { label: "Vacant Positions", value: "5" },
];

// Data for the 'Action Taken' collapsible section
const actions: ActionItem[] = [
  {
    title: "Talent Acquisition Campaigns",
    details: "Launched a recruitment drive targeting tech talent; 100+ applications received.",
  },
  {
    title: "Employee Retention Programs",
    details: null,
  },
  {
    title: "Training & Upskilling",
    details: null,
  },
  {
    title: "Flexible Work Policies",
    details: null,
  },
];

// Data for the 'Top Trends' collapsible section
const trends: TrendItem[] = [
  { title: "Shift to Remote Work" },
  { title: "AI & Automation Impact" },
  { title: "Diversity and Inclusion" },
  { title: "Employee Well-being" },
];

// A reusable component for a single collapsible item.
// It uses state to manage its open/closed state.
const CollapsibleItem: React.FC<{ item: ActionItem | TrendItem; isInitiallyOpen?: boolean }> = ({ item, isInitiallyOpen = false }) => {
  const [isOpen, setIsOpen] = useState(isInitiallyOpen);

  return (
    <div className="py-2">
      <div 
        className="flex justify-between items-center cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center">
            <span className="text-base text-gray-800 list-disc ml-4">{item.title}</span>
        </div>
        {isOpen ? <ChevronUp size={20} className="text-gray-500" /> : <ChevronDown size={20} className="text-gray-500" />}
      </div>
      {isOpen && 'details' in item && item.details && (
        <div className="py-2 text-[13px] text-gray-500 pl-8">
          <p>{item.details}</p>
        </div>
      )}
    </div>
  );
};

export default function TalentSection() {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-[18px] font-bold text-blue-900 mb-6">Talent</h2>

      {/* Metric Cards section */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4  lg:gap-8 mb-8">
        {talentMetrics.map((metric, index) => (
          <div key={index} className="bg-white border border-gray-200 rounded-lg p-4 text-center">
            <p className="text-[16px] font-medium text-gray-500">{metric.label}</p>
            <p className="text-[26px] font-semibold text-gray-800 mt-2">{metric.value}</p>
          </div>
        ))}
      </div>

      {/* Main content grid for collapsible sections */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6">
        {/* Action Taken section */}
        <div className="pr-4">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Action Taken: Bridging the Talent Gap</h3>
          <ul className="space-y-1 list-disc ml-4">
            {actions.map((item, index) => (
              <CollapsibleItem key={index} item={item} isInitiallyOpen={index === 0} />
            ))}
          </ul>
        </div>

        {/* Top Trends section with a left border for the divider */}
        <div className="pl-4 md:border-l md:pl-8 border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Top: Trends and Factors Affecting Workforce</h3>
          <ul className="space-y-1 list-disc ml-4">
            {trends.map((item, index) => (
              <CollapsibleItem key={index} item={item} />
            ))}
          </ul>
        </div>
      </div>

      <div className="text-right mt-6">
        <a
          href="#"
          className="text-blue-600 text-sm font-medium hover:underline"
        >
          Explore More →
        </a>
      </div>
    </div>
  );
}
