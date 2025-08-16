"use client";
import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

const data = [
  { name: "High Impact", value: 87, color: "#FF6B6B" },
  { name: "Medium Impact", value: 77, color: "#FFD166" },
  { name: "Low Impact", value: 96, color: "#2D2D2D" },
];

export default function TrendsCard() {
  return (
    <div className="bg-white rounded-xl shadow-sm border p-5 w-full">
      {/* Header */}
      <h3 className="text-[18px] font-semibold text-[#1E3A8A]">Trends</h3>
      <p className="text-xs text-gray-500 mb-4">Emerging Industry Patterns</p>

      <div className="flex items-center gap-4">
        {/* Chart */}
        <div className="w-32 h-32">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Tooltip
                formatter={(value) => `${value}%`}
                contentStyle={{
                  backgroundColor: "#fff",
                  border: "1px solid #e5e5e5",
                  borderRadius: "4px",
                  padding: "8px",
                }}
              />
              <Pie
                data={data}
                innerRadius="70%"
                outerRadius="100%"
                dataKey="value"
                stroke="none"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Legend */}
        <div className="flex-1">
          <div className="flex justify-between border-b pb-1 mb-2">
            <div className="flex items-center gap-12">
                <p></p>
            <span className="text-[16px] font-medium text-gray-500">Impact level</span>
                </div>
            <span className="text-[16px] font-medium text-gray-500">total</span>
          </div>

          {data.map((item, index) => (
            <div
              key={index}
              className="flex items-center justify-between mb-2"
            >
              {/* Left side with percentage badge + name */}
              <div className="flex items-center gap-2">
                <span
                  className="text-xs font-medium px-1.5 py-0.5 rounded-full border"
                  style={{
                    backgroundColor: `${item.color}15`,
                    borderColor: `${item.color}40`,
                    color: item.color,
                  }}
                >
                  {item.value}%
                </span>
                <span className="text-[16px] text-gray-800">{item.name}</span>
              </div>

              {/* Total number */}
              <span className="text-[16px] font-medium text-gray-800">
                {item.value}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Footer link */}
      <div className="mt-3 flex justify-end">
        <a
          href="#"
          className="text-[16px] text-blue-600 hover:underline flex items-center gap-1"
        >
          View details →
        </a>
      </div>
    </div>
  );
}