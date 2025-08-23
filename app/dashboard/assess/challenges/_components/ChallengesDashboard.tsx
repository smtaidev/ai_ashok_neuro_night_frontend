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
  ResponsiveContainer,
} from "recharts";
import { Grid, LayoutGrid } from "lucide-react";
import Link from "next/link";
import { BsFillGridFill } from "react-icons/bs";
import { PiSquareSplitHorizontalFill } from "react-icons/pi";
import ChallengesSummary from "./ChallengesSummarry";

// Types for our data structures
interface RiskCategory {
  name: string;
  score: number;
  color: string;
}

interface ImpactData {
  category: string;
  value: number;
  color: string;
}

interface OverviewData {
  category: string;
  value: number;
}

const ChallengesDashboard = () => {
  const [hoveredSegment, setHoveredSegment] = React.useState<string | null>(
    null
  );
  // Dummy data for Challenge Risk Score (gauge chart)
  const riskScoreData = [
    { name: "Low", value: 20, color: "#22c55e" },
    { name: "Medium", value: 40, color: "#eab308" },
    { name: "High", value: 30, color: "#f97316" },
    { name: "Critical", value: 10, color: "#ef4444" },
  ];

  // Dummy data for Risk Score by Category
  const riskCategories: RiskCategory[] = [
    { name: "Human", score: 45, color: "#6b7280" },
    { name: "Political", score: 45, color: "#6b7280" },
    { name: "Financial", score: 95, color: "#3b82f6" },
    { name: "Strategic", score: 25, color: "#6b7280" },
    { name: "Compliance", score: 30, color: "#6b7280" },
    { name: "Operational", score: 15, color: "#6b7280" },
  ];

  // Dummy data for Impact on Business (donut chart)
  const impactData: ImpactData[] = [
    { category: "Very Low", value: 25, color: "#22c55e" },
    { category: "Low", value: 20, color: "#eab308" },
    { category: "Moderate", value: 41, color: "#eab308" },
    { category: "High", value: 35, color: "#f97316" },
    { category: "Very High", value: 30, color: "#1e40af" },
  ];

  // Dummy data for Overview bar chart
  const overviewData: OverviewData[] = [
    { category: "Q1", value: 65 },
    { category: "Q2", value: 45 },
    { category: "Q3", value: 35 },
    { category: "Q4", value: 85 },
    { category: "Q5", value: 95 },
    { category: "Q6", value: 75 },
    { category: "Q7", value: 55 },
  ];

  // Custom gauge chart component matching the exact photo
  const GaugeChart = ({ value }: { value: number }) => {
    return (
      <div className="relative w-full h-56 mx-auto flex justify-center items-center">
        <svg
          width="500"
          height="280"
          viewBox="0 0 500 280"
          className="overflow-visible"
        >
          {/* Define the gauge path */}
          <defs>
            <path id="gaugePath" d="M 80 220 A 170 170 0 0 1 420 220" />
          </defs>

          {/* Background track */}
          <path
            d="M 80 220 A 170 170 0 0 1 420 220"
            fill="none"
            stroke="#f1f5f9"
            strokeWidth="40"
            strokeLinecap="round"
          />

          {/* Green segment (0-20) */}
          <path
            d="M 80 220 A 170 170 0 0 1 165 80"
            fill="none"
            stroke="#10b981"
            strokeWidth="40"
            strokeLinecap="round"
          />

          {/* Light green segment (20-40) */}
          <path
            d="M 165 80 A 170 170 0 0 1 220 60"
            fill="none"
            stroke="#84cc16"
            strokeWidth="40"
            strokeLinecap="round"
          />

          {/* Yellow segment (40-60) */}
          <path
            d="M 220 60 A 170 170 0 0 1 280 60"
            fill="none"
            stroke="#eab308"
            strokeWidth="40"
            strokeLinecap="round"
          />

          {/* Orange segment (60-80) */}
          <path
            d="M 280 60 A 170 170 0 0 1 335 80"
            fill="none"
            stroke="#f97316"
            strokeWidth="40"
            strokeLinecap="round"
          />

          {/* Red segment (80-100) */}
          <path
            d="M 335 80 A 170 170 0 0 1 420 220"
            fill="none"
            stroke="#ef4444"
            strokeWidth="40"
            strokeLinecap="round"
          />

          {/* Needle - pointing to 30 (in light green area) */}
          <g transform="translate(250, 220)">
            <line
              x1="0"
              y1="0"
              x2="0"
              y2="-140"
              stroke="#1f2937"
              strokeWidth="6"
              strokeLinecap="round"
              transform="rotate(-126)"
            />
            {/* Center circle */}
            <circle cx="0" cy="0" r="8" fill="#1f2937" />
          </g>

          {/* Scale numbers */}
          <text x="70" y="235" fontSize="14" fill="#6b7280" fontWeight="500">
            0
          </text>
          <text x="150" y="90" fontSize="14" fill="#6b7280" fontWeight="500">
            20
          </text>
          <text x="210" y="50" fontSize="14" fill="#6b7280" fontWeight="500">
            40
          </text>
          <text x="250" y="40" fontSize="14" fill="#6b7280" fontWeight="500">
            60
          </text>
          <text x="290" y="50" fontSize="14" fill="#6b7280" fontWeight="500">
            80
          </text>
          <text x="350" y="90" fontSize="14" fill="#6b7280" fontWeight="500">
            100
          </text>
          <text x="430" y="235" fontSize="14" fill="#6b7280" fontWeight="500">
            100
          </text>
        </svg>

        {/* Center value - positioned to match photo exactly */}
        <div
          className="absolute"
          style={{
            top: "65%",
            left: "50%",
            transform: "translateX(-50%)",
            marginTop: "-10px",
          }}
        >
          <div className="text-6xl font-bold text-lime-400">30</div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-white my-8 p-6">
      <div className="">
        {/* Header */}
        <div className="flex justify-end items-end gap-3">
          <div className="mr-4">
            <button className="p-2 border mr-4 border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              <BsFillGridFill className="w-5 h-5 cursor-pointer text-gray-600" />
            </button>
            <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              <PiSquareSplitHorizontalFill className="w-5 h-5 cursor-pointer text-gray-600" />
            </button>
          </div>
        </div>
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-semibold text-gray-800 mb-2">
              Challenges
            </h1>
            <p className="text-sm text-gray-600 max-w-6xl">
              What are the main challenges the company is facing? In other
              words, what are the major obstacles that the strategy needs to
              address? The intent is to establish a list of the most pressing
              business challenges in order of priority. It is crucial to engage
              all relevant stakeholders in developing the prioritized list to
              foster alignment and ensure that everyone is on board with the
              business challenges the strategy aims to tackle.
            </p>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Challenge Risk Score */}
          <div className="bg-white rounded-lg p-6 shadow-sm border">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              Challenge Risk Score
            </h3>
            <p className="text-sm text-gray-600 mb-6">
              The risk score is a concise numerical reflection of the combined
              impact and mitigation abilities for identified challenges. A
              higher score implies a greater risk. This metric helps prioritize
              risk management efforts and guides strategic decisions by
              indicating the overall risk exposure. Regular updates maintain its
              relevance in the dynamic business environment.
            </p>
            <GaugeChart value={30} />
          </div>

          {/* Risk Score by Category */}
          <div className="bg-white rounded-lg p-6 shadow-sm border">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              Risk Score by Category
            </h3>
            <p className="text-sm text-gray-600 mb-6">
              Risk score by category offers a granular evaluation of key
              business aspects.
            </p>
            <div className="space-y-4">
              {riskCategories.map((category, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700 w-20">
                    {category.name}
                  </span>
                  <div className="flex-1 mx-4">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="h-2 rounded-full transition-all duration-300"
                        style={{
                          width: `${category.score}%`,
                          backgroundColor: category.color,
                        }}
                      ></div>
                    </div>
                  </div>
                  <span className="text-sm font-medium text-gray-700 w-8 text-right">
                    {category.score}
                  </span>
                </div>
              ))}
            </div>
            <div className="flex justify-between text-xs text-gray-500 mt-4">
              <span>0</span>
              <span>20</span>
              <span>40</span>
              <span>60</span>
              <span>80</span>
              <span>100</span>
            </div>
          </div>

          {/* Impact on Business */}
          <div className="bg-white rounded-lg p-6 shadow-sm border">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              Impact on business
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              Click on a category to drill down
            </p>

            <div className="flex items-center justify-center mb-6">
              <div className="relative">
                <ResponsiveContainer width={200} height={200}>
                  <PieChart>
                    <Pie
                      data={impactData}
                      cx={100}
                      cy={100}
                      innerRadius={60}
                      outerRadius={90}
                      dataKey="value"
                      onMouseEnter={(data) => setHoveredSegment(data.category)}
                      onMouseLeave={() => setHoveredSegment(null)}
                    >
                      {impactData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={entry.color}
                          className="cursor-pointer hover:opacity-80 transition-opacity"
                        />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    {hoveredSegment ? (
                      <>
                        <div className="text-sm text-gray-500">
                          {hoveredSegment}
                        </div>
                        <div className="text-2xl font-bold text-gray-800">
                          {
                            impactData.find(
                              (item) => item.category === hoveredSegment
                            )?.value
                          }
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="text-sm text-gray-500">Moderate</div>
                        <div className="text-2xl font-bold text-gray-800">
                          41
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Legend */}
            <div className="flex flex-wrap gap-4 justify-center">
              {impactData.map((item, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: item.color }}
                  ></div>
                  <span className="text-xs text-gray-600">{item.category}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Overview */}
          <div className="bg-white rounded-lg p-6 shadow-sm border">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              Overview
            </h3>
            <p className="text-sm text-gray-600 mb-6">
              Systematically analyze each challenge to identify high-impact
              areas requiring immediate attention and leverage our strengths to
              mitigate risks effectively.
            </p>

            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={overviewData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <XAxis
                    dataKey="category"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 12, fill: "#6b7280" }}
                  />
                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 12, fill: "#6b7280" }}
                    domain={[0, 100]}
                  />
                  <Bar dataKey="value" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="mt-4 text-center">
              <span className="text-sm text-gray-500 transform -rotate-90 inline-block">
                Impact challenges
              </span>
            </div>

            <div className="mt-2 text-center">
              <span className="text-sm text-gray-500">Ability to Address</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChallengesDashboard;
