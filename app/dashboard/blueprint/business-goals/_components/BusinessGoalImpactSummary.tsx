"use client";
import React from "react";
import { IoAddCircleOutline } from "react-icons/io5";
import { SlOptionsVertical } from "react-icons/sl";

interface Item {
  text: string;
  level: "High" | "Medium" | "Low";
}

interface SummaryCardProps {
  title: string;
  items: Item[];
}

const SummaryCard: React.FC<SummaryCardProps> = ({ title, items }) => {
  const getDotColor = (level: string) => {
    switch (level) {
      case "High":
        return "bg-red-500";
      case "Medium":
        return "bg-yellow-500";
      case "Low":
        return "bg-gray-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <div className=" rounded-lg shadow-lg p-5 border border-gray-200 flex-1 flex flex-col">
      {/* Card header */}
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-bold text-gray-900">{title}</h3>
        <button className="text-gray-500 hover:text-gray-700 transition-colors">
          <SlOptionsVertical />
        </button>
      </div>

      {/* Items list */}
      <div className="flex-1 space-y-3">
        {items.map((item, index) => (
          <div
            key={index}
            className="flex justify-between items-center p-3 rounded-md border border-gray-300 bg-gray-50"
          >
            <p className="text-gray-700 text-sm">{item.text}</p>
            <div className="flex items-center space-x-2">
              <span
                className={`w-3 h-3 rounded-full ${getDotColor(item.level)}`}
              />
              <button className="text-gray-500 hover:text-gray-700 transition-colors">
                <SlOptionsVertical />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add button */}
      <div className="mt-4 text-center">
        <button className="text-gray-700 hover:text-gray-500 transition-colors">
          <IoAddCircleOutline className="w-8 h-8 mx-auto" />
        </button>
      </div>
    </div>
  );
};

const BusinessGoalImpactSummary: React.FC = () => {
  // Dummy data (replace with backend data later)
  const challengesAndRisks: Item[] = [
    { text: "This is a test for Strength", level: "High" },
    { text: "This is a test for Strength", level: "Medium" },
    { text: "This is a test for Strength", level: "Low" },
    { text: "This is a test for Strength", level: "High" },
  ];

  const changeManagement: Item[] = [
    { text: "This is a test for Strength", level: "High" },
    { text: "This is a test for Strength", level: "Medium" },
    { text: "This is a test for Strength", level: "Low" },
    { text: "This is a test for Strength", level: "High" },
  ];

  const culturalRealignment: Item[] = [
    { text: "This is a test for Strength", level: "High" },
    { text: "This is a test for Strength", level: "Medium" },
    { text: "This is a test for Strength", level: "Low" },
    { text: "This is a test for Strength", level: "High" },
  ];

  const learningAndDevelopment: Item[] = [
    { text: "This is a test for Strength", level: "High" },
    { text: "This is a test for Strength", level: "Medium" },
    { text: "This is a test for Strength", level: "Low" },
    { text: "This is a test for Strength", level: "High" },
  ];

  return (
    <div className="p-6 bg-white rounded-2xl ">
      {/* Page header */}
      <div className="bg-white p-6 rounded-lg border border-gray-200 mb-6">
        <h2 className="text-xl font-bold text-gray-800">
          Business Goal Impact Summary
        </h2>
        <p className="text-gray-600 mt-2 text-base">
          Business Goal Impact summary gives decision-makers an in-depth
          overview of the various factors influencing the organization &#39;s
          strategic goals. It helps you understand the dynamics at play and make
          informed decisions to drive our company forward. Here, you will find
          detailed responses and analyses related to:
        </p>
      </div>

      {/* Grid section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        <SummaryCard title="Challenges and Risk" items={challengesAndRisks} />
        <SummaryCard title="Change Management" items={changeManagement} />
        <SummaryCard title="Cultural Realignment" items={culturalRealignment} />
        <SummaryCard
          title="Learning and Development"
          items={learningAndDevelopment}
        />
      </div>
    </div>
  );
};

export default BusinessGoalImpactSummary;
