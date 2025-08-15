"use client";
import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const pieData = [
  { name: "Very High", value: 13, color: "#FF8042" },
  { name: "High", value: 14, color: "#FF6384" },
  { name: "Moderate", value: 22, color: "#FFCE56" },
  { name: "Low", value: 21, color: "#36A2EB" },
  { name: "Very Low", value: 30, color: "#4BC0C0" },
];

const barData = [
  { name: "Very High", impact: 20, ability: 20 },
  { name: "High", impact: 40, ability: 30 },
  { name: "Moderate", impact: 10, ability: 45 },
  { name: "Low", impact: 30, ability: 30 },
  { name: "Very Low", impact: 10, ability: 25 },
];

export default function BusinessChallenges() {
  return (
    <div className="bg-white rounded-lg shadow p-4">
      <h2 className="text-lg font-semibold text-blue-800">
        Business Challenges
      </h2>
      <p className="text-sm text-gray-500 mb-4">Impact on business</p>

      <div className="grid grid-cols-1 md:grid-cols-2 border-t border-b pb-4 border-gray-200 gap-6 pt-4">
        {/* Pie Chart */}
        <div className="flex flex-col items-center">
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={80}
                paddingAngle={2}
                dataKey="value"
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>

          {/* Badges Legend */}
          <div className="flex flex-wrap justify-center gap-2 mt-4">
            {pieData.map((item, index) => (
              <div
                key={index}
                className="flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium"
                style={{
                  backgroundColor: `${item.color}20`, // light background
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

        {/* Bar Chart */}
        <div>
          <h3 className="text-center text-sm font-medium mb-2">
            Ability to Address Challenges
          </h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={barData} barCategoryGap="30%">
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="impact" stackId="a" fill="#FFCE56" />
              <Bar dataKey="ability" stackId="a" fill="#008000" />
            </BarChart>
          </ResponsiveContainer>

          {/* Legend */}
          <div className="flex justify-center gap-4 mt-4">
            <div className="flex items-center gap-1">
              <span
                className="w-3 h-3 rounded"
                style={{ backgroundColor: "#FFCE56" }}
              ></span>
              <span className="text-sm">Impact Ability</span>
            </div>
            <div className="flex items-center gap-1">
              <span
                className="w-3 h-3 rounded"
                style={{ backgroundColor: "#008000" }}
              ></span>
              <span className="text-sm">Ability</span>
            </div>
          </div>
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
