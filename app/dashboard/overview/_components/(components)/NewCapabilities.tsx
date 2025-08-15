"use client";
import React from "react";

// Define the data for the capabilities table
const capabilitiesData = [
  {
    goal: "Launch AI Product",
    capabilityName: "AI Model Training",
    capabilityType: "Core",
  },
  {
    goal: "Expand Regional Operations",
    capabilityName: "Language Localization",
    capabilityType: "Differentiation",
  },
];

export default function NewCapabilities() {
  return (
    // The main container with responsive styling
    <div className="bg-white rounded-lg shadow p-4 ">
      <h2 className="text-lg font-semibold text-blue-800 mb-4">
        Build new Capabilities
      </h2>

      {/* Wrapper to handle horizontal scrolling on small screens */}
      <div className="overflow-x-auto">
        <div className="min-w-[500px]">
          {/* Table Headers using flexbox for better control */}
          <div className="flex justify-between text-sm font-medium text-gray-500 pb-2 border-t border-gray-200 pt-4">
            <div className="w-1/3 px-2">Goal</div>
            <div className="w-1/3 px-2">Capability Name</div>
            <div className="w-1/3 px-2">Capability Type</div>
          </div>

          {/* Data Rows */}
          {capabilitiesData.map((item, index) => (
            <div
              key={index}
              className="flex justify-between items-center border-t border-gray-200 py-4"
            >
              {/* Goal */}
              <div className="w-1/3 px-2 text-sm font-medium text-gray-800">
                {item.goal}
              </div>
              {/* Capability Name */}
              <div className="w-1/3 px-2 text-sm text-gray-700">
                {item.capabilityName}
              </div>
              {/* Capability Type */}
              <div className="w-1/3 px-2 text-sm font-semibold text-gray-700">
                {item.capabilityType}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
