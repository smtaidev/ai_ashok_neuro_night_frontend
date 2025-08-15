// Roadblocks.js (or any other component file)
"use client";
import React from "react";// নতুন কম্পোনেন্টটি ইম্পোর্ট করুন
import PieChartReusable from "./reuseable/PieChartReusable";

const roadblocksData = [
  { name: "High", value: 47, color: "#F08080" },
  { name: "Medium", value: 27, color: "#FFD700" },
  { name: "Low", value: 26, color: "#2F4F4F" },
];

const roadblocksPoints = [
  "Lack of a clear vision or misaligned goals.",
  "Resistance to change during strategic shifts.",
  "Poor competitive positioning or market disruption.",
  "Poor communication and coordination across teams.",
  "Budget constraints or mismanagement.",
];

export default function Roadblocks() {
  return (
    <PieChartReusable
      title="Roadblocks"
      secondTitle="Top Roadblocks Impacting Business Goals"
      subtitle="Associated with Business Goals"
      data={roadblocksData}
      points={roadblocksPoints}
      footerLinkText="Explore More"
      footerLinkHref="#"
    />
  );
}