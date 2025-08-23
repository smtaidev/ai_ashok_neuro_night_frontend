"use client";
import Image from "next/image";
import React from "react";
import { FaArrowTrendDown, FaArrowTrendUp } from "react-icons/fa6";
import teslaLogo from "@/public/image/tesla.png";
import msLogo from "@/public/image/ms-logo.png";
import appleLogo from "@/public/image/apple.png";
import rumorImg from "@/public/image/rumor.png";

const stockData = [
  {
    name: "Tesla Inc",
    symbol: "TSLA",
    change: "+6.87%",
    trend: "up",
    logo: teslaLogo,
  },
  {
    name: "Microsoft Corp",
    symbol: "MSFT",
    change: "-4.49%",
    trend: "down",
    logo: msLogo,
  },
  {
    name: "Apple Inc",
    symbol: "AAPL",
    change: "+8.25%",
    trend: "up",
    logo: appleLogo,
  },
];

const rumorData = [
  {
    company: "Tesla",
    description:
      "Tesla's AI assistant: Sentiment: Positive (65%) | Buzz Level: High",
    bold: true,
  },
  {
    company: "Apple",
    description: 'Dominating the "Hardware Subscription" catego...',
  },
  { company: "Microsoft", description: 'Leading in "AI Acquisitions"' },
];

export default function CompetitorAnalysis() {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm w-full  mx-auto">
      {/* Title */}
      <h2 className="text-lg font-semibold text-blue-900">
        Competitor Analysis
      </h2>
      <p className="text-sm text-gray-500 mb-4">Market Position Insights</p>

      <div className="flex flex-col md:flex-row md:gap-8">
        {/* Left Section - Competitors */}
        <div className="flex-1 pr-0 ">
          <div className="grid grid-cols-2 text-sm font-medium text-gray-700 mb-3">
            <span>Competitor</span>
            <span className="text-right">Stock summary</span>
          </div>

          {stockData.map((stock, index) => (
            <div
              key={index}
              className="flex items-center justify-between py-3 border-t border-gray-200 first:border-t-0"
            >
              {/* Company Info */}
              <div className="flex items-center gap-2">
                <Image
                  src={stock.logo}
                  alt={stock.name}
                  width={20}
                  height={20}
                />
                <span className="font-medium text-gray-800">
                  {stock.name} ({stock.symbol})
                </span>
              </div>

              {/* Stock Summary */}
              <div className="flex items-center gap-3">
                {/* Mini Graph */}
                <svg className="w-16 h-8" viewBox="0 0 64 16" fill="none">
                  <path
                    d={
                      stock.trend === "up"
                        ? "M0 10 Q8 2, 16 4 T32 6 T48 4 T64 6"
                        : "M0 6 Q8 12, 16 14 T32 10 T48 8 T64 10"
                    }
                    stroke={stock.trend === "up" ? "#00C853" : "#FF1744"}
                    strokeWidth="1"
                    fill="none"
                  />
                  <line
                    x1="0"
                    y1="8"
                    x2="64"
                    y2="8"
                    stroke="#999"
                    strokeWidth="0.8"
                    strokeDasharray="2 2"
                  />
                </svg>

                {/* Change Percentage */}
                <span
                  className={`font-medium flex items-center gap-1 ${
                    stock.trend === "up" ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {stock.trend === "up" ? (
                    <FaArrowTrendUp size={12} />
                  ) : (
                    <FaArrowTrendDown size={12} />
                  )}
                  {stock.change}
                </span>
              </div>
            </div>
          ))}
        </div>
        {/* Right Section - Divider + Rumors */}
        <div className="hidden md:block w-px bg-gray-200"></div>{" "}
        {/* Vertical Divider */}
        <div className="flex-1 pl-0  mt-6 md:mt-0">
          <h3 className="text-md font-medium text-gray-800 mb-3">
            Market Whispers & Rumors
          </h3>

          <div className="bg-gray-50 border border-gray-200 rounded-lg p-3 flex gap-3 mb-3">
            <div className="flex-1">
              <p className="text-sm">
                <span className="font-semibold">{rumorData[0].company}:</span>{" "}
                {rumorData[0].description}
              </p>
            </div>
            <Image
              src={rumorImg}
              alt="Rumor"
              width={50}
              height={50}
              className="rounded"
            />
          </div>

          {rumorData.slice(1).map((rumor, index) => (
            <p key={index} className="text-sm mb-2">
              <span className="font-semibold">{rumor.company}:</span>{" "}
              {rumor.description}
            </p>
          ))}

          <a
            href="#"
            className="text-sm text-blue-600 hover:underline mt-3 inline-block"
          >
            Explore More →
          </a>
        </div>
      </div>
    </div>
  );
}
