// PieChartReusable.tsx
"use client";
import React from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

// 1. Define the type for a single data point
interface PieChartData {
  name: string;
  value: number;
  color: string;
}

// 2. Define the props for the reusable component
interface PieChartReusableProps {
  title: string;
  subtitle: string;
  data: PieChartData[]; // Use the defined PieChartData type
  points: string[];
  footerLinkText: string;
  footerLinkHref: string;
  secondTitle: string;
}

// Reuseable Pie Chart Component with TypeScript
export default function PieChartReusable({
  title,
  subtitle,
  data,
  points,
  footerLinkText,
  footerLinkHref,
  secondTitle,
}: PieChartReusableProps) {
  return (
    <div className="bg-white rounded-lg shadow p-4">
      <h2 className="text-lg font-semibold text-[#1E3A8A]">
        {title}
      </h2>
      <p className="text-sm text-gray-500 mb-4">{subtitle}</p>

      <div className="grid grid-cols-1 md:grid-cols-2 border-t border-b p-4 border-gray-200 gap-6 pt-4">
        {/* Pie Chart Section */}
        <div className="flex flex-col items-center">
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={80}
                fill="#8884d8"
                paddingAngle={2}
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>

          {/* Badges Legend */}
          <div className="flex flex-wrap justify-center gap-2 mt-4">
            {data.map((item, index) => (
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
        
        {/* Points List */}
        <div>
          <h3 className="text-lg font-semibold mb-2">{secondTitle}</h3>
          <ul className="space-y-2">
            {points.map((point, index) => (
              <li key={index} className="text-sm text-gray-700 list-disc ml-4">
                {point}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="text-right mt-4">
        <a
          href={footerLinkHref}
          className="text-blue-600 text-sm font-medium hover:underline"
        >
          {footerLinkText} →
        </a>
      </div>
    </div>
  );
}