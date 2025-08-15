"use client";
import React from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

// Define the data for the pie chart
const complianceData = [
  { name: "High", value: 47           , color: "#F08080" },
  { name: "Medium", value: 27, color: "#FFD700" },
  { name: "Low", value: 26, color: "#2F4F4F" },
];

export default function RegulatoryCompliance() {
  return (
    <div className="bg-white rounded-lg shadow p-4">
      <h2 className="text-lg font-semibold text-blue-800">
        Regulatory Compliance
      </h2>
      <p className="text-sm text-gray-500 mb-4">Total Compliance Impacting the Future</p>

      <div className="grid grid-cols-1 md:grid-cols-2 border-t border-b pb-4 border-gray-200 gap-6 pt-4">
        {/* Pie Chart */}
        <div className="flex flex-col items-center">
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={complianceData}
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={80}
                paddingAngle={2}
                dataKey="value"
              >
                {complianceData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>

          {/* Badges Legend */}
          <div className="flex flex-wrap justify-center gap-2 mt-4">
            {complianceData.map((item, index) => (
              <div
                key={index}
                className="flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium"
                style={{
                  backgroundColor: `${item.color}20`,
                  color: item.color,
                  border: `1px solid ${item.color}`,
                }}
              >
                <span
                  className="w-2.5 h-2.5 rounded-full"
                  style={{ backgroundColor: item.color }}
                ></span>
                <span className="text-black">
                  {item.name}
                </span>
              </div>
            ))}
          </div>
        </div>
        
        {/* Compliance points */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Total Compliance Impacting the Future</h3>
          <ul className="space-y-2">
            <li className="text-sm text-gray-700 list-disc ml-4">Market competition, technological disruption, poor strategic alignment.</li>
            <li className="text-sm text-gray-700 list-disc ml-4">Supply chain disruptions, process inefficiencies, cybersecurity breaches.</li>
            <li className="text-sm text-gray-700 list-disc ml-4">Budget overruns, currency fluctuations, interest rate changes.</li>
            <li className="text-sm text-gray-700 list-disc ml-4">Regulatory changes, data privacy violations, legal challenges.</li>
          </ul>
        </div>
      </div>

      <div className="text-right mt-4">
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
