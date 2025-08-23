"use client";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import React from "react";

const BusinessGoals: React.FC = () => {
  // Business Goal Priorities Data
  const prioritiesData = [
    { name: "High", value: 47, color: "#FF6B6B" },
    { name: "Medium", value: 27, color: "#FFD93D" },
    { name: "Low", value: 26, color: "#2E2E2E" },
  ];

  // Goal Horizons Data
  const horizonsData = [
    { name: "Short Term", value: 5, color: "#5AB2FF" },
    { name: "Long Term", value: 3, color: "#1E3A8A" },
  ];

  // Goal Breakdown Data
  const breakdownData = [
    { name: "Marketing", value: 40, count: 10, color: "#FFB020" },
    { name: "Finance", value: 16, count: 4, color: "#5AB2FF" },
    { name: "Technology", value: 36, count: 9, color: "#1E3A8A" },
    { name: "HR", value: 8, count: 2, color: "#FF4C4C" },
    { name: "Compliance", value: 0, count: 0, color: "#666666" },
  ];

  return (
    <div className="p-4 bg-white rounded-2xl shadow-sm">
      {/* Header */}
      <div className="mb-4">
        <h2 className="text-lg font-semibold text-gray-800">Business Goals</h2>
        <p className="text-sm text-gray-500">
          Visualizing how strategic themes drive and align with business goals.
        </p>
      </div>

      {/* Top Row (2 sections) */}
      <div className="grid grid-cols-2 gap-6 mb-6">
        {/* Business Goal Priorities */}
        <div className="p-4 border rounded-xl">
          <h3 className="text-sm font-medium mb-2">Business Goal Priorities</h3>
          <div className="flex flex-col items-center">
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={prioritiesData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={80}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {prioritiesData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value, name) => [`${value}%`, name as string]}
                />
              </PieChart>
            </ResponsiveContainer>
            {/* Legend (High / Medium / Low with dot) */}
            <div className="flex gap-4 mt-2 text-sm">
              {prioritiesData.map((item, i) => (
                <div
                  key={i}
                  className="flex items-center gap-1 px-2 py-0.5 border rounded-full"
                  style={{ borderColor: item.color }}
                >
                  <span
                    className="w-3 h-3 rounded-full"
                    style={{ background: item.color }}
                  ></span>
                  <span>{item.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Goal Horizons */}
        <div className="p-4 border rounded-xl flex flex-col items-center">
          <h3 className="text-sm font-medium mb-2">Goal Horizons</h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart
              layout="vertical"
              data={horizonsData}
              margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
            >
              <XAxis type="number" hide />
              <YAxis
                dataKey="name"
                type="category"
                tickLine={false}
                axisLine={false}
              />
              <Tooltip
                formatter={(value, name) => [`${value}`, name as string]}
              />
              <Bar dataKey="value" radius={[0, 6, 6, 0]}>
                {horizonsData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>

          {/* Legend under chart */}
          <div className="flex gap-6 mt-3 text-sm">
            {horizonsData.map((item, i) => (
              <div key={i} className="flex items-center gap-1">
                <span
                  className="w-3 h-3 rounded-full"
                  style={{ background: item.color }}
                ></span>
                <span>{item.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Row (Full Width) */}
      <div className="p-4 border rounded-xl">
        <h3 className="text-sm font-medium mb-2">Goal Breakdown By Function</h3>
        <div className="flex items-center gap-6">
          {/* Donut Chart */}
          <div className="w-1/2">
            <ResponsiveContainer width="100%" height={220}>
              <PieChart>
                <Pie
                  data={breakdownData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={80}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {breakdownData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value, name) => [`${value}%`, name as string]}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Legend */}
          <div className="w-1/2 flex flex-col gap-2">
            {breakdownData.map((item, i) => (
              <div
                key={i}
                className="flex justify-between items-center text-sm"
              >
                <div className="flex items-center gap-2">
                  {/* Outline Badge */}
                  {item.value > 0 && (
                    <span
                      className="px-2 py-0.5 border rounded-full text-xs font-medium"
                      style={{ borderColor: item.color, color: item.color }}
                    >
                      {item.value}%
                    </span>
                  )}
                  <span>{item.name}</span>
                </div>
                <span>{item.count > 0 ? item.count : "none"}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessGoals;
