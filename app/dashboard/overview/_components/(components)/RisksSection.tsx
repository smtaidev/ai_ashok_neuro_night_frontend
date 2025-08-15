"use client";
import React from "react";
import PieChartReusable from "./reuseable/PieChartReusable";

// পাই চার্টের জন্য স্ট্যাটিক ডেটা সংজ্ঞায়িত করা হয়েছে।
// এটি বিভিন্ন ঝুঁকির মাত্রা (High, Medium, Low) এবং তাদের মান দেখায়।
const roadblocksData = [
  { name: "High", value: 47, color: "#F08080" },
  { name: "Medium", value: 27, color: "#FFD700" },
  { name: "Low", value: 26, color: "#2F4F4F" },
];

// প্রধান কম্পোনেন্ট যা ঝুঁকির বিভাগ প্রদর্শন করে।
export default function RisksSection() {
  // ব্যবসার লক্ষ্যগুলির সাথে সম্পর্কিত ঝুঁকির পয়েন্টগুলির একটি তালিকা।
  const roadblocksPoints = [
    "Market competition, technological disruption, poor strategic alignment.",
    "Supply chain disruptions, process inefficiencies, cybersecurity breaches.",
    "Budget overruns, currency fluctuations, interest rate changes.",
    "Regulatory changes, data privacy violations, legal challenges.",
  ];
  
  return (
    // কম্পোনেন্টের প্রধান ধারক, এর স্টাইলিং Tailwind CSS ব্যবহার করে করা হয়েছে।
    <PieChartReusable
         title="Risks"
         subtitle="Associated with Business Goals"
         secondTitle='Top Risks Impacting Goals'
         data={roadblocksData}
         points={roadblocksPoints}
         footerLinkText="Explore More"
         footerLinkHref="#"
       />
  );
}
